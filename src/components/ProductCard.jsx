import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProductToWishList, addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);

  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [isLinked, setIsLinked] = useState(false);


  const wishList = useSelector((state) => state.cart.wishList);
  const isProductInWishlist = wishList.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if(!session){
      toast.error("Please login to add products to wishlist!");
      navigate("/auth");
      return;
    }
    dispatch(addProductToWishList({product,navigate}));
  };

  return (
    <div className="bg-white relative p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Wishlist Icon */}
      <div
        className="absolute top-2 left-2 text-white z-[3] cursor-pointer"
        onClick={handleWishlistToggle}
      >
        <img
          src={
            isProductInWishlist
              ? "https://img.icons8.com/?size=100&id=84881&format=png&color=FF0000" // filled heart
              : "https://img.icons8.com/?size=100&id=85038&format=png&color=FF0000" // empty heart
          }
          alt="wishlist"
          className="size-7"
          loading="lazy"
        />
      </div>

      {/* Product Content */}
      <div>
        <Link to={`/product/${product.id}`} className="w-full">
          <img
            src={product.thumbnail || "https://via.placeholder.com/150"}
            alt={product.title}
            className="w-full h-56 object-contain rounded-md mb-4 hover:scale-105 transition-all"
          />
        </Link>

        <h3 className="text-lg font-semibold text-gray-800">
          {product.title || "No Title"}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description || "No Description"}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-lg font-bold text-green-600">
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </span>
          <span className="text-sm text-yellow-500">
            ★ {product.rating ? product.rating.toFixed(1) : "N/A"}
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Stock: {product.stock || "N/A"} | Brand: {product.brand || "N/A"}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <button
          onClick={() =>
            dispatch(addToCart({ ...product, quantity, isLinked }))
          }
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-sm transition-colors"
        >
          Add to Cart
        </button>

        <Link
          to={"/user/enquiry"}
          className="w-full text-center bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-sm transition-colors"
        >
          Enquiry for Bulk
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
