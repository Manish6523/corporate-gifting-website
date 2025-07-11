import React from "react";
import { Gift, Users, Package, Truck } from "lucide-react";

const features = [
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Curated Gift Collections",
    description: "Premium corporate gifts tailored to your brand and budget",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Bulk Ordering",
    description: "Seamless ordering process for large quantities with volume discounts",
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "Custom Branding",
    description: "Personalize gifts with your company logo and custom messaging",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Global Delivery",
    description: "Worldwide shipping with tracking and delivery confirmation",
  },
];

export const Featured = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Our <span className="text-[#5C4400]">Gifting Platform?</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We simplify corporate gifting with our comprehensive platform designed for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary text-white rounded-full">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
