import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Home from "../adminMode/adminPages/home";
import Footer from "../components/footer";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
 
  return (
    <>
      <Typography variant="h5" style={{ marginTop: '20px', textAlign:' left' }}>Hello Admin</Typography>
      <Outlet />
    </>
  );
}

export default AdminDashboard;