import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid, ShoppingBasket, MapPin, Heart, LogOut, User, Plus, Trash2, Menu, X, Phone,
  Home
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Assuming these utility functions exist and work as intended
import { fetchOrders, AddAddress, DeleteAddress, Logout } from "../../utils/Authentication";
import ProductCard from "./ProductCard"; // Assuming this component exists

// --- Main Dashboard Component ---
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.cart.session);
  const wishlist = useSelector((state) => state.cart.wishList);

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const user = sessionUser ? {
    id: sessionUser.id,
    username: `${sessionUser.firstname} ${sessionUser.lastname}`,
    email: sessionUser.email,
    avatar: sessionUser.avatar,
    address: sessionUser.address || [],
    member_since: new Date(sessionUser.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long' }),
  } : null;

  useEffect(() => {
    if (!sessionUser) {
      navigate("/auth");
    } else {
      const loadOrders = async () => {
        setLoading(true);
        const response = await fetchOrders(user.id);
        if (response.success) {
          setOrders(response.orders);
        } else {
          toast.error(response.message || "Failed to fetch orders.");
        }
        setLoading(false);
      };
      loadOrders();
    }
  }, [sessionUser, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel user={user} ordersCount={orders.length} wishlistCount={wishlist.length} />;
      case "orders":
        return <OrdersPanel orders={orders} loading={loading} />;
      case "addresses":
        return <AddressPanel addresses={user.address} dispatch={dispatch} />;
      case "wishlist":
        return <WishlistPanel wishlist={wishlist} />;
      default:
        return <OverviewPanel user={user} ordersCount={orders.length} wishlistCount={wishlist.length} />;
    }
  };

  return (
    <div className="min-h-screen pt-17 bg-slate-50 font-sans">
      <div className="flex">
        <DashboardSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// --- Mobile Header ---
const MobileHeader = ({ onMenuClick }) => (
    <header className="md:hidden sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Dashboard</h2>
        <button onClick={onMenuClick} className="p-2">
            <Menu className="text-slate-700" />
        </button>
    </header>
);


// --- Sidebar Component ---
const DashboardSidebar = ({ user, activeTab, setActiveTab, isOpen, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "orders", label: "My Orders", icon: ShoppingBasket },
    { id: "addresses", label: "Address Book", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];
  
  const handleItemClick = (tabId) => {
      setActiveTab(tabId);
      setOpen(false);
  }

  const SidebarContent = () => (
    <div className="flex flex-col md:h-[90%] h-full bg-white">
        {/* <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
            <button onClick={() => setOpen(false)} className="md:hidden p-1">
                <X size={20} />
            </button>
        </div> */}
        <div className="p-6 flex items-center gap-4 border-b border-slate-200">
            <img src={user.avatar} alt="User Avatar" className="w-14 h-14 rounded-full object-cover" />
            <div>
            <p className="font-semibold text-slate-800">{user.username}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
            <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
                <item.icon size={20} />
                <span>{item.label}</span>
            </button>
            ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
            <button
            onClick={() => Logout(navigate, dispatch)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
            <LogOut size={20} />
            <span>Logout</span>
            </button>
        </div>
    </div>
  );

  return (
    <>
        {/* Desktop Sidebar */}
        <aside className="w-64 h-screen shadow-md flex-col sticky top-0 hidden md:flex">
            <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
                <motion.aside 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 md:hidden"
                >
                    <SidebarContent />
                </motion.aside>
            </>
        )}
        </AnimatePresence>
    </>
  );
};

// --- Panel Components ---
const PanelHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h1>
    <p className="text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const OverviewPanel = ({ user, ordersCount, wishlistCount }) => (
  <div>
    <PanelHeader title={`Welcome, ${user.username.split(' ')[0]}!`} subtitle="Here’s a quick summary of your account." />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard icon={ShoppingBasket} title="Total Orders" value={ordersCount} color="primary" />
      <StatCard icon={Heart} title="Items in Wishlist" value={wishlistCount} color="primary" />
      <StatCard icon={User} title="Member Since" value={user.member_since} color="primary" />
    </div>
  </div>
);

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-5">
        <div className={`p-3 bg-${color}/10 rounded-full`}><Icon className={`text-${color}`} size={24}/></div>
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);


