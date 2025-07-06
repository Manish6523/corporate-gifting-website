import React from "react";
import { Minus, Plus } from "lucide-react";

const Counter = ({ quantity, setQuantity, stock, maximumstock }) => {
  return (
    <div className="flex items-center justify-between bg-background transition-all shadow-sm border border-secondary text-text rounded">
      <button
        className="cursor-pointer border-r border-secondary p-2 hover:bg-secondary/50 transition-all duration-300 disabled:opacity-40"
        disabled={quantity <= 1 || !stock}
        onClick={() => setQuantity(quantity - 1)}
      >
        <Minus className="size-5 text-text" />
      </button>
      <input
        type="number"
        name="quantity"
        id="quantity"
        disabled={!stock}
        value={quantity}
        className="no-spinner bg-transparent text-center outline-none min-w-[50px] text-text disabled:opacity-40"
        onChange={(e) => {
          let val = Number(e.target.value);
          if (val < 1) val = 1;
          else if (val > maximumstock) val = maximumstock;
          setQuantity(val);
        }}
        min="1"
        max={maximumstock}
      />
      <button
        className="cursor-pointer border-l border-secondary p-2 hover:bg-secondary/50 transition-all duration-300 disabled:opacity-40"
        disabled={!stock || quantity >= maximumstock}
        onClick={() => setQuantity(quantity + 1)}
      >
        <Plus className="size-5 text-text" />
      </button>
    </div>
  );
};

export default Counter;
