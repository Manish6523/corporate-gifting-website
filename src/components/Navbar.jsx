import React from "react";
import { Menu, Phone, Search, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  // const isShown = useSelector((state) => state.cart.isshown);

  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md w-full flex items-center justify-between px-4 py-2 md:py-5">
      <Menu className="size-8 block md:hidden" />
      <Link to={"/product"}>
        <span className="logo">
          <img
            src="https://i.ibb.co/6cJGsyM1/logo.png"
            alt="logo"
            className="w-28 sm:w-32"
          />
        </span>
      </Link>
      <div className="others flex gap-7">
        <div className="search border border-gray-300 bg-gray-100 rounded-full hidden md:flex items-center gap-3 px-3">
          <Search className="size-6 cursor-pointer" />
          <input
            type="text"
            placeholder="search product"
            className="outline-0"
          />
        </div>
        <Link to={"/user/enquiry"} className="contact hidden md:flex items-center justify-center gap-3">
          <Phone className="size-7" />
          <div>
            <p className="text-gray-800 font-bold ">+91 234 567 890</p>
            <p className="text-gray-500 text-xs">Call Us for Bulk Orders</p>
          </div>
        </Link>

        <div className="partition w-[1px] bg-gray-500 hidden md:flex " />
        <div
          className="cart relative p-3 pl-0"
          onClick={() => dispatch(toggleCart())}
        >
          <ShoppingBag className="size-7 cursor-pointer" />
          <div className="items absolute top-1 right-1 flex items-center justify-center text-white bg-black rounded-full text-xs size-5 font-bold">
            {cart.length}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
