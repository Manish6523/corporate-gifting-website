import React, { useEffect, useState } from "react";
import { MapPin, Clock, Truck } from "lucide-react";
import { supabase } from "../../utils/supabase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Orders = () => {
  const session = useSelector((state) => state.cart.session);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) {
        toast.error("Please log in to view your orders.");
        navigate("/auth");
        return;
      }
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.id)
          .order("created_at", { ascending: false });
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-[87vh] container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl shadow-md mb-6 p-4 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">
                <strong>Order ID:</strong> {order.id}
              </span>
              <span className="text-sm text-gray-600">
                <Clock size={14} className="inline mr-1" />
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
              <span className="text-sm text-gray-600">
                <MapPin size={14} className="inline mr-1" />
                {order.order_details.address}
              </span>
            </div>
            <div className="mt-2 md:mt-0">
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {order?.order_cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <h2 className="text-sm font-medium text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    ₹{item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 border-t pt-4 text-sm">
            <div className="text-gray-600">
              <Truck className="inline w-4 h-4 mr-1" />
              Estimated Delivery:{" "}
              <span className="font-medium text-gray-800">3-5 days</span>
            </div>
            <div className="text-right text-gray-800 font-bold">
              Total: ₹{order?.order_pricing?.total.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
