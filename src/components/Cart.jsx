import React, { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./rep/CartItems";
import { Link } from "react-router";
import { setCart } from "../features/cart/cartSlice";
import WishCard from "./WishlistCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.cart.wishList);
  const priceData = useSelector((state) => state.cart.priceData);

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
        <img
          src="/logo.png"
          alt="Loading..."
          className="w-[130px] md:w-[200px] animate-fade-scale"
        />
        <p className="mt-4 text-sm text-gray-400">Preparing your cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh]  flex flex-col items-center justify-center gap-4 text-center">
        <ShoppingCart size={48} className="text-primary" />
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-gray-500">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to={"/product"}
          className="mt-2 px-4 py-2 bg-primary text-text rounded-md text-sm font-medium"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl pt-30 mx-auto px-4 sm:px-6 py-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Cart Items Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <div className="bg-primary/50 text-primary p-3 rounded-full">
                <ShoppingCart size={25} />
              </div>
              Your Cart{" "}
              <span className="text-gray-500 text-base">
                ({cart.length} products)
              </span>
            </h2>
            <button
              onClick={() => {
                dispatch(setCart([]));
              }}
              className="text-primary flex items-center gap-1 cursor-pointer text-sm font-medium hover:underline"
            >
              <X strokeWidth={1.5} size={18} /> Clear cart
            </button>
          </div>

          {/* Cart Item */}
          {cart.map((product) => (
            <CartItems item={product} key={product?.id} />
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-background p-6 rounded-xl shadow-sm space-y-4 h-fit sticky top-24">
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
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${priceData.total}</span>
            </div>
          </div>
          <Link
            to={"/user/enquiry"}
            className="block w-full text-center bg-primary/80 hover:bg-primary/70 transition-all cursor-pointer text-text py-3 rounded-md text-sm font-semibold"
          >
            Continue to checkout
          </Link>
        </div>
      </div>

      {/* Favourite Products */}
      {/* Favourite Products */}
      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">Your Favourite Products</h3>

        {wishlist.length === 0 ? (
          <div className="w-full text-center py-10 flex flex-col items-center justify-center gap-2 bg-background rounded-xl border border-dashed border-primary/50">
            <p className="text-base font-semibold text-primary">
              No Favourites Yet 💔
            </p>
            <p className="text-sm text-gray-500">
              You haven’t added any products to your wishlist.
            </p>
            <Link
              to="/product"
              className="mt-3 inline-block px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide mt-10">
            <div className="flex gap-4 min-w-max">
              {wishlist.map((product) => (
                <WishCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
