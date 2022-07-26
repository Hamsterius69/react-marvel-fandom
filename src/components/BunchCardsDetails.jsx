/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@mui/material/Pagination';
import HeroCard from './HeroCard';
import api from '../api/marvel';
import General from '../mixins/GeneralFunctions'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import '../style-sheets/BunchCards.css';

function BunchCardsDetails( {itemId, kindItem, itemType, itemKey, isMobile} ) {

  const [items, setItems] = useState(0);
  const [isDisabled, setIsDisable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItemSelected, setCurrentItemSelected] = useState(null);

  const linearProgress = isDisabled ? <LinearProgress /> : ''
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "white"
      }
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    getItems();
  }, [offset, itemPerPage]);

  const getItems = () => {
    setIsDisable(true);
    const arg = {
      limit: itemPerPage,
      offset: offset,
      item: kindItem,
      id: itemId,
      type: itemType
    };
    api.getDetails(arg).then((response) => {
      setIsDisable(true);
      setItems(response.data.data);
      updateTotalPages(response.data.data.total);
      setIsDisable(false);
    }).catch((error) => {
      setIsDisable(false);
      const errorMessage = `Error to get ${itemType}: ${error.response ? error.response.data.message : ''}`
      console.log(errorMessage)
    });
  };

  const updateTotalPages = (total) => {
    if ( total % itemPerPage !== 0 ) {
      setTotalPages( Math.trunc(total / itemPerPage) + 1);
    } else {
      setTotalPages(total / itemPerPage);
    }
  };

  const handleChangeItemPerPage = () => {
    setItemPerPage(document.getElementById(itemKey).value);
    setPage(1);
    setOffset(0);
  }

  const handleChangePagination = (_, page) => {
    setPage(page);
    setOffset(page * itemPerPage - itemPerPage);
  }

  const handleModalOpen = (itemData) => {
    setCurrentItemSelected(itemData);
    setModalOpen(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '55%' : '25%',
    textAlign: 'center',
    bgcolor: '#282c34',
    border: '2px solid #000',
    borderRadius: '6px',
    color: 'white',
    boxShadow: 24,
    p: 4,
  };

	return (
    <div>
      <div className="index__any-element--remove-display-center">
        <h2>
          {`${General.capitalizeFirstLetter(itemType)}: ${ items.total !== undefined ? items.total : 0 }`}
        </h2>
      </div>
      <div> { items.total > 0 ? 
        <div>
          <div>
            <div className={isMobile ? 'index__horizontal-scroll' : ''}>
              { items.results.map((hero, index) => 
              <HeroCard
                key={ `${hero.id}-${index}` }
                props={ hero }
                name={hero.title ? hero.title : (hero.fullName ? hero.fullName : hero.name)}
                customClickEvent= {handleModalOpen}
                type= { itemType }
              />)}
            </div>
          </div>
          <div className='bunch-cards__linear-progress'>{ linearProgress }</div>
          <div className="bunch-cards__pagination">
            <Pagination count={ totalPages } showFirstButton showLastButton color='primary' onChange={ handleChangePagination }
                        page={page} siblingCount={0}  size="small" disabled={isDisabled} classes={{ ul: classes.ul }} />
            <select className="bunch-cards__select-pagination" name="itemsToView" id={ itemKey }
                    onChange={ handleChangeItemPerPage } disabled={isDisabled}>
              <option value="10"> 10 </option>
              <option value="25"> 25 </option>
              <option value="50"> 50 </option>
              <option value="100"> 100 </option>
            </select>
          </div>
        </div>
        : ''}
      </div>
      <div> { currentItemSelected ?
        <div className='bunch-cards-detail__modal'>
          <Modal keepMounted open={modalOpen} onClose={() => setModalOpen(false)} >
          <Box sx={style}>
            <h2>
              { currentItemSelected.title ? currentItemSelected.title : (currentItemSelected.fullName ? currentItemSelected.fullName : currentItemSelected.name) }
            </h2>
            <div>
              <img className='bunch-cards-detail__modal-image' src={ `${currentItemSelected.thumbnail.path}.${currentItemSelected.thumbnail.extension}` } alt={ currentItemSelected.thumbnail.path } />
              <Typography className="bunch-cards-detail__description" sx={{ mt: 2 }}>
                { currentItemSelected.description }
              </Typography>
            </div>
            <div className='bunch-cards-detail__modal-links'>
              { currentItemSelected.urls.map((item, index) => 
                <div key={index}>
                  <a target="_blank" href={item.url} rel="noreferrer"> {item.type} </a>
                </div>
              )}
            </div>
          </Box>
          </Modal>
        </div>  : ''}
      </div>
    </div>
  );
}

export default BunchCardsDetails;
