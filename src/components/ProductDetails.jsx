import React, { useEffect, useRef, useState } from "react"; // <-- ✅ useRef added
import "./Spinner.css";
import { Link, useParams } from "react-router";
import { supabase } from "../../utils/supabase.js";
import StarRating from "./Stars.jsx";
import { Loader2, ShoppingCart } from "lucide-react";
import Counter from "./rep/Counter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import { saveCartToSupabase } from "../../utils/cartSupabase.js";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [stock, setStock] = useState();
  const [quantity, setQuantity] = useState(products?.quantity || 1);
  const [isLinked, setIsLinked] = useState(false);

  const addtoCart = () => {
    dispatch(addToCart({ ...products, quantity, isLinked }));
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

        setProducts(data);
        setLoading(false);

        if (data.availabilityStatus === "In Stock") {
          setStock(true);
        } else {
          setStock(false);
        }
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
    <>
      {products && (
        <section className="mx-auto min-h-[87vh] bg-red-white/70 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto md:w-[85vw] justify-items-center">
            <img
              src={products.thumbnail || "https://via.placeholder.com/150"}
              alt={products.title}
              draggable="false"
              style={{ filter: "drop-shadow(0 0 2rem gray)" }}
              className="h-[300px] sm:h-[500px] aspect-square object-contain mb-4"
            />
            <div className="details p-4 flex flex-col rounded-md">
              <span className="text-2xl font-semibold">{products.title}</span>
              <StarRating rating={products.rating} />
              <p className="text-gray-500">{products.brand}</p>
              <div className="price mt-5 text-xl flex flex-col">
                <div>
                  $ {products.price}{" "}
                  <span className="text-sm text-red-500">
                    -{products.discountPercentage}%
                  </span>
                </div>
                <span className="text-sm text-gray-500">Tax included.</span>
              </div>

              <div className="stock flex items-center mt-4">
                <span
                  className={`${
                    stock ? "text-green-700" : "text-red-700"
                  } mr-2`}
                >
                  {stock ? (
                    <svg
                      className="icon-inventory"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                        fill="#D7EDEC"
                      ></path>
                      <path
                        d="M8.79072 14.4239L15.4235 7.70267L14 6.29785L8.79072 11.5766L6.42355 9.17785L5 10.5827L8.79072 14.4239Z"
                        fill="#009688"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="icon-cross"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                        fill="#FDECEA"
                      />
                      <path
                        d="M6 6L14 14M14 6L6 14"
                        stroke="#D32F2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`${
                    stock ? "text-[#009688]" : "text-[#D32F2F]"
                  } font-medium`}
                >
                  {stock ? "In Stock!" : "Out of Stocks"}
                </span>
              </div>

              <div className="description mt-4 text-sm text-gray-700">
                {products.description}
              </div>

              <div className="quantity mt-4 flex items-center gap-7 flex-wrap">
                <label htmlFor="Quantity" className="font-bold">
                  Quantity :
                </label>
                <Counter
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={stock}
                />
                <div className="buttons flex flex-col gap-3 w-full">
                  {stock && (
                    <button
                      className="flex gap-5 cursor-pointer items-center justify-center font-bold border-[1.5px] border-black w-full py-3 transition-all duration-300 bg-black/90 text-white hover:bg-white hover:text-black"
                      onClick={addtoCart}
                    >
                      <ShoppingCart /> Add to cart
                    </button>
                  )}
                  <Link
                    to={"/user/enquiry"}
                    className="flex gap-5 cursor-pointer items-center justify-center font-bold border-[1.5px] border-black w-full py-3 transition-all duration-300 bg-black/90 text-white hover:bg-white hover:text-black"
                  >
                    Enquiry For Bulk Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
