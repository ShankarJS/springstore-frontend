import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import { CartProvider } from "../context/CartContext";

import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />


          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/ProductDetails/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider >
  );
}

export default App;
