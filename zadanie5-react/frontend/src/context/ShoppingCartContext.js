import React, {useState, createContext, useEffect} from "react";

export const ShoppingCartContext = createContext({
    shoppingCartProducts: [],
    addToShoppingCart: () => {},
});

export const ShoppingCartContextProvider = ({children}) => {
    const [shoppingCartProducts, setShoppingCartProducts] = useState([]);

    const addToShoppingCart = shoppingCartProduct => {
        console.log("Adding ", shoppingCartProduct.Name, " to the shopping cart")
        setShoppingCartProducts([...shoppingCartProducts, { ...shoppingCartProduct }])
    };

    useEffect(() => {
        console.log("shoppingCartProducts:", shoppingCartProducts);
    }, [shoppingCartProducts])

    return (
        <ShoppingCartContext.Provider value={{
            shoppingCartProducts, 
            addToShoppingCart,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};