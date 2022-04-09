import React from 'react'
import { Box, Toolbar, Grid } from '@mui/material'

import Appbar from './Appbar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const NavbarLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Appbar />

      <Box
        sx={{
          width: { xl: '80%', xs: '100%' },
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          <Grid
            item
            className="main-grid-item"
            lg={3}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              height: '100vh',
              flexDirection: 'column',
            }}
          >
            <Toolbar />
            <LeftSidebar />
          </Grid>

          <Grid
            item
            className="main-grid-item content-grid"
            lg={6}
            md={8}
            xs={12}
            sx={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              height: '100vh',
            }}
          >
            <Toolbar />
            {children}
          </Grid>

          <Grid
            item
            className="main-grid-item"
            md={4}
            lg={3}
            sx={{
              display: { xs: 'none', md: 'flex' },
              height: '100vh',
              flexDirection: 'column',
            }}
          >
            <Toolbar />
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NavbarLayout
