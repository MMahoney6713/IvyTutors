import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';


const Lesson = ({ lesson }) => {
  const theme = useTheme();

  let time = new Date(lesson.time);
  time.setUTCMinutes(time.getUTCMinutes() - time.getTimezoneOffset());
  let timeString = time.toString().slice(0,21);


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
            title={lesson.title}
            image={lesson.tutor.imageURL}
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
                  {lesson.credits} credits
                </Typography>
              </Box>
              
            </Box>
          </CardMedia>
          <CardContent>
            <Typography
              variant={'h6'}
              gutterBottom
              align={'left'}
              sx={{ fontWeight: 700 }}
            >
              {lesson.title}
            </Typography>
            <Box display={'flex'} alignItems={'center'} marginY={1}>
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
                marginRight={1}
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </Box>
              <Typography variant={'subtitle1'} color="text.secondary">
                {lesson.tutor.fullName}
              </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} marginY={1}>
              
              <Typography variant={'subtitle1'} color="text.secondary">
                {timeString}
              </Typography>
            </Box>
            
          </CardContent>
          
        </Box>
      </Box>
    </Box>
  );
};

Lesson.propTypes = {
  lesson: PropTypes.object,
  credits: PropTypes.number,
  media: PropTypes.string,
  tutor: PropTypes.object,
  title: PropTypes.object,
};

export default Lesson;
