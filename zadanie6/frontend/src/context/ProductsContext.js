import axios from '../axios/axios';
import React, {useState, createContext, useEffect} from "react";

export const ProductsContext = createContext({
    products: [],
    categories: [],
    setSelectedCategory: () => {
        // Intentionally blank
    },
    selectedCategoryDescription: "",
});

function getProducts() {
    return axios.get("/products").then((res) => { return res.data });
}

function getProductsByCategory(categoryId) {
    const id = JSON.stringify(categoryId)
    return axios.get("/products/category/" + id).then((res) => { return res.data });
}

function getCategories() {
    return axios.get("/categories").then((res) => { return res.data });
}

function getCategoryDescription(categoryId) {
    const id = JSON.stringify(categoryId)
    return axios.get("/categories/" + id).then((res) => { return res.data.Description });
}

export const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedCategoryDescription, setSelectedCategoryDescription] = useState("");

    useEffect(() => {
        if (selectedCategory === 0) {
            getProducts().then((p) => setProducts(p));
            setSelectedCategoryDescription("");
        } else {
            getProductsByCategory(selectedCategory).then((p) => setProducts(p));
            getCategoryDescription(selectedCategory).then((d) => setSelectedCategoryDescription(d));
        }
        getCategories().then((c) => setCategories(c));
    }, [selectedCategory])

    return <ProductsContext.Provider value={{products, categories, setSelectedCategory, selectedCategoryDescription}}>{children}</ProductsContext.Provider>
}