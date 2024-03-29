import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import clientReducer from './manager/clients/clients';
import orderReducer from './manager/orders/orders';
import partnerReducer from './manager/partners/partners';
import productsReducer from './manager/products/products';
import notifyReducer from './notifications/notifications';
import authReducer from './users/auth'
import navReducer from './navigation/navigations';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  clients: clientReducer,
  orders: orderReducer,
  partners: partnerReducer,
  products: productsReducer,
  notifys: notifyReducer,
  users: authReducer,
  nav: navReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export default store;
