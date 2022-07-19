import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import { Container } from "@mui/system";

const StripePayment = () => {
    
    const stripeTestPromise = loadStripe("pk_test_51LMCVmBAVz9W7GmYss7UgyTtiP5POFF5bWpbVBN4d1azZ02CjN5VqrcLdcUbPAK2zxXkYbNAseq0FDjCURTKc2Fz00XqCm6Szz");
    
    const location = useLocation();
    const [ amountToPay ] = useState(location.state?.amountToPay);
    const [ paymentNumber ] = useState(location.state?.paymentNumber);
    const [ clientSecret ] = useState(location.state?.clientSecret);
   
    const options = {
        clientSecret,
    };

    return (
        <Container className="container">
            <Elements options={options} stripe={stripeTestPromise}>
                <PaymentForm amountToPay={amountToPay} paymentNumber={paymentNumber}/>
            </Elements>
        </Container>
    )
}

export default StripePayment;