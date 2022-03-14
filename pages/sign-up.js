import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  Typography,
  OutlinedInput,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const router = useRouter()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>Felix / Sign Up</title>
        <meta name='description' content='Felix Social Media app Sign Up' />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Paper
        sx={{ width: '60%', height: '70%', boxShadow: 8, borderRadius: 5 }}
      >
        <Stack direction='row' sx={{ width: '100%', height: '100%' }}>
          <Box
            sx={{
              width: '50%',
              backgroundColor: '#007bff',
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(-90deg, lightskyBlue, #007bff)',
            }}
          >
            <Image src='/vercel.svg' height={300} width={300} />
          </Box>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: 10,
            }}
          >
            <Typography
              component='h3'
              variant='h4'
              fontWeight='600'
              sx={{ mb: 5 }}
              color='#007bff'
            >
              Sign Up
            </Typography>

            <FormControl sx={{ py: 1.5 }}>
              <FormLabel sx={{ fontWeight: '500' }}>Display Name</FormLabel>
              <OutlinedInput
                fullWidth={true}
                type='username'
                value={displayName}
                startAdornment={<PersonIcon sx={{ mr: 2, color: 'gray' }} />}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ py: 1.5 }}>
              <FormLabel sx={{ fontWeight: '500' }}>Email Address</FormLabel>
              <OutlinedInput
                fullWidth={true}
                type='emailaddress'
                value={email}
                startAdornment={<EmailIcon sx={{ mr: 2, color: 'gray' }} />}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ py: 1.5 }}>
              <FormLabel sx={{ fontWeight: '500' }}>Password</FormLabel>
              <OutlinedInput
                fullWidth={true}
                type='password'
                startAdornment={<LockIcon sx={{ mr: 2, color: 'gray' }} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              variant='contained'
              sx={{
                py: 1.3,
                textTransform: 'capitalize',
                backgroundImage:
                  'linear-gradient(-90deg, lightskyBlue, #007bff)',
                fontSize: 22,
                letterSpacing: 1.4,
                my: 4,
              }}
              onClick={() => router.push('/home')}
            >
              Sign Up
            </Button>

            <Link href='/sign-in'>
              <Typography textAlign='center' sx={{ cursor: 'pointer' }}>
                Already have an account?{' '}
                <span style={{ color: '#007bff', fontWeight: '600' }}>
                  Sign In
                </span>
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default SignUp
