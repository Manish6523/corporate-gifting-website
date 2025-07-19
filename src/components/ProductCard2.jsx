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
          className="w-full h-52 object-contain rounded-t-lg bg-gradient-to-br from-primary/60 via-primary/20 to-primary/40 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95 border-b-2 border-primary"
          onLoad={onImageLoad}
        />
        {/* Discount Tag */}
        <div className="absolute top-2 left-2 px-3 py-1 text-xs rounded font-medium bg-yellow-100 text-yellow-800">
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
              className={`size-10 sm:size-12 object-cover rounded cursor-pointer border ${
                activeImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={(e) => handleThumbnailClick(e, image)}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <div className="p-3">
        <h3
          className="text-base sm:text-lg group-hover:underline font-semibold text-gray-800 line-clamp-1"
        >
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex flex-wrap items-center justify-between mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-primary">
              ${product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm line-through font-medium text-gray-400">
              $
              {Math.round(
                product.price / (1 - product.discountPercentage / 100)
              )}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 px-4 w-full cursor-pointer hover:bg-gradient-to-br bg-gradient-to-bl from-primary via-primary/80 to-primary rounded-md text-white transition duration-200 mt-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
