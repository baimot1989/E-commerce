import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/auth/authSlice'
import { Alert, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // const user = useSelector((state) => state.user?.userName); // ? opretor checked if the userName propetie exsist
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    // const { login, error } = useLogin();

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

    const heandleSubmit = async (e) => {
        e.preventDefault()
        // login(userName, password);
        dispatch(login({ userName, password }))
        setMessage(auth.error)
    }
    return (
        <>
            <Container style={{ textAlign: 'center' }}>
                <Typography style={{ margin: '25px' }} variant="h4">
                    Login
                </Typography>



                <Box component="form" onSubmit={heandleSubmit} sx={{ width: { xs: '80%', sm: '70%' }, maxWidth: '350px', margin: '0 auto' }}>
                    {/* For each label+input pair, use a Box with flex display */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column", // stack on xs, inline on sm and up
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
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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