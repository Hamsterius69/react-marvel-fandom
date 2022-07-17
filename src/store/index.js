import { legacy_createStore, combineReducers } from 'redux';
// import dataReducer from './itemToSearch/reduce';
import wordReducer from './itemToSearch/reduce';

const reducers = combineReducers({
  wordReducer
  //dataReducer
});

const store = legacy_createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && WindowSharp.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;