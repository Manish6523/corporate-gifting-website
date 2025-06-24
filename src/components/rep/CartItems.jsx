import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantityFromCartMenu,
  toggleCart,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);

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
  const deleteItem = () => {
    dispatch(addQuantityFromCartMenu({ ...item, control: "delete" }));
  };

  return (
    <div className="cartItems py-3 pr-5 flex items-start gap-3 border-b-1 border-gray-200 ">
      <div className="left">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.thumbnail}
            alt="title"
            draggable="false"
            className="w-44 aspect-square object-contain cursor-pointer"
            onClick={() => {
              dispatch(toggleCart());
            }}
          />
        </Link>
      </div>
      <div className="right w-full relative">
        <div className="details text-sm flex flex-col gap-1 pr-5">
          <Link
            to={`/product/${item.id}`}
            className="title font-bold hover:underline text-gray-800"
            onClick={() => {
              dispatch(toggleCart());
            }}
          >
            {item.title} {item.brand ? `(${item.brand})` : ""}
          </Link>
          <span className="price text-gray-500">$ {item.price}</span>
        </div>
        <div className="counter mt-6 flex items-center justify-between">
          <div className="flex items-center gap-7 py-1 ">
            <button
              onClick={() => {
                handleRemoveQuantity();
              }}
              className="rounded-full cursor-pointer border border-black bg-white text-black hover:bg-black hover:text-white transition-all p-1"
            >
              <Minus className="size-4 cursor-pointer" />
            </button>
            <span className="max-w-14 text-xl text-center no-spinner outline-0 ">
              {quantity}
            </span>
            <button
              onClick={() => {
                HandleAddQuantity();
              }}
              className="rounded-full cursor-pointer border border-black bg-white text-black hover:bg-black hover:text-white transition-all p-1"
            >
              <Plus className="size-4 cursor-pointer" />
            </button>
          </div>
          <Trash2
            onClick={() => {
              deleteItem();
            }}
            className="cursor-pointer text-red-600 size-5 absolute top-0 right-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
