import type { CartState } from '../store/types/cartTypes';

const CART_STORAGE_KEY = 'shopping_cart';

// 從 localStorage 載入購物車數據
export const loadCartFromStorage = (): CartState | undefined => {
    try {
        const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (serializedCart === null) {
            return undefined;
        }
        return JSON.parse(serializedCart);
    } catch (error) {
        console.warn('無法從 localStorage 載入購物車數據:', error);
        return undefined;
    }
};

// 將購物車數據保存到 localStorage
export const saveCartToStorage = (cart: CartState): void => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem(CART_STORAGE_KEY, serializedCart);
    } catch (error) {
        console.warn('無法將購物車數據保存到 localStorage:', error);
    }
};

// 清除 localStorage 中的購物車數據
export const clearCartFromStorage = (): void => {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
        console.warn('無法清除 localStorage 中的購物車數據:', error);
    }
};