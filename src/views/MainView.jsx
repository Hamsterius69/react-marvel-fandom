import React from 'react';
import Banner from '../components/Banner'
import SearchComponent from '../components/Search'

function MainView() {
  return (
    <div className='main-view'>
      <Banner />
      <SearchComponent />
    </div>
  );
}

export default MainView;
