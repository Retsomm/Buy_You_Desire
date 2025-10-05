import type { GoodItem } from '../../pages/types/good';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART
} from '../types/cartTypes';
import type {
    AddToCartAction,
    RemoveFromCartAction,
    UpdateCartItemQuantityAction,
    ClearCartAction
} from '../types/cartTypes';

// Action creators
export const addToCart = (item: GoodItem): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: item
});

export const removeFromCart = (id: number): RemoveFromCartAction => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateCartItemQuantity = (id: number, quantity: number): UpdateCartItemQuantityAction => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { id, quantity }
});

export const clearCart = (): ClearCartAction => ({
    type: CLEAR_CART
});