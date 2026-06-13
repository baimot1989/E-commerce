import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError, resetAuth } from '../redux/auth/authSlice'
import { Alert, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFieldCheck } from "../hooks/useFieldCheck";

const Login = () => {

    // Defining variables
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { fieldCheck } =  useFieldCheck()
    // const user = useSelector((state) => state.user?.userName); // ? opretor checked if the userName propetie exsist
    const [userDetails, setUserDetails] = useState({ userName: '', password: '' });

    //  Redirect the user if the user exists.
    useEffect(() => {
        dispatch(clearError(null))
        if (auth.user) {
            if (auth.user.role === 'admin')
                navigate('/admindash/home'); // 👈 redirect to home
            else {
                navigate('/');
            }
        }
    }, [auth.user, navigate]);

    //  reset 
    useEffect(() => {
        dispatch(resetAuth());
    }, []);
    
   // Updates a specific field in the user form state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    // preform login request
    const heandleSubmit = async (e) => {
        e.preventDefault();

        const isValid = fieldCheck(userDetails); // Makes sure all fields are filled in.

        if(!isValid) dispatch(login(userDetails))

    }
    return (
        <>
            <Container style={{ textAlign: 'center' }}>
                <Typography style={{ margin: '25px' }} variant="h4">
                    Login
                </Typography>



                <Box component="form" onSubmit={heandleSubmit} sx={{ width: { xs: '80%', sm: '70%' }, maxWidth: '350px', margin: '0 auto' }}>
                   
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column", 
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            gap: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            type="text"
                            name="userName"
                            label="User name"
                            variant="outlined"
                            id="userName"
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            gap: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            type="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            id="password"
                            onChange={handleChange}
                        />
                    </Box>

                    <Button variant="contained" type="submit" disabled={auth.loading} style={{ width: '100%', color: 'white' }}>Login</Button>
                    <br />
                    <Typography variant="subtitle1" style={{ marginTop: '10px', textAlign: 'left' }}>
                        New user? <Link to={'/signup'}>Signup</Link>
                    </Typography>
                    {auth.error && (
                        <Alert severity="error" style={{ marginBottom: '15px' }}>
                            {auth.error}
                        </Alert>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default Login;