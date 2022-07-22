import React, { useState, useEffect } from 'react';
import '../style-sheets/Banner.css'; 

function Banner() {
  const [imageBanner, setImageBanner] = useState('comicBanner.jpeg')

  useEffect(() => {
    const handleResize = () => {
      console.log('entro al banner resize')
        if (window.innerWidth > 800) {
          setImageBanner('comicBanner.jpeg');
        } else {
          setImageBanner('Universo_Marvel.webp');
        }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='banner'>
      <img className='banner__image' src={require(`../assets/images/${imageBanner}`)} alt='marvel'/>
    </div>
  );
}

export default Banner;