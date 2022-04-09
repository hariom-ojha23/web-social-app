import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { db } from '../Firebase/firebase'
import {
  query,
  getDoc,
  doc,
  where,
  getDocs,
  collection,
} from 'firebase/firestore'

const RightSidebar = () => {
  const [secondary, setSecondary] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [userData, setUserData] = useState(null)
  const [followersList, setFollowersList] = useState([])

  useEffect(() => {
    const data = window.sessionStorage.getItem('userData')
      ? JSON.parse(window.sessionStorage.getItem('userData'))
      : null

    setUserData(data)
    getFollowers(data)
  }, [])

  const getFollowers = async (user) => {
    const followerRef = doc(db, 'followers', user.uid)
    getDoc(followerRef)
      .then(async (res) => {
        const { followerList } = res.data()
        const q = query(
          collection(db, 'users'),
          where('uid', 'in', followerList),
        )

        getDocs(q).then((documents) => {
          const arr = []
          documents.forEach((document) => {
            arr.push(document.data())
          })

          setFollowersList(arr)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  //console.log(followersList.length)

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Paper sx={{ borderRadius: 4, p: 2, px: 1.5 }}>
        <h3 style={{ marginLeft: 3, marginTop: 5, marginBottom: 5 }}>
          Followers
        </h3>
        <List dense={false}>
          {followersList.map((follower) => (
            <ListItem
              key={follower.uid}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ background: 'orange' }}
                  src={follower.profilePhotoUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={follower.displayName}
                secondary={`@${follower.userName}`}
              />
            </ListItem>
          ))}
        </List>
        {followersList.length > 5 && (
          <h5 style={{ textAlign: 'center', color: 'gray' }}>See All</h5>
        )}
      </Paper>

      <Paper sx={{ borderRadius: 4, p: 2, px: 1.5, mt: 2 }}>
        <h3 style={{ marginLeft: 3, marginTop: 5, marginBottom: 5 }}>
          Suggestions
        </h3>
        <List dense={false}>
          <ListItem onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemAvatar>
              <Avatar
                sx={{ background: 'orange' }}
                src="https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/user%2FVNvCYqIA8iPZ7dzyOnY1km7zEw33%2FprofilePhoto?alt=media&token=56c78579-5185-4cd2-8aee-8f4abbbccff8"
              />
            </ListItemAvatar>
            <ListItemText primary="Aditya Shrivastav" secondary="@aditya" />
          </ListItem>

          <ListItem onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemAvatar>
              <Avatar
                sx={{ background: '#007bff' }}
                src="https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/user%2FXwiuQc7MRQeUMozoPHpFqrXPpEX2%2FprofilePhoto?alt=media&token=7fd56ed5-01e1-4975-9a09-b73f724bfaa0"
              />
            </ListItemAvatar>
            <ListItemText primary="Akash Kumar Sharma" secondary="@aksh_cool" />
          </ListItem>

          <ListItem onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemAvatar>
              <Avatar
                sx={{ background: '#007bff' }}
                src="https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/user%2Foj832rmevnYXi2Y7D4NdrZq7RiQ2%2FprofilePhoto?alt=media&token=f49d8294-7c99-430f-b5da-ec25bc47ace3"
              />
            </ListItemAvatar>
            <ListItemText primary="Akash Kumar Sharma" secondary="@gupta_ji" />
          </ListItem>
        </List>
        <h5 style={{ textAlign: 'center', color: 'gray' }}>See All</h5>
      </Paper>
    </Box>
  )
}

export default RightSidebar
