import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Find Jobs', path: '/employee/feed' },
    { text: 'Post a Job', path: '/employer/dashboard' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WorkIcon sx={{ mr: 1, color: '#1976D2' }} /> JobSphere
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} onClick={() => navigate(item.path)} sx={{ cursor: 'pointer' }}>
            <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', color: '#333', boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h5" component={Link} to="/" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <WorkIcon sx={{ mr: 1, color: '#1976D2' }} /> JobSphere
          </Typography>
          {isMobile ? (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button key={item.text} component={Link} to={item.path} sx={{ color: '#333', fontWeight: '500', '&:hover': { color: '#1976D2' } }}>
                  {item.text}
                </Button>
              ))}
              <Button component={Link} to="/employer/dashboard" variant="contained" color="primary" sx={{ ml: 2, borderRadius: 2 }}>
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
