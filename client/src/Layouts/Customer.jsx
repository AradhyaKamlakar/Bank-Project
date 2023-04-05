import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import logo from '../Assets/logo.png';
import Token from '../Components/Customer/Token/Token';

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import WaitingRoom from '../Components/Customer/WaitingRoom/WaitingRoom';
import Timeline from '../Components/Customer/CustomerTimeline/Timeline';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Customer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const navList = [
    {
      name : 'Generate Token',
      icon : <TokenRoundedIcon />,
      path : '/'
    },
    {
      name : 'Waiting Room',
      icon : <TvRoundedIcon />,
      path : '/waiting-room'
    }
    
  ]

  return (
    <Box sx={{ display: 'flex' }} style={{
      backgroundColor : 'transparent'
    }}>
      {/* <CssBaseline /> */}

      <Drawer variant="permanent" open={open}>

      <List style={{
        padding:'.5rem',
      }} >
      <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={logo} alt="" style={{
                    width:'50px'
                  }}/>
                </ListItemIcon>
                <ListItemText primary={'Bank'} sx={{ opacity: open ? 1 : 0 }} />
                {
                  open &&
                <IconButton color='primary' onClick={handleDrawerClose}>

                  <MenuOpenRoundedIcon />
                  </IconButton>
                }
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my:1 }} />
            {
              !open &&
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleDrawerOpen}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton color='primary' >

                  <MenuOpenRoundedIcon />
                  </IconButton>
                </ListItemIcon>
                
              </ListItemButton>
            </ListItem>
            }
          {navList.map((ele, index) => (
            <NavLink to={ele.path} style={{
              textDecoration:'none',
              color:'black'
            }}>

            <ListItem key={ele.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {ele.icon}
                </ListItemIcon>
                <ListItemText primary={ele.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
          ))}
          <Divider sx={{ my:1 }}/>
          <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExitToAppRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route exact path='/' element={<Token />} />
          <Route exact path='/waiting-room' element={<WaitingRoom />} />
          <Route exact path='/customer-timeline' element={<Timeline />} />

        </Routes>

      </Box>
    </Box >
  );
}
