import type { GoodItem } from '../../pages/types/good';

// Cart item interface with quantity
export interface CartItem extends GoodItem {
    quantity: number;
}

// Cart state interface
export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Action interfaces
export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: GoodItem;
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: number; // item id
}

export interface UpdateCartItemQuantityAction {
    type: typeof UPDATE_CART_ITEM_QUANTITY;
    payload: {
        id: number;
        quantity: number;
    };
}

export interface ClearCartAction {
    type: typeof CLEAR_CART;
}

// Union type for all cart actions
export type CartActionTypes =
    | AddToCartAction
    | RemoveFromCartAction
    | UpdateCartItemQuantityAction
    | ClearCartAction;