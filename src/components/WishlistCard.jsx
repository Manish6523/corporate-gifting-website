import { Plus, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addProductToWishList } from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";

const WishCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.cart.session);
  const wishList = useSelector((state) => state.cart.wishList);
  const isWished = wishList.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!session) return toast.error("Login required");
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const toggleWishlist = () => {
    if (!session) return toast.error("Login required");
    dispatch(addProductToWishList(product));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-[160px] sm:w-[180px] shrink-0 p-2 flex flex-col justify-between hover:shadow-md transition-all">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg aspect-square object-cover w-full bg-gray-100"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-[6px] shadow"
        >
          <Heart
            size={16}
            className="text-red-500"
            fill={isWished ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <p className="font-medium line-clamp-2 leading-snug">{product.title}</p>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-base">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-400 line-through">
            ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-3 bg-primary text-white rounded-md py-2 text-xs font-semibold hover:bg-primary/90 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default WishCard;
