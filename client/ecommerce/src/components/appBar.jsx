import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice'
import { clearCart, openCart } from '../redux/cart/cartSlice'

import Badge from '@mui/material/Badge';
import styled from '@emotion/styled';
import MobileManu from './mobileManu';

const adminPages = ['Home', 'Categories', 'Products', 'Customers', 'Statistics'];
const customerPages = ['products', 'My Orders', 'My Account'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// cleanString function removes all whitespace characters (spaces, tabs, newlines, etc.)
//  from a string by replacing one or more whitespace characters (\s+) with an empty string:
const cleanString = (str) => str.replace(/\s+/g, '');

function AppBarRes() {

    const user = useSelector((state) => state.auth.user);
    const totalItemTypes = useSelector(state => state.cart.totalItemTypes);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            //   border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = (e) => {
        if (e.target.innerHTML === 'Logout') {
            dispatch(clearCart())
            // persistor.flush()    //  ensures the cleared state is immediately saved
            //  .flush() returns a Promise — so if needed: use then
            dispatch(logout());
            navigate('/')
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {user && (
                                (user.role === 'admin' ? adminPages : customerPages).map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            <Link
                                                to={`/${user.role === 'admin' ? 'admindash' : 'customerdash'}/${cleanString(page)}`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                {page}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Menu>
                    </Box> */}
                    <MobileManu />
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {user &&
                            (user.role === 'admin' ? adminPages : customerPages).map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link
                                        to={`/${user.role === 'admin' ? 'admindash' : 'customerdash'}/${cleanString(page)}`}
                                        style={{ textDecoration: 'none', color: '#ffffff' }}
                                    >
                                        {page}
                                    </Link>
                                </Button>
                            ))}
                    </Box>
                    {user ?
                        <>
                            <Box sx={{
                                display: 'flex',
                                minWidth: '100px',
                                justifyContent: `${user.role === 'customer' ? 'space-between' : 'right'}`
                            }}>
                                {user.role === 'customer' ? <IconButton aria-label="cart" onClick={() => dispatch(openCart())}>
                                    <StyledBadge badgeContent={totalItemTypes} color="secondary">
                                        <ShoppingCartIcon sx={{ color: 'white' }} />
                                    </StyledBadge>
                                </IconButton> : null}
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography onClick={(e) => handleLogout(e)} sx={{ textAlign: 'center' }}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Box>
                        </>


                        :
                        <div className="login-signup">
                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: '#ffffff' }} to={'/login'}>Login</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: '#ffffff' }} to={'/signup'}>signup</Link></Button>

                        </div>
                    }


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarRes;