import React, { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./rep/CartItems";
import { Link } from "react-router";
import { setCart } from "../features/cart/cartSlice";
import WishCard from "./WishlistCard";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.cart.wishList);
  const priceData = useSelector((state) => state.cart.priceData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src="/logo.png"
          alt="Loading..."
          className="w-[130px] md:w-[200px]"
        />
        <p className="mt-4 text-sm text-gray-400">Preparing your cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center gap-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ShoppingCart size={48} className="text-[#ba8c16]" />
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-gray-500">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to="/product"
          className="mt-2 px-4 py-2 bg-[#ba8c16] text-white rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl pt-30 mx-auto px-4 sm:px-6 py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Cart Items Section */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <div className="bg-[#ba8c16]/20 text-[#ba8c16] p-3 rounded-full">
                <ShoppingCart size={25} />
              </div>
              Your Cart{" "}
              <span className="text-gray-500 text-base">
                ({cart.length} products)
              </span>
            </h2>
            <button
              onClick={() => dispatch(setCart([]))}
              className="text-[#ba8c16] flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <X strokeWidth={1.5} size={18} /> Clear cart
            </button>
          </div>

          {cart.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CartItems item={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Section */}
        <motion.div
          className="bg-background p-6 rounded-xl shadow-sm space-y-4 h-fit sticky top-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium">Review Your Order</h3>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${priceData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST: 8%</span>
              <span>${priceData.gst}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#ba8c16]">
              <span>Total</span>
              <span>${priceData.total}</span>
            </div>
          </div>
          <Link
            to="/user/enquiry"
            className="block w-full text-center bg-[#ba8c16] hover:opacity-90 transition-all text-white py-3 rounded-md text-sm font-semibold"
          >
            Continue to checkout
          </Link>
        </motion.div>
      </div>

      {/* Favourite Products */}
      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">Your Favourite Products</h3>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center py-10 flex flex-col items-center justify-center gap-2 bg-background rounded-xl border border-dashed border-[#ba8c16]/40"
          >
            <p className="text-base font-semibold text-[#ba8c16]">
              No Favourites Yet 💔
            </p>
            <p className="text-sm text-gray-500">
              You haven’t added any products to your wishlist.
            </p>
            <Link
              to="/product"
              className="mt-3 inline-block px-4 py-2 bg-[#ba8c16] text-white text-sm rounded-md hover:opacity-90 transition"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="overflow-x-auto scrollbar-hide mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-4 min-w-max">
              <AnimatePresence>
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WishCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
