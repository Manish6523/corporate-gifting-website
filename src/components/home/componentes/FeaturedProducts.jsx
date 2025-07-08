// const products = [
//   { name: "Leather Diary", image: "/diary.jpg", desc: "Elegant diary for professionals" },
//   { name: "Gift Hamper", image: "/hamper.jpg", desc: "Curated gift set for all occasions" },
//   { name: "Eco Office Kit", image: "/eco.jpg", desc: "Sustainable office essentials" },
// ];

// export default function FeaturedProducts() {
//   return (
//     <section className="p-8 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((prod, index) => (
//           <div key={index} className="bg-white p-4 shadow rounded">
//             <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover mb-4" />
//             <h3 className="text-xl font-semibold">{prod.name}</h3>
//             <p className="text-gray-600">{prod.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }





const products = [
  {
    name: "Luxury Leather Diary",
    image: "https://images.unsplash.com/photo-1602810310591-661d9f0e2232",
    desc: "Premium custom-engraved leather diary."
  },
  {
    name: "Corporate Gift Hamper",
    image: "https://images.unsplash.com/photo-1616627981838-f2bbec5a8489",
    desc: "Curated gift set with mug, pen, diary and snacks."
  },
  {
    name: "Eco-friendly Office Kit",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    desc: "Bamboo pen, seed paper notebook & small plant."
  },
  {
    name: "Branded Powerbank",
    image: "https://images.unsplash.com/photo-1611078489935-d2e8121a9ae5",
    desc: "10000mAh powerbank with your company logo."
  },
];

export default function FeaturedProducts() {
  return (
    <section className="p-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-[#1A237E] mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((prod, index) => (
          <div key={index} className="bg-[#FAFAFA] rounded-lg shadow hover:shadow-lg transition duration-300">
            <img src={prod.image} alt={prod.name} className="w-full h-52 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#1A237E] mb-2">{prod.name}</h3>
              <p className="text-gray-600 text-sm">{prod.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
