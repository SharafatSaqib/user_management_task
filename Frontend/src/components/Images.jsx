// frontend/src/components/Images.js
import React from 'react';
import LazyImage from './LazyImage'; // Import LazyImage
import Image1 from '../assets/education.jpg'
import Image2 from '../assets/health.jpg'
import Image3 from '../assets/home.png'

const Images = () => {
 
  const imageArray = [
   Image1,
    Image2,
    Image3
   
  ];

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">Lazy Loaded Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageArray.map((image, index) => (
          <LazyImage key={index} src={image} alt={`Lazy loaded ${image}`} />
        ))}
      </div>
    </div>
  );
};

export default Images;
