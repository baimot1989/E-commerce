// components/ShoppingCart.jsx
import React, { useEffect } from 'react'
import { Drawer, Box, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CartItems from './cartItem'

import { useDispatch, useSelector } from 'react-redux'
import { calcSubtotal, closeCart, setCartItems, totalItem } from '../../redux/cart/cartSlice'
import { loadCartForUser, saveCartForUser } from '../../redux/cart/cartUtils'
import { useSubmitOrder } from '../../hooks/submitOrder'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOutOfStock } from '../../hooks/outOfStockCheckHook'

const ShoppingCart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { outOfStockCheck, itemInstock} = useOutOfStock();
  const { submitOrder, isloading } = useSubmitOrder()
  const user = useSelector((state) => state.auth.user);
  const cartOpen = useSelector(state => state.cart.cartOpen);
  const cartItems = useSelector((state) => state.cart?.cartItems || [])
  const subtotal = useSelector((state) => state.cart?.subtotal || 0)
  const totalItemTypes = useSelector((state) => state.cart?.totalItemTypes)

  useEffect(() => {

    if (user?._id) {
      const loadedCart = loadCartForUser(user._id);
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
  }, [cartItems, user?._id])

  const handleClose = () => {
    dispatch(closeCart())
  }

  const checkoutHandle = () => {

     outOfStockCheck()

  }

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
            xs: '90%',
            sm: 400,
            md: 600,
          },
          height: { xs: '94vh', sm: '100vh'},
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
        disabled={!subtotal}
        onClick={checkoutHandle}
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
