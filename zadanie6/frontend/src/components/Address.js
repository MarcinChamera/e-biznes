import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "../axios/axios";
import { useLocation, useNavigate } from "react-router-dom";

function Error({ errors }) {
    return (
        errors ?
            <div className="error">{errors.message}</div> :
            <></>
    )
}

const Address = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ amountToPay ] = useState(location.state?.amountToPay);
    const { register, formState: { errors }, handleSubmit } = useForm();

    function saveDetailsAndPay(data) {
        const amount = JSON.stringify(amountToPay);

        var cartId = 0;

        axios.post("/shopping-carts").then((res) => {
            for (let shoppingCartProductId in sessionStorage) {
                if (sessionStorage.hasOwnProperty(shoppingCartProductId) && 
                    shoppingCartProductId !== "token" &&
                    shoppingCartProductId !== "userid" &&
                    shoppingCartProductId !== "email" &&
                    shoppingCartProductId !== "oauthservice") {
                        axios.post("/shopping-carts/" + res.data, {CartNumber: res.data, ProductId: parseInt(shoppingCartProductId), Quantity: parseInt(sessionStorage[shoppingCartProductId])});
                }
            }
            cartId = JSON.parse(JSON.stringify(res.data));
        });
        
        return (
            axios.post("/payments/stripe/" + amount, {AmountToPay: amountToPay, CartId: cartId, Street: data["street"], HouseNumber: data["houseNumber"], 
            PostalCode: data["postalCode"], City: data["city"]})
            .then(res => {
                navigate("/payment/stripe", { state : {
                    amountToPay: amountToPay,
                    paymentNumber: res.data.paymentNumber,
                    clientSecret: res.data.clientSecret
                }})
            })
        );
    }

    return (
        <Container className="container">
            <Typography variant="h4" align="center">Dostawa pod adres:</Typography>
            <form onSubmit={handleSubmit(data => {
                saveDetailsAndPay(data);
            })}>
                <Stack spacing={2} alignItems="center" marginTop={5}>
                    <label>Ulica:</label>
                    <TextField className='input' {...register('street', { required: "Wymagane" })} />
                    <Error errors={errors.street} />
                    <label>Numer domu:</label>
                    <TextField className='input' type="number" {...register('houseNumber', { required: "Wymagane" })} />
                    <Error errors={errors.houseNumber} />
                    <label>Kod pocztowy:</label>
                    <TextField className='input' type="number" {...register('postalCode', { required: "Wymagane" })} />
                    <Error errors={errors.postalCode} />
                    <label>Miasto:</label>
                    <TextField className='input' {...register('city', { required: "Wymagane" })} />
                    <Error errors={errors.city} />
                    <Button
                        type="submit"
                        className='submitButton'
                        variant='contained'>
                        Przejdź do płatności
                    </Button>
                </Stack>      
            </form>
        </Container>
    )
}

export default Address;