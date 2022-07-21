/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
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

  const navigate = useNavigate();

  const handleModalOpen = (heroData) => {
    console.log('open modal');
    // setModalOpen(true);
  }

  return (
    <div className='detail-view'>
      <Button onClick={() => navigate(-1)} className="remove-center" size="large" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      { props.item ?
        <div>
          <h1>
            { props.item.title ? props.item.title : (props.item.fullName ? props.item.fullName : props.item.name) }
          </h1>
          <div className='detail-description'>
          <img src={`${props.item.thumbnail.path}.${props.item.thumbnail.extension}`} onError={(e)=>{e.target.onerror = null; e.target.src=require('../assets/images/image_not_available.jpeg')}} className='card-image' alt='mailImageDetail' />
            <Typography className="description" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              { props.item.description ? props.item.description : 'There is not description available'}
            </Typography>
          </div>
          <h2 className="remove-center">Comics</h2>
          <div>
            <BunchCardsDetails itemId={props.item.id} kindItem={props.kindItem} itemType='comics' 
                               handleModalOpen={handleModalOpen} />
          </div>  
          <div className='detail-links'>
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
