import React, { useEffect, useState } from "react";
import { Loader2, MapPin, Phone, Plus, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { calculate_total, setCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { AddAddress, AddOrder } from "../../utils/Authentication";

const EnquiryPage = () => {
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);
  const price = useSelector((state) => state.cart.priceData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [loadedAddresses, setLoadedAddresses] = useState(
    session?.address || []
  );

  const [enquiryData, setEnquiryData] = useState({
    firstname: session?.address?.[0]?.firstname || "",
    lastname: session?.address?.[0]?.lastname || "",
    phone: session?.address?.[0]?.phone || "",
    address: session?.address?.[0]?.address || "",
    email: session?.email || "",
  });

  const [newAddress, setnewAddress] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!session) {
      toast.error("Please login to proceed with the enquiry.");
      navigate("/auth");
      return;
    }
    dispatch(calculate_total());
    setLoading(false);
  }, []);

  useEffect(() => {
    setToggleAddress(loadedAddresses.length > 0);
  }, [loadedAddresses]);

  const handleOrder = async () => {
    if (!session) {
      toast.error("Please login to place an order.");
      navigate("/auth");
      return;
    }
    if (!enquiryData) {
      toast.error("Please select or add an address.");
      return;
    }
    const response = await AddOrder(enquiryData, cart, price, dispatch);
    if (response.success) {
      toast.success("Order placed successfully!");
      navigate("/orderConfirmation");
      dispatch(setCart([]));
    } else {
      toast.error(response.message || "Failed to place order.");
    }
  };

  const handleAddAddress = async () => {
    const { firstname, lastname, phone, address } = newAddress;
    if (!firstname || !lastname || !phone || !address) {
      toast.error("Please fill in all fields.");
      return;
    }

    const response = await AddAddress(
      address,
      phone,
      firstname,
      lastname,
      dispatch
    );
    if (response.success) {
      setToggleAddress(true);
      const sessionData = JSON.parse(localStorage.getItem("session"));
      setLoadedAddresses(sessionData?.address || []);
    } else {
      toast.error(response.message || "Failed to add address.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[87vh] flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-text text-lg font-medium">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
          Loading...
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[87vh] flex items-center justify-center bg-background">
        <h1 className="text-2xl font-semibold text-text">
          Your cart is empty.
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-18 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
      {/* Right: Your Estimate */}
      <div className="right p-5 md:p-0 order-1 md:order-2 mt-7 relative">
        <h1 className="w-full text-center text-3xl font-semibold mb-9 text-text">
          Your Estimate
        </h1>

        {/* Scrollable Table Container */}
        <div className="w-full overflow-auto max-h-[calc(100vh-18rem)] pr-2">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300 text-sm text-text/70">
                <th className="px-5 py-2">No</th>
                <th className="text-center px-5 py-2">Product</th>
                <th className="text-end px-5 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((e, i) => (
                <tr key={e.id} className="border-b border-gray-300 text-sm">
                  <td className="px-5 text-text/90">{i + 1}.</td>
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
                          className="text-sm md:text-base font-semibold text-text hover:underline"
                        >
                          {e.title}
                        </Link>
                        <p className="text-xs text-text/60">
                          Quantity: {e.quantity}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-end py-4 px-5 font-medium text-text">
                    ${e.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sticky Total */}
        <div className="total sticky w-full bottom-0 left-0 bg-background px-5 py-2 border-t border-gray-300">
          <div className="flex justify-between text-text/80 text-sm mb-2">
            <span>Subtotal:</span>
            <span>${price.subtotal}</span>
          </div>
          <div className="flex justify-between text-text/80 text-sm mb-2">
            <span>GST (8%):</span>
            <span>${price.gst}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-text">
            <span>Total:</span>
            <span>${price.total}</span>
          </div>
        </div>
      </div>

      {/* Left: Form */}
      <div className="left md:order-1 border-r border-gray-300 overflow-y-auto">
        <h1 className="w-full text-center text-3xl font-semibold mb-9 mt-7 text-text">
          Details
        </h1>

        {!toggleAddress && (
          <form className="flex flex-col gap-6 p-6 w-full max-w-3xl mx-auto">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstname"
                value={newAddress.firstname}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, firstname: e.target.value })
                }
              />
              <InputField
                label="Last Name"
                name="lastname"
                value={newAddress.lastname}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, lastname: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <InputField
              label="Phone Number"
              name="phone"
              value={newAddress.phone}
              onChange={(e) =>
                setnewAddress({ ...newAddress, phone: e.target.value })
              }
            />

            {/* Address Field */}
            <div className="flex flex-col">
              <label
                htmlFor="newAddress"
                className="text-sm font-medium text-text mb-1"
              >
                Add New Address
              </label>
              <input
                type="text"
                id="newAddress"
                placeholder="123 Main St, City, State, Zip"
                value={newAddress.address}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, address: e.target.value })
                }
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90 transition"
                >
                  Add Address
                </button>
                <button
                  type="button"
                  onClick={() => setToggleAddress(!toggleAddress)}
                  className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {toggleAddress && (
          <div className="flex flex-col gap-6 p-6 mx-auto">
            <div className="w-full flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
              <h1 className="text-2xl sm:text-3xl font-medium text-text">
                Shipping Information
              </h1>
              <button
                onClick={() => setToggleAddress(false)}
                className="text-sm sm:text-base hover:bg-primary/10 text-primary border border-primary p-3 flex gap-3 rounded-lg transition-all"
              >
                <Plus /> Add New Address
              </button>
            </div>
            <div className="text-xl font-medium text-text">
              Select your address
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto">
              {loadedAddresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedAddressIndex(index);
                    setEnquiryData({
                      ...enquiryData,
                      firstname: address.firstname,
                      lastname: address.lastname,
                      phone: address.phone,
                      address: address.address,
                    });
                  }}
                  className={`w-full sm:max-w-sm shadow-lg cursor-pointer hover:-translate-y-1 transition-all flex flex-col gap-3 rounded-3xl p-6 ${
                    selectedAddressIndex === index
                      ? "border-2 border-primary"
                      : "border border-gray-300"
                  }`}
                >
                  <span className="flex gap-3 items-center text-text">
                    <User2 size={24} />
                    {address.firstname + " " + address.lastname}
                  </span>
                  <span className="flex gap-3 items-center text-text/70">
                    <Phone size={24} />
                    {address.phone}
                  </span>
                  <span className="flex gap-3 items-center text-text/70">
                    <MapPin size={24} />
                    {address.address}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={handleOrder}
              className="bg-primary hover:bg-primary/90 hover:-translate-y-1 transition-all cursor-pointer w-full py-4 rounded-2xl text-white font-bold"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-text mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      required={required}
      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text bg-background"
    />
  </div>
);

export default EnquiryPage;
