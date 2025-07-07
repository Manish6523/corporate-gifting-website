import React, { useEffect, useState } from "react";
import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantityFromCartMenu,
  toggleCart,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);

  if (!session) return null;

  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm gap-4 text-sm">
      <div className="flex gap-4 items-start sm:items-center w-full sm:w-auto">
        <Link to={"/product/" + item.id} className="flex-shrink-0">
          <img
            src={item.thumbnail}
            alt="Product"
            className="w-24 h-24 rounded-lg bg-secondary/80 hover:bg-secondary/90 transition-all object-cover"
          />
        </Link>
        <div>
          <p className="font-semibold text-base">{item.title}</p>
          {/* <p className="text-sm text-gray-500">{product}</p> */}
          <div className="flex items-center gap-2 mt-2">
            {/* <span className="line-through text-gray-400 text-sm">
                      ${item.title}
                    </span> */}
            <span className="text-text font-medium">${item?.price}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full sm:w-auto gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRemoveQuantity()}
            className="p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={() => HandleAddQuantity()}
            className="p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleDeleteProduct()}
            className="text-gray-600 cursor-pointer hover:text-black"
          >
            <Trash2 size={16} />
          </button>
          <Link
            to={"/product/" + item.id}
            className="text-gray-600 hover:text-black"
          >
            <ChevronRight strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
