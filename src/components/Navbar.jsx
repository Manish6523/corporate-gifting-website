import React, { useEffect, useState } from "react";
import {
  Facebook,
  Home,
  Instagram,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  ShoppingCart,
  Twitter,
  User2,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <nav className="bg-white shadow-md w-full flex items-center justify-between px-4 py-2 md:py-5">
      {/* mobile bar start */}
      <div
        className={`main fixed z-10 top-0 ${
          isMenuOpen ? "-left-0" : "-left-full"
        } transition-all duration-500 backdrop-blur-2xl h-screen w-screen sm:max-w-sm border-r border-gray-300`}
      >
        <div className="header px-4 py-3 md:py-6 flex items-center justify-between border-t border-b border-gray-300">
          <Link to={"/product"}>
            <span className="logo">
              <img
                src="https://i.ibb.co/6cJGsyM1/logo.png"
                alt="logo"
                className="w-28 sm:w-32"
              />
            </span>
          </Link>
          <span
            className="cursor-pointer p-1 border-1 rounded-full hover:bg-gray-300"
            onClick={() => toggleMenu()}
          >
            <X className="size-5" />
          </span>
        </div>
        <div className="body">
          <div className="w-full bg-gray-300 flex items-center justify-between border border-gray-300 px-4 py-2">
            <input
              type="text"
              name="search"
              id="search"
              placeholder={"Search"}
              className="outline-0 w-full py-3"
            />
            <Search className="cursor-pointer text-gray-600" />
          </div>
          <div className="options">
            <Link
              to={"/"}
              onClick={() => toggleMenu()}
              className="home flex items-center gap-4 border-b border-gray-300 text-gray-500 px-4 py-5 hover:text-gray-800 hover:bg-gray-200 transition-all"
            >
              <Home />
              <span>Home</span>
            </Link>
            <Link
              to={"/dashboard"}
              onClick={() => toggleMenu()}
              className="user flex items-center gap-4 border-b border-gray-300 text-gray-500 px-4 py-5 hover:text-gray-800 hover:bg-gray-200 transition-all"
            >
              <User2 />
              <span>Profile</span>
            </Link>
            <Link
              to={"/product"}
              onClick={() => toggleMenu()}
              className="product flex items-center gap-4 border-b border-gray-300 text-gray-500 px-4 py-5 hover:text-gray-800 hover:bg-gray-200 transition-all"
            >
              <ShoppingCart />
              <span>Products</span>
            </Link>
            <Link
              to={"/cart"}
              onClick={() => toggleMenu()}
              className="cart flex items-center gap-4 border-b border-gray-300 text-gray-500 px-4 py-5 hover:text-gray-800 hover:bg-gray-200 transition-all"
            >
              <ShoppingBag />
              <span>Cart</span>
            </Link>
            <Link
              to={"/user/enquiry"}
              onClick={() => toggleMenu()}
              className="contact flex items-center gap-4 border-b border-gray-300 text-gray-500 px-4 py-5 hover:text-gray-800 hover:bg-gray-200 transition-all"
            >
              <Phone />
              <span>Enquiry</span>
            </Link>
          </div>
          <div className="social px-4 py-5">
            <h3 className="text-gray-600 font-bold mb-7">Follow us on :</h3>
            <div className="flex items-center gap-4">
              <Link to={"https://www.facebook.com/"} target="_blank">
                <div className="hover:bg-blue-500 hover:text-white border-2 border-blue-500 text-blue-500 rounded-full p-2 w-fit cursor-pointer transition-all">
                  <Facebook className="size-5 " />
                </div>
              </Link>
              <Link to={"https://www.instagram.com/"} target="_blank">
                <div className="hover:bg-pink-500 hover:text-white border-2 border-pink-500 text-pink-500 rounded-full p-2 w-fit cursor-pointer transition-all">
                  <Instagram className="size-5 " />
                </div>
              </Link>
              <Link to={"https://www.twitter.com/"} target="_blank">
                <div className="hover:bg-blue-400 hover:text-white border-2 border-blue-400 text-blue-400 rounded-full p-2 w-fit cursor-pointer transition-all">
                  <Twitter className="size-5 " />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* mobile bar end */}
      <Menu
        className="size-8 block mdhidden cursor-pointer"
        onClick={() => toggleMenu()}
      />
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
        <Link
          to={"/user/enquiry"}
          className="contact hidden md:flex items-center justify-center gap-3"
        >
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
