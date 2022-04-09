import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const userData = window.sessionStorage.getItem('userData')
      ? JSON.parse(window.sessionStorage.getItem('userData'))
      : null

    if (userData === null) {
      router.replace('/sign-in')
    } else {
      router.replace('/home')
    }
  }, [])

  return <div></div>
}
