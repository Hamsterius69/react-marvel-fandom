import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@mui/material/Pagination';
import HeroCard from './HeroCard';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import '../style-sheets/BunchCards.css';

function BunchCards( {items, totalPages, isDisabled, page, handleChangeItemPerPage, handleChangePagination, handleModalOpen, type, isMobile} ) {
	const linearProgress = isDisabled ? <LinearProgress /> : ''
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "white"
      }
    }
  }));
  const classes = useStyles();
	
  return (
    <div>
      <div className="bunch-cards__total-text">
        <Typography variant="h6" component="div">
          {`Total: ${items.total}`}
        </Typography>
      </div>
      <div>
        <div className={isMobile ? 'index__horizontal-scroll' : ''}>
          { items.results.map(hero => 
          <HeroCard
            key={ hero.id }
            props={ hero }
            name={ hero.title ? hero.title : (hero.fullName ? hero.fullName : hero.name) }
            customClickEvent={ () => handleModalOpen(hero) }
            type={ type }
          />)}
        </div>
      </div>
      <div className='bunch-cards__linear-progress'>{ linearProgress }</div>
      <div className="bunch-cards__pagination">
        <Pagination count={ totalPages } showFirstButton showLastButton color='primary' onChange={ handleChangePagination }
                    page={page} siblingCount={1}  size="small" disabled={isDisabled} classes={{ ul: classes.ul }} />
        <select className="bunch-cards__select-pagination" name="itemsToView" id="itemsNumber"
                onChange={ handleChangeItemPerPage } disabled={isDisabled}>
          <option value="10"> 10 </option>
          <option value="25"> 25 </option>
          <option value="50"> 50 </option>
          <option value="100"> 100 </option>
        </select>
      </div>
    </div>
  );
}

export default BunchCards;
