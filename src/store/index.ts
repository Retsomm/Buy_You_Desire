import { createStore } from 'redux';
import { cartReducer } from './reducers/cartReducer';

// Create Redux store directly with cart reducer
export const store = createStore(cartReducer);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;