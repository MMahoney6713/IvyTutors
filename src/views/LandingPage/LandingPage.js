import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// // import DatePicker from '@mui/lab/DatePicker';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';
// // import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
// import TimePicker from '@mui/lab/TimePicker';
// import TextField from '@mui/material/TextField';

import './LandingPage.css';


// import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  // About,
  // AboutBottom,
  Features,
  Hero,
  // Integrations,
  // Jobs,
  // News,
  // Pricings,
  // Reviews,
  Team,
  ThreePoints,
  // Video,
  // Scheduler,
} from './components';

const LandingPage = () => {
  const theme = useTheme();

  // let [value, setValue] = useState();
  // let [timeValue, setTimeValue] = useState();








  // const dialogueCell = (
  //   <>
  //     {/* <Typography variant="subtitle1" component="div">
  //       Selected: {selectedValue}
  //     </Typography>
  //     <br /> */}
  //     <Button variant="outlined" onClick={handleClickOpen}>
  //       Open simple dialog
  //     </Button>
  //     <SimpleDialog
  //       selectedValue={selectedValue}
  //       open={open}
  //       onClose={handleClose}
  //     />
  //   </>
  // )





  return (
    
    <>
      <Box
        bgcolor={'alternate.main'}
        sx={{
          position: 'relative',
          '&::after': {
            position: 'absolute',
            content: '""',
            width: '30%',
            zIndex: 1,
            top: 0,
            left: '5%',
            height: '100%',
            backgroundSize: '18px 18px',
            backgroundImage: `radial-gradient(${alpha(theme.palette.primary.dark, 0.4)} 20%, transparent 20%)`,
            opacity: 0.2,
          },
        }}
      >
        <Box position={'relative'} zIndex={3}>
          <Hero />
        </Box>
      </Box>
      <Container>
        <ThreePoints />
      </Container>
      {/* <About /> */}

      <Container>
        <Team />
      </Container>

      <Container>
        <Features />
      </Container>

      {/* <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Container> */}


      {/* <Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              showToolbar={false}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box>
            <TimePicker
              label="Enter Time"
              value={timeValue}
              onChange={(newValue) => {
                setTimeValue(newValue);
              }}
              onAccept={() => {
                console.log(timeValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
      </Box> */}


      {/* <Container>
        <Scheduler />
      </Container> */}








      {/* <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <StaticDateTimePicker
              openTo="day"
              showToolbar={true}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
        <Box>
          <h1>Text</h1>
        </Box>
      </Container> */}



      {/* <Box bgcolor={'alternate.main'}>
        <Container>
          <News />
        </Container>
      </Box> */}
      
      {/* <Video />
      <Box bgcolor={'#11092d'}>
        <Container>
          <Integrations />
        </Container>
      </Box>
      <Container>
        <Pricings />
      </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Jobs />
        </Container>
      </Box>
      <Container>
        <AboutBottom />
      </Container>
      <Box bgcolor={'primary.main'}>
        <Container>
          <Reviews />
        </Container>
      </Box> */}
    </>
  );
};

export default LandingPage;
