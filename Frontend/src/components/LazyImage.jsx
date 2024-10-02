// frontend/src/components/LazyImage.js
import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt }) => {
  const imgRef = useRef();
  const [visible, setVisible] = useState(false);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setVisible(true);
      observer.unobserve(imgRef.current);
    }
  });

  useEffect(() => {
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef]);

  return (
    <img
      ref={imgRef}
      src={visible ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
      alt={alt}
      className='w-40 h-40'
    />
  );
};

export default LazyImage;
