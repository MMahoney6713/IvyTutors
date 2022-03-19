import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';
import IvyTutorsApi from 'api/api';
import DashboardContext from '../DashboardContext';
import UserContext from 'auth/UserContext';

const Tutor = ({ tutor }) => {
  const theme = useTheme();

  const { dateTime, setLessons, setAvailableTutors } = useContext(DashboardContext);
  const { currentUser } = useContext(UserContext);

  const bookTutor = async (tutorEmail, studentEmail, time) => {
    let lesson = await IvyTutorsApi.bookLesson(tutorEmail, studentEmail, time);

    setLessons(lessons => {
      let newLessons = [...lessons, lesson];
      newLessons.sort((a,b) => a.time - b.time);
      return newLessons;
    });

    setAvailableTutors(tutors => {
      let tutorsCopy = [];
      for (let tutorObj of tutors) {
        if (tutorObj.email !== tutorEmail) {
          tutorsCopy.push(tutorObj);
        }
      }
      return tutorsCopy;
    });
  };


  return (
    <Box padding={{ xs: 1, md: 2, lg: 3 }}>
      <Box
        display={'block'}
        width={1}
        height={1}
        sx={{
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          }}}
      >
        <Box
          component={Card}
          width={1}
          height={1}
          display={'flex'}
          flexDirection={'column'}
          sx={{ backgroundImage: 'none' }}
        >
          <CardMedia
            title={tutor.fullName}
            image={tutor.imageURL}
            sx={{
              position: 'relative',
              height: { xs: 240, sm: 340, md: 280 },
              overflow: 'hidden',
            }}
          >
            <Box
              component={'svg'}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1921 273"
              sx={{
                position: 'absolute',
                width: '100%',
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <polygon
                fill={theme.palette.background.paper}
                points="0,273 1921,273 1921,0 "
              />
            </Box>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              position={'absolute'}
              bottom={0}
              padding={2}
              width={1}
              zIndex={2}
            >
              <Box
                padding={1}
                bgcolor={'background.paper'}
                boxShadow={1}
                borderRadius={2}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {tutor.fullName} 
                </Typography>
              </Box>
            </Box>
          </CardMedia>
          
          <CardContent>
            <Box display={'flex'} alignItems={'center'} marginY={1}>
              <Typography variant={'subtitle1'} color="text.secondary">
                {tutor.university}
              </Typography>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant={'contained'}
              color="primary"
              size="large"
              onClick={async () => await bookTutor(tutor.email, currentUser.email, dateTime)}
            >
              Book Tutor
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Box>
  );
};

Tutor.propTypes = {
  tutor: PropTypes.object,
  credits: PropTypes.number,
  media: PropTypes.string,
  title: PropTypes.object,
};

export default Tutor;
