import React from 'react';

// MUI Icons
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function RatingStarComponent({ rating, size }) {
    // Calculate the number of full stars, half stars, and empty stars
    const fullStars = Math.floor(rating); 
    // Check if there is a half star
    const hasHalfStar = rating % 1 >= 0.5;
  
    return (
      <div className="pt-3">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon key={index} className="text-primary pl-2" fontSize={size} />
        ))}
  
        {/* Render half star */}
        {hasHalfStar && <StarHalfIcon className="text-primary pl-2" fontSize="large" />}
  
        {/* Render empty stars */}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <StarBorderIcon key={index + fullStars + (hasHalfStar ? 1 : 0)} className="text-primary pl-2" fontSize={size} />
        ))}
      </div>
    )
}
