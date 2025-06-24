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
import Dashboard from "./components/Dashboard.jsx";

import {
  fetchCartFromSupaBase,
  fetchWishListFromSupaBase,
  saveCartToSupabase,
  saveWishListToSupabase,
} from "../utils/cartSupabase.js";

import { useDispatch, useSelector } from "react-redux";
import { setCart, setWishlist } from "./features/cart/cartSlice.js";

function App() {
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.cart.wishList);
  const dispatch = useDispatch();

  // ⬇ Fetch cart from Supabase on login
  useEffect(() => {
    const fetchCart = async () => {
      if (!session) return;
      const fetchedCart = await fetchCartFromSupaBase(session?.id);
      console.log("Fetched Cart: ", fetchedCart);
      dispatch(setCart(fetchedCart));
    };

    const fetchWishList = async () => {
      if (!session) return;

      const fetchedWishList = await fetchWishListFromSupaBase(session?.id);
      console.log("Fetched Wishlist: ", fetchedWishList);
      dispatch(setWishlist(fetchedWishList));
    }

    fetchCart();
    fetchWishList();
  }, [session]);

  // ⬇ Save cart to Supabase on change
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

  // ⬇ Save wishlist to Supabase on change
  const prevWishListRef = useRef(wishList);
  useEffect(() => {
    if (
      session &&
      JSON.stringify(prevWishListRef.current) !== JSON.stringify(wishList)
    ) {
      const plainWishList = JSON.parse(JSON.stringify(wishList));
      console.log("Wishlist changed. Saving to Supabase:", plainWishList);

      saveWishListToSupabase(session.id, plainWishList)
        .then((result) => {
          if (result.success) {
            console.log("✅ Wishlist saved to Supabase");
          } else {
            console.error("❌ Failed to save wishlist:", result.message);
          }
        })
        .catch((err) => console.error("❌ Wishlist save error:", err));
    }
    prevWishListRef.current = wishList;
  }, [wishList, session]);

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
