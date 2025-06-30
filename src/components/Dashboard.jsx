import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import { Logout } from "../../utils/Authentication";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.cart.session);
  const wishlist = useSelector((state) => state.cart.wishList);

  useEffect(()=>{
    if (!sessionUser) {
      navigate("/auth");
    }
  },[sessionUser])

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


  return (
    <main className=" flex justify-center items-center p-0 md:p-8">
      <section className="sm:bg-white  sm:border border-gray-300  grid grid-cols-1 md:grid-cols-2 rounded-xl shadow-lg max-w-6xl w-full overflow-hidden">
        {/* Left */}
        <div className="border-b md:border-r md:border-b-0 border-gray-300 p-6 space-y-5">
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
              <button className="border border-gray-300 hover:bg-gray-100 px-3 py-1 cursor-pointer rounded-lg"
              onClick={() => {Logout(navigate, dispatch)}}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-300" />

          <table className="w-full text-sm text-left text-gray-700">
            <tbody>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Email</td>
                <td className="py-2">{user.email}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Phone</td>
                <td className="py-2">{user.phone}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Address</td>
                <td className="py-2">{user.address}</td>
              </tr>
              <tr>
                <td className="font-medium text-black py-2 pr-2">Username</td>
                <td className="py-2">{user.username}</td>
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
        </div>

        {/* Right - Placeholder for Wishlist */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center sm:text-start">Wishlist Products</h2>

          {wishlist?.length > 0 ? (
            <div className="grid pb-4 pr-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto ">
              {wishlist.map((item, index) => (
                <WishlistCard key={index} list={item} />
              ))}
            </div>
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

export default Dashboard;
