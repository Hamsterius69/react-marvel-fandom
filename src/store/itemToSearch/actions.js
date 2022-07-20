const updateWordToSearch = (word) => {
  return {
    type: 'MODIFY_WORD',
    payload: word,
  };
};

const updatekindItemToSearch = (KindItem) => {
  return {
    type: 'MODIFY_ITEM',
    payload: KindItem,
  };
};

const updateSelectedItem = (Item) => {
  return {
    type: 'MODIFY_SELECTED_ITEM',
    payload: Item,
  };
};

export { updateWordToSearch, updatekindItemToSearch, updateSelectedItem };