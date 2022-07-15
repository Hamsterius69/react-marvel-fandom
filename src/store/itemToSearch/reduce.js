/* eslint-disable import/no-anonymous-default-export */
const initalState = {
    word: '',
    // item: 'characters',
};

export default (state = initalState, action) => {
  if (action.type === 'MODIFY_WORD') {
		return {
      ...state,
      word: action.payload,
    }
  /*} else if (action.type === 'MODIFY_ITEM') {
		return {
      ...state,
      item: action.payload,
    }*/
  }
	return state;
}

export const selectActiveWord = (state) => state.wordReducer.word;
// export const selectKindItem = (state) => state.dataReducer.item;