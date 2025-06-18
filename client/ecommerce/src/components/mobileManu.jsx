// import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";

// const adminPages = ['Home', 'Categories', 'Products', 'Customers', 'Statistics'];
// const customerPages = ['products', 'My Orders', 'My Account'];

// // cleanString function removes all whitespace characters (spaces, tabs, newlines, etc.)
// //  from a string by replacing one or more whitespace characters (\s+) with an empty string:
// const cleanString = (str) => str.replace(/\s+/g, '');

// const MobileMenu = () => {

//     const user = useSelector((state) => state.auth.user);

//     const [anchorElNav, setAnchorElNav] = useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     return (
//         <>
//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                 <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleOpenNavMenu}
//                     color="inherit"
//                 >
//                     <MenuIcon />
//                 </IconButton>
//                 <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorElNav}
//                     anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'left',
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'left',
//                     }}
//                     open={Boolean(anchorElNav)}
//                     onClose={handleCloseNavMenu}
//                     sx={{ display: { xs: 'block', md: 'none' } }}
//                 >
//                     {user && (
//                         (user.role === 'admin' ? adminPages : customerPages).map((page) => (
//                             <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                 <Typography sx={{ textAlign: 'center' }}>
//                                     <Link
//                                         to={`/${user.role === 'admin' ? 'admindash' : 'customerdash'}/${cleanString(page)}`}
//                                         style={{ textDecoration: 'none', color: 'black' }}
//                                     >
//                                         {page}
//                                     </Link>
//                                 </Typography>
//                             </MenuItem>
//                         ))
//                     )}
//                 </Menu>
//             </Box>
//         </>
//     );
// }

// export default MobileMenu;

import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const adminPages = ['Home', 'Categories', 'Products', 'Customers', 'Statistics'];
const customerPages = ['products', 'My Orders', 'My Account'];

const cleanString = (str) => str.replace(/\s+/g, '');

const MobileMenu = () => {
    const user = useSelector((state) => state.auth.user);
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {user && (
                    (user.role === 'admin' ? adminPages : customerPages).map((page) => {
                        const basePath = user.role === 'admin' ? 'admindash' : 'customerdash';
                        const path = user.role === 'admin' && page === 'Home'
                            ? '/admindash'  // special case for admin Home
                            : `/${basePath}/${cleanString(page)}`;

                        return (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center' }}>
                                    <Link
                                        to={path}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        {page}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        );
                    })
                )}
            </Menu>
        </Box>
    );
};

export default MobileMenu;
