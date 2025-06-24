import React, { useState } from "react";
import { Login, SignUp } from "../../utils/Authentication.js";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const session = useSelector((state) => state.cart.session);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleAuth = (action) => {
    if (action === "login") {
      Login(formData.email, formData.password, navigate, dispatch);
      // console.log("session", session);
    }
    if (action === "signup") {
      SignUp(formData.username, formData.email, formData.password, navigate, dispatch);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <section className="w-full max-w-md overflow-hidden h-[400px] rounded-xl shadow-xl backdrop-blur-3xl relative border border-gray-200">
        {/* Slider wrapper */}
        <div
          className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-500 ease-in-out ${
            page == "login" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* Login Form */}
          <div className="w-1/2 px-8 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Welcome Back
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth("login");
              }}
              className="space-y-4"
            >
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="w-full p-3 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-gray-500 outline-0"
              />
              <input
                type="password"
                required
                placeholder="Password"
                minLength={6}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="w-full p-3 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-gray-500 outline-0"
              />
              <button
                type="submit"
                className="w-full p-2 mt-5 text-blue-700 font-bold rounded-lg cursor-pointer border border-blue-700 hover:text-white hover:bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transition-all duration-300"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setPage("signup")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="w-1/2 px-8 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Create Account
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth("signup");
              }}
              className="space-y-4"
            >
              <input
                type="text"
                required
                placeholder="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                className="w-full p-3 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-gray-500 outline-0"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="w-full p-3 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-gray-500 outline-0"
              />
              <input
                type="password"
                required
                placeholder="Password"
                minLength={6}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="w-full p-3 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-gray-500 outline-0"
              />
              <button
                type="submit"
                className="w-full p-2 mt-5 text-blue-700 font-bold rounded-lg cursor-pointer border border-blue-700 hover:text-white hover:bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transition-all duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setPage("login")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
