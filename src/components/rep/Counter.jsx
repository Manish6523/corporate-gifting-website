import { Minus, Plus } from "lucide-react";
import React from "react";

const Counter = ({ quantity, setQuantity, stock }) => {
  return (
    <div
      className="flex items-center justify-between hover:bg-white hover:ring-2 ring-gray-400 bg-gray-50 rounded-full p-3 transition-all
    max-w-[200px] hover:border-gray-400 border-black border-[1px] shadow-sm
    
    "
    >
      <button
        className="cursor-pointer"
        disabled={quantity <= 1 || !stock}
        onClick={() => {
          setQuantity(quantity - 1);
        }}
      >
        <Minus className="size-6" />
      </button>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        className="no-spinner text-center outline-0 w-[50px]"
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
        min="1"
      />
      <button
        className="cursor-pointer"
        disabled={!stock}
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <Plus className="size-6" />
      </button>
    </div>
  );
};

export default Counter;
