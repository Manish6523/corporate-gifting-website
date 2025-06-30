import React from "react";
import { Heart, X } from "lucide-react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addProductToWishList } from "../features/cart/cartSlice";

const WishlistCard = ({ list }) => {
  const dispatch = useDispatch();

  const toggleWishlist = () => {
    dispatch(addProductToWishList(list));
  };

  return (
    <div className="group border border-gray-300 rounded-xl relative w-full max-w-[220px] overflow-hidden shadow-md bg-white">
      {/* Image */}
      <Link to={`/product/${list.id}`}>
        <img
          src={list.thumbnail}
          alt={list.title}
          className="w-full h-44 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Heart Icon */}
      <button
      title="remove from wishlist"
        onClick={() => toggleWishlist()}
        className="absolute group top-2 right-2 bg-white p-1 rounded-full shadow z-10 cursor-pointer"
      >
        <Heart size={18} className="text-red-500 hidden sm:block group-hover:hidden" />
        <X size={18} className="text-red-500 block sm:hidden group-hover:block" />
      </button>

      {/* Hover Details */}
      <div className="absolute bottom-0 left-0 w-full bg-white/90 text-black p-3 transform translate-y-full group-hover:translate-y-0 transition duration-300">
        <h4 className="text-sm font-semibold truncate" title={list.title}>
          {list.title}
        </h4>
        <p className="text-xs text-gray-600">{list.brand}</p>
        <p className="text-sm font-medium text-gray-800 mt-1">$ {list.price}</p>
      </div>
    </div>
  );
};

export default WishlistCard;
