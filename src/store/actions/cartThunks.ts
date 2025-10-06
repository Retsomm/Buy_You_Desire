import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { GoodItem } from '../../pages/types/good';
import type { CartItem } from '../types/cartTypes';
import {
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    updateCartItemQuantity as updateCartItemQuantityAction,
    clearCart as clearCartAction
} from './cartActions';
import {
    showAddToCartMessage,
    showRemoveFromCartMessage,
    showClearCartMessage,
    showCheckoutMessage
} from './messageActions';
import type { RootState } from '../';

type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

// Thunk action to add item to cart with message
export const addToCartWithMessage = (item: GoodItem): AppThunk => {
    return (dispatch) => {
        dispatch(addToCartAction(item));
        dispatch(showAddToCartMessage(item.title));
    };
};

// Thunk action to remove item from cart with message
export const removeFromCartWithMessage = (id: number): AppThunk => {
    return (dispatch, getState) => {
        const state = getState();
        const item = state.items.find((item: CartItem) => item.id === id);
        const itemName = item ? item.title : '商品';

        dispatch(removeFromCartAction(id));
        dispatch(showRemoveFromCartMessage(itemName));
    };
};

// Thunk action to update cart item quantity
export const updateCartItemQuantityWithMessage = (id: number, quantity: number): AppThunk => {
    return (dispatch) => {
        if (quantity <= 0) {
            // If quantity is 0 or less, remove the item
            const removeThunk = removeFromCartWithMessage(id);
            dispatch(removeThunk);
        } else {
            dispatch(updateCartItemQuantityAction(id, quantity));
        }
    };
};

// Thunk action to clear cart with message
export const clearCartWithMessage = (): AppThunk => {
    return (dispatch) => {
        dispatch(clearCartAction());
        dispatch(showClearCartMessage());
    };
};

// Thunk action for checkout process
export const checkoutWithMessage = (): AppThunk => {
    return (dispatch) => {
        dispatch(showCheckoutMessage());
    };
};