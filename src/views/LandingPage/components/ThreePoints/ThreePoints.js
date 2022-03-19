/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import LaptopSkeletonIllustration from 'svg/illustrations/LaptopSkeleton';

const mock = [
  {
    title: 'Built for students',
    subtitle:
      'Ivy League Tutoring ensures that tutors are top quality and reliable - only students currently enrolled in the top schools in the U.S. are allowed to tutor.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
  },
  {
    title: 'Built for tutors',
    subtitle:
      'Tutoring is one of the most accessible jobs for tutors while at University, but tutoring companies often take a large cut of their earnings. At Ivy League Tutors, our tutors keep the majority.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: 'Built for global influence',
    subtitle:
      'The world is more connected than ever before, and with the rise of E-learning comes the need for companies like Ivy League Tutoring to facilitate that connection.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

const ThreePoints = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const LeftSide = () => (
    <List disablePadding>
      {mock.map((item, index) => (
        <ListItem
          key={index}
          disableGutters
          data-aos="fade-up"
          data-aos-delay={index * 300}
          data-aos-offset={100}
          data-aos-duration={600}
        >
          <ListItemAvatar>
            <Box
              component={Avatar}
              variant={'rounded'}
              color={theme.palette.primary.dark}
              bgcolor={`${theme.palette.primary.light}22`}
            >
              {item.icon}
            </Box>
          </ListItemAvatar>
          <ListItemText primary={item.title} secondary={item.subtitle} />
        </ListItem>
      ))}
    </List>
  );

  const RightSide = () => (
    <Box width={1}>
      <Box
        sx={{
          position: 'relative',
          marginX: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            marginX: 'auto',
          }}
        >
          <Box>
            <Box
              position={'relative'}
              zIndex={2}
              maxWidth={1}
              height={'auto'}
              sx={{ verticalAlign: 'middle' }}
            >
              <LaptopSkeletonIllustration />
            </Box>
            <Box
              position={'absolute'}
              top={'8.4%'}
              left={'12%'}
              width={'76%'}
              height={'83%'}
              border={`1px solid ${theme.palette.alternate.dark}`}
              zIndex={3}
              sx={{
                '& .lazy-load-image-loaded': {
                  height: 1,
                  width: 1,
                },
              }}
            >
              <Box
                component={LazyLoadImage}
                effect="blur"
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80"
                alt="Image Description"
                width={1}
                height={1}
                sx={{
                  objectFit: 'cover',
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box marginBottom={4}>
        <Box marginBottom={2}>
          <Typography variant="h4" align={'center'} sx={{ fontWeight: 700 }}>
            Ivy League Tutoring
          </Typography>
        </Box>
        <Typography variant="h6" component="p" align={'center'}>
          Connecting the top student-tutors in the U.S. with English Practice services world wide.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <LeftSide />
          </Box>
        </Grid>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <RightSide />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThreePoints;
