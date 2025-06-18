import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvaterAndCartBadge from './avatar&CartBadge';
import { Box } from '@mui/material';
import DesktopMenu from './dasktopManu';
import MobileMenu from './mobileManu';

function AppBarRes() {
    

    const user = useSelector((state) => state.auth.user);
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                     {/*   mobile manu */}
                    <MobileMenu />
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                     {/*  dasktop manu */}
                    <DesktopMenu />
                    {user ? <AvaterAndCartBadge />
                        :
                        <Box sx={{ display: 'flex', gap: 1 }} >
                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: '#ffffff' }} to={'/login'}>Login</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: '#ffffff' }} to={'/signup'}>signup</Link></Button>

                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarRes;