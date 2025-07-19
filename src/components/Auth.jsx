import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft, Loader2, UserPlus, LogIn, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Login, SignUp } from "../../utils/Authentication"; // Assuming these are your auth functions
import { motion, AnimatePresence } from "framer-motion";

// --- Main Auth Component ---
const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="relative w-full max-w-5xl h-[655px] flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Left Panel: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm key="login" onSwitch={() => setIsLogin(false)} />
            ) : (
              <SignupForm key="signup" onSwitch={() => setIsLogin(true)} />
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Decorative Image */}
        <div className="hidden md:block w-1/2 relative">
           <img 
             src="https://images.unsplash.com/photo-1720798231559-287de1c8a3e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGdpZnQlMjBiZ2FjaHJvdW5kc3xlbnwwfDF8MHx8fDA%3D"
             alt="Gifts"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-start p-12 text-white">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
              <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">Elegant Gifts</h1>
              <p className="mt-4 text-xl opacity-90 max-w-sm drop-shadow-md">
                Discover the perfect gift for every occasion.
              </p>
             </motion.div>
           </div>
        </div>
      </div>
    </main>
  );
};


// --- Login Form Component ---
const LoginForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      const res = await Login(email, password, navigate, dispatch);
      if (res.success) {
        toast.success("Login successful");
        // Navigate is handled inside Login function
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
        toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
      <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
      <form onSubmit={handleLogin} className="space-y-6">
        <Input field="email" type="email" value={email} onChange={setEmail} placeholder="your.email@example.com" />
        <Input field="password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-primary/70 cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
          <span>Sign In</span>
        </button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-8">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="font-semibold text-primary hover:underline cursor-pointer">
          Sign Up
        </button>
      </p>
    </motion.div>
  );
};

// --- Signup Form Component ---
const SignupForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/avatar/avatar.jpg");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !firstname || !lastname || !phone || !gender) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);
    try {
        // The SignUp function needs to handle file upload or base64 string
        const res = await SignUp(firstname, lastname, email, password, avatarPreview, phone, gender, navigate, dispatch);
        if (res.success) {
            toast.success("Account created successfully! Please log in.");
            onSwitch(); // Switch to login form
        } else {
            toast.error(res.message || "Signup failed");
        }
    } catch(error) {
        toast.error("An unexpected error occurred during signup.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
      <p className="text-gray-500 mb-6">Join us and start gifting today!</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="flex justify-center mb-4">
            <div className="relative">
                <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                    <Edit2 size={16}/>
                </label>
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input field="firstname" value={firstname} onChange={setFirstname} placeholder="John" />
          <Input field="lastname" value={lastname} onChange={setLastname} placeholder="Doe" />
        </div>
        <Input field="email" type="email" value={email} onChange={setEmail} placeholder="your.email@example.com" />
        <Input field="password" type="password" value={password} onChange={setPassword} placeholder="Create a password" />
        <div className="grid grid-cols-2 gap-4">
            <Input field="phone" type="tel" value={phone} onChange={setPhone} placeholder="Phone Number" />
            <Select field="gender" value={gender} onChange={setGender}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </Select>
        </div>

        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-primary/70 mt-4 cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
          <span>Create Account</span>
        </button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-semibold text-primary hover:underline cursor-pointer">
          Sign In
        </button>
      </p>
    </motion.div>
  );
};

// --- Reusable Input Component ---
const Input = ({ field, value, onChange, type = "text", placeholder }) => (
    <div>
        <label htmlFor={field} className="text-sm font-medium text-gray-700 sr-only">{placeholder}</label>
        <input
            id={field}
            name={field}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
        />
    </div>
);

// --- Reusable Select Component ---
const Select = ({ field, value, onChange, children }) => (
    <div>
        <label htmlFor={field} className="text-sm font-medium text-gray-700 sr-only">{field}</label>
        <select
            id={field}
            name={field}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
        >
            {children}
        </select>
    </div>
);


export default Auth;