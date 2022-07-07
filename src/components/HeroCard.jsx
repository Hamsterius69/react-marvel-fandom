import React from 'react';
import '../style-sheets/HeroCard.css'

function HeroCard({ name ,description, thumbnail }) {
  return (
    <div className='card'>
      <img className='card-image' src={ thumbnail } alt={ name } />
      <div className='name-label'>
        { name }
      </div>
    </div>
  );
}

export default HeroCard;