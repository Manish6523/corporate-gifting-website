import React from "react";
import { Minus, Plus } from "lucide-react";

const Counter = ({ quantity, setQuantity, stock,maximumstock }) => {
  return (
    <div className="flex items-center justify-between  transition-all shadow-sm border border-gray-400">
      <button
        className="cursor-pointer border-r border-gray-400 p-2 hover:bg-gray-200 transition-all duration-300"
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
        disabled={!stock}
        value={quantity}
        className="no-spinner text-center outline-0 min-w-[50px]"
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
        min="1"
        max={maximumstock}
      />
      <button
        className="cursor-pointer border-l border-gray-400 p-2 hover:bg-gray-200 transition-all duration-300"
        disabled={!stock || quantity >= maximumstock}
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
