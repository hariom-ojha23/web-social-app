import React from 'react'
import NavbarLayout from '../components/NavbarLayout'

const Messages = () => {
  return (
    <div>
      <h2>Messages</h2>
    </div>
  )
}

Messages.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default Messages
