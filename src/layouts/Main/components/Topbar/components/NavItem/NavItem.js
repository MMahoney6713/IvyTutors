import React  from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { alpha, useTheme } from '@mui/material/styles';
// import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const NavItem = ({ title, id, to }) => {
  
  const linkColor = 'text.primary';

  return (
    <Box>
      <Link 
        to={to}
        component={RouterLink}
        style={{textDecoration: 'none'}}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          aria-describedby={id}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            fontWeight={400}
            color={linkColor}
          >
            {title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;
