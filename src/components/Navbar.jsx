import { ShoppingCart, User2, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const session = useSelector((state) => state.cart.session);
  const location = useLocation();

  const isHome = !(
    location.pathname === "/dashboard" ||
    location.pathname === "/user/cart" ||
    location.pathname.startsWith("/product/")
  );

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector("#hero")?.offsetHeight || 0;
      setScrolled(window.scrollY > 10);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-white shadow-md";
  const textColorClass = isHome && !scrolled ? "text-white" : "text-primary";
  const hoverColorClass = isHome && !scrolled ? "bg-white" : "bg-primary";
  const logoSrc = isHome && !scrolled ? "/white-logo.png" : "/mahendi-logo.png";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
    >
      <div
        className={`flex items-center justify-between px-6 transition-all ${
          scrolled ? "py-3" : "py-4"
        } ${textColorClass}`}
      >
        {/* Logo */}
        <img src={logoSrc} className="w-32 h-auto cursor-pointer" alt="Logo" />

        {/* Desktop Navigation */}
<<<<<<< HEAD
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
          {/* <Link to="/contact" className="hover:underline">Contact</Link> */}
=======
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/product" className="hover:underline">
            Product
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
>>>>>>> cd09354 (initial)
        </nav>
        {/* <button className="relative text-[#bc8f14] font-bold py-2 px-6 group">
  Enquiry Now
  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#bc8f14] transition-all duration-300 group-hover:w-full"></span>
</button> */}
      
        {/* Desktop Session Links */}
        <div className="hidden md:flex items-center space-x-4">
          {!session ? (
            <Link
              to="/auth"
              className="btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary/90 hover:-translate-y-0.5 transition-all cursor-pointer shadow-md text-sm sm:text-base text-white font-medium px-4 py-1 rounded-lg flex items-center gap-2"
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">
                <User2 strokeWidth={1.5} />
              </Link>
              <Link to="/user/cart" className="hover:underline relative">
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full px-1">
                  {useSelector((state) => state.cart.cart.length)}
                </span>
                <ShoppingCart strokeWidth={1.5} />
                         
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden z-50">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div
            className={`absolute top-full left-0 w-full px-6 py-4 bg-white shadow-lg ${
              isHome && !scrolled ? "text-primary" : "text-primary"
            } md:hidden`}
          >
            <div className="flex flex-col gap-4 font-medium">
<<<<<<< HEAD
              <Link to="/" onClick={toggleMenu} className="hover:underline">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="hover:underline">About</Link>
              <Link to="/contact" onClick={toggleMenu} className="hover:underline">Contact</Link>
              <Link to="/cart" onClick={toggleMenu} className="hover:underline">Cart</Link>
              
=======
              <Link to="/" onClick={toggleMenu} className="hover:underline">
                Home
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="hover:underline"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="hover:underline"
              >
                Contact
              </Link>
              <Link to="/cart" onClick={toggleMenu} className="hover:underline">
                Cart
              </Link>

>>>>>>> cd09354 (initial)
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
                    className="hover:underline flex items-center gap-2"
                  >
                    <ShoppingCart strokeWidth={1.5} /> Cart
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};


export default Navbar;
