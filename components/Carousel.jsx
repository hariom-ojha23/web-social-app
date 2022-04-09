import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import { Box, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export const CarouselItem = ({ children, width }) => {
  return (
    <Box className="carousel-item" style={{ width: width }}>
      {children}
    </Box>
  )
}

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1
    }

    setActiveIndex(newIndex)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  })

  return (
    <Box sx={{ position: 'relative' }}>
      <Box {...handlers} className="carousel">
        <Box
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, _) => {
            return React.cloneElement(child, { width: '100%' })
          })}
        </Box>
      </Box>
      <IconButton
        className="carousel-btn"
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          background: '#f1f4f7',
          boxShadow: 3,
          zIndex: 5,
        }}
        onClick={() => updateIndex(activeIndex - 1)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        className="carousel-btn"
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          background: '#f1f4f7',
          boxShadow: 3,
          zIndex: 5,
        }}
        // disabled={
        //   activeIndex === React.Children.count(children) - 1 ? true : false
        // }
        onClick={() => updateIndex(activeIndex + 1)}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}

export default Carousel
