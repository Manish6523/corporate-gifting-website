import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase.js';
import ProductCard from './ProductCard.jsx';
import { useSelector } from 'react-redux';


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wishlist = useSelector((state) => state.cart.wishList);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, description, price, rating, stock, brand, thumbnail, discountPercentage');

        if (error) throw error;

        setProducts(data);
        console.log('Products fetched:', data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <main className="container md:w-[70vw] mx-auto p-4 b-green-400 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Products</h1>
      <div className='grid gap-4 grid-cols-2 lg:grid-cols-3 '>
        {
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLinked={wishlist.some((item) => item.id === product.id)}
            />
          ))
        }
      </div>
    </main>
  );
};

export default ProductsList;