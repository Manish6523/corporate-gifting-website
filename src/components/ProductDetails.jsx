import React, { useEffect, useRef, useState } from "react";
import "./Spinner.css";
import { Link, useNavigate, useParams } from "react-router";
import { supabase } from "../../utils/supabase.js";
import StarRating from "./Stars.jsx";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import toast from "react-hot-toast";
import Counter from "./rep/Counter.jsx";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [stock, setStock] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const addtoCart = () => {
    if (!session) {
      toast.error("Please login to add products to cart.");
      navigate("/auth");
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;

        const parsedImages = data.images?.split(", ") || [];
        setProduct({ ...data, images: parsedImages });
        console.log("Product data:", data);
        setStock(data.availabilityStatus === "In Stock" ? true : false);
        setQuantity(data.availabilityStatus === "In Stock" ? 1 : 0);
        setActiveImage(parsedImages[0] || data.thumbnail || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading)
    return (
      <div className="h-[87vh] flex items-center justify-center bg-white/70">
        <Loader2 className="animate-spin size-14" />
      </div>
    );

  return (
    <main className="w-full h-full bg-white">
      <main className="sm:w-[85vw] md:w-[95vw] mx-auto p-4 min-h-screen bg-transparent">
        <main className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          <section className="Preview flex flex-col-reverse lg:flex-row gap-4 md:items-start h-fit">
            <div className="subImages w-full lg:w-fit flex lg:flex-col gap-2 justify-between items-center ">
              {product?.images.length !== 1 && product?.images?.map((image, index) => (
                <div
                  className={` size-full md:size-28 border border-gray-400 cursor-pointer ${
                    activeImage === image ? "bg-gray-200 border-gray-500" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveImage(image);
                  }}
                >
                  <img
                    src={image}
                    alt="preview"
                    loading="lazy"
                    draggable="false"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="preview w-full flex justify-center items-center">
              {activeImage && (
                <img
                  src={activeImage}
                  alt="Active Product"
                  loading="lazy"
                  draggable="false"
                  className="max-w-full max-h-full object-contain border border-gray-400 bg-gray-200 rounded"
                />
              )}
            </div>
          </section>
          <section className="details h-full w-full">
            <div className="metaData text-xs">
              <div>
                Brand:{" "}
                <span className="font-light">{product.brand || "N/A"}</span>
              </div>
              <div>
                Availability:{" "}
                <span className="font-light">
                  Only {product.stock} stocks left
                </span>
              </div>
              <div>
                SKU: <span className="font-light">{product.sku}</span>
              </div>
            </div>

            <h1 className="text-4xl my-2 font-medium"> {product.title} </h1>

            <div className="Rateing my-2">
              <StarRating rating={product.rating} text={"text-2xl"} />
            </div>

            <ul className="list-disc ml-4 text-sm text-gray-800">
              <li>
                {product.warrantyInformation ? (
                  <>
                    This product is backed by a{" "}
                    <span className="underline mx-1">
                      {product.warrantyInformation.toLowerCase()}
                    </span>{" "}
                    for worry-free usage.
                  </>
                ) : (
                  `This product does not include any warranty.`
                )}
              </li>
              <li>
                {product.shippingInformation ? (
                  <>
                    Orders are typically shipped within{" "}
                    <span className="underline mx-1">
                      {product.shippingInformation
                        .toLowerCase()
                        .replace("ships in", "")
                        .trim()}
                    </span>{" "}
                    to get your product to you on time.
                  </>
                ) : (
                  `Shipping information is currently unavailable.`
                )}
              </li>
              <li>
                {product.returnPolicy?.toLowerCase().includes("no") ? (
                  `This product is not eligible for return. Please review your order carefully.`
                ) : (
                  <>
                    You may return this product within{" "}
                    <span className="underline mx-1">
                      {product.returnPolicy
                        .toLowerCase()
                        .replace("return policy", "")
                        .trim()}
                    </span>{" "}
                    if you're not satisfied.
                  </>
                )}
              </li>
            </ul>

            <div className=" partition h-[1px] mx-auto my-7 bg-gray-300" />

            <div className="dimentions text-sm flex gap-2 items-center justify-center flex-wrap ">
              <button className="text-orange-500 w-full sm:w-fit px-8 md:px-12 py-3 border border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 ">
                Depth: {product.dimensions_depth}
              </button>
              <button className="text-orange-500 w-full sm:w-fit px-8 md:px-12 py-3 border border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 ">
                Width: {product?.dimensions_width}
              </button>
              <button className="text-orange-500 w-full sm:w-fit px-8 md:px-12 py-3 border border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 ">
                Height: {product?.dimensions_height}
              </button>
            </div>

            <div className=" partition h-[1px] mx-auto my-7 bg-gray-300" />

            <div className="pricing">
              <div className="text-xs">USD(incl. of all taxes):</div>
              <div className="my-2 flex items-center gap-3">
                <span className="text-3xl">$ {product?.price}</span>
                <span className="line-through text-gray-500 text-xl">
                  ${" "}
                  {(
                    product?.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="counter_buttons my-7 flex flex-wrap items-center gap-7 ">
              <Counter
                quantity={quantity}
                setQuantity={setQuantity}
                stock={stock}
                maximumstock={product?.stock}
              />
              <div className="flex items-center flex-wrap gap-1 w-full sm:w-fit">
                <Link to={'/user/enquiry'} className="text-center px-8 py-2 w-full sm:w-fit cursor-pointer border text-white bg-orange-700 border-orange-700">
                  Enquity
                </Link>
                <button
                  disabled={!stock}
                  onClick={()=>{addtoCart()}}
                  className={`px-6 py-2 border w-full sm:w-fit
                    ${
                      stock
                        ? "text-orange-700 border border-orange-700 cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }
                `}
                >
                  {stock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </section>
        </main>
        <main className="tabs my-10">
          <div className="toggler border-b-[1px] border-gray-300 flex items-center justify-center gap-24">
            <span
              className={`p-3 font-medium cursor-pointer ${
                activeTab === 1
                  ? "border-b border-orange-600"
                  : "border-b border-transparent"
              } bg-transparent`}
              onClick={() => setActiveTab(1)}
            >
              Description
            </span>
            <span
              className={`p-3 font-medium cursor-pointer ${
                activeTab !== 1
                  ? "border-b border-orange-600"
                  : "border-b border-transparent"
              } bg-transparent`}
              onClick={() => setActiveTab(2)}
            >
              Reviews
            </span>
          </div>
          {activeTab === 1 && (
            <div className="displayConten font-light w-[90%] md:w-[50%] mx-auto mt-10">
              {product.description}
            </div>
          )}
          {activeTab === 2 && (
            <div className="reviews w-[95%] md:w-[60%] mx-auto mt-10">
              {product.reviews && product.reviews.length > 0 ? (
                [...product.reviews].reverse().map((review, index) => (
                  <div
                    key={index}
                    className="review flex gap-4 mb-6 p-5 border-b border-gray-200"
                  >
                    <img
                      src={review.reviewerAvatar}
                      alt="avatar"
                      className="size-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h1 className="text-sm font-semibold text-gray-800">
                          {review.reviewerName}
                        </h1>
                        <span className="text-xs text-gray-400">
                          {new Date(review.date).toDateString()}
                        </span>
                      </div>
                      <StarRating rating={review.rating} text={"text-xs"} />
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-6">
                  No reviews yet for this product.
                </p>
              )}
            </div>
          )}
        </main>
      </main>
    </main>
  );
};

export default ProductDetails;
