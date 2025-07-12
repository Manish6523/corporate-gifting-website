import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";
import ProductCard2 from "./ProductCard2";

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

const LIMIT = 12;

const ProductList = () => {
  const [range, setRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("Price: High to Low");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [page, setPage] = useState(1);
  const [totalFetched, setTotalFetched] = useState(0);

  const totalImages = products.length;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const fetchProducts = async (reset = false) => {
    if (reset) setLoading(true); // only show loader when filters are changed or page resets

    let query = supabase.from("products").select("*");

    if (category !== "All") {
      query = query.eq("category", category);
    }

    query = query.gte("price", range[0]).lte("price", range[1]);

    if (sortBy === "Price: Low to High") {
      query = query
        .order("price", { ascending: true })
        .order("id", { ascending: true });
    } else if (sortBy === "Price: High to Low") {
      query = query
        .order("price", { ascending: false })
        .order("id", { ascending: false });
    } else if (sortBy === "Newest") {
      query = query.order("created_at", { ascending: false });
    }

    query = query.range(0, page * LIMIT - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(reset ? data : data); // since you're paginating on server-side
      setTotalFetched(data.length);
      setImagesLoaded(0);
    }

    if (reset) setLoading(false); // finish loading if it was a reset
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(true); // initial or filter reset
  }, [range, sortBy, category]);

  useEffect(() => {
    if (page !== 1) fetchProducts(); // on load more, but no loader
  }, [page]);

  return (
<<<<<<< HEAD
    <main className="container mx-auto  sm:p-4 relative">
      {/* Loader overlay */}
      {(loading || !allImagesLoaded) && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <img
            src="/mahendi-logo.png"
            alt="Loading..."
            className="w-[130px] md:w-[300px] animate-fade-scale"
          />
        </div>
      )}

      <h2 className="text-4xl font-bold mt-24 mb-12 text-text px-3 sm:px-0">
        All Products
      </h2>

      <div
        className={`mt-8 px-2 sm:px-0 ${
          products.length <= 3
            ? "flex justify-center flex-wrap gap-4"
            : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 justify-items-center"
        }`}
      >
        {products.map((product, idx) => (
          <ProductCard
            key={product.id || idx}
            product={product}
            onImageLoad={handleImageLoad}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={fetchingMore}
            className="px-6 py-2 bg-primary cursor-pointer text-text rounded-md font-medium"
          >
            {fetchingMore ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Loading...
              </span>
            ) : (
              "Load More"
            )}
=======
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-text">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1702410448780-cbe62c82d55a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gift Box Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-16 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Celebrate With Style 🎁
          </h1>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-center text-white/90">
            Premium gifts curated just for your special moments. Elegant,
            thoughtful, and unforgettable.
          </p>
          <button className="mt-6 w-fit px-9 py-3 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-xl text-primary hover:bg-primary/20 transition duration-200 shadow-md cursor-pointer">
            Shop Now
>>>>>>> cd09354 (initial)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 px-4 md:px-8 lg:px-12 py-10">
        {/* Filter Sidebar */}
        <aside className="hidden md:block sticky top-20 h-fit bg-white/30 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Filters</h2>

          <div className="space-y-2">
            <label className="block font-medium text-sm">Category</label>
            <select
              className="w-full p-2 rounded-lg bg-white/80 text-sm shadow-inner"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === "All" ? "All" : cat}>
                  {cat
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
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
        </aside>

        {/* Product Grid */}
        <main>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
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
                className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
              >
                {products.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard2
                      product={product}
                      onImageLoad={handleImageLoad}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalFetched >= page * LIMIT && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
