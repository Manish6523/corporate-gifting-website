import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// --- UI & Icons ---
import { Loader2, ShoppingCart, Info } from "lucide-react";
import StarRating from "./Stars.jsx";
import Counter from "./rep/Counter.jsx";

// --- Redux ---
import { addToCart } from "../features/cart/cartSlice.js";
import { supabase } from "../../utils/supabase.js";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.cart.session);

  // --- Component State ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

          console.log("Fetched product data:", data);
          
        if (error) throw error;

        const parsedImages = data.images?.split(", ") || [];
        setProduct({ ...data, images: parsedImages });
        setActiveImage(parsedImages[0] || data.thumbnail);
        if (data.availabilityStatus !== "In Stock") {
          setQuantity(0);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- Event Handlers ---
  const handleAddToCart = () => {
    if (!session) {
      toast.error("Please login to add items to your cart.");
      navigate("/auth");
      return;
    }
    if (quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
      toast.success(`${product.title} added to cart!`);
    }
  };

  // --- Derived State ---
  const isInStock = product?.availabilityStatus === "In Stock";
  const originalPrice = (
    product?.price * (1 + product?.discountPercentage / 100)
  ).toFixed(2);

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  // --- Render Error/Not Found State ---
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-text gap-4">
        <h2 className="text-2xl font-semibold">Product Not Found</h2>
        <p className="text-text/70">
          We couldn't find the product you're looking for.
        </p>
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <main className="bg-gradient-to-br from-primary/50 via-primary/10 to-primary/30 text-text pt-15 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="text-sm text-text/60 mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/product" className="hover:text-primary">
            Products
          </Link>{" "}
          / <span className="text-text">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ## Image Gallery */}
          <section>
            <div className="border border-primary bg-gradient-to-bl from-primary/60 via-primary/30 to-primary/60 rounded-lg mb-4 flex items-center justify-center p-4 h-96">
              <img
                src={activeImage}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-24 h-24 border-2 rounded-md cursor-pointer p-1 transition-all ${
                    activeImage === img
                      ? "border-primary"
                      : "border-secondary hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ## Product Information & Actions */}
          <section className="flex flex-col gap-y-5">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {product.brand || "Generic"}
              </span>
              <h1 className="text-4xl font-bold text-text mt-1">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <StarRating rating={product.rating} />
                <span className="text-sm text-text/60">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-base text-text/80 leading-relaxed">
              {product.description.substring(0, 150)}...
            </p>

            <div className="my-2">
              <span className="text-4xl font-extrabold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-3 text-xl font-medium text-text/50 line-through">
                ${originalPrice}
              </span>
            </div>

            <div className="p-4 bg-secondary/20 border-l-4 border-primary/50 rounded-r-lg space-y-2">
              <div
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.availabilityStatus}
              </div>
              <div className="text-xs text-text/70">
                SKU: {product.sku}
              </div>
              {isInStock && (
                <div className="text-xs text-text/70">
                  Only {product.stock} items left in stock!
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Counter
                quantity={quantity}
                setQuantity={setQuantity}
                stock={isInStock}
                maximumstock={product?.stock}
              />
              <button
                onClick={handleAddToCart}
                disabled={!isInStock || quantity === 0}
                className="flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-all disabled:bg-secondary disabled:text-text/50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                <span>{isInStock ? "Add to Cart" : "Out of Stock"}</span>
              </button>
              <Link
                to="/user/enquiry"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                <Info size={20} />
                <span>Enquiry</span>
              </Link>
            </div>
          </section>
        </div>

        {/* ## Tabs for Description and Reviews */}
        <div className="mt-16">
          <div className="border-b border-secondary flex gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 text-lg font-medium transition-all ${
                activeTab === "description"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text/60 hover:text-primary"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 text-lg font-medium transition-all ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text/60 hover:text-primary"
              }`}
            >
              Reviews
            </button>
          </div>
          <div className="mt-8 text-text/90">
            {activeTab === "description" ? (
              <div className="prose max-w-none text-text/80">
                <p>{product.description}</p>
                <h3 className="text-text font-semibold mt-6">Dimensions</h3>
                <ul className="list-disc pl-5">
                  <li>Width: {product?.dimensions?.width} cm</li>
                  <li>Height: {product?.dimensions?.height} cm</li>
                  <li>Depth: {product?.dimensions?.depth} cm</li>
                </ul>
                <h3 className="text-text font-semibold mt-6">More Info</h3>
                 <ul className="list-disc pl-5">
                  <li>Warranty: {product.warrantyInformation}</li>
                  <li>Shipping: {product.shippingInformation}</li>
                  <li>Return Policy: {product.returnPolicy}</li>
                </ul>
              </div>
            ) : (
              <div>
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 border border-secondary rounded-lg bg-secondary/20"
                      >
                        <img
                          src={`${review.reviewerAvatar}`} // Using an avatar placeholder
                          alt={review.reviewerName}
                          className="w-12 h-12 rounded-full bg-primary/20"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-text">
                              {review.reviewerName}
                            </h4>
                            <span className="text-xs text-text/60">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="my-1">
                             <StarRating rating={review.rating} text="text-sm" />
                          </div>
                          <p className="text-sm text-text/80">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-text/70 py-8">
                    This product has no reviews yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;