import React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackBar = (props) => {
  const { message, variant, snackOpen, snackClose } = props

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={snackOpen}
      autoHideDuration={6000}
      onClose={snackClose}
    >
      <Alert onClose={snackClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
