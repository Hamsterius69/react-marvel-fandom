import React from 'react';
import '../style-sheets/Search.css';
import {TextField, Button} from '@mui/material';
import Search from '@material-ui/icons/Search';
import LoadingButton from '@mui/lab/LoadingButton';

function SearchComponent() {
  return (
		<div>
			<TextField className='search-text-field' id="standard-basic" type="search" size='small'/>
			<Button className='search-botton' variant="contained" color="primary" endIcon={<Search />}>
				Search
			</Button>
			<LoadingButton className='loading-button' loading={false} color="primary">Search</LoadingButton>
		</div>
  );
}
export default SearchComponent;