const OrdersPanel = ({ orders, loading }) => {
    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    if (orders.length === 0) return <EmptyState icon={ShoppingBasket} title="No Orders Yet" description="Your recent orders will appear here." ctaText="Start Shopping" ctaLink="/product" />;

    return (
        <div>
            <PanelHeader title="My Orders" subtitle="View your order history and status." />
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {orders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-left text-slate-600">Order ID</th>
                                <th className="p-4 font-semibold text-left text-slate-600">Date</th>
                                <th className="p-4 font-semibold text-left text-slate-600">Total</th>
                                <th className="p-4 font-semibold text-left text-slate-600">Status</th>
                                <th className="p-4 font-semibold text-center text-slate-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-500 font-mono">#{order.id}</td>
                                    <td className="p-4 text-slate-800">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="p-4 text-slate-800 font-semibold">₹{order.order_pricing?.total ?? 'N/A'}</td>
                                    <td className="p-4"><OrderStatus status={order.status} /></td>
                                    <td className="p-4 text-center">
                                        <button className="text-primary hover:underline text-sm font-semibold">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const OrderCard = ({ order }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-slate-800">Order #{order.id}</p>
                <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <OrderStatus status={order.status} />
        </div>
        <div className="flex justify-between items-center">
            <p className="text-slate-600">Total Amount</p>
            <p className="font-bold text-lg text-slate-800">₹{order.order_pricing?.total ?? 'N/A'}</p>
        </div>
        <button className="w-full text-center py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors">
            View Details
        </button>
    </div>
);


const OrderStatus = ({ status }) => {
    const statusStyles = {
        pending: "bg-amber-100 text-amber-700",
        processing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
            {status}
        </span>
    );
};

const AddressPanel = ({ addresses, dispatch }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (index) => {
      if (window.confirm("Are you sure you want to delete this address?")) {
        DeleteAddress(index, dispatch);
      }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Address Book</h1>
          <p className="text-slate-500 mt-1">Manage your shipping addresses.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={18} /> <span className="hidden sm:inline">Add New</span>
        </button>
      </div>
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleDelete(index)} className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-full">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="font-bold text-slate-800 mb-3">{addr.firstname} {addr.lastname}</p>
              <div className="space-y-2 text-slate-600 text-sm">
                <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 flex-shrink-0"/><span>{addr.address}</span></p>
                <p className="flex items-center gap-3"><Phone size={16} /><span>{addr.phone}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={Home} title="No Saved Addresses" description="Add an address to make checkout faster." ctaText="Add Address" onCtaClick={() => setShowModal(true)} />
      )}
      <AnimatePresence>
        {showModal && <AddressModal onClose={() => setShowModal(false)} dispatch={dispatch} />}
      </AnimatePresence>
    </>
  );
};

const WishlistPanel = ({ wishlist }) => (
  <div>
    <PanelHeader title="My Wishlist" subtitle="The products you love, all in one place." />
    {wishlist.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    ) : (
      <EmptyState icon={Heart} title="Your Wishlist is Empty" description="Add items you love to your wishlist to see them here." ctaText="Browse Products" ctaLink="/product" />
    )}
  </div>
);

const EmptyState = ({ icon: Icon, title, description, ctaText, ctaLink, onCtaClick }) => (
    <div className="text-center bg-white p-12 rounded-xl border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="text-slate-500" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-500 mb-6">{description}</p>
        {ctaLink ? (
            <Link to={ctaLink} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <Plus size={18} /> {ctaText}
            </Link>
        ) : (
            <button onClick={onCtaClick} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <Plus size={18} /> {ctaText}
            </button>
        )}
    </div>
);

// --- Address Modal ---
const AddressModal = ({ onClose, dispatch }) => {
    const [newAddress, setNewAddress] = useState({ firstname: "", lastname: "", phone: "", address: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(newAddress).some(field => field === "")) {
            return toast.error("Please fill all fields.");
        }
        setIsSubmitting(true);
        await AddAddress(newAddress.address, newAddress.phone, newAddress.firstname, newAddress.lastname, dispatch);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-slate-800">Add New Address</h3>
                        <button type="button" onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="First Name" name="firstname" value={newAddress.firstname} onChange={handleChange} />
                            <InputField label="Last Name" name="lastname" value={newAddress.lastname} onChange={handleChange} />
                        </div>
                        <InputField label="Phone Number" name="phone" type="tel" value={newAddress.phone} onChange={handleChange} />
                        <InputField label="Full Address" name="address" value={newAddress.address} onChange={handleChange} placeholder="Street, City, State, ZIP Code" />
                    </div>
                    <div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-slate-600 font-semibold hover:bg-slate-200 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:bg-primary/70 flex items-center gap-2">
                            {isSubmitting && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                            Save Address
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      required
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
    />
  </div>
);

export default Dashboard;
