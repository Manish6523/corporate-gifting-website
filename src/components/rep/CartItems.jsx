import React, { useEffect, useState } from "react";
import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantityFromCartMenu,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  if (!session) return null;

  const HandleAddQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(addQuantityFromCartMenu({ ...item, control: "add" }));
  };

  const handleRemoveQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(addQuantityFromCartMenu({ ...item, control: "remove" }));
    }
  };

  const handleDeleteProduct = () => {
    dispatch(addQuantityFromCartMenu({ ...item, control: "delete" }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Product Info */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div>
          <h4 className="font-semibold text-base">{item.title}</h4>
          <p className="text-primary font-semibold mt-1">${item.price}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-auto gap-4 mt-4 sm:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRemoveQuantity}
            className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={HandleAddQuantity}
            className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Delete + Link */}
        <div className="flex items-center gap-3 text-gray-500">
          <button
            onClick={handleDeleteProduct}
            className="hover:text-primary transition cursor-pointer"
            title="Remove from cart"
          >
            <Trash2 size={18} />
          </button>
          <Link
            to={`/product/${item.id}`}
            className="hover:text-primary transition"
            title="View product"
          >
            <ChevronRight strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
