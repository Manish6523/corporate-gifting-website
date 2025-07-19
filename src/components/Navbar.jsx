import {
  ShoppingCart,
  User2,
  Menu,
  X,
  Home,
  Boxes,
  Info,
  Phone,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);
  const location = useLocation();

  const isHome = ![
    "/dashboard",
    "/user/cart",
    "/user/enquiry",
    "/orderConfirmation",
  ].includes(location.pathname) && !location.pathname.startsWith("/product/");

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    if (isHome) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-white shadow-md";
  const textColorClass = isHome && !scrolled ? "text-white" : "text-primary";
  const hoverColorClass = isHome && !scrolled ? "bg-white" : "bg-primary";
  const logoSrc = isHome && !scrolled ? "/white-logo.png" : "/mahendi-logo.png";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
    >
      <div
        className={`flex items-center justify-between px-4 sm:px-6 py-3 transition-all ${textColorClass}`}
      >
        {/* Logo */}
        <Link to="/">
          <img src={logoSrc} className="w-28 sm:w-32 h-auto" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center space-x-6 font-medium text-base lg:text-lg lg:space-x-8">
          <Link to="/" className="relative  py-0  group">Home
          <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColorClass} transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/product" className="relative  py-0  group">Product
          <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColorClass} transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/about" className="relative  py-0  group">About
          <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColorClass} transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/contact" className="relative  py-0  group">Contact
          <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColorClass} transition-all duration-300 group-hover:w-full`}></span>
          </Link>
        </nav>

        {/* Desktop Session Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <Link
              to="/auth"
              className="btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary/90 transition-all cursor-pointer shadow-md text-sm text-white font-medium px-4 py-1.5 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/dashboard">
                <User2 strokeWidth={1.5} />
              </Link>
              <Link to="/user/cart" className="relative">
                <ShoppingCart strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden cursor-pointer z-50 text-inherit">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 text-primary z-40">
          <div className="flex flex-col gap-4 font-medium text-base">
            <Link
              to="/"
              onClick={toggleMenu}
              className="hover:underline flex items-center gap-2"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              to="/product"
              onClick={toggleMenu}
              className="hover:underline flex items-center gap-2"
            >
              <Boxes size={18} /> Product
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="hover:underline flex items-center gap-2"
            >
              <Info size={18} /> About
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="hover:underline flex items-center gap-2"
            >
              <Phone size={18} /> Contact
            </Link>

            {!session ? (
              <Link
                to="/auth"
                onClick={toggleMenu}
                className="bg-primary text-white px-4 py-2 rounded-lg text-center font-semibold"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="hover:underline flex items-center gap-2"
                >
                  <User2 strokeWidth={1.5} /> Dashboard
                </Link>
                <Link
                  to="/user/cart"
                  onClick={toggleMenu}
                  className="hover:underline flex items-center gap-2 relative"
                >
                  <ShoppingCart strokeWidth={1.5} /> Cart
                  {cart.length > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
