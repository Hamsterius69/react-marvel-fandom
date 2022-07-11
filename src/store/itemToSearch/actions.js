const updateWordToSearch = (word) => {
  return {
    type: 'MODIFY_WORD',
    payload: word,
  };
};

export { updateWordToSearch };