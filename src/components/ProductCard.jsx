import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-full h-48 object-contain rounded-md mb-4 hover:scale-105 transition-all"
        />
      </Link>
      <h3 className="text-lg font-semibold text-gray-800">
        {product.title || "No Title"}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description || "No Description"}
      </p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">
          ${product.price ? product.price.toFixed(2) : "N/A"}
        </span>
        <span className="text-sm text-yellow-500">
          ★ {product.rating ? product.rating.toFixed(1) : "N/A"}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Stock: {product.stock || "N/A"} | Brand: {product.brand || "N/A"}
      </div>
    </div>
  );
};

export default ProductCard;
