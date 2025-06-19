import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvaterAndCartBadge from './avatar&CartBadge';
import { Box, IconButton } from '@mui/material';
import DesktopMenu from './dasktopManu';
import MobileMenu from './mobileManu';
import myImage from '../assets/nGsLogo2.png'
function AppBarRes() {


    const user = useSelector((state) => state.auth.user);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                   <Box 
                   component={Link}
                   to={'/'}
                   >
                     <Box
                        component="img"
                        src={myImage}
                        alt="NextG"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            width: { md: 96 },
                            objectFit: 'cover',
                            mr: 2,
                            borderRadius: '15px'
                        }}
                    />

                   </Box>
                    {/*   mobile manu */}
                    <MobileMenu />
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            width: { xs: 50, sm: 70 },
                            height: { xs: 40, sm: 50 },
                            overflow: 'hidden', // make sure borderRadius clips the img   
                        }}
                    >
                        <img
                            src={myImage}
                            alt="NextG"
                            style={{
                                objectFit: 'cover',
                                borderRadius: '15px',
                                display: 'block',
                            }}
                        />
                    </Box>
                    {/*  dasktop manu */}
                    <DesktopMenu />
                    {user ? <AvaterAndCartBadge />
                        :
                        <Box sx={{ display: 'flex', gap: 1 }} >
                            <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                            <Button color="inherit" component={Link} to={'/signup'}>Signup</Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarRes;