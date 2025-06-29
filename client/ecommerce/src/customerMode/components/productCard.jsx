import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCartError, clearCartSuccess } from "../../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { setModalMassgae, setOpenModal } from "../../redux/modal/modalSlice";
import { useEffect } from "react";

const ProductCard = ({ product }) => {

    const error = useSelector((state) => state.cart.error);
    const success = useSelector((state) => state.cart.success);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItem(product));
    };

    useEffect(() => {
        if (error) {
            dispatch(setModalMassgae(error));
            dispatch(setOpenModal());
            dispatch(clearCartError());
        } else if (success) {
            dispatch(setModalMassgae('המוצר נוסף בהצלחה'));
            dispatch(setOpenModal());
            dispatch(clearCartSuccess());
        }
    }, [error, success, dispatch]);


    return (
        <>
            <Card>
                <CardHeader
                    title={
                        <Typography
                            noWrap
                            sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' , width: '80%'}}
                            variant="h6"
                        >
                            {product.title}
                        </Typography>
                    }
                    subheader={`Category: ${product.category}`}

                />
                <CardMedia
                    component="img"
                    height="194"

                    image={product.imagesSrc[0]}
                    alt={product.title}
                    sx={{ objectFit: 'contain', maxHeight: 194, height: { md: 94, lg: 100, xl: 350 } }}
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
                        <Typography color={product.inStock == 0 ? "error" : "black"}>
                            {product.inStock == 0 ? 'out of stock' : `In stock: ${product.inStock}`}
                        </Typography>
                        <Typography>{product.bought ? `bought: ${product.bought}` : null}</Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-around' }}>
                    <Button
                        onClick={addToCart}
                        variant="contained"
                        disabled={product.inStock === 0}
                        sx={{ fontSize: { md: '12px' }, color: 'white', backgroundColor: '#212121' }}
                    >
                        Add to cart</Button>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/customerdash/product/${product.title}`}
                        state={product}
                        sx={{ fontSize: { md: '12px' }, color: 'white', backgroundColor: '#212121' }}
                    >
                        Read More
                    </Button>
                </CardActions>

            </Card>
        </>
    );
}

export default ProductCard;
