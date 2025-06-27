
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Typography, Box, Divider, Button } from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { increaseQty, decreaseQty, removeFromCart } from '../../redux/cart/cartSlice'
import { justifyContent } from '@mui/system'

const CartItems = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart?.cartItems || [])



  return (
    <Box sx={{ px: 2 }}>
      {cartItems.map((item, index) => (
        <Box key={index} >
          <Typography fontWeight="bold" sx={{mb: 2}}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box component='img' src={item.imagesSrc[0]} alt={item.title}  sx={{ borderRadius: 8, width: {xs: '70px', md: '140px'} }} />
            <Box sx={{ ml: 2, display: 'flex', flexBasis: '70%',  justifyContent: 'flex-end', gap: 2  }}>
              <Box>
                
                <Typography variant="body2" color="text.secondary">
                  ${item.price} × {item.quantity}
                </Typography>
                <Typography variant="body2" color={item.inStock == 0 ? "error" : "black"}>
                  In Stock: {item.inStock}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* decreaseQty */}
                  <IconButton
                    onClick={() => dispatch(decreaseQty(item._id))}
                    disabled={item.quantity === 1}  // ** take care of it
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  {/* increaseQty */}
                  <IconButton
                    onClick={() => dispatch(increaseQty(item._id))}
                    disabled={item.quantity >= item.inStock}
                  >
                    <Add />
                  </IconButton>
                </Box>
                {/*Delete item  */}
                <IconButton
                  onClick={() => dispatch(removeFromCart(item._id))}
                  sx={{ ml: 1 }}
                >
                  <Delete color="error" />
                </IconButton>
              </Box>
            </Box>
          </Box>

        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default CartItems

