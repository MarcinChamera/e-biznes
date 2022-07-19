import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid, CardMedia, Button, Alert, Snackbar } from "@mui/material";
import { ProductsContext } from "../context/ProductsContext";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import Category from "./Category";
import "../styles/General.css"

const Products = () => {
    const { products, setSelectedCategory, selectedCategoryDescription } = useContext(ProductsContext)
    const { addToShoppingCart } = useContext(ShoppingCartContext)
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <Container className="container">
            <Category setCategory={setSelectedCategory} />
            <Typography className="categoryDescription" marginTop={3} variant="h5">
                {selectedCategoryDescription}
            </Typography>
            <Grid className="products" container spacing={1} marginTop={5}>
                {products.map(product => (
                    <Grid className="product" key={product.ID} item sm={6} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <CardMedia className="productImage">
                                    <img src={product.image_url} height="200" alt={product.image_url}/>
                                </CardMedia> 
                                <Typography className="productName" variant="h5" component="div">
                                    {product.Name}
                                </Typography>
                                <Typography className="productPrice" variant="subtitle1">
                                    {product.Price} PLN
                                </Typography>
                                <Button className="addToBasketButton" variant="contained" onClick={() => { 
                                    setOpen(true)
                                    addToShoppingCart(product)
                                }}>
                                    Do koszyka
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
  
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}>
                    <Alert className="addedToBasketAlert" onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                        Dodano produkt do koszyka!
                    </Alert>
            </Snackbar>
    
        </Container>
    );
}

export default Products;