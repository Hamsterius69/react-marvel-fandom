import React from 'react';
import '../style-sheets/Banner.css'; 

function Banner({ isMobile }) {
  return (
    <div className='banner'>
      <img className='banner__image' alt='marvel'
           src={require(`../assets/images/${isMobile ? 'Universo_Marvel.webp' : 'comicBanner.jpeg'}`)}/>
      <div>{isMobile}</div>
    </div>
  );
}

export default Banner;