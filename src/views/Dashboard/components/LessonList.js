import React, {useContext} from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { colors } from '@mui/material';
import DashboardContext from '../DashboardContext';

import Lesson from './Lesson';



const LessonList = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const sliderOpts = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: isMd ? 3 : 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const {lessons} = useContext(DashboardContext);

  return (
    <Box>
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
          Upcoming Lessons:
        </Typography>
      </Box>


      <Box maxWidth={{ xs: 420, sm: 620, md: 1 }} margin={'0 auto'}>
        <Slider {...sliderOpts}>
          {lessons ? lessons.map((lesson, i) => (
            <Lesson lesson={lesson} key={i}></Lesson>
          )) : ''}
        </Slider>
      </Box>
    </Box>
  );
};

export default  LessonList;
