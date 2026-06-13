import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup"
import { useSelector } from 'react-redux';
import { Grid, Container, TextField, Typography, Button, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { useFieldCheck } from "../hooks/useFieldCheck";

const Signup = () => {

    // Defining variables
    const { fieldCheck } = useFieldCheck()
    const { signup, error, isloading } = useSignup();//useSignup properties

    // use state
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState(null);
    const [userDetile, setUserDetile] = useState(
        {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

    // Updates a specific field in the user form state on input change
    const heandle = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setIsChecked(checked);
        } else {
            setUserDetile((prev) => ({ ...prev, [name]: value }));
        }
    }

    // function fro submit the signup  form
    const heandleSubmit = async (e) => {
        e.preventDefault()
        const isValid = fieldCheck(userDetile);
        if (!isValid) {
            userDetile.allowOthersToSeeOrders = isChecked
            signup(userDetile);
            setMessage(error)
        }


    }

    return (
        <>
            <Container>
                <Typography variant="h4" style={{ textAlign: 'center', margin: '25px' }}>Signup</Typography>
                <Box component="form" onSubmit={heandleSubmit} sx={{ maxWidth: '800px', width: { xs: '80%', sm: '60%' }, margin: '0 auto' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth

                                type="text"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                id="firstName"
                                value={userDetile.firstName}
                                onChange={heandle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="text"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                id="lastName"
                                value={userDetile.lastName}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                fullWidth
                                required
                                type="text"
                                name="userName"
                                label="User Name"
                                variant="outlined"
                                id="userName"
                                value={userDetile.userName}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                id="email"
                                value={userDetile.email}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                id="password"
                                value={userDetile.password}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                id="confirmPassword"
                                value={userDetile.confirmPassword}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={heandle}
                                        name="ordersAllow"
                                    />
                                }
                                label="Allow others see my orders"
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" type="submit" disabled={isloading} style={{ width: '100%', marginBottom: ' 10px', color: 'white' }}>Signup</Button><br />
                    <Typography variant="subtitle1">Already have account? <Link to={'/login'}>Login</Link></Typography>
                    {error &&
                        <Alert severity="error" style={{ marginBottom: '15px' }}>
                            {error}
                        </Alert>
                    }
                </Box>

            </Container>
        </>
    );
}

export default Signup;