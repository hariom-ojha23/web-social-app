import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Box, Paper, Avatar, styled, InputBase, Stack } from '@mui/material'
import NavbarLayout from '../components/NavbarLayout'
import { db } from '../Firebase/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import PostComponent from '../components/PostComponent'

const Home = () => {
  const [userData, setUserData] = useState(null)
  const [postList, setPostList] = useState([])

  const Input = styled('div')(({ theme }) => ({
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1.5, 2, 1.5, 2),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }))

  useEffect(() => {
    const data = window.sessionStorage.getItem('userData')
      ? JSON.parse(window.sessionStorage.getItem('userData'))
      : null

    setUserData(data)
    getPosts(data)
  }, [])

  const getPosts = async (user) => {
    const postRef = collection(db, 'posts')
    const q = query(postRef, where('author.uid', '==', user.uid))

    return onSnapshot(q, (querySnapshot) => {
      const postsArr = []
      querySnapshot.forEach((snapshot) => {
        postsArr.push({ ...snapshot.data(), id: snapshot.id })
      })
      setPostList([...postsArr])
    })
  }

  return (
    <Box
      sx={{
        p: 2,
        minHeight: '92vh',
      }}
    >
      <Head>
        <title>Felix / Home</title>
        <meta name='description' content='Felix Social Media app Home Screen' />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Paper sx={{ p: 1.5, borderRadius: 4 }}>
        <Stack direction='row'>
          <Avatar
            sx={{ ml: 2 }}
            alt='Remy Sharp'
            src={userData ? userData.profilePhotoUrl : ''}
          />
          <Input>
            <StyledInputBase
              placeholder='Whats on your mind...'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Input>
        </Stack>
      </Paper>

      <Box sx={{ my: 3 }}>
        {postList.map((post) => (
          <PostComponent post={post} userId={userData.uid} />
        ))}
      </Box>
    </Box>
  )
}

Home.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default Home
