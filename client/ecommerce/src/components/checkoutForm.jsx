import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Container, Paper } from "@mui/material";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/customerdash/preorder/payment/completion`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <Container maxWidth='md'>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 4, }}>
                <Box id="payment-form" onSubmit={handleSubmit} component={'form'}>
                    <PaymentElement id="payment-element" />
                    <Button disabled={isProcessing || !stripe || !elements} id="submit"
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{width: { xs: '50%'}, marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '10px'}}
                        >
                        <span id="button-text">
                            {isProcessing ? "Processing ... " : "Pay now"}
                        </span>
                    </Button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </Box>

            </Paper>



        </Container>

    );
}

export default CheckoutForm