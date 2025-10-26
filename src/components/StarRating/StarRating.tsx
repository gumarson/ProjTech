import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="text-yellow-400">★</span>)}
      {halfStar && <span className="text-yellow-400">☆</span>}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-400">☆</span>)}
    </div>
  );
};

export default StarRating;

