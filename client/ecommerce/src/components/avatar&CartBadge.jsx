import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, openCart } from "../redux/cart/cartSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from '@emotion/styled';
import Badge from '@mui/material/Badge';

const settings = ['My Account', 'Logout'];

const AvaterAndCartBadge = () => {

    const user = useSelector((state) => state.auth.user);
    const firstLetUserName = user.userName[0]
    const totalItemTypes = useSelector(state => state.cart.totalItemTypes);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            //   border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = (e) => {
        if (e.target.innerHTML === 'Logout') {
            dispatch(clearCart())
            // persistor.flush()    //  ensures the cleared state is immediately saved
            //  .flush() returns a Promise — so if needed: use then
            dispatch(logout());
            navigate('/')
        }
        if (e.target.innerHTML === 'My Account') {
            console.log(e.target.innerHTML)
            navigate('/customerdash/myaccount')
        }
    };

    const style = {
        width: { xs: '150px', sm: '200px' },
        '&:hover': {
            color: 'white',
            backgroundColor: 'black',
        },
    }

    return (
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
                            <Avatar alt={firstLetUserName} src="#" />
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
                            <MenuItem key={setting} onClick={handleCloseUserMenu} sx={style}>
                                <Typography onClick={(e) => handleLogout(e)} sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </>
    );
}

export default AvaterAndCartBadge;