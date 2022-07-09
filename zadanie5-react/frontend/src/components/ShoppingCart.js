import { Container, Typography, Box, Divider, CardMedia, Stack, Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import PaymentIcon from '@mui/icons-material/Payment';
import axios from "../axios/axios"
import { ShoppingCartContext } from "../context/ShoppingCartContext"
import { useNavigate } from "react-router-dom";

function getShoppingCart() {
    return axios.get("/products").then((res => {return res.data}));
}

function getTotalPrice(shoppingCartProducts) {
    return 11700;
}

const ShoppingCart = () => {
    const navigate = useNavigate();
    const { shoppingCartProducts } = useContext(ShoppingCartContext);

    // const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
    // useEffect(() => {
    //     getShoppingCart().then((p) => setShoppingCartProducts(p));
    // })

    function buyShoppingCartProducts() {
        const amountToPay = getTotalPrice(shoppingCartProducts);
        const paymentNumber = Math.floor(Math.random() * 1000000)
        return axios.post("/payment", { amountToPay, paymentNumber }).then((res) => {
            navigate("/payment", { state : {
                amountToPay: amountToPay,
                paymentNumber: paymentNumber
            }})
        });
    }

    return (
        <Container>
            <Typography variant="h4" marginTop={10}>
                W koszyku:
            </Typography>
            {shoppingCartProducts.length === 0 ? (
                <Typography marginTop={5}>
                    Koszyk jest pusty
                </Typography>
            ) : (shoppingCartProducts.map((shoppingCartProduct, index) => (
                <Box key={index} marginTop={2}>
                    <CardMedia>
                        <img src={shoppingCartProduct.image_url} height="100" alt={shoppingCartProduct.image_url} />
                    </CardMedia>
                    <Typography>
                        {shoppingCartProduct.Name}
                    </Typography>
                    <Typography marginBottom={2}>
                        {shoppingCartProduct.Price} PLN
                    </Typography>
                    {index < shoppingCartProducts.length - 1 && <Divider />}
                </Box>
                ))
            )}
            {shoppingCartProducts.length !== 0 ? (
                <Stack direction="row" spacing={5} sx={{marginTop: 2}}>
                    <Typography variant="h6">
                        Do zapłacenia: {getTotalPrice(shoppingCartProducts)} PLN
                    </Typography>
                    <Button
                    variant="contained"
                    endIcon={<PaymentIcon/>}
                    onClick={() => buyShoppingCartProducts()}
                    >
                        Zapłać
                    </Button>
                </Stack>
            ) : (
                ""
            )}
        </Container>
    );
}

export default ShoppingCart;