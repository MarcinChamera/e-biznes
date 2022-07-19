import { Container, Typography, Box, Divider, CardMedia, Stack, Button, TextField, Grid } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import PaymentIcon from '@mui/icons-material/Payment';
import axios from "../axios/axios"
import { ShoppingCartContext } from "../context/ShoppingCartContext"
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function getTotalPrice(shoppingCartProducts) {
    let totalPrice = 0;
    shoppingCartProducts.forEach((shoppingCartProduct) => totalPrice += shoppingCartProduct["product"].Price * shoppingCartProduct["quantity"]);
    return totalPrice
}

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const {removeFromShoppingCart} = useContext(ShoppingCartContext);


    async function getShoppingCart() {
        let shoppingCart = []
        for (let shoppingCartProductId in sessionStorage) {
            if (sessionStorage.hasOwnProperty(shoppingCartProductId) && 
                shoppingCartProductId !== "token" &&
                shoppingCartProductId !== "userid" &&
                shoppingCartProductId !== "email" &&
                shoppingCartProductId !== "oauthservice") {
                await axios.get(`/products/${shoppingCartProductId}`).then(res => shoppingCart.push({product: res?.data, quantity: sessionStorage[shoppingCartProductId]}));
            }
        }
        setShoppingCartProducts(shoppingCart);
        setLoading(false);
    }

    useEffect(() => {
        getShoppingCart();
    }, [])
 
    function buyShoppingCartProducts() {
        const amountToPay = getTotalPrice(shoppingCartProducts);
        navigate("/address", {state: { amountToPay: amountToPay}});
    }

    function changeQuantity(id, newQuantity) {
        sessionStorage.setItem(JSON.stringify(id), newQuantity.target.value)
        getShoppingCart();
    }

    function remove(id) {
        removeFromShoppingCart(JSON.stringify(id));
        getShoppingCart();
    }

    function showShoppingCartContent() {
        if (shoppingCartProducts.length === 0) {
            return (
                <Typography className="emptyShoppingCart" marginTop={5}>
                    Koszyk jest pusty
                </Typography>
            )  
        } else {
            return (
                shoppingCartProducts.map((shoppingCartProduct, index) => (
                    <Box className="shoppingCartProduct" key={index} marginTop={2}>
                        <CardMedia className="shoppingCartProductImage">
                            <img src={shoppingCartProduct["product"].image_url} height="100" alt={shoppingCartProduct["product"].image_url} />
                        </CardMedia>
                        <Typography className="shoppingCartProductName">
                            {shoppingCartProduct["product"].Name}
                        </Typography>
                        <Typography className="shoppingCartProductPrice" marginBottom={2}>
                            {shoppingCartProduct["product"].Price} PLN
                        </Typography>
                        <Grid container direction="row" alignItems="center" spacing={1} marginBottom={2}>
                            <Grid item>
                                <TextField
                                    className="shoppingCartProductQuantity"
                                    type="number"
                                    value={shoppingCartProduct["quantity"]}
                                    InputProps={{ inputProps: { min: 1, max: 99 } }}
                                    onChange={(newQuantity) => changeQuantity(shoppingCartProduct["product"].ID, newQuantity)}
                                />
                            </Grid>
                            <Grid item>
                            <Typography>
                                ilość
                            </Typography>
                            </Grid>
                        </Grid>
                        <Button 
                            className="removeFromCartButton"
                            startIcon={<DeleteOutlineIcon />} 
                            onClick={() => remove(shoppingCartProduct["product"].ID)}>
                                Usuń z koszyka  
                        </Button>
                        {index < shoppingCartProducts.length - 1 && <Divider/>}
                    </Box>
                ))
            )
        } 
    }

    return (
         <Container>
            <Typography className="shoppingCartHeader" variant="h4" marginTop={10}>
                W koszyku:
            </Typography>
            {isLoading ?
            (
                <Typography>
                    Ładowanie
                </Typography>
            ) : 
            (
                showShoppingCartContent()
            )
            }
            {!isLoading && shoppingCartProducts.length > 0 && 
                <Stack direction="row" spacing={5} sx={{marginTop: 2}}>
                    <Typography className="shoppingCartSummary" variant="h6">
                        Do zapłacenia: {getTotalPrice(shoppingCartProducts)} PLN
                    </Typography>
                    <Button
                    className="goToDeliveryButton"
                    variant="contained"
                    endIcon={<PaymentIcon/>}
                    onClick={() => buyShoppingCartProducts()}
                    >
                        Idź do dostawy
                    </Button>
                </Stack>
            }
        </Container>
    );
}

export default ShoppingCart;