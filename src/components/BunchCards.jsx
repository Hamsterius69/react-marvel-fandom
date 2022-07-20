import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@mui/material/Pagination';
import HeroCard from './HeroCard';
import Typography from '@mui/material/Typography';

function BunchCards( {items, totalPages, isDisabled, page, handleChangeItemPerPage, handleChangePagination, handleModalOpen} ) {
	const linearProgress = isDisabled ? <LinearProgress /> : ''
  /*
	const handleModalOpen = (heroData) => {
    console.log('Open modal');
		console.log(heroData);
    console.log('********');
  }
	*/

	return (
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
            customClickEvent={ () => handleModalOpen(hero) }
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
  );
}

export default BunchCards;
