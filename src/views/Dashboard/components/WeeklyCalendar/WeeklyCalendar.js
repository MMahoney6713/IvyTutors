/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';

import UserContext from 'auth/UserContext';
import IvyTutorsApi from 'api/api';
import _ from 'lodash';

const axios = require('axios');

const { rowInitialState, timeToIdMap } = require('./rowSetup');

const BASE_URL = process.env.REACT_APP_BASE_URL ? `${process.env.REACT_APP_BASE_URL}/availability` : 'http://localhost:3001/availability';

const WeeklyCalendar = () => {

  const getStartOfWeek = (date) => {
    let newDate = date;
    let dayOfWeek = newDate.getDay();
    let dateAtStart = newDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    let startOfWeek = new Date(newDate.setDate(dateAtStart));
    startOfWeek.setHours(0); startOfWeek.setMinutes(0); startOfWeek.setSeconds(0);
    return startOfWeek;
  };

  const [firstDay, setFirstDay] = useState(getStartOfWeek(new Date()));
  const [rows, setRows] = useState([]);
  const { currentUser } = useContext(UserContext);
  const tutor = currentUser.email;
  const timeHeaderForUser = 'time';
  const timeHeaderForJS = 'timeJS';

  useEffect(async () => {
    // Populate calendar with tutor availability on load and on change of date

    let newRows = _.cloneDeep(rowInitialState);

    let [year, month, day, tz] = [firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate(), firstDay.getTimezoneOffset()];

    let availabilityData = await axios.get(`${BASE_URL}/${tutor}?year=${year}&month=${month}&day=${day}&tz=${tz}`, { headers: { Authorization: `Bearer ${IvyTutorsApi.token}` }});
    
    for (let timeData of availabilityData.data.availability) {
      let rowId = timeToIdMap[timeData.time];
      for (const [key, value] of Object.entries(timeData)) {
        if (key !== timeHeaderForUser) {
          newRows[rowId][key] = value;
        }
      }
    }
    
    setRows(newRows);
  }, [firstDay]);

  let valueIfTutorAvailable = 'available';
  let cellClassIfAvailable = 'cellBooked';

  let customSetClass = (params) => {
    let className = '';
    className += params.value === valueIfTutorAvailable ? cellClassIfAvailable : '';
    return className;
  };

  const customRender = (params) => {
    // This is to render a Modal object in the future, if needed.
    return params.value === 'booked' ? null : null;
  };

  const columnFieldNames = ['m', 't', 'w', 'th', 'f', 's', 'su'];
  const timeDisplayColumn = { field: timeHeaderForUser, headerName: 'Time', sortable: false, disableColumnMenu: true, width: 90 };
  const commonColumnDefinitions = {sortable: false, disableColumnMenu: true, width: 100, renderCell: customRender, cellClassName: customSetClass, flex: 1, minWidth: 70 };
  
  const columns = [timeDisplayColumn, ...columnFieldNames.map((field, idx) => {
    let dayIterator = new Date(firstDay);
    let date = new Date(dayIterator.setDate(firstDay.getDate() + idx));
    let dateString = date.toDateString();
    return {...commonColumnDefinitions, field, headerName: `${dateString}` };
  })];

  

  const handleCellClick = async (params, event, details) => {
    if (params.field === timeHeaderForUser) {
      return null;
    }

    if (event, details, params); // Saving these so I know they exist in the future, if needed;

    let newRows = _.cloneDeep(rows);

    let currentVal = newRows[params.id][params.field];
    let valToSet = currentVal ? '' : valueIfTutorAvailable;
    newRows[params.id][params.field] = valToSet;

    
    // Sets a new date in the format ('March 11 2022 3:30 PM');
    let time = new Date(`${params.colDef.headerName} ${rows[params.id][timeHeaderForJS]}`);
    // Then turns 'Fri Mar 11 2022 15:30:00 GMT-0800 (Pacific Standard Time)'
    // into '2022-03-9 13:00:00-08' for Postgres query.
    let timeStringWithOffset = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:00-${time.getTimezoneOffset()/60}`;
    
    try {
      let availabilityRes;
      if (valToSet) {
        availabilityRes = await axios.post(BASE_URL, {tutor: tutor, time: time}, { headers: { Authorization: `Bearer ${IvyTutorsApi.token}` }});
      } else {
        availabilityRes = await axios.delete(`${BASE_URL}/${tutor}/${timeStringWithOffset}`, { headers: { Authorization: `Bearer ${IvyTutorsApi.token}` }});
      }
      
      if (availabilityRes);
  
      setRows(newRows);
    } catch (e) {
      newRows[params.id][params.field] = currentVal;
      setRows(newRows);
    }
    
  };

  

  const handleButtonClick = () => {
    let firstDayNextWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7);
    setFirstDay(firstDayNextWeek);
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <button onClick={handleButtonClick}>Next Week</button>
      <DataGrid
        rowHeight={19}
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick}
        onCellDoubleClick={() => (null)}
        initialState={{...rowInitialState}}
        // The following taken from github issue report to allow text-wrap in header: https://github.com/mui/mui-x/issues/898
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: 'clip',
            whiteSpace: 'break-spaces',
            lineHeight: 1
          }
        }}
      />
    </div>
  );
};

export default WeeklyCalendar;
