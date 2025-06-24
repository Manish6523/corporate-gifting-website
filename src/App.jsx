import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import CartPage from "./components/CartPage.jsx";
import { Toaster } from "react-hot-toast";
import EnquiryPage from "./components/EnquiryPage.jsx";
import Auth from "./components/Auth.jsx";
import { fetchCartFromSupaBase } from "../utils/cartSupabase.js";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./features/cart/cartSlice.js";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const session = useSelector((state) => state.cart.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (!session) return;
      const fetchedCart = await fetchCartFromSupaBase(session?.id);
      console.log("Fetched Cart: ", fetchedCart);
      dispatch(setCart(fetchedCart));
    };
    fetchCart();
  }, [session]);
  return (
    <div className="min-h-screen bg-gray-100">
      <CartPage />
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/user/enquiry" element={<EnquiryPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
