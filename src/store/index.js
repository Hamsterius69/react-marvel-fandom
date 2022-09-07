import { legacy_createStore, combineReducers } from 'redux';
import dataReducer from './itemToSearch/reduce';

const reducers = combineReducers({
  dataReducer
});

const store = legacy_createStore(
  reducers,
);

export default store;