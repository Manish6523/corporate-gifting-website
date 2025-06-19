import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import CartPage from "./components/CartPage.jsx";
import { Toaster } from "react-hot-toast";
import EnquiryPage from "./components/EnquiryPage.jsx";

function App() {
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
        </Routes>
    </div>
  );
}

export default App;
