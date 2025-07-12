import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e5f4e2] to-[#d0e5cd] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 text-center">
        <CheckCircle2 className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Confirmed !</h2>
        <p className="text-sm text-gray-600 mb-2">
          Your order has been placed successfully.{" "}
          <Link to="/dashboard" className="text-green-600 font-medium hover:underline">
            Order History
          </Link>
        </p>

        <Link
          to="/dashboard"
          className="text-green-600 text-sm font-medium hover:underline block mb-6"
        >
          Track My Order
        </Link>

        <Link
          to="/product"
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition"
        >
          Continue Shopping
        </Link>

        <p className="text-xs text-gray-400 mt-6">
          Have any questions? Reach directly to our{" "}
          <Link to="/support" className="text-green-600 hover:underline">
            Customer Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
