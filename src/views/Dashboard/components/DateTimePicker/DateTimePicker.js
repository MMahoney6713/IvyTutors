import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';

import IvyTutorsApi from 'api/api';
import TutorsList from '../TutorsList';
import DashboardContext from 'views/Dashboard/DashboardContext';



const DateTimePicker = () => {

  const {dateTime, setDateTime, availableTutors, setAvailableTutors} = useContext(DashboardContext);

  useEffect(async () => {
    let availabilityRes = await IvyTutorsApi.getAvailableTutors(dateTime);
    setAvailableTutors(availabilityRes);
  }, [dateTime]);


  return (
    <Box
      sx={{
        marginTop: 5,
        marginX: 3,
      }}
    >
      
      <Grid container spacing={2}>

        <Grid item
          sx={{
            bgcolor: 'background.paper',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            fontWeight: 'bold',
            maxWidth: 350,
            flexGrow: 1,
            paddingRight: 2,
          }}
        >
          <Grid container spacing={2} direction='column' justifyContent='center' alignItems='center'>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  showToolbar={false}
                  value={dateTime}
                  onChange={(newDateTime) => setDateTime(newDateTime)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item paddingBottom={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Enter Time"
                  minutesStep={30}
                  value={dateTime}
                  onChange={(newDateTime) => setDateTime(newDateTime)}
                  onAccept={(newDateTime) => setDateTime(newDateTime)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        
        <Grid item 
          sx={{
            bgcolor: 'background.paper',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            fontWeight: 'bold',
            marginLeft: 3,
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            align={'center'}
            color={'text.secondary'}
            data-aos={'fade-up'}
          >
            Tutors available:
          </Typography>
          <Box>
            {availableTutors.length !== 0 ? 
              <TutorsList />
              : 
              <Typography
                variant="h6"
                align={'center'}
                color={'text.secondary'}
                data-aos={'fade-up'}
                paddingTop={15}
              >
                Sorry, no tutors available at that time.
              </Typography>
            }
          </Box>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default DateTimePicker;
