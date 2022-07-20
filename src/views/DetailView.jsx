// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router'
import '../style-sheets/DetailView.css';
import { selectActiveWord, selectItem } from '../store/itemToSearch/reduce';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    word: selectActiveWord(state),
    item: selectItem(state),
  };
};

function DetailView(props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.word);
    console.log(props.item);
  }, [props.item, props.word]);

  return (
    <div className='detail-view'>
      <Button onClick={() => navigate(-1)} className="remove-center" size="large" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      { props.item ?
        <div>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            { props.item.title ? props.item.title : (props.item.fullName ? props.item.fullName : props.item.name) }
          </Typography>
          <div className='detail-description'>
          <img src={`${props.item.thumbnail.path}.${props.item.thumbnail.extension}`} onError={(e)=>{e.target.onerror = null; e.target.src=require('../assets/images/image_not_available.jpeg')}} className='card-image' alt='mailImageDetail' />
            <Typography className="description" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              { props.item.description ? props.item.description : 'There is not description available'}
            </Typography>
          </div>
          <h2 className="remove-center">Comics</h2>
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
