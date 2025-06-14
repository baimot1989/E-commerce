import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const CustomerDashboard = () => {
    return ( 
        <>
        <Outlet />
        </>
     );
}
 
export default CustomerDashboard;