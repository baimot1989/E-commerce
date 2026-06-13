import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    Container,
} from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import { Rating } from '@mui/material';

import "react-image-gallery/styles/css/image-gallery.css";
import "react-rater/lib/react-rater.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCartError, clearCartSuccess } from "../redux/cart/cartSlice";
import { setModalMassgae, setOpenModal } from "../redux/modal/modalSlice";
import { useOutOfStock } from "../hooks/outOfStockCheckHook";

const ProductDetail = () => {

    const dispatch = useDispatch();
    const { beforeAddinToCart } = useOutOfStock();

    // use state
    const [showMore, setShowMore] = useState(false); // use state for the description extende or short
    const [images, setImages] = useState([]); // use state for contain the Image Gallery 

    // Defining variables
    const { id } = useParams();
    const location = useLocation();
    const product = location.state;
    const error = useSelector((state) => state.cart.error);
    const success = useSelector((state) => state.cart.success);
    const previousPrice = product.price + Number(Math.floor(product.price * (15 / 100)));

    // Shorten the amount of words describing the product if it is more than 200 characters.
    const shortText =
        product.description.length > 200
            ? product.description.slice(0, 200) + "..."
            : product.description;

            // adding product to cart
    const addToCart = () => {
        beforeAddinToCart(product)
    };

    // loading the Image Gallery and storing it in the useState
    useEffect(() => {
        const imageProduct = product.imagesSrc.map(img => ({
            original: img,
            thumbnail: img
        }));

        // Example: set state with images
        setImages(imageProduct);
    }, []);

    // updating the message for the user after user trying to add product to the cart
    useEffect(() => {
        if (error) {
            dispatch(setModalMassgae(error));
            dispatch(setOpenModal());
            dispatch(clearCartError());
        } else if (success) {
            dispatch(setModalMassgae("Item successfully added to your cart."));
            dispatch(setOpenModal());
            dispatch(clearCartSuccess());
        }
    }, [error, success, dispatch]);


    return (
        <Container>
            <Grid container spacing={4} >

                {/* Image Gallery */}
                <Grid size={{ xs: 12, md: 6 }}
                    sx={{
                        maxHeight: { xs: 300, md: 450 },
                        

                        "& .image-gallery": {
                            height: "100%",
                        },

                        "& .image-gallery-slide img": {
                            width: "100%",
                            height: { xs: 250, md: 280 },
                            objectFit: "contain",
                        },
                    }} py={2}>
                    <ReactImageGallery
                        showBullets={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        items={images}
                    />
                </Grid>

                {/* Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        {/* product title */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight="bold" pt={3}>
                                {product.title}
                            </Typography>

                            {/* Product description */}
                            <Typography  mt={2} color="text.secondary">
                                {showMore ? product.description : shortText}
                            </Typography>
                            {product.description.length > 200 && (
                                <Button onClick={() => setShowMore(prev => !prev)}> {/* Button to shorten or expand the text  */}
                                    {showMore ? "Show less" : "Read more"}
                                </Button>
                            )}
                        </Box>

                        <Stack direction="row" spacing={2} mt={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={addToCart}
                            >
                                Add to cart
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
};

export default ProductDetail;
