/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@mui/material/Pagination';
import HeroCard from './HeroCard';
import api from '../api/marvel';
import General from '../mixins/GeneralFunctions'
import '../style-sheets/BunchCards.css';

function BunchCardsDetails( {itemId, kindItem, itemType} ) {

  const [items, setItems] = useState(0);
  const [isDisabled, setIsDisable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const linearProgress = isDisabled ? <LinearProgress /> : ''

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
    setItemPerPage(document.getElementById("itemsNumber").value);
    setPage(1);
    setOffset(0);
  }

  const handleChangePagination = (_, page) => {
    setPage(page);
    setOffset(page * itemPerPage - itemPerPage);
  }

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
            <div>
              { items.results.map(hero => 
              <HeroCard
                key={ hero.id }
                props={ hero }
                name={hero.title ? hero.title : (hero.fullName ? hero.fullName : hero.name)}
                customClickEvent= {() => null}
                type= { itemType }
              />)}
            </div>
          </div>
          <div className='bunch-cards__linear-progress'>{ linearProgress }</div>
          <div className="bunch-cards__pagination">
            <Pagination count={ totalPages } showFirstButton showLastButton color='primary' onChange={ handleChangePagination }
                        page={page} siblingCount={0}  size="small" disabled={isDisabled}/>
            <select className="bunch-cards__select-pagination" name="itemsToView" id="itemsNumber"
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
    </div>
  );
}

export default BunchCardsDetails;
