/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import '../style-sheets/MainView.css';
import Banner from '../components/Banner';
import BunchCards from '../components/BunchCards';
import SearchComponent from '../components/Search';
import api from '../api/marvel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { selectActiveWord, selectKindItem } from '../store/itemToSearch/reduce'
import { updateSelectedItem } from '../store/itemToSearch/actions'
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';

const mapStateToProps = (state) => {
  return {
    word: selectActiveWord(state),
    item: selectKindItem(state),
    updateSelectedItem: updateSelectedItem,
  };
};
/*
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: '#282c34',
  border: '2px solid #000',
  borderRadius: '6px',
  color: 'white',
  boxShadow: 24,
  p: 4,
};
*/
function MainView( props ) {
  const [items, setItems] = useState(0);
  const [isDisabled, setIsDisable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [currentItemSelected, setCurrentItemSelected] = useState(null); //delete
  const navigate = useNavigate();

  const linearProgress = isDisabled ? <LinearProgress /> : ''

  useEffect(() => {
      getHeroes();
  }, [props.word, props.item, offset, itemPerPage]);

  const handleModalOpen = (heroData) => {
    // setCurrentItemSelected(heroData); // deleted
    props.updateSelectedItem(heroData);
    navigate('Detail');
    // setModalOpen(true);
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

  return (
    <div className='main-view'>
      <Banner />
      <SearchComponent handleClick={ getHeroes } isDisable={ isDisabled } word={ props.word } optionSelected={ props.item }/>
      <div className='linear-progress'>{ linearProgress }</div>
      {/*items ? (
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
                props={ hero }
                name={hero.title ? hero.title : (hero.fullName ? hero.fullName : hero.name)}
                customClickEvent={ handleModalOpen }
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
      ) : '' */}
      {items ? (
        <div>
          <BunchCards items={items} totalPages={totalPages} isDisabled={isDisabled} page={page}
                      handleChangeItemPerPage={handleChangeItemPerPage} handleChangePagination={handleChangePagination}
                      handleModalOpen={handleModalOpen} />
        </div>  
      ) : ''}
      {/*
      <Modal
        keepMounted
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
      { currentItemSelected ?
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            { currentItemSelected.title ? currentItemSelected.title : (currentItemSelected.fullName ? currentItemSelected.fullName : currentItemSelected.name) }
          </Typography>
          <div className='image-description'>
            <img className='card-image' src={ `${currentItemSelected.thumbnail.path}.${currentItemSelected.thumbnail.extension}` } alt={ currentItemSelected.thumbnail.path } />
            <Typography className="description" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              { currentItemSelected.description }
            </Typography>
          </div>
          <div className='modal-links'>
            { currentItemSelected.urls.map(item => 
              <div key={item.id}>
                <a target="_blank" key={`link-${item.id}`} href={item.url} rel="noreferrer"> {item.type} </a>
              </div>
            )}
          </div>
        </Box> : <div> Information not available </div>
      }
      </Modal>
      */}
    </div>
  );
}

export default connect(mapStateToProps, { updateSelectedItem })(MainView);