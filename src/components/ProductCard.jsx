import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProductToWishList, addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { div } from "framer-motion/client";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);

  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [isLinked, setIsLinked] = useState(false);

  const wishList = useSelector((state) => state.cart.wishList);
  const isProductInWishlist = wishList.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (!session) {
      toast.error("Please login to add products to wishlist!");
      navigate("/auth");
      return;
    }
    dispatch(addProductToWishList(product));
  };
  const addtoCart = () => {
      if (!session) {
        toast.error("Please login to add products to cart!");
        navigate("/auth");
        return;
      } else {
        const productToAdd = {
          ...product,
          quantity: quantity,
        };
        dispatch(addToCart(productToAdd));
      }
  }

  return (
    <div className="card border flex flex-col justify-between">
      <div
        className="image relative border-b cursor-pointer overflow-hidden"
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
      >
        <img
          src={product.thumbnail}
          alt="image"
          className="hover:scale-105 transition-all duration-300
        h-[350px] object-cover"
        />
        <span className="absolute bottom-5 left-5 p-1 text-sm bg-white rounded-full">
          ⭐ {product?.rating}
        </span>
      </div>
      <div className="details p-2 bg-white flex flex-col gap-2 ">
        <div className="flex justify-between ">
          <span className="">{product.title}</span>
          <Heart
            strokeWidth={1.5}
            className="size-5 cursor-pointer"
            onClick={handleWishlistToggle}
            fill={isProductInWishlist ? "red" : "none"}
          />
        </div>
        <div className="desc text-sm text-gray-500">
          {product.description.slice(0, 38) + "..."}
        </div>
        <div className="price flex gap-2 items-center ">
          <span className="text-lg font-semibold text-gray-800">
            ${product.price}
          </span>
          <span className="text-md text-gray-400 line-through">
            $
            {(product?.price * (1 + product.discountPercentage / 100)).toFixed(
              2
            )}
          </span>
          <span className="text-green-400 font-bold">
            {product.discountPercentage}% off
          </span>
        </div>
      </div>
      <div className="buttons border-t">
        <button className="w-1/2 border-r  py-3 hover:bg-black hover:text-white transition-all cursor-pointer">
          Enquiry
        </button>
        <button onClick={()=>addtoCart()} className="w-1/2 py-3 hover:bg-black hover:text-white transition-all cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
