import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeftCircle, Pen, Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import { Login, SignUp } from "../../utils/Authentication";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = login, 2 = signup (full form)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("/avatar/avatar.jpg");
  const [gender, setGender] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    const res = await Login(email, password, navigate, dispatch);
    if (res.success) {
      toast.success("Login successful");
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    if (!email || !password || !firstname || !lastname || !address || !phone || !gender){
      return toast.error("Please fill in all fields");
    }
    const res = await SignUp(
      firstname,
      lastname,
      email,
      password,
      avatar,
      address,
      phone,
      gender,
      navigate,
      dispatch
    );
    if (res.success) {
      toast.success("User created successfully");
      setStep(1); // Go back to login step
    }

  };

  return (
    <main className="bg-[url('/bgs/gpt.png')]  bg-cover bg-center bg-no-repeat h-screen w-screen flex items-center justify-center">
      <div className="h-full sm:h-[90%] w-full sm:w-[95%] max-w-6xl  shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* <span
          className="fixed top-5 left-5 cursor-pointer z-10"
          onClick={() => (step === 1 ? navigate("/") : setStep(1))}
        >
          <ArrowLeftCircle className="size-10 sm:size-8" strokeWidth={1} />
        </span> */}

        {/* Left or Right: Login or Signup */}
        {step === 1 ? (
          <>
            <div className="flex flex-col justify-center px-8 py-12 md:px-12 backdrop-blur-lg overflow-y-auto">
              <form onSubmit={handleLogin} className="space-y-6">
                <h1 className="text-3xl flex flex-col items-start font-bold mb-6 ">
                  <span>Welcome back to </span>
                  <span className="text-orange-700 font-medium">
                    Elegant Gifts 🎁
                  </span>
                </h1>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                  required
                />
                <button className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md">
                  Login
                </button>
                <p className="text-sm text-center">
                  Don't have an account?{" "}
                  <span
                    className="text-orange-500 cursor-pointer"
                    onClick={() => setStep(2)}
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <img
                src="/bgs/gpt.png"
                alt="Authentication"
                className="w-full h-full object-cover transform -scale-x-100"
              />
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center justify-center">
              <img
                src="/bgs/gpt.png"
                alt="Authentication"
                className="w-full h-full object-cover transform -scale-x-100"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 md:px-12 backdrop-blur-lg overflow-y-auto">
              <form onSubmit={handleSignup} className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                  <span>Create your account on </span>
                  <span className="text-orange-700 font-semibold">
                    Elegant Gifts 🎁
                  </span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="eg. johnDoe@xyz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sm:col-span-2 p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="sm:col-span-2 p-2 border rounded-md focus:border-orange-500 focus:outline-none"
                    required
                  />
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      name="avatar"
                      onChange={handleAvatarChange}
                      className="p-2 border rounded-md focus:border-orange-500 focus:outline-none hidden"
                    />
                  <div className="flex items-center gap-4 flex-wrap sm:col-span-2">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="p-2 h-fit border rounded-md focus:border-orange-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="relative size-18 mt-2">
                      {/* Avatar Image */}
                      {avatar && (
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full rounded-full object-cover border"
                        />
                      )}

                      {/* Pencil Icon as Label */}
                      <label
                        htmlFor="avatar"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100 transition"
                      >
                        <Pen className="w-4 h-4 text-gray-700" />
                      </label>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-md">
                  Create Account
                </button>
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <span
                    className="text-orange-500 cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Auth;
