import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../style-sheets/HeroCard.css'

function HeroCard({ name ,description, thumbnail }) {
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  return (
    <HtmlTooltip title={ description ? <div className="tooltip"><h4>{name}</h4><p>{description}</p></div> : <h4>{name}</h4> } placement="top" arrow enterDelay={800} enterNextDelay={800}>
      <div className='card'>
        <img className='card-image' src={ thumbnail } alt={ name } />
        <div className='name-label'>
          { name }
        </div>
      </div>
    </HtmlTooltip>
  );
}

export default HeroCard;