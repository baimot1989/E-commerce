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

const ProductDetail = () => {

    const dispatch = useDispatch();

    const productDetailItem = {
        images: [
            {
                original:
                    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                thumbnail:
                    "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
                original:
                    "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        ],
        title: "BIG ITALIAN SOFA",
        reviews: "150",
        availability: true,
        brand: "apex",
        category: "Sofa",
        sku: "BE45VGTRK",
        price: 450,
        previousPrice: 599,
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque!",
        size: ["XS", "S", "M", "L", "XL"],
        color: ["gray", "violet", "red"],
    };

    const { id } = useParams();
    const location = useLocation();
    const product = location.state;
    const error = useSelector((state) => state.cart.error);
    const success = useSelector((state) => state.cart.success);
    const previousPrice = product.price + Number(Math.floor(product.price * (15 / 100)));
   
    const [ images , setImages ] = useState([])

    const addToCart = () => {
        dispatch(addItem(product));
    };

   useEffect(() => {
    const imageProduct = product.imagesSrc.map(img => ({
        original: img,
        thumbnail: img
    }));

    // Example: set state with images
    setImages(imageProduct);
}, []);

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
        <Container>
            <Typography variant="h4" sx={{ textAlign: 'start', my: 2 }}> Product detail</Typography>
            <Grid container spacing={4} >

                {/* Image Gallery */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <ReactImageGallery
                        showBullets={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        items={images}
                    />
                </Grid>

                {/* Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ minHeight: '320px', maxHeight: '500px', height: '70vh' }}>
                        <Typography variant="h5" fontWeight="bold">
                            {product.title}
                        </Typography>

                        <Box display="flex" alignItems="center" mt={1}>
                            <Rating value={3.5} precision={0.5} readOnly />

                            <Typography variant="body2" color="gray" ml={2}>
                                ({150})
                            </Typography>
                        </Box>

                        <Typography variant="body1" fontWeight="bold" mt={3}>
                            Availability:{" "}
                            <Box component="span" color={productDetailItem.availability ? "green" : "red"}>
                                {product.inStock ? "In Stock" : "Expired"}
                            </Box>
                        </Typography>

                        <Typography>
                            <b>Category:</b> {product.category}
                        </Typography>

                        <Typography variant="h4" color="primary" mt={3}>
                            ${product.price}
                            <Typography component="span" ml={2} fontSize="0.875rem" color="gray" sx={{ textDecoration: "line-through" }}>
                                ${previousPrice}
                            </Typography>
                        </Typography>
                        <Typography sx={{color: product.inStock === 0 ? 'red': 'black' }}>
                            {product.inStock === 0 ? 'out of stock' : `In stock: ${product.inStock}`}
                        </Typography>
                        <Typography>
                            {product.bought === 0 ? null : `bought: ${product.bought}`}
                        </Typography>
                        <Typography mt={2} color="text.secondary">
                            {product.description}
                        </Typography>

                    </Box>
                    {/* Actions */}
                    <Stack direction="row" spacing={2} my={3}>
                        <Button
                            sx={{ color: 'white' }}
                            variant="contained"
                            disabled={product.inStock === 0}
                            color="primary"
                            // startIcon={}
                            fullWidth
                            onClick={addToCart}
                        >
                            Add to cart
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
