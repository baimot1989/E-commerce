// components/ShoppingCart.jsx
import React, { useEffect } from 'react'
import { Drawer, Box, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CartItems from './cartItem'
import { useDispatch, useSelector } from 'react-redux'
import { calcSubtotal, closeCart, setCartItems, totalItem } from '../../redux/cart/cartSlice'
import { loadCartForUser, saveCartForUser } from '../../redux/cart/cartUtils'
import { useSubmitOrder } from '../../hooks/submitOrder'


const ShoppingCart = () => {
  
  const dispatch = useDispatch();
  const { submitOrder, isloading } = useSubmitOrder()
  const user = useSelector((state) => state.auth.user);
  const cartOpen = useSelector(state => state.cart.cartOpen);
  const cartItems = useSelector((state) => state.cart?.cartItems || []) 
  const subtotal = useSelector((state) => state.cart?.subtotal || 0) 

      useEffect(() => {
  
          if (user?._id) {
            const loadedCart = loadCartForUser(user._id);
            console.log(loadedCart)
            if (loadedCart) {
              dispatch(setCartItems(loadedCart));
            }
          }
        }, [user?._id]);
  
        useEffect(() => {
          if (user?._id) {
            saveCartForUser(user._id, cartItems);
            dispatch(totalItem());
            dispatch(calcSubtotal())
          }
        }, [cartItems, user?.id])


  const handleClose = () => {
    dispatch(closeCart())
  }
   
    // Subtotal calculation
    // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Drawer
      anchor="left"
      open={cartOpen}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true, // improves performance on mobile
      }}
      sx={{
        zIndex: 1300, // Higher than AppBar and Footer if needed
        '& .MuiDrawer-paper': {
          width: {
            xs: '93%',
            sm: 400,
            md: 600,
          },
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          boxSizing: 'border-box',
        },
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
        disabled={isloading}
        onClick={()=> submitOrder()}
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
