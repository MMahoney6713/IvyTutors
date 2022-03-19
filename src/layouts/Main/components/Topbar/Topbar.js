import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import MenuIcon from '@mui/icons-material/Menu';
import ivyTutors from './../../../../svg/logos/ivyTutors.svg';
import UserContext from '../../../../auth/UserContext';

import { NavItem } from './components';

import {Link as RouterLink } from 'react-router-dom';

const Topbar = ( {logout} ) => {
  const { currentUser } = useContext(UserContext);

  function loggedOutNav() {
    return (
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box marginLeft={4}>
          <NavItem
            title={'Sign Up'}
            id={'signup'}
            to={'/signup'}
          />
        </Box>
        <Box marginLeft={4}>
          <Button
            component={RouterLink}
            to={'/signin'}
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    );
  }

  function loggedInNav() {
    return (
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box marginLeft={4}>
          <NavItem
            title={'Dashboard'}
            id={'dashboard'}
            to={'/dashboard'}
          />
        </Box>
        <Box marginLeft={4}>
          <Button
            component={RouterLink}
            onClick={logout}
            to={'/'}
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>
    );
  }
 

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component={RouterLink}
        to="/"
        title="ivyLeagueTutors"
        width={{ xs: 190, md: 210 }}
      >
        <Box
          component={'img'}
          src={ ivyTutors }
          height={1}
          width={1}
        />
      </Box>
      {currentUser ? loggedInNav() : loggedOutNav()}
      
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
  logout: PropTypes.func
};

export default Topbar;
