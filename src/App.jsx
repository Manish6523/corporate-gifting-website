import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductList.jsx";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import EnquiryPage from "./components/EnquiryPage.jsx";
import Auth from "./components/Auth.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import AboutUs from "./components/AboutUs.jsx";
import {
  fetchCartFromSupaBase,
  fetchWishListFromSupaBase,
  saveCartToSupabase,
  saveWishListToSupabase,
} from "../utils/cartSupabase.js";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setWishlist } from "./features/cart/cartSlice.js";
import OrderConfirmation from "./components/OrderConfirmation.jsx";
import Cart from "./components/Cart.jsx";
import { Footer } from "./components/Footer.jsx";
import A from "./components/A.jsx";

function App() {
  const location = useLocation();

  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.cart.wishList);
  const dispatch = useDispatch();

  const isNavbarVisible = location.pathname !== "/auth";

  // ⬇ Fetch cart from Supabase on login
  useEffect(() => {
    const fetchCart = async () => {
      if (!session) return;
      const fetchedCart = await fetchCartFromSupaBase(session?.id);
      dispatch(setCart(fetchedCart));
    };

    const fetchWishList = async () => {
      if (!session) return;

      const fetchedWishList = await fetchWishListFromSupaBase(session?.id);
      dispatch(setWishlist(fetchedWishList));
    };

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
    <>
      {/* <CartPage /> */}
      <div className=" bg-background">
        {isNavbarVisible && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/product" element={<ProductsList />} />

          
          <Route path="/orderConfirmation" element={<OrderConfirmation />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="user/category/:category" element={<CategoryPage />} />

          <Route path="/user/enquiry" element={<EnquiryPage />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/a" element={<A />} />
        </Routes>
        <Footer />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#1f2937", // Tailwind gray-800
              color: "#f9fafb", // Tailwind gray-100
            },
            success: {
              iconTheme: {
                primary: "#10b981", // Tailwind green-500
                secondary: "#f9fafb",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // Tailwind red-500
                secondary: "#f9fafb",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
