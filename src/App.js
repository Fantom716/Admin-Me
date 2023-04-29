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
import OrdersUser from './pages/user/orderUser';
import PaymentDetails from './pages/user/paymentUser';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/manager/:id/dashboard' element={<HomeManager />} />
        <Route path='/manager/:id/clients' element={<Clients />} />
        <Route path='/manager/:id/orders' element={<Orders />} />
        <Route path='/manager/:id/sells' element={<Sells />} />
        <Route path='/manager/:id/partners' element={<Partners />} />
        <Route path='/manager/:id/products' element={<Products />} />
      </Routes>
      <Routes>
        <Route path='/user/:id/dashboard' element={<HomeUser />} />
        <Route path='/user/:id/orders' element={<OrdersUser />} />
        <Route path='/user/:id/paymentdetails' element={<PaymentDetails />} />
      </Routes>
    </>
  );
}

export default App;
