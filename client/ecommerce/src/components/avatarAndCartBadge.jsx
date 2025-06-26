import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, openCart } from "../redux/cart/cartSlice";
import { logout } from "../redux/auth/authSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

const menuOptions = [
  { label: "My Account", action: "account" },
  { label: "Logout", action: "logout" },
];

const AvaterAndCartBadge = () => {
  const user = useSelector((state) => state.auth.user);
  const totalItemTypes = useSelector((state) => state.cart.totalItemTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMenuAction = (action) => {
    handleCloseUserMenu();
    if (action === "logout") {
      dispatch(clearCart());
      dispatch(logout());
      navigate("/");
    } else if (action === "account") {
      navigate("/customerdash/myaccount");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100px",
        justifyContent: user.role === "customer" ? "space-between" : "flex-end",
      }}
    >
      {user.role === "customer" && (
        <IconButton aria-label="cart" onClick={() => dispatch(openCart())}>
          <StyledBadge badgeContent={totalItemTypes} color="secondary">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </StyledBadge>
        </IconButton>
      )}

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.userName[0]} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {menuOptions.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleMenuAction(option.action)}
              sx={{
                width: { xs: "150px", sm: "200px" },
                "&:hover": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
            >
              <Typography sx={{ textAlign: "center" }}>{option.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default AvaterAndCartBadge;
