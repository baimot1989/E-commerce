import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ProtectionRoute/imageSlider/imageSlider";

const HomePage = () => {
  return (
    <Box sx={{ pt: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom> Welcome to Next Generation Store </Typography>
        <Typography variant="subtitle1"> Quality products, fast service, affordable prices</Typography>
      </Box>

      <ImageSlider />
      <Box sx={{ textAlign: "center", mb: 1 }}>
        
        <Button variant="contained" color="primary" sx={{ mt: 1, width: '50%' }} component={Link} to="/customerdash/products">
           Start Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
