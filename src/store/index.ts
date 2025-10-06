import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';

// Create Redux store with cart reducer and thunk middleware
export const store = createStore(
    cartReducer,
    applyMiddleware(thunk)
);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;