import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice'
import { Alert, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    console.log(auth)
    const navigate = useNavigate();
    // const user = useSelector((state) => state.user?.userName); // ? opretor checked if the userName propetie exsist
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    // const { login, error } = useLogin();

    useEffect(() => {
        console.log(auth.user)
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
    }
    return (
        <>
            <Container style={{ textAlign: 'center' }}>
                <Typography style={{ margin: '25px' }} variant="h4">
                    Login
                </Typography>



                <form onSubmit={heandleSubmit} style={{ width: '70%', maxWidth: '350px', margin: '0 auto' }}>
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
                        <Typography variant="p" htmlFor="userName" style={{ minWidth: 100, textAlign: 'right' }}>
                            User name:
                        </Typography>
                        <TextField
                            fullWidth
                            type="text"
                            name="userName"
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
                        <Typography variant="p" htmlFor="password" style={{ minWidth: 100, textAlign: 'right' }}>
                            Password:
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <Button variant="contained" type="submit" disabled={auth.loading} style={{ width: '100%' }}>Login</Button>
                    <br />
                    <Typography variant="subtitle1" style={{marginTop: '10px', textAlign: 'left'}}>
                        New user? <Link to={'/signup'}>Signup</Link>
                    </Typography>
                    {auth.error && (
                        <Alert severity="error" style={{ marginBottom: '15px' }}>
                            {auth.error}
                        </Alert>
                    )}
                </form>
            </Container>
        </>
    );
}

export default Login;