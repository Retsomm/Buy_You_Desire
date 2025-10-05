import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART
} from '../types/cartTypes';
import type {
    CartState,
    CartActionTypes,
    CartItem
} from '../types/cartTypes';
import { loadCartFromStorage, saveCartToStorage, clearCartFromStorage } from '../../utils/localStorage';

// Helper function to calculate total price
const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d]/g, '')) || 0;
        return total + price * item.quantity;
    }, 0);
};

// Helper function to calculate total quantity
const calculateTotalQuantity = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

// Load initial state from localStorage or use default
const getInitialState = (): CartState => {
    const savedCart = loadCartFromStorage();
    if (savedCart) {
        return savedCart;
    }

    return {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    };
};

// Initial state
const initialState: CartState = getInitialState();

// Cart reducer
export const cartReducer = (
    state: CartState = initialState,
    action: CartActionTypes
): CartState => {
    switch (action.type) {
        case ADD_TO_CART: {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            let updatedItems: CartItem[];

            if (existingItemIndex >= 0) {
                // Item already exists, increase quantity
                updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // New item, add to cart
                const newItem: CartItem = { ...action.payload, quantity: 1 };
                updatedItems = [...state.items, newItem];
            }

            const newState = {
                ...state,
                items: updatedItems,
                totalQuantity: calculateTotalQuantity(updatedItems),
                totalPrice: calculateTotalPrice(updatedItems)
            };

            // Save to localStorage
            saveCartToStorage(newState);

            return newState;
        }

        case REMOVE_FROM_CART: {
            const updatedItems = state.items.filter(item => item.id !== action.payload);

            const newState = {
                ...state,
                items: updatedItems,
                totalQuantity: calculateTotalQuantity(updatedItems),
                totalPrice: calculateTotalPrice(updatedItems)
            };

            // Save to localStorage
            saveCartToStorage(newState);

            return newState;
        }

        case UPDATE_CART_ITEM_QUANTITY: {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                const updatedItems = state.items.filter(item => item.id !== id);
                const newState = {
                    ...state,
                    items: updatedItems,
                    totalQuantity: calculateTotalQuantity(updatedItems),
                    totalPrice: calculateTotalPrice(updatedItems)
                };

                // Save to localStorage
                saveCartToStorage(newState);

                return newState;
            }

            const updatedItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            const newState = {
                ...state,
                items: updatedItems,
                totalQuantity: calculateTotalQuantity(updatedItems),
                totalPrice: calculateTotalPrice(updatedItems)
            };

            // Save to localStorage
            saveCartToStorage(newState);

            return newState;
        }

        case CLEAR_CART:
            // Clear from localStorage
            clearCartFromStorage();
            return getInitialState();

        default:
            return state;
    }
};