import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../style-sheets/HeroCard.css';
import { Img } from 'react-image';

function HeroCard({ props, name, customClickEvent }) {
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
    <HtmlTooltip 
        title={ props.description ? <div className="tooltip"><h4>{name}</h4><p>{props.description}</p></div> : <h4>{name}</h4> } placement="top" arrow enterDelay={400} enterNextDelay={400}>
      <div className='card' onClick={() => customClickEvent(props) }>
        <Img src={[`${props.thumbnail.path}.${props.thumbnail.extension}`, require('../assets/images/image_not_available.jpeg')]} className='card-image' alt={ name } />
        <div className='name-label'>
          { name }
        </div>
      </div>
    </HtmlTooltip>
  );
}

export default HeroCard;