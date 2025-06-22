// import { Box, Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const adminPages = ['Home', 'Categories', 'Products', 'Customers', 'Statistics'];
// const customerPages = ['products', 'My Orders', 'My Account'];

// // cleanString function removes all whitespace characters (spaces, tabs, newlines, etc.)
// //  from a string by replacing one or more whitespace characters (\s+) with an empty string:
// const cleanString = (str) => str.replace(/\s+/g, '');

// const DesktopMenu = () => {

//     const user = useSelector((state) => state.auth.user);

//     return ( 
//         <>
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                         {user &&
//                             (user.role === 'admin' ? adminPages : customerPages).map((page) => (
//                                 <Button
//                                     key={page}
//                                     sx={{ my: 2, color: 'white', display: 'block' }}
//                                 >
//                                     <Link
//                                         to={`/${user.role === 'admin' ? 'admindash' : 'customerdash'}/${cleanString(page)}`}
//                                         style={{ textDecoration: 'none', color: '#ffffff' }}
//                                     >
//                                         {page}
//                                     </Link>
//                                 </Button>
//                             ))}
//                     </Box>
//         </>
//      );
// }

// export default DesktopMenu;

import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const adminPages = ['Home', 'Categories', 'Products', 'Customers', 'Statistics'];
const customerPages = ['products', 'My Orders', 'My Account'];

const cleanString = (str) => str.replace(/\s+/g, '');

const DesktopMenu = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user &&
                (user.role === 'admin' ? adminPages : customerPages).map((page) => {
                    let basePath = user.role === 'admin' ? 'admindash' : 'customerdash';
                    let path = user.role === 'admin' && page === 'Home'
                        ? '/admindash' // special case for Admin Home
                        : `/${basePath}/${cleanString(page)}`;

                    return (

                        <Button
                            color="inherit"
                            key={page}
                            sx={{ my: 2, display: 'block' }}
                            component={Link} to={path}
                        >
                            {page}
                        </Button>

                    );
                })}
        </Box>
    );
};

export default DesktopMenu;
