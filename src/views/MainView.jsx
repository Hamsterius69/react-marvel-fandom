/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../style-sheets/MainView.css';
import Banner from '../components/Banner';
import SearchComponent from '../components/Search';
import Typography from '@mui/material/Typography';
import HeroCard from '../components/HeroCard';
import api from '../api/marvel';

function MainView() {
  const [heroes, setHeroes] = useState(null);
  const initialSearchName = 'A';

  const getHeroes = (heroName) => {
    api.getHeroes(heroName).then((response) => {
      setHeroes(response.data.data);
    }).catch((error) => {
      const errorMessage = `Error to get character: ${error.response ? error.response.data.message : ''}`
      console.log(errorMessage)
    });
  }

  useEffect(() => {
    getHeroes(initialSearchName);
  }, []);
  
  return (
    <div className='main-view'>
      <Banner />
      <SearchComponent />
      {heroes ? (
        <div>
          <div className="total-text">
            <Typography variant="h6" component="div">
              {`Total: ${heroes.total} Characters`}
            </Typography>
          </div>
          <div className="hero-card">
            <div>
              { heroes.results.map(hero => 
              <HeroCard 
                key={ hero.id }
                name={hero.name}
                description={ hero.description }
                thumbnail={`${hero.thumbnail.path}.${hero.thumbnail.extension}`  }
              />)}
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default MainView;
