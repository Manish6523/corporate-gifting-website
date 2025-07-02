import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProductToWishList, addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Heart, Plus, Tag } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);

  const imagesArr = product.images.split(", ");
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [activeImage, setActiveImage] = useState(product.thumbnail);

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
  };

  return (
    <div className="card flex flex-col justify-between bg-white max-w-2xs shadow-md  sm:rounded-2xl p-0 sm:p-3 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="images">
        <Link
          to={`/product/${product.id}`}
          className="relative sm:rounded-2xl overflow-hidden block shadow-md shadow-black/20 transition-all hover:scale-[101%]"
        >
          <img
            src={activeImage}
            alt="image"
            draggable="false"
            className="aspect-square bg-gray-200 hover:bg-gray-300 transition-all w-full object-cover"
          />
          <div className="absolute text-sm sm:text-md top-0 left-0 bg-orange-600 text-white font-medium px-2 sm:pl-6 py-1 flex items-center gap-1">
            {product.discountPercentage}% OFF
          </div>
        </Link>

        {imagesArr.length > 0 && (
          <div className="px-1 flex gap-2 mt-3 overflow-x-auto no-scrollbar">
            {imagesArr.slice(0, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => setActiveImage(image)}
                alt={`image-${index + 1}`}
                draggable="false"
                className={`size-14 object-cover rounded-md sm:rounded-lg border ${
                  activeImage === image ? "border-gray-500" : "border-gray-200"
                } hover:border-gray-500 cursor-pointer`}
              />
            ))}
          </div>
        )}
        

      </div>

      <div>
        <div className="p-1 sm:p-0">
          <div className="details my-2 sm:my-5">
            <div className="title font-medium text-md sm:text-xl">
              {product.title}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="tag text-xs font-medium bg-orange-100 mb-1 w-fit px-2 py-[3px] rounded-full text-orange-600">
                {product.tags.split(", ")[0].toUpperCase()}
              </div>
              <div className="tag text-xs font-medium bg-yellow-100 mb-1 w-fit px-2 py-[3px] rounded-full text-yellow-600">
                {product.rating} ★
              </div>
            </div>
          </div>

          <div className="price">
            <div className="flex items-center gap-2 flex-wrap sm:gap-5">
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="button hidden sm:flex gap-0 sm:gap-3 mt-5">
            <button
              onClick={() => addtoCart()}
              className="bg-gray-500 shadow-md hover:-translate-y-1 shadow-black/20 hover:bg-gray-600/90 transition-all w-full cursor-pointer text-white font-medium rounded-md sm:rounded-xl py-3"
            >
              ADD TO CART
            </button>

            <button
              onClick={() => {
                handleWishlistToggle();
              }}
            >
              <div className="p-2 sm:p-3 hover:bg-gray-100 hover:-translate-y-1 transition-all shadow-md cursor-pointer border border-gray-400 rounded-md hover:shadow-xl sm:rounded-xl">
                <Heart
                  className="text-gray-400"
                  strokeWidth={0}
                  fill={
                    isProductInWishlist ? "oklch(64.6% 0.222 41.116)" : "gray"
                  }
                />
              </div>
            </button>
          </div>

          <div className="smbtn sm:hidden flex items-center justify-between gap-0 sm:gap-3 mt-2 sm:mt-5">
            <button
              onClick={() => {
                addtoCart();
              }}
            >
              <div className="p-2 sm:p-3 md:p-4 shadow-md shadow-black/20 cursor-pointer border border-gray-400 rounded-md sm:rounded-xl">
                <Plus className="text-[#808080]" strokeWidth={3} />
              </div>
            </button>

            <button
              onClick={() => {
                handleWishlistToggle();
              }}
            >
              <div className="p-2 sm:p-3 md:p-4 shadow-md shadow-black/20 cursor-pointer border border-gray-400 rounded-md sm:rounded-xl">
                <Heart
                  className="text-gray-400"
                  strokeWidth={0}
                  fill={
                    isProductInWishlist ? "oklch(64.6% 0.222 41.116)" : "gray"
                  }
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
