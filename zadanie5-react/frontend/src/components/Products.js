import React, { useContext } from "react";
import { Card, CardContent, Typography, Container, Grid, CardMedia, Button } from "@mui/material";
import { ProductsContext } from "../context/ProductsContext";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const Products = () => {
    const { products } = useContext(ProductsContext)
    const { addToShoppingCart } = useContext(ShoppingCartContext)

    return (
        <Container>
            <Grid container spacing={1} marginTop={10}>
                {products.map(product => (
                    <Grid key={product.ID} item sm={6} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <CardMedia>
                                    <img src={product.image_url} height="200" alt={product.image_url}/>
                                </CardMedia> 
                                <Typography variant="h5" component="div">
                                    {product.Name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {product.Price} PLN
                                </Typography>
                                <Button variant="contained" onClick={() => addToShoppingCart(product)}>
                                    Do koszyka
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Products;