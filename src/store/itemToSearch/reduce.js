/* eslint-disable import/no-anonymous-default-export */
const initalState = {
    word: '',
};

export default (state = initalState, action) => {
  if (action.type === 'MODIFY_WORD') {
		return {
      ...state,
      word: action.payload,
    }
  }
	return state;
}

export const selectActiveWord = (state) => state.wordReducer.word;