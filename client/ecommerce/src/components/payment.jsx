import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {

    const subtotal = useSelector((state) => state.cart?.subtotal)

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/payment/config`).then((r) => {
            const { publishableKey } = r.data;
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);
    useEffect(() => {
        axios.post(`${API_URL}/payment/create-payment-intent`, {amount: subtotal}).then((result) => {
            const { clientSecret } = result.data;
              console.log(clientSecret)
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <Typography variant="h4" py={2} textAlign="center">Choose Payment Method</Typography>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;