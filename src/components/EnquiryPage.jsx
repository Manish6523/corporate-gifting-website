import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { calculate_total } from "../features/cart/cartSlice";

const EnquiryPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const price = useSelector((state) => state.cart.priceData)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(calculate_total())
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[87vh] flex items-center justify-center bg-white/70">
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          Loading...
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[87vh] flex items-center justify-center bg-white/70">
        <h1 className="text-2xl font-semibold text-gray-700">
          Your cart is empty.
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-[87vh] bg-white/70 grid grid-cols-1 md:grid-cols-2">
      {/* Right side (Estimate) first on mobile */}
      <div className="right p-5 md:p-0 order-1 md:order-2 mt-7 relative">
        <h1 className="w-full text-center text-3xl font-semibold mb-9">
          Your Estimate
        </h1>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-sm text-gray-600">
              <th className="px-5 py-2">No</th>
              <th className="text-center px-5 py-2">Product</th>
              <th className="text-end px-5 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((e, i) => (
              <tr key={e.id} className="border-b border-gray-300 text-sm">
                <td className="px-5">{i + 1}.</td>
                <td className="py-2">
                  <div className="flex items-center gap-3">
                    <Link to={`/product/${e.id}`}>
                      <img
                        src={e.thumbnail}
                        alt={e.title}
                        className="w-24 h-24 object-contain"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link
                        to={`/product/${e.id}`}
                        className="text-sm md:text-base font-semibold text-gray-800 hover:underline"
                      >
                        {e.title}
                      </Link>
                      <p className="text-xs text-gray-600">
                        Quantity: {e.quantity}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end py-4 px-5 font-medium text-gray-700">
                  ${e.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total sticky w-full bottom-0 left-0 bg-white px-5 py-2 border-t border-gray-300">
          <div className="flex justify-between text-gray-700 text-sm mb-2">
            <span>Subtotal:</span>
            <span>${price.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm mb-2">
            <span>GST (8%):</span>
            <span>${price.gst}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Total:</span>
            <span>${price.total}</span>
          </div>
        </div>
      </div>

      {/* Left side (Form) second on mobile */}
      <div className="left  md:order-1 border-r border-gray-300">
        <h1 className="w-full text-center text-3xl font-semibold mb-9 mt-7">
          Details
        </h1>
        <form
          action=""
          className="flex flex-col gap-6 p-6 w-full max-w-3xl mx-auto"
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="John"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Doe"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="e.g. 9876543210"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Company Name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company Pvt. Ltd."
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Describe your requirement..."
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EnquiryPage;
