import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import Appbar from '../../components/Appbar'
import { db } from '../../Firebase/firebase'
import { onSnapshot, collection, query, where, doc } from 'firebase/firestore'

const UserProfile = () => {
  const [profileInfo, setProfileInfo] = useState(null)
  const [userData, setUserData] = useState(null)
  const [followerList, setFollowerList] = useState([])
  const [followingList, setFollowingList] = useState([])

  const router = useRouter()

  const username = router.query.userName

  // getting user data from the session storage
  useEffect(() => {
    const data = sessionStorage.getItem('userData')
      ? JSON.parse(sessionStorage.getItem('userData'))
      : null

    if (data !== null) {
      setUserData(data)
    }
  }, [])

  // getting userData from the database
  useEffect(() => {
    if (userData === null) {
      return
    }
    const unsub = onSnapshot(doc(db, 'users', userData.uid), (snap) => {
      if (snap.data() !== undefined) {
        const data = snap.data()
        setProfileInfo(data)
        sessionStorage.setItem('userData', JSON.stringify(data))
      }
    })

    return () => unsub()
  }, [userData])

  // getting data of followers from database
  useEffect(() => {
    if (userData === null) {
      return
    }
    const unsub = onSnapshot(doc(db, 'followers', userData.uid), (snap) => {
      if (snap.data() !== undefined) {
        const data = snap.data().followersList
        setFollowerList(data)
      }
    })

    return () => unsub()
  }, [userData])

  // getting data of followings from database
  useEffect(() => {
    if (userData === null) {
      return
    }
    const unsub = onSnapshot(doc(db, 'followings', userData.uid), (snap) => {
      if (snap.data() !== undefined) {
        const data = snap.data().followingList
        setFollowingList(data)
      }
    })

    return () => unsub()
  }, [userData])

  return (
    <Box>
      <Head>
        <title>{`Felix / ${username}`}</title>
        <meta
          name='description'
          content='Felix Social Media app Profile Screen'
        />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Appbar />
      <Toolbar />

      <Paper
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          boxShadow: 0,
          pt: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', lg: '70%', xl: '60%' },
          }}
        >
          <Box
            sx={{
              backgroundColor: 'yellow',
              width: '100%',
              height: { xs: 250, md: 300, lg: 350 },
              borderRadius: { lg: 5 },
              overflow: 'hidden',
              p: 0,
              position: 'relative',
            }}
          >
            <Image
              src='https://s3.amazonaws.com/beautifulnow_production/uploads/ckeditor_assets/pictures/14832/content_c20-Imag-by-Kah-Wai-Lin.-Untitled._Paranormal_Series.jpg'
              layout='fill'
            />
          </Box>

          <Grid container>
            <Grid item xs={12} md={3} position='relative'>
              <Box
                sx={{
                  overflow: 'hidden',
                  borderRadius: '50%',
                  p: 0.5,
                  background: 'white',
                  left: { xs: '50%', md: 40 },
                  transform: { xs: 'translateX(-50%)', md: 'translateX(0%)' },
                  display: 'inline-block',
                  position: 'absolute',
                  top: { xs: -70, md: -30 },
                }}
              >
                <Avatar
                  src={
                    profileInfo !== null
                      ? profileInfo.profilePhotoUrl
                      : 'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/default.jpg?alt=media&token=25fb473c-f799-4270-8a29-6de3350660c2'
                  }
                  sx={{ width: 160, height: 160 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant='h4' component='h4' sx={{ mt: 2 }}>
                {profileInfo ? profileInfo.displayName : ''}
              </Typography>
              <Typography variant='p' component='p' color='gray'>
                {profileInfo ? `@${profileInfo.userName}` : ''}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

// UserProfile.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default UserProfile
