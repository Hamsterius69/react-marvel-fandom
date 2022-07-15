import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateWordToSearch } from '../store/itemToSearch/actions'
import '../style-sheets/Search.css';
import {TextField, Button} from '@mui/material';
import Search from '@material-ui/icons/Search';

function SearchComponent({updateWordToSearch, isDisable}) {
	const [input, setInput] = useState('');

	function handleKeyDown(event) {
		if(event.keyCode === 13) { 
			updateWordToSearch(input);
  	}
	}

	const handleChangeSelect = () => {
    console.log(document.getElementById("itemsKind").value);
  }

	return (
		<div>
			<div className="pagination">
       	<select className="select-item-kind" name="selectkindOfItems" id="itemsKind"
       	        onChange={ handleChangeSelect } disabled={isDisable}>
       	  <option value="characters"> characters </option>
       	  <option value="comics"> comics </option>
       	  <option value="creatores"> creatores </option>
       	  <option value="events"> events </option>
       	  <option value="series"> series </option>
       	  <option value="stories"> stories </option>
       	</select>
      </div>
			<TextField value={input} onInput={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
								 className='search-text-field' id="standard-basic" type="search" size='small'/>
			<Button className='search-button' onClick={() => updateWordToSearch(input)} variant="contained"
							color="primary" endIcon={<Search />} disabled={isDisable}>
				Search
			</Button>
		</div>
  );
}
export default connect(null, { updateWordToSearch })(SearchComponent);
