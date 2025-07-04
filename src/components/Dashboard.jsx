import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import { AddAddress, DeleteAddress, Logout } from "../../utils/Authentication";
import { useNavigate } from "react-router";
import {
  EditIcon,
  LogOut,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User2,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.cart.session);
  const wishlist = useSelector((state) => state.cart.wishList);

  const [toggleAddress, setToggleAddress] = useState(false);

  const [newAddress, setnewAddress] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!sessionUser) {
      navigate("/auth");
    }
  }, [sessionUser]);

  useEffect(() => {
    if (sessionUser?.address?.length === 0) {
      setToggleAddress(false);
    } else {
      setToggleAddress(true);
    }
  }, [sessionUser?.address]);

  const user = {
    username:
      sessionUser?.firstname +
      " " +
      (!!sessionUser?.lastname ? sessionUser?.lastname : ""),
    email: sessionUser?.email,
    phone: sessionUser?.phone,
    address: sessionUser?.address,
    gender: sessionUser?.gender,
    avatar: sessionUser?.avatar,
    member_since: new Date(sessionUser?.created_at).toLocaleDateString("en-GB"),
  };

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
  console.log(sessionUser?.address, "sessionUser address");

  return (
    <main className=" flex justify-center items-center p-0 md:p-8">
      <section className="sm:bg-white  sm:border border-gray-400 grid grid-cols-1 md:grid-cols-2 rounded-xl shadow-xl max-w-6xl w-full overflow-hidden">
        {/* Left */}
        <div className="border-b md:border-r md:border-b-0 border-gray-400 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex items-center justify-between w-full text-center sm:text-left">
              <div>
                <div className="text-2xl font-semibold">{user.username}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <button
                className="border flex items-center gap-2 border-gray-400 hover:bg-gray-100 px-3 py-1 cursor-pointer rounded-lg"
                onClick={() => {
                  Logout(navigate, dispatch);
                }}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-400" />

          <table className="w-full text-sm text-left text-gray-700">
            <tbody>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Email</td>
                <td className="py-2">{user.email}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Username</td>
                <td className="py-2">{user.username}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Phone</td>
                <td className="py-2">{user.phone}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Gender</td>
                <td className="py-2">{user.gender}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">
                  Member Since
                </td>
                <td className="py-2">{user.member_since}</td>
              </tr>
            </tbody>
          </table>

          <div className="h-[1px] w-full bg-gray-400" />

          <div className="text-sm text-gray-500 mb-4">
            <p>Manage your Addresses</p>
          </div>
          {toggleAddress && (
            <>
              <div className="addresses">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                  {sessionUser?.address.map((address, index) => (
                    <div
                      key={index}
                      className="w-full shadow-lg relative hover:-translate-y-1 transition-all flex flex-col gap-3 rounded-3xl p-6 border border-gray-400"
                    >
                      <div className="buttons absolute top-3 right-3 flex gap-2">
                        {/* <button className="text-gray-500 cursor-pointer shadow-md bg-white hover:bg-gray-200 hover:text-gray-700 border border-gray-400 rounded-lg p-1 ">
                          <EditIcon className="size-4 sm:size-5" />
                        </button> */}
                        <button
                          onClick={() => handleDeleteAddress(index)}
                          className="text-gray-500 cursor-pointer shadow-md bg-white hover:bg-gray-200 hover:text-gray-700 border border-gray-400 rounded-lg p-1 "
                        >
                          <Trash2 className="size-4 sm:size-5" color="red" />
                        </button>
                      </div>
                      <span className="flex gap-3 items-center">
                        <User2 strokeWidth={1.5} className=" size-6   " />

                        <span className="">
                          {address.firstname + " " + address.lastname}
                        </span>
                      </span>
                      <span className="flex gap-3 items-center">
                        <Phone
                          strokeWidth={1.5}
                          className="text-gray-500 size-6  "
                        />
                        <span className="text-gray-500">{address.phone}</span>
                      </span>
                      <span className="flex gap-3 items-center">
                        <MapPin
                          strokeWidth={1.5}
                          className="text-gray-500 size-6   "
                        />
                        <span className="text-gray-500">{address.address}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <button
            onClick={() => {
              const dialog = document.querySelector("dialog").showModal();
            }}
            className="text-sm sm:text-base hover:bg-gray-100 cursor-pointer border p-3 border-gray-400 flex gap-3 rounded-xl shadow-lg transition-all"
          >
            <Plus /> Add New Address
          </button>

          <dialog className="rounded-lg shadow-lg bg-white w-full max-w-md m-auto">
            <form method="dialog" className="p-4">
              <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="firstname"
                  value={newAddress.firstname}
                  onChange={(e) =>
                    setnewAddress({
                      ...newAddress,
                      firstname: e.target.value,
                    })
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

              {/* address Fields */}
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setnewAddress({ ...newAddress, phone: e.target.value })
                  }
                />
              </div>
              {/* Add New Address */}
              <div className="flex flex-col">
                <label
                  htmlFor="newAddress"
                  className="text-sm font-medium text-gray-700 mb-1"
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
                  className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      const dialog = document.querySelector("dialog");
                      handleAddress();
                    }}
                    className="mt-2 cursor-pointer w-fit px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    Add Address
                  </button>
                  <button
                    type="button"
                    onClick={() => document.querySelector("dialog").close()}
                    className="mt-2 cursor-pointer w-fit px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </dialog>
        </div>

        {/* Right - Placeholder for Wishlist */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center sm:text-start">
            Wishlist Products
          </h2>

          {wishlist?.length > 0 ? (
            <>
              <div className="h-[1px] w-full bg-gray-400" />

              <div className="grid pr-1 py-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto ">
                {wishlist.map((item, index) => (
                  <WishlistCard key={index} list={item} />
                ))}
              </div>
              <div className="h-[1px] w-full bg-gray-400" />
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              No wishlist items available.
            </p>
          )}
        </div>
      </section>
    </main>
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
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
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
      className="border mb-3 border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Dashboard;
