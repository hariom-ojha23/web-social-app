import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import {
  Box,
  Paper,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Stack,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

import Lottie from 'lottie-react'
import LikeAnimation from '../assets/like.json'

import Carousel, { CarouselItem } from './Carousel'

import { db } from '../Firebase/firebase'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'

const PostComponent = (props) => {
  const { post, userId } = props

  const animation = useRef(null)
  const isFirstRun = useRef(true)

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [segment, setSegment] = useState([19, 19])

  useEffect(() => {
    if (post.likes.includes(userId)) {
      setIsLiked(true)
      setLikeCount(post.likes.length)
    } else {
      setIsLiked(false)
      setLikeCount(post.likes.length)
    }
  }, [post.likes])

  useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        setSegment([66, 66])
        animation.current.play(66, 66)
      } else {
        setSegment([19, 19])
        animation.current.play(19, 19)
      }
      isFirstRun.current = false
    } else if (isLiked) {
      setSegment([0, 50])
      animation.current.play(20, 50)
    } else {
      setSegment([0, 19])
      animation.current.play(0, 19)
    }
  }, [isLiked])

  const likeOrUnlike = async () => {
    if (post.likes.includes(userId)) {
      const postRef = doc(db, 'posts', post.id)
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      }).catch((error) => {
        console.log(error)
      })
    } else {
      const postRef = doc(db, 'posts', post.id)
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <Paper key={post.id} sx={{ px: 4, borderRadius: 4, my: 2 }}>
      <ListItem
        sx={{ mb: 2, px: 0 }}
        secondaryAction={
          <IconButton edge="end" sx={{ mr: 2 }}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar src={post.author.profilePhotoUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<h3>{post.author.displayName}</h3>}
          secondary={`@${post.author.userName}`}
        />
      </ListItem>

      {post.images.length === 1 ? (
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <Image
              className="rounded"
              src={post.images[0].url}
              width={670}
              height={650}
            />
          </div>
        </Box>
      ) : (
        <Box>
          <Carousel>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  className="rounded"
                  src={image.url}
                  width={670}
                  height={650}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Lottie
            lottieRef={animation}
            animationData={LikeAnimation}
            autoPlay={false}
            loop={false}
            initialSegment={segment}
            style={{
              width: 70,
              height: 70,
              marginRight: -10,
              cursor: 'pointer',
            }}
            onClick={() => likeOrUnlike()}
          />

          <h4>{likeCount}</h4>

          <IconButton sx={{ ml: 3 }}>
            <ChatBubbleIcon />
          </IconButton>
        </Stack>
        <IconButton sx={{ mr: 3 }}>
          <SendRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default PostComponent
