/* eslint-disable import/no-anonymous-default-export */
const initalState = {
    word: '',
    item: 'characters',
    selectedItem: null,
};

export default (state = initalState, action) => {
  switch(action.type) {
    case 'MODIFY_WORD':
      return {
        ...state,
        word: action.payload,
      }
    case 'MODIFY_ITEM':
      return {
        ...state,
        item: action.payload,
      };
    case 'MODIFY_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      return state
  }
}

export const selectActiveWord = (state) => state.dataReducer.word;
export const selectKindItem = (state) => state.dataReducer.item;
export const selectItem = (state) => state.dataReducer.selectedItem;