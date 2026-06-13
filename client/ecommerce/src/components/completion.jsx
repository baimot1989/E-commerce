import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSubmitOrder } from "../hooks/submitOrder";

const Completion = (props) => {
    const subtotal = useSelector((state) => state.cart?.subtotal)
    const { submitOrder } = useSubmitOrder()
    
    useEffect(() => {
        submitOrder()

    },[])

  return (
    <Container maxWidth='sm' sx={{
      p: 2,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, }}>
        <CheckCircleIcon color="success" sx={{ fontSize: {xs: 50 , sm: 65} }} />
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: {xs: 20 , sm: 25} }}
        >
          The payment was successfully accepted
        </Typography>
        <Typography
          variant="p"
          fontWeight={500}
          gutterBottom
        >
          Your payment has been processed successfully.You will receive a confirmation email shortly.
        </Typography>
        <Box>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, backgroundColor: '#eeeeee', marginTop: '20px', marginBottom: '15px' }}>
            <Grid container spacing={1} size={12}>
              <Grid container spacing={1} size={12}>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Amount</Grid>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>${subtotal}</Grid>
              </Grid>
              <Grid container spacing={1} size={12}>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Transaction ID</Grid>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>TXN-789123456</Grid>
              </Grid>
              <Grid container spacing={1} size={12}>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Payment Method</Grid>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>**** 4242</Grid>
              </Grid>
              <Grid container spacing={1} size={12}>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Date</Grid>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Dec 15, 2024</Grid>
              </Grid>
              <Grid container spacing={1} size={12}>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Merchant</Grid>
                <Grid size={{ md: 6 }} sx={{fontSize: {xs: 12, md: 15}}}>Next Generation Store</Grid>
              </Grid>

            </Grid>

          </Paper>
        </Box>
        <Box sx={{ borderRadius: '8px', backgroundColor: '#e1f5fe', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <EmailOutlinedIcon />
          <Typography sx={{ marginLeft: '5px', fontSize: {xs: 10, md: 15} }}>Receipt sent to customer@example.com</Typography>
        </Box>
        <Button
          component={Link} to={'/customerdash/products'}
          type="submit"
          variant="contained"
          color="success"
          size="small"
          fullWidth
          sx={{marginTop: '10px', borderRadius: '8px'}}
        > <ArrowBackOutlinedIcon sx={{paddingRight: '5px'}}/> return to store</Button>

      </Paper>

    </Container>
  )

}

export default Completion;