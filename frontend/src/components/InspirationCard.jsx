import React, { useState, useEffect } from "react";

const images = [
  "/flower1.jpg", 
  "/flower2.jpg", 
  "/flower3.jpg", 
  "/flower4.jpg", 
  "/flower5.jpg", 
  "/flower6.jpg", 
  "/flower8.jpg", 
  "/flower7.jpg"
];

const InspirationCard = () => {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    // Pick a random image on first load
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl  flex justify-center items-center">
      {currentImage && (
        <img
          src={currentImage}
          alt="Inspiration"
          className="rounded-xl w-full h-68 object-cover"
        />
      )}
    </div>
  );
};

export default InspirationCard;
