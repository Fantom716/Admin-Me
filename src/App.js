import './App.css';
import React from 'react';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Clients from './pages/clients';
import Orders from './pages/orders';
import Sells from './pages/sells';
import Partners from './pages/partners';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/sells' element={<Sells />} />
      <Route path='/partners' element={<Partners />} />
    </Routes>
  );
}

export default App;
