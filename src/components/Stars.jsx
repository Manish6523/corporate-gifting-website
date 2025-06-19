import React from "react";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <FullStar key={index} />;
        } else if (index === fullStars && hasHalfStar) {
          return <HalfStar key={index} />;
        } else {
          return <EmptyStar key={index} />;
        }
      })}
    </div>
  );
};

const FullStar = () => (
  <span className="text-yellow-500 text-xl font-bold">★</span>
);

const HalfStar = () => (
  <span className="text-yellow-500 text-xl font-bold">☆</span>
);

const EmptyStar = () => (
  <span className="text-gray-300 text-xl font-bold">★</span>
);

export default StarRating;