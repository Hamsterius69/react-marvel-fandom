import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainView from './views/MainView';
import DetailView from './views/DetailView';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainView /> }></Route>
        <Route path="/Detail" element={ <DetailView /> }></Route>
        <Route path="*" element={ <Navigate replace to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
