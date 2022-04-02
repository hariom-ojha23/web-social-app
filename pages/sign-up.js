import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import { auth, db } from '../Firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import SnackBar from '../components/SnackBar'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [userName, setUserName] = useState('')
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

  const signUp = () => {
    if (email.length !== 0 && password.length !== 0) {
      if (userName.length < 4) {
        setMessage('User Name length should be atleast 4')
        setVariant('error')
        setSnackOpen(true)
        return
      }

      if (isValidEmail(email)) {
        if (password.length >= 6) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user

              const docRef = doc(db, 'users', user.uid)
              await setDoc(docRef, {
                displayName: displayName,
                userName: userName,
                email: email,
                uid: user.uid,
              })
                .then(async () => {
                  const docSnap = await getDoc(docRef)
                  if (docSnap.exists()) {
                    sessionStorage.setItem(
                      'userData',
                      JSON.stringify(docSnap.data())
                    )
                    router.replace('/home')
                  } else {
                    setMessage(error.message)
                    setVariant('error')
                    setSnackOpen(true)
                  }
                })
                .catch((error) => {
                  setMessage(error.message)
                  setVariant('error')
                  setSnackOpen(true)
                })
            })
            .catch((error) => {
              setMessage(`${error.code.split('/')[1]} ${error.message}`)
              setVariant('error')
              setSnackOpen(true)
              // ..
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
        <title>Felix / Sign Up</title>
        <meta name='description' content='Felix Social Media app Sign Up' />
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
                Start for Free
              </p>
              <Typography
                variant='h3'
                component='h1'
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 34,
                  },
                  my: 1,
                }}
              >
                Create new account
              </Typography>
              <p style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                Already A Member? <Link href='/sign-in'>Sign In</Link>
              </p>
            </Box>
            <Box sx={{ mt: 5 }}>
              <Grid container direction='row' columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <OutlinedInput
                    margin='dense'
                    fullWidth
                    placeholder='Display Name'
                    sx={{ color: '#fff', my: 1 }}
                    startAdornment={
                      <InputAdornment position='start'>
                        <PersonIcon color='primary' />
                      </InputAdornment>
                    }
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <OutlinedInput
                    fullWidth
                    margin='dense'
                    placeholder='User Name'
                    sx={{ color: '#fff', my: 1 }}
                    startAdornment={
                      <InputAdornment position='start'>
                        <PersonIcon color='primary' />
                      </InputAdornment>
                    }
                    type='username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <OutlinedInput
                fullWidth
                margin='dense'
                placeholder='Email Address'
                sx={{ color: '#fff', my: 1 }}
                startAdornment={
                  <InputAdornment position='start'>
                    <EmailIcon color='primary' />
                  </InputAdornment>
                }
                type='emailaddress'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <OutlinedInput
                fullWidth
                margin='dense'
                placeholder='Password'
                sx={{ color: '#fff', my: 1 }}
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
                variant='contained'
                sx={{ py: 1.2, my: 2 }}
                onClick={() => signUp()}
              >
                Create Account
              </Button>
            </Box>
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

export default SignUp
