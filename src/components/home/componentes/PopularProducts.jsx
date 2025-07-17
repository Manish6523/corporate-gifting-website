import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router";
import { supabase } from "../../../../utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";

export const PopularProducts = () => {
  const session = useSelector((state) => state.cart.session);
  const dispatch = useDispatch();

  const [giftCategories, setGiftCategories] = useState([]);

  const handleAddToCart = (idx) => {
    if (!session) {
      toast.error("Login to add to cart");
      navigate("/auth");
      return;
    }
    dispatch(addToCart({ ...giftCategories[idx], quantity: 1 }));
  };

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "mobile-accessories");

        // Shuffle and take 4
        const randomFour = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setGiftCategories(randomFour);
        console.log("Fetched random products:", randomFour);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchRandomProduct();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-bl from-[#fff7e0] to-[#f5d58c]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Explore Our </span>
            <span className="text-[#5C4400]">Popular Product</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our curated collections for every occasion and budget
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {giftCategories.map((category, idx) => {
            const discountPercent = Math.round(
              ((category.price - category.discountPercentage) /
                category.price) *
                100
            );

            return (
              <div
                key={idx}
                className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group cursor-pointer"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 -left-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-r-lg z-10 font-semibold">
                  {Math.round(category.discountPercentage)}% OFF
                </div>

                {/* Wishlist Icon */}
                {/* <button className="absolute top-2 sm:top-3 right-2 cursor-pointer sm:right-3 z-10 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm border border-gray-100">
                  <Heart stroke="none" fill="gray" />
                </button> */}

                {/* Product Image */}
                <Link to={`/product/${category.id}`}>
                  <img
                    src={category.thumbnail}
                    alt={category.title}
                    className="w-full h-48 object-cover bg-gradient-to-br from-primary/60 via-primary/20 to-primary/40 group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-[200px]">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 truncate">
                      {category.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(category.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({category.rating})
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3">
                      <span className="text-lg font-bold text-black mr-2">
                        ₹
                        {Math.round(
                          category.price -
                            (category.price * category.discountPercentage) / 100
                        )}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{category.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(idx)}
                    className="relative cursor-pointer text-primary font-bold py-2 px-6 border-2 border-primary overflow-hidden group w-full rounded"
                  >
                    <span className="relative z-10 group-hover:text-white">
                      Add to Cart
                    </span>
                    <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
