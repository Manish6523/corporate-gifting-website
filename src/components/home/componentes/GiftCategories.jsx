// import React from "react";
// import { Heart, Star } from "lucide-react";
// import { Link } from "react-router";

// const giftCategories = [
//   {
//     title: "Executive Gifts",
//     description: "Premium items for C-suite and VIP clients",
//     image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
//     price: 200,
//     discountPrice: 176,
//     rating: 4.7,
//   },
//   {
//     title: "Employee Welcome Kits",
//     description: "Onboarding packages for new team members",
//     image: "https://i.ibb.co/GQ7JmJMy/asset-9.jpg",
//     price: 100,
//     discountPrice: 88,
//     rating: 4.5,
//   },
//   {
//     title: "Holiday Collections",
//     description: "Seasonal gifts for special occasions",
//     image: "https://i.ibb.co/ycPpRb5K/asset-18.jpg",
//     price: 80,
//     discountPrice: 70,
//     rating: 4.6,
//   },
//   {
//     title: "Tech Accessories",
//     description: "Modern gadgets and accessories",
//     image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
//     price: 150,
//     discountPrice: 132,
//     rating: 4.8,
//   },
// ];

// export const GiftCategories = () => {
//   return (
//     <section className="py-16 px-4 bg-gradient-to-bl from-[#fff7e0]/50 to-[#f5d58c]/10">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-primary">Popular</span> <span className="text-[#5C4400]">Gift Categories</span></h2>
//           <p className="text-muted-foreground text-lg">
//             Discover our curated collections for every occasion and budget
//           </p>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
//           {giftCategories.map((category, index) => {
//             const discountPercent = Math.round(
//               ((category.price - category.discountPrice) / category.price) * 100
//             );

//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1  transition-all duration-300 relative group"
//               >
//                 {/* Discount Badge */}
//                 <div className="absolute top-2 -left-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-r-lg z-10 font-semibold">
//                   {discountPercent}% OFF
//                 </div>

//                 {/* Wishlist Icon */}
//                 <button className="absolute top-2 sm:top-3 right-2 cursor-pointer sm:right-3 z-10 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm border border-gray-100">
//                   <Heart stroke="none" fill="gray"/>
//                 </button>

//                 {/* Product Image */}
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="md:hidden font-semibold text-lg mb-1">{(category.title.length>12)?category.title.slice(0,12)+"..." : category.title}</h3>
//                   <h3 className="md:block hidden font-semibold text-lg mb-1">{category.title}</h3>

//                   {/* Rating */}
//                   <div className="flex items-center gap-1 mb-2">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < Math.round(category.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                     <span className="text-sm text-gray-600 ml-1">({category.rating})</span>
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-3">
//                     <span className="text-lg font-bold text-black mr-2">
//                       ₹{category.discountPrice}.00
//                     </span>
//                     <span className="text-gray-400 line-through text-sm">
//                       ₹{category.price}.00
//                     </span>
//                   </div>

//                   {/* Add to Cart Button */}
//                   <button className="w-full bg-primary hover:bg-[#996f04] text-white font-medium py-2 px-4 rounded">
//                     Add to Cart
//                   </button>

//                   {/* Quick View */}
//                   {/* <Link to="/product/id" className="text-center flex items-center justify-center text-[#ba8c16] mt-2 text-sm cursor-pointer hover:underline">
//                     Quick view
//                   </Link> */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };




// File: components/CorporateGiftCategories.jsx
import React from "react";

const categories = [
  {
    title: "Executive Gifts",
    image: "/Gift Categories/executiveGift.jpg",
  },
  {
    title: "Employee Onboarding Kits",
    image: "/Gift Categories/employeeOnboardkit.jpg",
  },
  {
    title: "Festive Hampers",
    image: "/Gift Categories/festivalgift.jpg",
  },
  {
    title: "Client Appreciation",
    image: "/Gift Categories/clientappreciation.jpeg",
  },
  {
    title: "Wellness & Self-care",
    image: "/Gift Categories/wellness.jpg",
  },
  {
    title: "Eco-Friendly Gifts",
    image: "/Gift Categories/ecofriendlygift.jpg",
  },
];

export const GiftCategories = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
          Popular <span className="text-[#5C4400]">Gift Categories</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all hover:-translate-y-2 duration-300 cursor-pointer`}
            >
             <div>
               <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-45"></div>
             </div>
              <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center ">
                <h3 className="text-white text-2xl font-bold text-center px-2 group-hover:text-[#f0d58a]">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
