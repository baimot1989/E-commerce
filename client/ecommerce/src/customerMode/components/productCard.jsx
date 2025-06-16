import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { addItem, openCart, setCartItems } from "../../redux/cart/cartSlice";

const ProductCard = ({ product }) => {

    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItem(product))
        dispatch(openCart())
        dispatch(openCart())
    }
    return (
        <>
            <Card>
                <CardHeader
                    title={product.title}
                    subheader={`Category: ${product.category}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    
                    image={product.imageSrc}
                    alt={product.title}
                    sx={{ objectFit: 'contain', maxHeight:  '194'}}
                />
                <CardContent>
                    <Box
                     sx={{
                        display: 'flex',
                        flexDirection: "row", // stack on xs, inline on sm and up
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                    >
                        <Typography>{`Price: ${product.price}$`}</Typography>
                        <Typography>{`In stock: ${product.inStock}`}</Typography>
                        <Typography>{'Bought: 43'}</Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button onClick={addToCart} variant="contained" sx={{fontSize: {md: '12px'}}}>Add to cart</Button>
                    <Button variant="contained" sx={{fontSize: {md: '12px'}}}>Read More</Button>
                </CardActions>

            </Card>
        </>
    );
}

export default ProductCard;
