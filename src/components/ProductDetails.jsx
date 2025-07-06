import React, { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) throw error;
        const parsedImages = data.images?.split(", ") || [];
        setProduct({ ...data, images: parsedImages });
        setStock(data.availabilityStatus === "In Stock");
        setQuantity(data.availabilityStatus === "In Stock" ? 1 : 0);
        setActiveImage(parsedImages[0] || data.thumbnail || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Please login to add products to cart.");
      navigate("/auth");
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
  };

  if (loading)
    return (
      <div className="h-[87vh] flex items-center justify-center bg-background">
        <Loader2 className="animate-spin size-14 text-primary" />
      </div>
    );

  return (
    <main className="w-full h-full bg-background text-text">
      <div className="sm:w-[85vw] md:w-[95vw] mx-auto p-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          {/* Image Gallery */}
          <section className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex flex-col gap-2 items-center lg:w-auto w-full">
              {product.images.length > 1 &&
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-full md:w-28 h-28 border rounded cursor-pointer overflow-hidden ${
                      activeImage === img
                        ? "border-primary bg-primary/10"
                        : "border-secondary bg-secondary"
                    }`}
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-center items-center border border-secondary bg-secondary rounded overflow-hidden">
              {activeImage && (
                <img
                  src={activeImage}
                  alt="main preview"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </section>

          {/* Product Details */}
          <section className="space-y-4">
            <div className="text-sm space-y-1  ">
              <div>
                Brand: <span className="font-light">{product.brand || "N/A"}</span>
              </div>
              <div>
                Availability:{" "}
                <span className="font-light">
                  {stock ? `Only ${product.stock} left` : "Out of stock"}
                </span>
              </div>
              <div>
                SKU: <span className="font-light">{product.sku}</span>
              </div>
            </div>

            <h1 className="text-4xl font-medium">{product.title}</h1>

            <div className="text-2xl">
              <StarRating rating={product.rating} text="text-2xl" />
            </div>

            <ul className="list-disc ml-4 space-y-2 text-text">
              {/* warranty, shipping, return */}
            </ul>

            <div className="h-px bg-secondary my-7" />

            <div className="flex flex-wrap gap-2">
              {["depth", "width", "height"].map((dim) => (
                <button
                  key={dim}
                  className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded transition"
                >
                  {`${dim.charAt(0).toUpperCase() + dim.slice(1)}: ${
                    product[`dimensions_${dim}`]
                  }`}
                </button>
              ))}
            </div>

            <div className="h-px bg-secondary my-7" />

            <div>
              <div className="text-xs  ">
                USD (incl. of all taxes):
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl text-text">${product.price}</span>
                <span className="line-through   text-xl">
                  $
                  {(
                    product.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Cart / Enquiry */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Counter
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={stock}
                  maximumstock={product.stock}
                />
                <Link
                  to="/user/enquiry"
                  className="px-8 py-2 border bg-primary text-white rounded text-center"
                >
                  Enquiry
                </Link>
                <button
                  disabled={!stock}
                  onClick={handleAddToCart}
                  className={`px-6 py-2 border rounded ${
                    stock
                      ? "border-primary text-primary hover:bg-primary hover:text-white"
                      : "bg-secondary   cursor-not-allowed"
                  }`}
                >
                  {stock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex justify-center gap-24 border-b border-secondary">
            {["Description", "Reviews"].map((tab, idx) => (
              <span
                key={idx}
                className={`p-3 cursor-pointer font-medium ${
                  activeTab === idx + 1
                    ? "border-b-2 border-primary text-primary"
                    : " "
                }`}
                onClick={() => setActiveTab(idx + 1)}
              >
                {tab}
              </span>
            ))}
          </div>

          {activeTab === 1 ? (
            <div className="font-light w-[90%] md:w-[50%] mx-auto mt-10 text-text">
              {product.description}
            </div>
          ) : (
            <div className="mt-10 w-[95%] md:w-[60%] mx-auto text-text">
              {product.reviews.length > 0 ? (
                product.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="flex gap-4 mb-6 p-5 border-b border-secondary"
                  >
                    <img
                      src={r.reviewerAvatar}
                      alt="avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h1 className="font-semibold text-text text-sm">
                          {r.reviewerName}
                        </h1>
                        <span className="text-xs text-accent">
                          {new Date(r.date).toDateString()}
                        </span>
                      </div>
                      <StarRating rating={r.rating} text="text-xs" />
                      <p className="text-sm leading-relaxed text-text">
                        {r.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center  ">
                  No reviews yet for this product.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
