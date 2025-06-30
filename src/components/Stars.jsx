import React from "react";

const StarRating = ({ rating,text }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <FullStar key={index} text={text} />;
        } else if (index === fullStars && hasHalfStar) {
          return <HalfStar key={index} text={text} />;
        } else {
          return <EmptyStar key={index} text={text} />;
        }
      })}
    </div>
  );
};

const FullStar = ({text}) => (
  <span className={`text-orange-500 ${text} font-bold`}>★</span>
);

const HalfStar = ({text}) => (
  <span className={`text-orange-500 ${text} font-bold`}>☆</span>
);

const EmptyStar = ({text}) => (
  <span className={`text-gray-300 ${text} font-bold`}>★</span>
);

export default StarRating;