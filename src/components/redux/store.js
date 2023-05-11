import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './manager/clients/clients'
import orderReducer from './manager/orders/orders'
import partnerReducer from './partners/partners'
import productsReducer from './products/products'
import notifyReducer from './notifications/notifications'

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    orders: orderReducer,
    partners: partnerReducer,
    products: productsReducer,
    notifys: notifyReducer,
  }
})
