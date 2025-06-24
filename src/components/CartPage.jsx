import React from "react";
import { ShoppingCart, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice";
import CartItems from "./rep/CartItems";
import { Link } from "react-router";
const CartPage = () => {
  const isShown = useSelector((state) => state.cart.isshown);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <>
      {isShown && (
        <section
          className="fixed h-screen w-full bg-black/60 z-10 flex justify-end"
          onClick={() => dispatch(toggleCart())}
        >
          <div
            className="cartContainer relative overflow-y-scroll pb-14 bg-white w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header py-5 px-4 flex items-center justify-between border-b-1 border-gray-200">
              <img
                src="https://i.ibb.co/6cJGsyM1/logo.png"
                alt="logo"
                className="w-28"
                draggable="false"
              />
              <span
                className="bg-gray-100 hover:bg-gray-300 rounded-full p-2 cursor-pointer transition-all duration-200"
                onClick={() => dispatch(toggleCart())}
              >
                <X className="size-5" />
              </span>
            </div>
            <div>
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <h2 className="text-lg font-semibold">Your cart is empty</h2>
                  <p className="text-gray-500">
                    Add items to your cart to see them here.
                  </p>
                </div>
              ) : (
                <div className="cartItemsList">
                  {cart.map((item, index) => (
                    <CartItems key={index} item={item} stock={item.stock} />
                  ))}
                </div>
              )}
              {/* <CartItems /> */}
            </div>
            {cart.length > 0 && (
              <Link
                to={"/user/enquiry"}
                onClick={() => dispatch(toggleCart())}
                className="fixed w-full max-w-md bottom-0 p-5 text-center flex items-center justify-center gap-5
                hover:bg-black/80 hover:text-white transition-all duration-300 bg-black/90 text-white font-bold"
              >
                Proceed to checkout <ShoppingCart />
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CartPage;
