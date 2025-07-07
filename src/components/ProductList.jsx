import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const LIMIT = 12;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // first page loader
  const [fetchingMore, setFetchingMore] = useState(false); // load more loader
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [error, setError] = useState(null);
  const [tag, setTag] = useState(1);

  const wishlist = useSelector((state) => state.cart.wishList);

  const fetchProducts = async (pageNumber = 0) => {
    try {
      const from = pageNumber * LIMIT;
      const to = from + LIMIT - 1;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .range(from, to);

      if (error) throw error;

      if (data.length < LIMIT) setHasMore(false);

      setProducts((prev) => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleLoadMore = () => {
    setFetchingMore(true);
    setPage((prev) => prev + 1);
  };

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allImagesLoaded = imagesLoaded >= products.length;

  const tags = [
    { id: 1, slug: "all-products", name: "All" },
    { id: 6, slug: "kitchen-accessories", name: "Kitchen Accessories" },
    { id: 8, slug: "mens-shirts", name: "Mens Shirts" },
    { id: 9, slug: "mens-shoes", name: "Mens Shoes" },
    { id: 10, slug: "mens-watches", name: "Mens Watches" },
    { id: 11, slug: "mobile-accessories", name: "Mobile Accessories" },
    { id: 12, slug: "motorcycle", name: "Motorcycle" },
    { id: 14, slug: "smartphones", name: "Smartphones" },
    { id: 15, slug: "sports-accessories", name: "Sports Accessories" },
  ];

  const Tags = ({ name, id }) => {
    return (
      <span
        className={`py-2 px-5 ${
          tag === id ? "bg-secondary text-text" : "bg-text text-secondary"
        } cursor-pointer rounded-full shadow-md hover:bg-secondary hover:text-text transition-all duration-300`}
        onClick={() => setTag(id)}
      >
        {name}
      </span>
    );
  };

  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <main className="container mx-auto p-0 sm:p-4 relative">
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Loading..."
            className="w-[130px] md:w-[300px] animate-fade-scale"
          />
        </div>
      )}

      <h2 className="text-4xl font-bold my-12 text-text px-3 sm:px-0">
        All Products
      </h2>

      <div className="selectors flex gap-3 flex-wrap px-3 sm:px-0">
        {tags.map((tagObj, index) => (
          <Tags key={index} name={tagObj.name} id={tagObj.id} />
        ))}
      </div>

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
            {fetchingMore ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading...</span> : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
};

export default ProductsList;
