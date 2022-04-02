import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { auth, db } from '../Firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import SnackBar from '../components/SnackBar'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('success')
  const [snackOpen, setSnackOpen] = useState(false)

  const router = useRouter()
  const theme = useTheme()

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

  const signIn = (e) => {
    e.preventDefault()
    if (email !== '' && password !== '') {
      if (isValidEmail(email)) {
        if (password.length >= 6) {
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user

              const docRef = doc(db, 'users', user.uid)
              const docSnap = await getDoc(docRef)
              if (docSnap.exists()) {
                sessionStorage.setItem(
                  'userData',
                  JSON.stringify(docSnap.data())
                )
                router.replace('/home')
              } else {
                setMessage('No Such Account Exist. Please Sign Up')
                setVariant('error')
                setSnackOpen(true)
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
    <Box sx={{ height: '100vh' }}>
      <Head>
        <title>Felix / Sign In</title>
        <meta name='description' content='Felix Social Media app Sign In' />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Container sx={{ height: '100%' }}>
        <Toolbar sx={{ height: '10%' }}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Felix App
          </Typography>
        </Toolbar>

        <Grid
          container
          sx={{
            height: '90%',
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              [theme.breakpoints.up('sm')]: {
                justifyContent: 'center',
              },
              [theme.breakpoints.down('sm')]: {
                mt: 5,
              },
            }}
          >
            <Box>
              <p
                style={{
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                Welcome Back!
              </p>
              <Typography
                variant='h3'
                component='h1'
                sx={{
                  my: 1,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 34,
                  },
                }}
              >
                Access your account
              </Typography>
              <p>
                Not A Member? <Link href='/sign-up'>Sign Up</Link>
              </p>
            </Box>
            <form style={{ marginTop: 5 }} onSubmit={(e) => signIn(e)}>
              <OutlinedInput
                fullWidth
                required
                margin='dense'
                placeholder='Email Address'
                sx={{ my: 1 }}
                startAdornment={
                  <InputAdornment position='start'>
                    <EmailIcon color='primary' />
                  </InputAdornment>
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <OutlinedInput
                fullWidth
                required
                margin='dense'
                placeholder='Password'
                sx={{ my: 1 }}
                startAdornment={
                  <InputAdornment position='start'>
                    <LockIcon color='primary' />
                  </InputAdornment>
                }
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                sx={{ py: 1.2, my: 2, px: 2.5 }}
                onClick={(e) => signIn(e)}
              >
                Sign In
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <SnackBar
        message={message}
        variant={variant}
        snackOpen={snackOpen}
        snackClose={snackClose}
      />
    </Box>
  )
}

export default SignIn
