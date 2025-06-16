
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Typography, Box, Divider, Button } from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { increaseQty, decreaseQty, removeFromCart } from '../../redux/cart/cartSlice'

const CartItems = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart?.cartItems || [])

 

  return (
    <Box sx={{ px: 2 }}>
      {cartItems.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img src={item.imageSrc} alt={item.title} width={80} style={{ borderRadius: 8 }} />
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography fontWeight="bold">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price} × {item.quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Stock: {item.inStock}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <IconButton
                onClick={() => dispatch(decreaseQty(item._id))}
                disabled={item.quantity === 1}  // ** take care of it
              >
                <Remove />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() => dispatch(increaseQty(item._id))}
                disabled={item.quantity >= item.inStock}
              >
                <Add />
              </IconButton>

              <IconButton
                onClick={() => dispatch(removeFromCart(item._id))}
                sx={{ ml: 1 }}
              >
                <Delete color="error" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default CartItems

