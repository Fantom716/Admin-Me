import React from 'react';
import HomeManager from './pages/manager/home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Clients from './pages/manager/clients';
import Orders from './pages/manager/orders';
import Sells from './pages/manager/sells';
import Partners from './pages/manager/partners';
import Authorization from './pages/start/authorization/authorizaton-form';
import Registration from './pages/start/reg/registration-form';
import Products from './pages/manager/products';
import HomeUser from './pages/user/home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/manager/dashboard' element={<HomeManager />} />
        <Route path='/manager/clients' element={<Clients />} />
        <Route path='/manager/orders' element={<Orders />} />
        <Route path='/manager/sells' element={<Sells />} />
        <Route path='/manager/partners' element={<Partners />} />
        <Route path='/manager/products' element={<Products />} />
      </Routes>
      <Routes>
        <Route path='/user/:id/dashboard' element={<HomeUser />} />
      </Routes>
    </>
  );
}

export default App;
