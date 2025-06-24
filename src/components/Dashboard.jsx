import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const session = useSelector((state) => state.cart.session);
  const cart = useSelector((state) => state.cart.cart);

  // Dummy fallback data
  const dummy = {
    avatar: 'https://i.pravatar.cc/150?img=12',
    username: 'Manish Sharma',
    email: 'manish@example.com',
    phone: '+91 7016858542',
    address: '123, Main Street, Jaipur, Rajasthan',
    cartLength: cart?.length || 0,
  };

  return (
    <main className='min-h-screen w-full bg-gray-100 p-4 flex flex-col items-center'>
      <h1 className='text-center text-4xl font-bold my-3'>User Dashboard</h1>

      <div className="section flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-6 gap-10 mt-10 w-full max-w-xl">
        {/* Left: Avatar */}
        <div className="left flex justify-center">
          <img
            src={session?.avatar || dummy.avatar}
            alt="avatar"
            className='size-32 rounded-full object-cover border-4 border-gray-300'
          />
        </div>

        {/* Right: Details */}
        <div className="right flex flex-col justify-center gap-2">
          <span className="text-xl font-bold">{session?.username || dummy.username}</span>
          <span className="text-sm text-gray-600">{session?.email || dummy.email}</span>
          <span className="text-sm text-gray-600">📞 {dummy.phone}</span>
          <span className="text-sm text-gray-600">🏠 {dummy.address}</span>
          <span className="text-sm text-gray-600">🛒 Cart Items: {cart?.length || dummy.cartLength}</span>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
