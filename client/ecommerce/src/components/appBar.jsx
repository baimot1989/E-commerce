import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvaterAndCartBadge from './avatarAndCartBadge';
import { Box} from '@mui/material';
import DesktopMenu from './dasktopManu';
import MobileMenu from './mobileManu';
import myImage from '../assets/nGsLogo2.png'
function AppBarRes() {


    const user = useSelector((state) => state.auth.user);

    return (
        <AppBar position="sticky">
            <Box sx={{px: 4}}>
                <Toolbar disableGutters>
                    <Box
                        component={Link}
                        to={user?.role === 'admin' ? '/admindash' : '/'}
                    >
                        <Box
                            component="img"
                            src={myImage}
                            alt="NextG"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
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
                        to={user?.role === 'admin' ? '/admindash' : '/'}
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
            </Box>
        </AppBar>
    );
}
export default AppBarRes;