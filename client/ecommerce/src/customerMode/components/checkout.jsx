import React, { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { display } from "@mui/system";
import { useSubmitOrder } from "../../hooks/submitOrder";
import { useFetchData } from "../../hooks/fetchData";
import { Link, useNavigate } from "react-router-dom";
import { shippingAddressUpdate } from "../../redux/cart/cartSlice";
import { useFieldCheck } from "../../hooks/useFieldCheck";

const API_URL = import.meta.env.VITE_API_URL;

const PreOrderForm = () => {
    // Get the current user from Redux state
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart?.cartItems);
    const subtotal = useSelector((state) => state.cart?.subtotal);
    const dispatch = useDispatch();
    const { fieldCheck } = useFieldCheck();
    const { updateByPatch } = useFetchData(`${API_URL}/users`);
    const { submitOrder, isloading } = useSubmitOrder()

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        middleName: user.middleName ? user.middleName : "",
        lastName: user.lastName,
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
        email: user.email ? user.email : "",
        streetAddress: user.shippingAddress[0]?.streetAddress ? user.shippingAddress[0].streetAddress : "",
        city: user.shippingAddress[0]?.city ? user.shippingAddress[0].city : "",
        state: user.shippingAddress[0]?.state ? user.shippingAddress[0].state : "",
        postal: user.shippingAddress[0]?.postal ? user.shippingAddress[0].postal : "",
        orderDate: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const ignoreFields = ["middleName", "orderDate", "notes"];

        const isValid = fieldCheck(formData, ignoreFields);

        if (!isValid) {
            const shippingAddress = {
                phoneNumber: formData.phoneNumber,
                shippingAddress: [
                    {
                        streetAddress: formData.streetAddress,
                        city: formData.city,
                        state: formData.state,
                        postal: formData.postal
                    }
                ]
            }

            dispatch(shippingAddressUpdate(shippingAddress))

            navToPayment();
        }

    };

    const navToPayment = () => navigate('/customerdash/preorder/payment');

    return (
        <Container maxWidth="md" sx={{ py: 5 }} >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                >
                    Order summary
                </Typography>

                <Box component='form' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Typography>Full name</Typography>
                        <Grid container size={12}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Middle Name"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography>Contact</Typography>
                        <Grid container size={12}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Contact Number"
                                    variant="outlined"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography>Address</Typography>
                        <Grid container size={12}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Street Address"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="State / Province"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Postal / Zip Code"
                                    name="postal"
                                    value={formData.postal}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                type="datetime-local"
                                label="Order Date & Time"
                                name="orderDate"
                                value={formData.orderDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Items details
                            </Typography>
                            <Grid container >
                                {cartItems.map(item => {
                                    return (
                                        <React.Fragment key={item._id}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography>{`${item.title}`}</Typography>
                                                    <Typography>{`${item.price}$ x${item.quantity}`}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                                <Box
                                                    component="img"
                                                    src={item.imagesSrc[0]}
                                                    alt={item.title}
                                                    sx={{

                                                        width: { xs: 40, md: 80 },
                                                        objectFit: 'cover',
                                                        borderRadius: '15px',
                                                        marginRight: '10px'
                                                    }}
                                                >
                                                </Box>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })}
                                <Grid size={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px', marginRight: '10px' }}>
                                        <Typography sx={{ marginRight: '50px' }}> Total</Typography>
                                        <Typography>{`${subtotal}$`}</Typography>
                                    </Box>
                                </Grid>


                            </Grid>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Additional Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Button
                                disabled={isloading}
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                            >
                                Continue
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default PreOrderForm