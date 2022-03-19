import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Avatar from '@mui/material/Avatar';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { colors } from '@mui/material';
import IvyTutorsApi from 'api/api';
import DashboardContext from '../DashboardContext';
import UserContext from 'auth/UserContext';

const Tutor = ({ tutor }) => {
  const theme = useTheme();
  // const isMd = useMediaQuery(theme.breakpoints.up('md'), {
  //   defaultMatches: true,
  // });

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
              {/* <Button
                variant={'contained'}
                color="primary"
                size="large"
                startIcon={
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width={16}
                    height={16}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </Box>
                }
              >
              Save
              </Button> */}
            </Box>
          </CardMedia>
          <CardContent>
            {/* <Typography
              variant={'h6'}
              gutterBottom
              align={'left'}
              sx={{ fontWeight: 700 }}
            >
              {tutor.bio}
            </Typography> */}
            <Box display={'flex'} alignItems={'center'} marginY={1}>
              
              <Typography variant={'subtitle1'} color="text.secondary">
                {tutor.university}
              </Typography>
            </Box>
            
            {/* <Box
              marginTop={2}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <AvatarGroup max={4}>
                {tutor.users.map((u) => (
                  <Avatar key={u} src={u} />
                ))}
              </AvatarGroup>
              <Box display={'flex'} alignItems={'center'}>
                <Box
                  component={'svg'}
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  color={colors.yellow[700]}
                  marginRight={1}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </Box>
                <Typography sx={{ fontWeight: 700 }}>5.0</Typography>
              </Box>
            </Box> */}
          </CardContent>
          {/* <Box flexGrow={1} /> */}
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
