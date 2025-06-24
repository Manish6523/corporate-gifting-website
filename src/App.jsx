import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import CartPage from "./components/CartPage.jsx";
import { Toaster } from "react-hot-toast";
import EnquiryPage from "./components/EnquiryPage.jsx";
import Auth from "./components/Auth.jsx";
import { fetchCartFromSupaBase, saveCartToSupabase } from "../utils/cartSupabase.js";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./features/cart/cartSlice.js";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);
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

  // 🔁 Save cart after Redux updates
  const prevCartRef = useRef(cart);
  useEffect(() => {
    if (
      session &&
      JSON.stringify(prevCartRef.current) !== JSON.stringify(cart)
    ) {
      const plainCart = JSON.parse(JSON.stringify(cart));
      console.log("Cart changed. Saving to Supabase:", plainCart);

      saveCartToSupabase(session.id, plainCart)
        .then((result) => {
          if (result.success) {
            console.log("✅ Cart saved successfully to Supabase");
          } else {
            console.error("❌ Failed to save cart:", result.message);
          }
        })
        .catch((err) => console.error("❌ Save error:", err));
    }
    prevCartRef.current = cart;
  }, [cart, session]);
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
