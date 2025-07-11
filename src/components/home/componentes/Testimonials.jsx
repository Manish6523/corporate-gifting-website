import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    role: "HR Director",
    content:
      "The quality of gifts and service exceeded our expectations. Our employees loved their welcome packages!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "Global Solutions",
    role: "Marketing Manager",
    content:
      "Professional service and beautiful custom branding. Perfect for our client appreciation campaign.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "StartupXYZ",
    role: "CEO",
    content:
      "Affordable luxury gifts that made a lasting impression on our investors and partners.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

   // Auto-scroll logic
   useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds delay

    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">What Our <span className="text-[#5C4400]">Clients Say</span></h2>
        <p className="text-gray-600 text-lg mb-12">
          Trusted by companies worldwide for their corporate gifting needs
        </p>
        
        <div className="bg-white p-8 rounded shadow-md">
          <div className="flex justify-center mb-4">
            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-lg mb-6 italic">
            "{testimonials[activeTestimonial].content}"
          </blockquote>
          <div>
            <div className="font-semibold">
              {testimonials[activeTestimonial].name}
            </div>
            <div className="text-gray-500">
              {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${index === activeTestimonial ? "bg-yellow-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
