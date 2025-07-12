import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard2 from "./ProductCard2";
import { X } from "lucide-react";

const categories = [
  "All",
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const LIMIT = 8;

const ProductList = () => {
  const [range, setRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("Price: High to Low");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalFetched, setTotalFetched] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasMore = totalFetched >= page * LIMIT;

  const fetchProducts = async (reset = false) => {
    if (reset) setFetching(true);

    let query = supabase.from("products").select("*");

    if (category !== "All") query = query.eq("category", category);
    query = query.gte("price", range[0]).lte("price", range[1]);

    if (sortBy === "Price: Low to High") {
      query = query.order("price", { ascending: true });
    } else if (sortBy === "Price: High to Low") {
      query = query.order("price", { ascending: false });
    } else if (sortBy === "Newest") {
      query = query.order("created_at", { ascending: false });
    }

    query = query.range(0, page * LIMIT - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(reset ? data : data);
      setTotalFetched(data.length);
    }

    setFetching(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(true);
  }, [range, sortBy, category]);

  useEffect(() => {
    if (page !== 1) fetchProducts();
  }, [page]);

  const FiltersPanel = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "p-6" : ""}`}>
      <h2 className="text-xl font-semibold">Filters</h2>
      <div className="space-y-2">
        <label className="block font-medium text-sm">Category</label>
        <select
          className="w-full p-2 rounded-lg bg-white/80 text-sm shadow-inner"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block font-medium text-sm">Price Range</label>
        <input
          type="range"
          value={range[1]}
          min="0"
          max="10000"
          className="w-full"
          onChange={(e) => setRange([range[0], parseInt(e.target.value)])}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>₹{range[0]}</span>
          <span>₹{range[1]}</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block font-medium text-sm">Sort By</label>
        <select
          className="w-full p-2 rounded-lg bg-white/80 text-sm shadow-inner"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-text">
      {/* Hero */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1702410448780-cbe62c82d55a?q=80&w=1470&auto=format&fit=crop"
          alt="Gift Box Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-16 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
          >
            Celebrate With Style 🎁
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 max-w-xl text-lg md:text-xl text-center text-white/90"
          >
            Premium gifts curated just for your special moments.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 w-fit px-9 py-3 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-xl text-primary hover:bg-primary/20 transition duration-200 shadow-md cursor-pointer"
          >
            Shop Now
          </motion.button>
        </div>
      </div>

      {/* Filter Button for Mobile */}
      <div className="md:hidden px-4 py-2 mt-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full cursor-pointer px-4 py-2 text-sm bg-white/30 text-primary border border-primary rounded-lg"
        >
          Show Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 px-4 md:px-8 lg:px-12 py-4 md:py-12">
        {/* Desktop Filters */}
        <aside className="hidden md:block sticky top-20 h-fit bg-white/30 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <FiltersPanel />
        </aside>

        {/* Product Grid */}
        <main>
          {fetching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
              {[...Array(LIMIT)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/20 rounded-xl p-4 space-y-3 border border-white/10 shadow-inner"
                >
                  <div className="bg-gray-300 h-40 rounded-lg w-full" />
                  <div className="bg-gray-300 h-4 w-3/4 rounded" />
                  <div className="bg-gray-300 h-3 w-1/2 rounded" />
                  <div className="bg-gray-300 h-6 w-full rounded mt-4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
              >
                {products.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard2 product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-6 py-2 cursor-pointer text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    {fetching ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white text-black p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <FiltersPanel isMobile />
            <div className="mt-6">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
