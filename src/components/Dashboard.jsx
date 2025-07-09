import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import {
  AddAddress,
  DeleteAddress,
  fetchOrders,
  Logout,
} from "../../utils/Authentication";
import { Link, useNavigate } from "react-router";
import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Eye,
  Hash,
  Heart,
  Home,
  Loader,
  Loader2,
  LogOut,
  LogOutIcon,
  MapPin,
  MapPinIcon,
  Phone,
  Plus,
  ShoppingBasket,
  Trash2,
  User,
  User2,
} from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { div } from "framer-motion/client";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.cart.session);
  const wishlist = useSelector((state) => state.cart.wishList);

  const [orders, setOrders] = useState([]);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [newAddress, setnewAddress] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  const user = {
    id: sessionUser?.id,
    username: sessionUser?.firstname + " " + sessionUser?.lastname,
    email: sessionUser?.email,
    phone: sessionUser?.phone,
    address: sessionUser?.address,
    gender: sessionUser?.gender,
    avatar: sessionUser?.avatar,
    member_since: new Date(sessionUser?.created_at).toLocaleDateString("en-GB"),
  };

  useEffect(() => {
    if (!sessionUser) {
      navigate("/auth");
    }
    const fetchSession = async () => {
      const response = await fetchOrders(user?.id);
      if (response.success) {
        setOrders(response.orders);
      } else {
        toast.error(response.message);
      }
    };

    fetchSession();
  }, [sessionUser]);

  useEffect(() => {
    if (sessionUser?.address?.length === 0) {
      setToggleAddress(false);
    } else {
      setToggleAddress(true);
    }
  }, [sessionUser?.address]);

  const handleAddress = async () => {
    const dialog = document.querySelector("dialog");
    if (
      !newAddress.address ||
      !newAddress.phone ||
      !newAddress.firstname ||
      !newAddress.lastname
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await AddAddress(
      newAddress.address,
      newAddress.phone,
      newAddress.firstname,
      newAddress.lastname,
      dispatch
    );
    dialog.close();

    setnewAddress({
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
    });
  };

  const handleDeleteAddress = (index) => {
    DeleteAddress(index, dispatch);
  };

  return (
    <>
      <main className="container mx-auto p-1 sm:p-4 md:p-8   text-text">
        <header className="mt-24">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <User2 strokeWidth={0.5} size={50} fill="#996f04" /> My Profile
          </h1>
          <div className="flex justify-between items-center p-4 bg-accent/20 rounded-lg shadow-lg">
            <div className="content flex items-center gap-5">
              <img
                src={user.avatar}
                alt="avatar"
                className="rounded-full size-16 bg-primary p-1"
              />
              <div>
                <h2 className="text-md sm:text-lg font-semibold">
                  {user.username}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button onClick={()=>Logout(navigate, dispatch)} className="btn bg-gradient-to-r from-primary to-primary/80  hover:from-primary/80 hover:to-primary/90 hover:-translate-y-0.5 transition-all cursor-pointer shadow-md text-sm sm:text-base text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2">
              <LogOutIcon size={17} />
              Log out
            </button>
          </div>
        </header>
        <section className="mt-8">
          <div className="bg-accent/20 px-4 md:px-12 py-4 rounded-lg shadow-lg">
            {/* ---------- heading ---------- */}
            {orders.length !== 0 && (
              <>
                <div className="heading flex items-center mb-5 gap-3 px-4">
                  <div className="p-2 w-fit rounded-full bg-primary/30">
                    <ShoppingBasket
                      strokeWidth={1.5}
                      className="text-primary size-7"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-text">
                    Recent Orders
                  </h1>
                </div>
                {/* ---------- Cards for mobile ---------- */}
                <div className="grid grid-cols-1 gap-4 md:hidden text-text">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl overflow-hidden border border-primary shadow bg-accent/20 space-y-4"
                    >
                      <div className="flex items-center justify-between bg-primary/50 p-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-semibold">ORDER</p>
                            {order.status === "pending" && (
                              <span className="text-amber-700 bg-amber-100 text-xs font-medium px-2 py-1 rounded-full">
                                Pending
                              </span>
                            )}
                            {order.status === "processing" && (
                              <span className="text-blue-700 bg-blue-100 text-xs font-medium px-2 py-1 rounded-full">
                                Processing
                              </span>
                            )}
                            {order.status === "completed" && (
                              <span className="text-green-700 bg-green-100 text-xs font-medium px-2 py-1 rounded-full">
                                Completed
                              </span>
                            )}
                            {order.status === "cancelled" && (
                              <span className="text-red-700 bg-red-100 text-xs font-medium px-2 py-1 rounded-full">
                                Cancelled
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              #{order.id}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-black">
                            ₹{order.order_pricing.total}
                          </p>
                          <p className="text-xs text-white">Total amount</p>
                        </div>
                      </div>

                      <div className="flex items-center px-4 justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={16} />
                          {new Date(order.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <ShoppingBasket size={16} />
                          {order.products?.length || 3} items
                        </div>
                      </div>

                      <div className="px-4">
                        <p className="text-green-600 font-medium text-sm mb-1">
                          Order Progress
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              order.status === "pending"
                                ? "w-[25%] bg-green-500"
                                : order.status === "processing"
                                ? "w-[50%] bg-blue-500"
                                : order.status === "completed"
                                ? "w-[100%] bg-green-600"
                                : "w-[0%]"
                            }`}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-text">
                          <span>Pending</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-white bg-primary cursor-pointer hover:bg-primary/90 text-sm font-medium rounded-lg shadow">
                          <Eye size={18} />
                          View Order Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* ---------- Table for md+ screens ---------- */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-b-0 border-primary bg-secondary/30 overflow-hidden shadow-lg">
                  <table className="w-full text-white ">
                    <thead>
                      <tr className="bg-primary">
                        <th className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <Hash size={18} />
                            <span className="font-semibold text-sm uppercase tracking-wider">
                              <span className="hidden lg:inline">Order</span> ID
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <CalendarDays size={18} />
                            <span className="font-semibold text-sm uppercase tracking-wider">
                              Date
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <DollarSign size={18} />
                            <span className="font-semibold text-sm uppercase tracking-wider">
                              Total
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 size={18} />
                            <span className="font-semibold text-sm uppercase tracking-wider">
                              Status
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-right">
                          <div className="flex items-center justify-center gap-2">
                            <Eye size={18} />
                            <span className="font-semibold text-sm uppercase tracking-wider">
                              Action
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-text border-b border-primary">
                      {orders.map((order, index) => (
                        <tr
                          className="hover:bg-primary/20 border-b-primary transition-all duration-200"
                          key={index}
                        >
                          <td className="py-4 px-6 text-center">#{order.id}</td>
                          <td className="py-4 px-6 text-center">
                            {order.created_at
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </td>
                          <td className="py-4 px-6 text-center">
                            ₹{order?.order_pricing?.total ?? "N/A"}
                          </td>
                          <td className="py-4 px-6 text-center capitalize">
                            {order.status === "pending" && (
                              <span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                                <Loader2 size={18} className="animate-spin" />
                                Pending
                              </span>
                            )}
                            {order.status === "processing" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                                <Loader2 size={18} className="animate-spin" />
                                Processing
                              </span>
                            )}
                            {order.status === "completed" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 ring-1 ring-green-200">
                                <CheckCircle2 size={18} />
                                Completed
                              </span>
                            )}
                            {order.status === "cancelled" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 ring-1 ring-red-200">
                                <Trash2 size={18} />
                                Cancelled
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button className="inline-flex text-text cursor-pointer items-center gap-2 px-4 py-2 bg-primary/50 border border-primary/60 rounded-lg hover:bg-primary/90 hover:text-white transition-all duration-200 text-sm font-medium shadow-sm hover:shadow">
                              <Eye size={18} />
                              View{" "}
                              <span className="hidden lg:flex">Details</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ---------- Divider ---------- */}
                <div className="w-full flex md:hidden my-3 h-[1px] bg-primary" />
              </>
            )}

            {/* ---------- Addresses ---------- */}

            <div className="bg-secondary/30 my-9 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-primary pb-3 sm:pb-4 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="size-8 sm:w-10 sm:h-10 bg-primary/30 rounded-full flex items-center justify-center">
                      <MapPinIcon className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Saved Addresses
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                        Manage your delivery locations
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => document.querySelector("dialog").showModal()}
                    className="cursor-pointer bg-gradient-to-r from-primary to-primary/80 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:from-primary/80 hover:to-primary/90 transition-all duration-200 shadow-sm sm:shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    <Plus />
                    Add New Address
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Single Address Card */}

                {sessionUser?.address.map((address, index) => (
                  <div key={index} className="group relative border-2 border-primary/20 rounded-lg sm:rounded-2xl p-4 sm:p-5 hover:-translate-y-1 hover:border-primary hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20">
                    {/* Delete Button */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1 sm:gap-2">
                      <button
                        onClick={() => handleDeleteAddress(index)}
                        className="p-1.5 sm:p-2 cursor-pointer bg-primary rounded-lg shadow-md hover:shadow-lg hover:bg-primary/50 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="pr-6 sm:pr-8">
                      <h3 className="flex items-center gap-2 font-bold text-gray-900 text-base sm:text-lg mb-1">
                        <User2 className="w-5 h-5" />
                        {address.firstname} {address.lastname}
                      </h3>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <p className="leading-relaxed">{address.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <p>{address.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {sessionUser?.address.length == 0 && (
                <div className="text-center py-8 sm:py-12">
                  {/* Icon Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Home className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>

                  {/* Heading */}
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                    No saved addresses yet
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6">
                    Add your first address to get started
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => {
                      const dialog = document
                        .querySelector("dialog")
                        .showModal();
                    }}
                    className="inline-flex cursor-pointer items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add Your First Address
                  </button>
                </div>
              )}
            </div>
            {/* ---------- wishlist ---------- */}
            <div>
              <div className="flex items-center justify-between mb-5 gap-3 px-4">
                <div className="flex items-center gap-2">
                  <Heart size={30} fill="red" strokeWidth={0} />
                  <span className="text-2xl font-bold">My Wishlist</span>
                </div>
                <button className="flex items-center gap-1">
                  <Plus size={18} /> Add more
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2 sm:gap-4">
                {wishlist.length > 0
                  ? wishlist.map((item, index) => (
                      <ProductCard key={index} product={item} />
                    ))
                  : wishlist?.length === 0 && (
                      <div className="w-full col-span-2 lg:col-span-4">
                        <div className="mx-auto text-center py-8 sm:py-12 text-text">
                          {/* Icon */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Heart className="text-primary size-8" />
                          </div>

                          {/* Heading */}
                          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                            Your wishlist is empty
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm mb-4 sm:mb-6">
                            Start adding products you love
                          </p>

                          {/* CTA Button */}
                          <Link
                            to="/product"
                            className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm sm:text-base"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Browse Products
                          </Link>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          </div>
        </section>
        <dialog className="rounded-lg shadow-lg bg-background w-full max-w-md m-auto text-text">
          <form method="dialog" className="p-4">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstname"
                value={newAddress.firstname}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, firstname: e.target.value })
                }
                inputClassName="bg-background text-text border border-text/30 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <InputField
                label="Last Name"
                name="lastname"
                value={newAddress.lastname}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, lastname: e.target.value })
                }
                inputClassName="bg-background text-text border border-text/30 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Phone Field */}
            <div className="grid grid-cols-1 gap-4 mt-4">
              <InputField
                label="Phone Number"
                name="phone"
                value={newAddress.phone}
                onChange={(e) =>
                  setnewAddress({ ...newAddress, phone: e.target.value })
                }
                inputClassName="bg-background text-text border border-text/30 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Address Field */}
            <div className="flex flex-col mt-4">
              <label htmlFor="newAddress" className="text-sm font-medium mb-1">
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
                className="bg-background text-text border border-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleAddress();
                  }}
                  className="mt-2 w-fit cursor-pointer px-4 py-2 bg-primary text-background text-sm rounded hover:bg-primary/90 transition"
                >
                  Add Address
                </button>
                <button
                  type="button"
                  onClick={() => document.querySelector("dialog").close()}
                  className="mt-2 w-fit cursor-pointer px-4 py-2 bg-primary text-background text-sm rounded hover:bg-primary/90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </dialog>
      </main>
    </>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  // required ,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      required={true}
      className="border mb-3 border-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

export default Dashboard;
