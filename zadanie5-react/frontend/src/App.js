import React from "react";
import Products from "./components/Products";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProductsContextProvider} from "./context/ProductsContext";
import Header from "./components/Header";
import ShoppingCart from "./components/ShoppingCart";
import Payment from "./components/Payment";
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ProductsContextProvider>
      <ShoppingCartContextProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Products />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/shopping-cart" element={<ShoppingCart />}/>
            <Route path="/payment" element={<Payment />}/>
          </Routes>
        </Router>
      </ShoppingCartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
