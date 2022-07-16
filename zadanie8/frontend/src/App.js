import React from "react";
import Products from "./components/Products";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProductsContextProvider} from "./context/ProductsContext";
import Header from "./components/Header";
import ShoppingCart from "./components/ShoppingCart";
import Payment from "./components/Payment";
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext";
import Login from "./components/Login";
import LoginSuccess from "./components/LoginSuccess";
import Logout from "./components/Logout";
import { LoggedInContextProvider } from "./context/LoggedInContext";

function App() {

  return (
    <LoggedInContextProvider>
      <ProductsContextProvider>
        <ShoppingCartContextProvider>
          <Router>
            <Header/>
            <Routes>
              <Route path="/" element={<Products />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/shopping-cart" element={<ShoppingCart />}/>
              <Route path="/payment" element={<Payment />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/login/auth/:oauthservice/success/:token&:email&:userid" element={<LoginSuccess /> }/>
              <Route path="/logout" element={<Logout />}/>
            </Routes>
          </Router>
        </ShoppingCartContextProvider>
      </ProductsContextProvider>
    </LoggedInContextProvider>
  );
}

export default App;
