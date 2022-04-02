import React from 'react'
import Head from 'next/head'
import { Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import NavbarLayout from '../components/NavbarLayout'

const Home = () => {
  return (
    <>
      <Toolbar />
      <Head>
        <title>Felix / Home</title>
        <meta name='description' content='Felix Social Media app Home Screen' />
        <link rel='icon' href='/logo.png' />
      </Head>
    </>
  )
}

Home.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default Home
