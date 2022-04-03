import React, { useEffect, useState } from 'react'
import { useRouter, userouter } from 'next/router'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Avatar,
  Grid,
  InputBase,
  Badge,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatIcon from '@mui/icons-material/Chat'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const mobileMenuId = 'primary-search-account-menu-mobile'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 25,
  backgroundColor: '#eaedf1',
  '&:hover': {
    backgroundColor: '#eaedf1',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  alignSelf: 'center',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
    },
  },
}))

const NavbarLayout = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const data = window.sessionStorage.getItem('userData')
      ? JSON.parse(window.sessionStorage.getItem('userData'))
      : null

    setUserData(data)
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: 'white', color: 'black' }}
      >
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                onClick={() => router.push('/home')}
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
              >
                InDaMoment
              </Typography>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Users"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => router.push('/messages')}
              >
                <Badge badgeContent={4} color="error">
                  <ChatIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar
                sx={{ ml: 2, cursor: 'pointer' }}
                alt="Remy Sharp"
                src={userData ? userData.profilePhotoUrl : ''}
                onClick={() => router.push(`/profile/${userData.userName}`)}
              />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          width: { xl: '80%', xs: '100%' },
          height: '100%',
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          <Grid
            item
            className="main-grid-item"
            lg={3}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <LeftSidebar />
          </Grid>

          <Grid item className="main-grid-item" lg={6} md={8} xs={12}>
            {children}
          </Grid>

          <Grid
            item
            className="main-grid-item"
            md={4}
            lg={3}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NavbarLayout
