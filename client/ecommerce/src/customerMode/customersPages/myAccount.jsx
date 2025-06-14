import { Alert, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/fetchData";
import { useState } from "react";
import { updateUser } from "../../redux/auth/authSlice";

const MyAccount = () => {

    const { updateData, error, isloading } = useFetchData('http://localhost:3000/users');
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    console.log(user)
    const [userDetails, setUserDetails] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: ''
    })
    const [isChecked, setIsChecked] = useState(user.allowOthersToSeeOrders);

    const handle = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setIsChecked(checked);
        } else {
            setUserDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    // function fro submit the form
    const heandleSubmit = async (e) => {
        e.preventDefault()


        const updatedUser = {
            ...userDetails,
            allowOthersToSeeOrders: isChecked,
        };
        // console.log(status)
        const status = await updateData(user._id, updatedUser);


        console.log(status)
        if (status == 'OK') {
            dispatch(updateUser(updatedUser));
            console.log("Profile updated successfully!")
            alert("Profile updated successfully!");
            setUserDetails({...userDetails,password:''})
        }
    }



    return (
        <>
            <Container>
                
                <form onSubmit={heandleSubmit} style={{ width: '70%', margin: ' 0 auto', marginBottom: '20px' }}>
                <Typography variant="h6" my={3}>Editing a profile</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                value={userDetails.firstName}

                                onChange={handle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="lastName"
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                value={userDetails.lastName}

                                onChange={handle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="userName"
                                id="userName"
                                label="User Name"
                                variant="outlined"
                                value={userDetails.userName}

                                onChange={handle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                name="password"
                                id="password"
                                label="Password"
                                variant="outlined"
                                value={userDetails.password}

                                onChange={handle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={handle}
                                        name="ordersAllow"
                                    />
                                }
                                label="Allow others see my orders"
                            />
                        </Grid>
                    </Grid>
                    <Button disabled={isloading} style={{ width: '100%' }} type="submit" variant="contained" >Save</Button>
                </form>
                 {error && (
                                        <Alert severity="error" style={{ marginBottom: '15px' }}>
                                            {error}
                                        </Alert>
                                    )}
            </Container>
        </>
    );
}

export default MyAccount;