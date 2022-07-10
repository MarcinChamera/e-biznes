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
        const productAlreadyInCart = localStorage.getItem(stringId)
        if (productAlreadyInCart === null) {
            localStorage.setItem(stringId, "1")
        } else {
            localStorage.setItem(stringId, JSON.stringify(parseInt(productAlreadyInCart) + 1))
        }
    }

    const removeFromShoppingCart = id => {
        localStorage.removeItem(id);
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