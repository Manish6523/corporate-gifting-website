import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProductToWishList, addToCart } from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { Heart, ShoppingCart, Star } from "lucide-react";


const ProductCard = ({ product = mockProduct, onImageLoad }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);
  const wishlist = useSelector((state) => state.cart.wishList);
  const [wishList, setWishList] = useState([]);


  const imagesArr = product.images ? product.images.split(", ") : [product.thumbnail];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isProductInWishlist = wishList.some((item) => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent navigation
    if (!session) {
      toast.error("Please login to add products to wishlist!");
      navigate("/auth"); 
      return;
    }
    dispatch(addProductToWishList(product));
    setWishList(prev => 
        isProductInWishlist 
            ? prev.filter(item => item.id !== product.id)
            : [...prev, product]
    );
    toast.success(isProductInWishlist ? "Removed from Wishlist" : "Added to Wishlist!");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!session) {
      toast.error("Please login to add products to cart!");
      navigate("/auth");
      return;
    }
    const productToAdd = { ...product, quantity: 1 };
    dispatch(addToCart(productToAdd));
  };

  return (
    <Link to={`/product/${product.id}`} className="group block w-full max-w-[280px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ">
        <div className="relative overflow-hidden rounded-t-lg">
            {/* --- Image & Hover Effects --- */}
            <img
                src={imagesArr[activeImageIndex]}
                alt={product.title}
                draggable="false"
                onLoad={onImageLoad}
                className="aspect-square bg-gradient-to-br from-primary/60 via-primary/40 to-primary/60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* --- Gradient Overlay for Action Button --- */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* --- Wishlist Button (Top Right) --- */}
            <button
                onClick={handleWishlistToggle}
                className="absolute top-2.5 right-2.5 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-900 cursor-pointer transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle Wishlist"
            >
                <Heart
                    className="text-primary"
                    size={18}
                    fill={isProductInWishlist ? "transparent" : "currentColor"}
                />
            </button>
            
            {/* --- Discount Badge (Top Left) --- */}
            {product.discountPercentage > 0 && (
                <div className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    -{product.discountPercentage}%
                </div>
            )}

            {/* --- Add to Cart Button (Reveals on Hover) --- */}
            <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white text-sm font-bold py-2.5 rounded-md shadow-lg hover:bg-primary/50 cursor-pointer transition-colors"
                    aria-label="Add to Cart"
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>

            {/* --- Image Navigation Dots --- */}
            {imagesArr.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    {imagesArr.slice(0, 5).map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setActiveImageIndex(index);
                        }}
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        activeImageIndex === index ? "bg-white scale-125" : "bg-white/60"
                        }`}
                        aria-label={`View image ${index + 1}`}
                    />
                    ))}
                </div>
            )}
        </div>

        {/* --- Details Section --- */}
        <div className="p-3">
            <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {product.tags.split(",")[0].trim()}
                </span>
                <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold">
                    <span>{product.rating}</span>
                    <Star size={16} fill="yellow" />
                </div>
            </div>
            <h3 className="text-base font-bold text-primary mt-1.5 truncate" title={product.title}>
                {product.title}
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-extrabold text-primary">
                    ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </span>
            </div>
        </div>
    </Link>
  );
};

export default ProductCard;
