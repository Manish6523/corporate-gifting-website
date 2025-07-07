import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { supabase } from "../../utils/supabase";
import ProductCard from "./ProductCard";

const LIMIT = 12;

const CategoryPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNumber = 0, replace = false) => {
    const from = pageNumber * LIMIT;
    const to = from + LIMIT - 1;

    try {
      if (replace) setLoading(true);
      else setLoadingMore(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .range(from, to);

      if (error) throw error;

      if (data.length < LIMIT) setHasMore(false);

      setProducts((prev) => (replace ? data : [...prev, ...data]));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setProducts([]);
    setImagesLoaded(0);
    fetchProducts(0, true);
  }, [category]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    fetchProducts(page + 1);
  };

  const allImagesLoaded = imagesLoaded >= products.length;

  return (
    <main className="container mx-auto px-2 sm:px-6 py-10 relative">
      <h1 className="text-3xl font-medium text-gray-800 mb-6 text-center">
        Category:{" "}
        <span className="capitalize">{category.replace("-", " ")}</span>
      </h1>

      {/* Global Loader */}
      {(loading || !allImagesLoaded) && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Loading..."
            className="w-[130px] md:w-[300px] animate-fade-scale"
          />
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 ? (
        <>
          <div
            className={`${
              products.length <= 3
                ? "flex justify-center flex-wrap gap-5"
                : "grid justify-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5"
            } mt-8 px-2 sm:px-0`}
          >
            {products.map((product, idx) => (
              <ProductCard
                key={product.id || idx}
                product={product}
                onImageLoad={handleImageLoad}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2 bg-primary text-text rounded-md font-medium"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold">
              No products in this category.
            </p>
            <Link
              to="/product"
              className="mt-4 inline-block px-4 py-2 bg-primary text-text rounded-md text-sm font-medium"
            >
              Back to All Products
            </Link>
          </div>
        )
      )}
    </main>
  );
};

export default CategoryPage;
