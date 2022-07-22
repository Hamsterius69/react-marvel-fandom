/* eslint-disable import/no-anonymous-default-export */

export default {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  getTypeItem (string ){
    if (string !== 'characters' && string !== 'creators') {
      return 'comic';
    }
    return 'hero';
  }
}