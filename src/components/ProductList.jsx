import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tag, setTag] = useState(1);

  const wishlist = useSelector((state) => state.cart.wishList);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");

        if (error) throw error;

        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

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
          tag == id
            ? "bg-secondary text-text"
            : "bg-text text-secondary" 
        } cursor-pointer rounded-full shadow-md hover:bg-secondary hover:text-text transition-all duration-300`}
        onClick={() => setTag(id)}
      >
        {name}
      </span>
    );
  };

  return (
    <main className="container mx-auto p-0 sm:p-4">
      <h2 className="text-4xl font-bold my-12 text-text px-3 sm:px-0">All Products</h2>
      <div className="selectors flex gap-3 flex-wrap px-3 sm:px-0  ">
        {tags.map((tags, index) => (
          <Tags key={index} name={tags.name} id={tags.id} />
        ))}
      </div>
      <div className=" sm:bg-transparent py-1 px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8 justify-items-center">
        {
          products.slice(1,5).map((product, idx)=>(
            <ProductCard key={idx} product={product} />
          ))
        }
      </div>
    </main>
  );
};

export default ProductsList;
