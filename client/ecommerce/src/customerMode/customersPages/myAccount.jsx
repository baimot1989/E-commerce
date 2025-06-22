
import {
    Alert,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/fetchData"; // Custom hook for making API requests
import { updateUser } from "../../redux/auth/authSlice"; // Redux action to update the user
import { useState } from "react";


const MyAccount = () => {
    // Get the current user from Redux state
    const user = useSelector((state) => state.auth.user);

    // Destructure updateData function and loading/error states from custom fetch hook
    const { updateData, error, isloading } = useFetchData('http://localhost:3000/users');

    // Get Redux dispatcher to send actions
    const dispatch = useDispatch();

    // Local state to manage form input values including checkbox
    const [userDetails, setUserDetails] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: '',
        allowOthersToSeeOrders: user.allowOthersToSeeOrders
    });

    // Handle all input and checkbox changes in one function
    const handleInputOnChange = (e) => {
        const { name, value, type, checked } = e.target;

        // For checkbox, use `checked`, otherwise use `value`
        setUserDetails((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await updateData(user._id, userDetails);
        if (status === 'OK') {
            dispatch(updateUser(userDetails)); // Update Redux store
            alert("Profile updated successfully!");

            // Clear password input after successful update
            setUserDetails((prev) => ({ ...prev, password: '' }));
        }
    };

    return (
        <>
            <Container>
                <form
                    onSubmit={handleSubmit}
                    style={{ width: '70%', margin: '0 auto', marginBottom: '20px' }}
                >
                    <Typography variant="h6" my={3}>
                        Editing a profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                value={userDetails.firstName}
                                onChange={handleInputOnChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                value={userDetails.lastName}
                                onChange={handleInputOnChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="userName"
                                label="User Name"
                                variant="outlined"
                                value={userDetails.userName}
                                onChange={handleInputOnChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                value={userDetails.password}
                                onChange={handleInputOnChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userDetails.allowOthersToSeeOrders}
                                        onChange={handleInputOnChange}
                                        name="allowOthersToSeeOrders"
                                    />
                                }
                                label="Allow others see my orders"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={isloading}
                        style={{ width: '100%', color: 'white' }}
                        type="submit"
                        variant="contained"
                    >
                        {isloading ? 'Saving...' : 'Save'}
                    </Button>
                </form>
                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}
            </Container>
        </>
    );
};

export default MyAccount;
