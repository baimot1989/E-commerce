// import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, openCart } from "../redux/cart/cartSlice";
import styled from "@emotion/styled";
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


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        padding: "0 4px",
    },
}));

const CartBadge = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalItemTypes = useSelector((state) => state.cart.totalItemTypes);
    const dispatch = useDispatch();
    return (
        <>
            <IconButton aria-label="cart" onClick={() => dispatch(openCart())}>
                <StyledBadge badgeContent={totalItemTypes} color="secondary">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                </StyledBadge>
            </IconButton>
        </>
    );
}

export default CartBadge;