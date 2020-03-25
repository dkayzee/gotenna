import React from "react";

const Card = ({ image }) => {
  return (
    <div>
      <img src={`https://picsum.photos/id/${image}/400/400`} alt="something" />
      <p>Card Number</p>
    </div>
  );
};

export default Card;
