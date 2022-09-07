/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import '../style-sheets/MainView.css';
import Banner from '../components/Banner';
import BunchCards from '../components/BunchCards';
import SearchComponent from '../components/Search';
import { Button } from '@mui/material';
import api from '../api/marvel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { selectActiveWord, selectKindItem } from '../store/itemToSearch/reduce';
import { updateSelectedItem } from '../store/itemToSearch/actions';

const mapStateToProps = (state) => {
  return {
    word: selectActiveWord(state),
    item: selectKindItem(state),
    updateSelectedItem: updateSelectedItem,
  };
};

function MainView( props ) {
  const [items, setItems] = useState(0);
  const [isDisabled, setIsDisable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const linearProgress = isDisabled ? <LinearProgress /> : ''

  useEffect(() => {
      getHeroes();
      const topBtn = document.getElementById('mainViewTop');
      if (window.onscroll) {
        window.onscroll = () => window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0;
      }
      handleResize();
      window.addEventListener('resize', handleResize)
      
      return () => window.removeEventListener('resize', handleResize)
  }, [props.word, props.item, offset, itemPerPage]);

  const handleModalOpen = (heroData) => {
    props.updateSelectedItem(heroData);
    navigate('Detail');
  }

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

  const navigateTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleResize = () => {
    if (window.innerWidth > 800) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  return (
    <div className='main-view'>
      <Banner isMobile={isMobile} />
      {!isMobile ?
      <Button id='mainViewTop' onClick={() => navigateTop()} className="index__top-button">
        🔝
      </Button>
      : ''}
      <SearchComponent handleClick={ getHeroes } isDisable={ isDisabled } word={ props.word } optionSelected={ props.item } isMobile={ isMobile }/>
      <div className='main-view__linear-progress'>{ linearProgress }</div>
      {items ? (
        <div >
          <BunchCards items={items} totalPages={totalPages} isDisabled={isDisabled} page={page}
                      handleChangeItemPerPage={handleChangeItemPerPage} handleChangePagination={handleChangePagination}
                      handleModalOpen={handleModalOpen} type={ props.item } isMobile={isMobile}/>
        </div>  
      ) : ''}
    </div>
  );
}

export default connect(mapStateToProps, { updateSelectedItem })(MainView);