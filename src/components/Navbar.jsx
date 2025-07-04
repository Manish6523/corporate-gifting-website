import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
  X,
  Home,
  User2,
  ShoppingBasket,
  Phone,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const session = useSelector((state) => state.cart.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: 1, slug: "beauty", name: "Beauty" },
    { id: 2, slug: "fragrances", name: "Fragrances" },
    { id: 3, slug: "furniture", name: "Furniture" },
    { id: 4, slug: "groceries", name: "Groceries" },
    { id: 5, slug: "home-decoration", name: "Home Decoration" },
    { id: 6, slug: "kitchen-accessories", name: "Kitchen Accessories" },
    { id: 7, slug: "laptops", name: "Laptops" },
    { id: 8, slug: "mens-shirts", name: "Mens Shirts" },
    { id: 9, slug: "mens-shoes", name: "Mens Shoes" },
    { id: 10, slug: "mens-watches", name: "Mens Watches" },
    { id: 11, slug: "mobile-accessories", name: "Mobile Accessories" },
    { id: 12, slug: "motorcycle", name: "Motorcycle" },
    { id: 13, slug: "skin-care", name: "Skin Care" },
    { id: 14, slug: "smartphones", name: "Smartphones" },
    { id: 15, slug: "sports-accessories", name: "Sports Accessories" },
    { id: 16, slug: "sunglasses", name: "Sunglasses" },
    { id: 17, slug: "tablets", name: "Tablets" },
    { id: 18, slug: "tops", name: "Tops" },
    { id: 19, slug: "vehicle", name: "Vehicle" },
    { id: 20, slug: "womens-bags", name: "Womens Bags" },
    { id: 21, slug: "womens-dresses", name: "Womens Dresses" },
    { id: 22, slug: "womens-jewellery", name: "Womens Jewellery" },
    { id: 23, slug: "womens-shoes", name: "Womens Shoes" },
    { id: 24, slug: "womens-watches", name: "Womens Watches" },
  ];

  useEffect(() => {
    const pathParts = pathname.split("/");
    const categorySlug = pathParts[1];
    const exists = categories.some((c) => c.slug === categorySlug);
    setSelectedCategory(exists ? categorySlug : "");
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    navigate(`/${e.target.value}`);
  };

  // useEffect(() => {
  //   document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  // }, [isMenuOpen]);

  return (
    <nav className={`bg-white fixed top-2 sm:top-4 rounded-lg z-[50] w-[95%] sm:w-[90%] left-1/2 transform -translate-x-1/2 shadow-lg ${!isMenuOpen?"border":"border-0"} px-4 py-3 flex items-center justify-between`}>
      <Menu
        className="size-6 cursor-pointer md:hidden"
        onClick={toggleMenu}
      />
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src="https://i.ibb.co/6cJGsyM1/logo.png"
            alt="logo"
            className="w-28 sm:w-32"
          />
        </Link>
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm"
          />
          <Search className="text-gray-600 cursor-pointer" size={18} />
        </div>
      </div>

      <div className="hidden md:flex gap-6 items-center text-sm">
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-400 px-3 py-2 cursor-pointer rounded"
        >
          <option value="" disabled>
            Category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        {!session ? (
          <>
            <Link to="/auth" className="text-blue-500 text-sm hover:underline">
              Login
            </Link>
            <Link to="/auth" className="text-blue-500 text-sm hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <Link to="/dashboard">
            <img
              src={session.avatar}
              alt="avatar"
              className="size-9 rounded-full object-cover"
            />
          </Link>
        )}
        <button
          onClick={() => dispatch(toggleCart())}
          className="relative mr-2 cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 text-xs bg-black text-white w-5 h-5 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 w-full rounded-lg border bg-white px-4 py-3 flex flex-col gap-5 transition-all md:hidden">
          <div className="flex justify-between items-center border-b pb-3 bg-transparent">
            <img
              src="https://i.ibb.co/6cJGsyM1/logo.png"
              alt="logo"
              className="w-28"
            />
            <X className="cursor-pointer" onClick={toggleMenu} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded"
          />
          <Link
            to="/"
            className="flex gap-3 font-light text-lg items-center"
            onClick={toggleMenu}
          >
            <Home className="size-7 " strokeWidth={1} /> Home
          </Link>
          <Link
            to="/dashboard"
            className="flex gap-3 font-light text-lg items-center"
            onClick={toggleMenu}
          >
            <User2 className="size-7 " strokeWidth={1} /> Profile
          </Link>
          <Link
            to="/product"
            className="flex gap-3 font-light text-lg items-center"
            onClick={toggleMenu}
          >
            <ShoppingBasket className="size-7 " strokeWidth={1} /> Products
          </Link>
          <Link
            to="/cart"
            className="flex gap-3 font-light text-lg items-center"
            onClick={toggleMenu}
          >
            <ShoppingCart className="size-7 " strokeWidth={1} /> Cart
          </Link>
          <Link
            to="/user/enquiry"
            className="flex gap-3 font-light text-lg items-center"
            onClick={toggleMenu}
          >
            <Phone className="size-7 " strokeWidth={1} /> Enquiry
          </Link>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Category
            </option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                onClick={() => setIsMenuOpen(false)}
                value={cat.slug}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
