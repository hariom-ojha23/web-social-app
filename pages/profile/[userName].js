import React from 'react'
import NavbarLayout from '../../components/NavbarLayout'

const UserProfile = () => {
  return (
    <div>
      <h2>User Profile</h2>
    </div>
  )
}

UserProfile.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default UserProfile
