import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clientLogos = [
  "/Client Logos/Client1.png",
  "/Client Logos/Client2.png",
  "/Client Logos/Client3.png",
  "/Client Logos/Client4.png",
  "/Client Logos/Client5.png",
  "/Client Logos/Client6.png",
  "/Client Logos/Client7.png",
  "/Client Logos/Client8.png",
  "/Client Logos/Client9.png",
  "/Client Logos/Client10.png",
  "/Client Logos/Client11.png",
  "/Client Logos/Client12.png",
  "/Client Logos/Client13.png",
  "/Client Logos/Client14.png",
  "/Client Logos/Client15.png",
  "/Client Logos/Client16.png",
  "/Client Logos/Client17.png",
  "/Client Logos/Client18.png",
  "/Client Logos/Client19.png",
  "/Client Logos/Client20.png",
  "/Client Logos/Client21.png",
];

export const ClientsSlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Our <span className="text-[#5C4400]">Clients</span>
      </h2>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <ChevronLeft />
        </button>

        {/* Scrollable Logos */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-10 cursor-pointer"
        >
          {clientLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-12 object-contain grayscale-0 hover:grayscale-100 transition duration-300 flex-shrink-0"
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
