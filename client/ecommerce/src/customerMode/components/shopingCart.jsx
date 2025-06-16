// components/ShoppingCart.jsx
import React from 'react'
import { Drawer, Box, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CartItems from './cartItem'
import { useDispatch, useSelector } from 'react-redux'
import { closeCart } from '../../redux/cart/cartSlice'


const ShoppingCart = () => {

  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.cart.cartOpen);
  const cartItems = useSelector((state) => state.cart?.cartItems || []) 

  const handleClose = () => {
    dispatch(closeCart())
  }
   
  
    // Subtotal calculation
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Drawer
      anchor="left"
      open={cartOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: '100%', // small screens (mobile)
            sm: 400,   // tablets
            md: 600,   // desktops and up
          }, padding: 2
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Shopping Cart</Typography>
        <IconButton onClick={handleClose} aria-label="Close cart">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        <CartItems />
      </Box>

        {/* Subtotal */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Subtotal</Typography>
        <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
      </Box>

      {/* Checkout Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        Checkout
      </Button>

      
    </Drawer>
  )
}

export default ShoppingCart
