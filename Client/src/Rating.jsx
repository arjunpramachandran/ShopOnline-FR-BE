import React, { useState } from "react";
import { FaStar } from "react-icons/fa";


const Rating = ({ rating, count }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              style={{ display: "none" }}
            />
            <FaStar
              size={20}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            />
          </label>
        );
      })}
      <p style={{color:'red',fontStyle:'italic', fontSize:'13px',fontWeight:'200'}}>{`Rating: ${rating} (${count} reviews)`}</p>
    </div>
  );
};

export default Rating;
