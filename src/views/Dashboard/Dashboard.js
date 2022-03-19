import React, {useState, useEffect, useContext} from 'react';
// import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import Container from './components/Container';
import LessonList from './components/LessonList';
import DateTimePicker from './components/DateTimePicker';
import IvyTutorsApi from '../../api/api';
import DashboardContext from './DashboardContext';
import UserContext from 'auth/UserContext';
import Scheduler from './components/Scheduler';


const Dashboard = () => {
  const [lessons, setLessons] = useState();
  
  // Set initial time to tomorrow at 1:30pm
  let initialDateTime = new Date();
  initialDateTime.setDate(initialDateTime.getDate()+1);
  initialDateTime.setHours(13);
  initialDateTime.setMinutes(30);
  initialDateTime.setSeconds(0);
  const [dateTime, setDateTime] = useState(new Date(initialDateTime));

  const [availableTutors, setAvailableTutors] = useState([]);
  
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);

  useEffect(async () => {
    try {
      // console.log('dashboard load');
      let lessonsRes = await IvyTutorsApi.getLessons();
      setLessons(lessonsRes)
    } catch (err) {
      console.error('App loadUserInfo: problem loading', err);
    }
  },[])

  


  return (
    <DashboardContext.Provider value={{ lessons, setLessons, dateTime, setDateTime, availableTutors, setAvailableTutors }}>
      
      {currentUser ? 
        <>
          <Container>
            <LessonList />
          </Container>

          {currentUser.isTutor ? 
            <Container>
              <Box marginBottom={1}>
                <Typography
                  variant="h5"
                  align={'left'}
                  data-aos={'fade-up'}
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Update your availability:
                </Typography>
              </Box>
              <Box>
                <Scheduler />
              </Box>
            </Container>
            :
            <Container>
              <Box marginBottom={1}>
                <Typography
                  variant="h5"
                  align={'left'}
                  data-aos={'fade-up'}
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Schedule a tutoring lesson:
                </Typography>
              </Box>
              <Box>
                <DateTimePicker />
              </Box>
            </Container>
          }

          
        </>
        : 
          <Container>
            <Box marginBottom={1}>
              <Typography
                variant="h5"
                align={'center'}
                data-aos={'fade-up'}
                gutterBottom
                sx={{
                  fontWeight: 700,
                }}
              >
                Loading
              </Typography>
            </Box>
          </Container>
      }
    </DashboardContext.Provider>
  );
};

export default Dashboard;
