import React from 'react';
import '../style-sheets/Search.css';
import {TextField, Button} from '@mui/material';
import Search from '@material-ui/icons/Search';

function SearchComponent() {
  return (
		<div>
			<TextField className='search-text-field' id="standard-basic" type="search" size='small'/>
			<Button className='search-button' variant="contained" color="primary" endIcon={<Search />}>
				Search
			</Button>
		</div>
  );
}
export default SearchComponent;
