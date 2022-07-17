/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../style-sheets/MainView.css';
import Banner from '../components/Banner';
import SearchComponent from '../components/Search';
import Typography from '@mui/material/Typography';
import HeroCard from '../components/HeroCard';
import api from '../api/marvel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@mui/material/Pagination';
import { connect } from 'react-redux';
import { selectActiveWord, selectKindItem } from '../store/itemToSearch/reduce'

const mapStateToProps = (state) => {
  return {
    word: selectActiveWord(state),
    item: selectKindItem(state),
  };
};
function MainView(props) {
  const [items, setItems] = useState(0);
  const [isDisabled, setIsDisable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const linearProgress = isDisabled ? <LinearProgress /> : ''

  useEffect(() => {
      getHeroes();
  }, [props.word, props.item, offset, itemPerPage]);

  const updateTotalPages = (total) => {
    if ( total % itemPerPage !== 0 ) {
      setTotalPages( Math.trunc(total / itemPerPage) + 1);
    } else {
      setTotalPages(total / itemPerPage);
    }
  };

  const getHeroes = () => {
    setIsDisable(true);
    const arg = {
      limit: itemPerPage,
      offset: offset,
      item: props.item,
    };
    if (props.word) {
      arg.nameStartsWith = props.word;
    }
    api.getHeroes(arg).then((response) => {
      setIsDisable(true);
      setItems(response.data.data);
      updateTotalPages(response.data.data.total);
      setIsDisable(false);
    }).catch((error) => {
      setIsDisable(false);
      const errorMessage = `Error to get character: ${error.response ? error.response.data.message : ''}`
      console.log(errorMessage)
    });
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
    <div className='main-view'>
      <Banner />
      <SearchComponent handleClick={ getHeroes } isDisable={ isDisabled }/>
      <div className='linear-progress'>{ linearProgress }</div>
      {items ? (
        <div>
          <div className="total-text">
            <Typography variant="h6" component="div">
              {`Total: ${items.total}`}
            </Typography>
          </div>
          <div className="hero-card">
            <div>
              { items.results.map(hero => 
              <HeroCard 
                key={ hero.id }
                name={hero.title ? hero.title : (hero.fullName ? hero.fullName : hero.name)}
                description={ hero.description }
                thumbnail={`${hero.thumbnail.path}.${hero.thumbnail.extension}`  }
              />)}
            </div>
          </div>
          <div className='linear-progress'>{ linearProgress }</div>
          <div className="pagination">
            <Pagination count={ totalPages } showFirstButton showLastButton color='primary' onChange={ handleChangePagination }
                        page={page} siblingCount={0}  size="small" disabled={isDisabled}/>
            <select className="select-pagination" name="itemsToView" id="itemsNumber"
                    onChange={ handleChangeItemPerPage } disabled={isDisabled}>
              <option value="10"> 10 </option>
              <option value="25"> 25 </option>
              <option value="50"> 50 </option>
              <option value="100"> 100 </option>
            </select>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default connect(mapStateToProps)(MainView);
