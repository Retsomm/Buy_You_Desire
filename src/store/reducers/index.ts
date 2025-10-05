import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';

// Root reducer
export const rootReducer = combineReducers({
    cart: cartReducer
});

// Root state type
export type RootState = ReturnType<typeof rootReducer>;