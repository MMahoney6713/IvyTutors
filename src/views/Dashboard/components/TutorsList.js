import React, {useContext} from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Tutor from './Tutors';
import DashboardContext from '../DashboardContext';


const TutorsList = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const { availableTutors } = useContext(DashboardContext);

  const sliderOpts = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: isMd ? 3 : 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <Box maxWidth={{ xs: 420, sm: 620, md: 1 }} margin={'0 auto'}>
      <Slider {...sliderOpts}>
        {availableTutors.map((tutor, i) => (
          <Tutor tutor={tutor} key={i}></Tutor>
        ))}
      </Slider>
    </Box>
  );
};

export default TutorsList;
