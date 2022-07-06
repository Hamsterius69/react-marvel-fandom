import React from 'react';
import '../style-sheets/Banner.css'; 

function Banner() {
  return (
    <div className='banner'>
      <img className='image-banner' src={require('../assets/images/Universo_Marvel.webp')} alt='marvel'/>
    </div>
  );
}

export default Banner;