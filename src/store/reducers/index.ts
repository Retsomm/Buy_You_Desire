import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { messageReducer } from './messageReducer';

// Root reducer
export const rootReducer = combineReducers({
    cart: cartReducer,
    message: messageReducer
});

// Root state type
export type RootState = ReturnType<typeof rootReducer>;