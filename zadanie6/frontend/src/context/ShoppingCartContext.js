import React, { createContext } from "react";

export const ShoppingCartContext = createContext({
    addToShoppingCart: () => {
        // Intentionally blank
    },
    removeFromShoppingCart: () => {
        // Intentionally blank
    },
});

export const ShoppingCartContextProvider = ({children}) => {

    const addToShoppingCart = shoppingCartProduct => {
        const stringId = JSON.stringify(shoppingCartProduct.ID)
        const productAlreadyInCart = sessionStorage.getItem(stringId)
        if (productAlreadyInCart === null) {
            sessionStorage.setItem(stringId, "1")
        } else {
            sessionStorage.setItem(stringId, JSON.stringify(parseInt(productAlreadyInCart) + 1))
        }
    }

    const removeFromShoppingCart = id => {
        sessionStorage.removeItem(id);
    }

    return (
        <ShoppingCartContext.Provider value={{
            addToShoppingCart,
            removeFromShoppingCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};