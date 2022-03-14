import React, { isValidElement, useState } from 'react'
import { useRouter } from 'next/router'
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
import Image from 'next/image'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

import { auth } from '../Firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import SnackBar from '../components/SnackBar'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('success')
  const [snackOpen, setSnackOpen] = useState(false)

  const router = useRouter()

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  const isValidEmail = (enteredEmail) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return emailRegex.test(enteredEmail)
  }

  const signIn = () => {
    if (email !== '' && password !== '') {
      if (isValidEmail(email)) {
        if (password.length >= 6) {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user
              console.log(user)

              if (user) {
                sessionStorage.setItem('uid', user.uid)
                router.replace('/home')
              }
            })
            .catch((error) => {
              if (error.code === 'auth/wrong-password') {
                setMessage('Wrong Password')
                setVariant('error')
                setSnackOpen(true)
              } else {
                setMessage(error.code.split('/')[1])
                setVariant('error')
                setSnackOpen(true)
              }
            })
        } else {
          setMessage('Password length should be atleast 6 characters')
          setVariant('error')
          setSnackOpen(true)
        }
      } else {
        setMessage('Invalid Email')
        setVariant('error')
        setSnackOpen(true)
      }
    } else {
      setMessage('All fields are required')
      setVariant('error')
      setSnackOpen(true)
    }
  }

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
        <title>Felix / Sign In</title>
        <meta name='description' content='Felix Social Media app Sign In' />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Paper
        sx={{ width: '60%', height: '70%', boxShadow: 8, borderRadius: 5 }}
      >
        <Stack direction='row' sx={{ width: '100%', height: '100%' }}>
          <Box
            sx={{
              width: '50%',
              backgroundImage: 'linear-gradient(-90deg, lightskyBlue, #007bff)',
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
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
              sx={{
                mb: 5,
                color: '#007bff',
              }}
            >
              Sign In
            </Typography>

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
                value={password}
                startAdornment={<LockIcon sx={{ mr: 2, color: 'gray' }} />}
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
              onClick={() => signIn()}
            >
              Sign In
            </Button>

            <Link href='/sign-up'>
              <Typography textAlign='center' sx={{ cursor: 'pointer' }}>
                Don't have an account?{' '}
                <span style={{ color: '#007bff', fontWeight: '600' }}>
                  Sign Up
                </span>
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Paper>
      <SnackBar
        snackOpen={snackOpen}
        snackClose={snackClose}
        variant={variant}
        message={message}
      />
    </Box>
  )
}

export default SignIn
