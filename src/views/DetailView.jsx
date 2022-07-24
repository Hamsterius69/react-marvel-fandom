/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import '../style-sheets/DetailView.css';
import { selectActiveWord, selectItem, selectKindItem } from '../store/itemToSearch/reduce';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BunchCardsDetails from '../components/BunchCardsDetails';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {

  return {
    word: selectActiveWord(state),
    item: selectItem(state),
    kindItem: selectKindItem(state)
  };
};

function DetailView(props) {
  const [detailsList, setDetailsList] = useState([]);
  const [isMobile, setIsMobile] = useState([false]);

  const navigate = useNavigate();
  const characterDetails = ['comics', 'events', 'series'];
  const comicDetails = ['characters', 'creators', 'events'];
  const creatorDetails = ['comics', 'events', 'series'];
  const eventDetails = ['characters', 'comics', 'creatores', 'series'];
  const serieDetails = ['characters', 'comics', 'creatores', 'events'];

  useEffect(() => {
    switch(props.kindItem) {
      case 'characters':
        setDetailsList(characterDetails);
        break;
      case 'comics':
        setDetailsList(comicDetails);
        break;
      case 'creators':
        setDetailsList(creatorDetails);
        break;
      case 'events':
        setDetailsList(eventDetails);
        break;
      case 'series':
        setDetailsList(serieDetails);
        break;
      default:
        break;
    }
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const handleResize = () => {
    navigateTop();
    const topBtn = document.getElementById('detailViewtop');
    window.onscroll = () => window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0

    if (window.innerWidth > 800) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  const navigateTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='detail-view'>
      <Button onClick={() => navigate(-1)} className="index__any-element--remove-display-center" size="large" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Button id='detailViewtop' onClick={() => navigateTop()} className="index__top-button">
        🔝
      </Button>
      { props.item ?
        <div>
          <h1>
            { props.item.title ? props.item.title : (props.item.fullName ? props.item.fullName : props.item.name) }
          </h1>
          <div className={isMobile ? '' : 'detail-view__description' }>
            <img src={`${props.item.thumbnail.path}.${props.item.thumbnail.extension}`} onError={(e)=>{e.target.onerror = null; e.target.src=require('../assets/images/image_not_available.jpeg')}} className='detail-view__main-image' alt='mailImageDetail' />
            <Typography className="detail-view__text" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              { props.item.description ? props.item.description : 'There is not description available'}
            </Typography>
          </div>
          <div> { detailsList.map((detailType, index) =>
            <BunchCardsDetails itemId={props.item.id} key={`${detailType}-${index}`} kindItem={ props.kindItem } itemType={ detailType } itemKey={`${detailType}-${index}`} isMobile={ isMobile }/>)}
          </div>  
          <div className='detail-view__links'>
            { props.item.urls.map((item, index) => 
              <div key={index}>
                <a target="_blank" href={item.url} rel="noreferrer"> {item.type} </a>
              </div>
            )}
          </div>
        </div> : <div> Information not available </div>
      }
    </div>
  );
}

export default connect(mapStateToProps)(DetailView);
