import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup"
import { useSelector } from 'react-redux';
import { Grid, Container, TextField, Typography, Button, Alert, FormControlLabel, Checkbox } from "@mui/material";

const Signup = () => {
    // state
    const [userDetile, setUserDetile] = useState({ firstName: '', lastName: '', userName: '', password: '' })
    const [isChecked, setIsChecked] = useState(false);

    //useSignup properties
    const { signup, error, isloading } = useSignup()
    const heandle = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setIsChecked(checked);
        } else {
            setUserDetile((prev) => ({ ...prev, [name]: value }));
        }
    }

    // function fro submit the form
    const heandleSubmit = async (e) => {
        e.preventDefault()
        userDetile.allowOthersToSeeOrders = isChecked
        signup(userDetile);
    }


    return (
        <>
            <Container>
                <Typography variant="h4" style={{ textAlign: 'center', margin: '25px' }}>Signup</Typography>
                <form onSubmit={heandleSubmit} style={{ maxWidth: '800px', width: '60%', margin: '0 auto' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="p" htmlFor="firstName">First Name:</Typography><br />
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={userDetile.firstName}
                                onChange={heandle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="p" htmlFor="lastName">Last Name:</Typography><br />
                            <TextField
                                fullWidth
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={userDetile.lastName}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="p" htmlFor="userName">User Name:</Typography><br />
                            <TextField
                                fullWidth
                                type="text"
                                name="userName"
                                id="userName"
                                value={userDetile.userName}
                                onChange={heandle} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="p" htmlFor="password">Password:</Typography><br />
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                id="password"
                                value={userDetile.password}
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
                </form>

            </Container>
        </>
    );
}

export default Signup;