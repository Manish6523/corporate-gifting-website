import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addProductToWishList, addToCart } from "../features/cart/cartSlice";
import { Heart } from "lucide-react";

const ProductCard2 = ({ product, onImageLoad }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.cart.session);
  const wishList = useSelector((state) => state.cart.wishList);

  const imagesArr = product.images?.split(", ") || [];
  const [activeImage, setActiveImage] = useState(
    product.thumbnail || imagesArr[0]
  );

  const isInWishlist = wishList.some((item) => item.id === product.id);

  // --- Event Handlers ---

  // Main navigation handler for the card
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Wishlist button handler
  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    if (!session) {
      toast.error("Login to use wishlist");
      navigate("/auth");
      return;
    }
    dispatch(addProductToWishList(product));
  };

  // Add to cart button handler
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    if (!session) {
      toast.error("Login to add to cart");
      navigate("/auth");
      return;
    }
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // Thumbnail image click handler
  const handleThumbnailClick = (e, image) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    setActiveImage(image);
  };

  return (
    // The entire card is now clickable
    <div
      onClick={handleCardClick}
      className="w-full max-w-xs flex flex-col justify-between rounded-lg shadow-md overflow-hidden relative group bg-white transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-52 object-contain rounded-t-lg bg-gradient-to-br from-primary/40 via-primary/20 to-primary/40 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95 border-b-2 border-primary"
          onLoad={onImageLoad}
        />
        {/* Discount Tag */}
        <div className="absolute top-2 -left-1 px-3 py-1 text-xs rounded font-medium bg-yellow-100 text-yellow-800 hover:text-yellow-900">
          {product.discountPercentage}% OFF
        </div>

        {/* Like Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-white transition"
        >
          <Heart
            className={`size-5 transition-colors ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Slider */}
      {imagesArr.length >= 1 && (
        <div className="flex gap-2 px-2 pt-2 overflow-x-auto no-scrollbar">
          {imagesArr.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumb ${index}`}
              className={`size-10 sm:size-12 object-cover rounded cursor-pointer border border-primary/50 hover:border-primary`}
              onClick={(e) => handleThumbnailClick(e, image)}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <div className="p-3">
        <h3 className="text-base sm:text-lg group-hover:underline font-semibold text-gray-700 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex flex-wrap items-center justify-between mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-700">
              ${product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm line-through font-medium text-gray-400">
              $
              {Math.round(
                product.price / (1 - product.discountPercentage / 100)
              )}
            </span>

            {/* discount price tag */}
            {/* <div className=" px-3 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-900 ml-2">
              {product.discountPercentage.toFixed(2)}% OFF
            </div> */}
          </div>

          {/* <button
            onClick={handleAddToCart}
            className="p-2 px-4 w-full cursor-pointer hover:bg-gradient-to-br bg-gradient-to-bl from-primary via-primary/80 to-primary rounded-md text-white font-semibold transition duration-200 mt-3"
          >
            Add to Cart
          </button> */}

          {/* Browse btn animation */}

          {/* <div className="relative group w-full">
            <button onClick={handleAddToCart} className="bg-[#bc8f14] hover:shadow-md text-white font-bold py-2 px-6 rounded-lg overflow-hidden relative z-10 mt-3 w-full ">
              <span className="relative z-20">Add to Cart</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10" />
            </button>
          </div> */}

          {/* Popular product btn animation */}
          <button
            onClick={handleAddToCart}
            className="relative cursor-pointer text-primary font-semibold py-2 px-6 border-2 border-primary overflow-hidden group w-full rounded-md mt-3"
          >
            <span className="relative z-10 group-hover:text-white">
              Add to Cart
            </span>
            <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
