import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import General from '../mixins/GeneralFunctions'
import '../style-sheets/HeroCard.css';

function HeroCard({ props, name, customClickEvent, type }) {
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
        title={ props.description ? <div className="hero-card__tooltip"><h4>{name}</h4><p>{props.description}</p></div> : <h4>{name}</h4> } placement="top" arrow enterDelay={400} enterNextDelay={400}>
      <div className={[`${General.getTypeItem(type)}-card`, !customClickEvent ? 'main-card' : '']} onClick={() => customClickEvent(props) }>
        <span />
        <span />
        <span />
        <span />
        <img src={`${props.thumbnail.path}.${props.thumbnail.extension}`} onError={(e)=>{e.target.onerror = null; e.target.src=require('../assets/images/image_not_available.jpeg')}} className={`${General.getTypeItem(type)}-card__image`} alt={ name } />
        <div className={`${General.getTypeItem(type)}-card__name-label`}> { name } </div>
      </div>
    </HtmlTooltip>
  );
}
export default HeroCard;
