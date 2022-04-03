import React, { useState } from 'react'
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
import { Book, Settings } from '@mui/icons-material'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'

const LeftSidebar = () => {
  const [secondary, setSecondary] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Paper sx={{ borderRadius: 4, p: 2 }}>
        <h3 style={{ marginLeft: 3, marginTop: 5, marginBottom: 5 }}>Menu</h3>
        <List dense={false}>
          <ListItem
            sx={{ mt: 1 }}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemAvatar>
              <Avatar sx={{ background: 'orange' }}>
                <BookmarksOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Saved Posts"
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>
          <ListItem
            sx={{ mt: 1 }}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemAvatar>
              <Avatar sx={{ background: '#007bff' }}>
                <Settings />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Settings"
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}

export default LeftSidebar
