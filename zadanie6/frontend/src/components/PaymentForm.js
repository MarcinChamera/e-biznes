import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";

// valid credit card number: 378282246310005

function PaymentForm({amountToPay, paymentNumber}) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    function sendPayment(number, userId, stripePaymentId) {
        axios.post("/orders", {PaymentNumber : parseInt(number), UserId: parseInt(userId), StripePaymentId: stripePaymentId}).then((res) => {
            return res.data;
        });
    } 

    const acceptPayment = (stripePaymentId) => {
        const userIdValue = sessionStorage.getItem("userid");
        const tokenValue = sessionStorage.getItem("token");
        const emailValue = sessionStorage.getItem("email");
        const oAuthServiceValue = sessionStorage.getItem("oauthservice");

        sendPayment(paymentNumber, userIdValue, stripePaymentId);
        alert("Płatność udana!");

        sessionStorage.clear();
        if (tokenValue !== null) {
            sessionStorage.setItem("token", tokenValue);
        }
        if (emailValue !== null) {
            sessionStorage.setItem("email", emailValue);
        }
        if (oAuthServiceValue !== null) {
            sessionStorage.setItem("oauthservice", oAuthServiceValue);
        }
        if (userIdValue !== null) {
            sessionStorage.setItem("userid", userIdValue.toString());
        }

        navigate("/products");
    }

    const handleSubmitForm = async event => {
        event.preventDefault()
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            acceptPayment(paymentMethod.id);
        } else {
            console.log(error.message);
        }
    }

    return (
        <Container className="container">
            <Typography variant="h6" marginBottom={3}>
                Do zapłaty: {amountToPay} PLN
            </Typography>
            <form onSubmit={handleSubmitForm}>
                <CardElement />
                <Box mt={5}>
                    <Button variant="contained" type="submit">
                        Zapłać
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default PaymentForm;