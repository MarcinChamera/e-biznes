import axios from '../axios/axios';
import React, {useState, createContext, useEffect} from "react";

export const ProductsContext = createContext({
    products: [],
});

function getProducts() {
    return axios.get("/products").then((res) => { return res.data });
}

export const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts().then((p) => setProducts(p));
    }, [])

    return <ProductsContext.Provider value={{products}}>{children}</ProductsContext.Provider>
}