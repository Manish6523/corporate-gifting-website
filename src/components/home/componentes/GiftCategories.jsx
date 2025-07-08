// File: src/components/GiftCategories.jsx
import React from "react";

const giftCategories = [
  {
    title: "Executive Gifts",
    description: "Premium items for C-suite and VIP clients",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    price: "From $50",
  },
  {
    title: "Employee Welcome Kits",
    description: "Onboarding packages for new team members",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    price: "From $25",
  },
  {
    title: "Holiday Collections",
    description: "Seasonal gifts for special occasions",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887943?w=400&h=300&fit=crop",
    price: "From $15",
  },
  {
    title: "Tech Accessories",
    description: "Modern gadgets and accessories",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
    price: "From $30",
  },
];

export const GiftCategories = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Gift Categories</h2>
          <p className="text-muted-foreground text-lg">
            Discover our curated collections for every occasion and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftCategories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <span className="bg-yellow-100 w-[50%] text-yellow-800 px-2 py-1 text-sm rounded-full text-center">
                    {category.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};