/**
 * Cart Reducer - 購物車狀態管理
 * 
 * 此模組負責處理購物車相關的狀態變更，包括：
 * - 添加商品到購物車
 * - 從購物車移除商品
 * - 更新商品數量
 * - 清空購物車
 * - 購物車數據的本地存儲同步
 * 
 * 狀態會自動與 localStorage 同步，確保頁面刷新後購物車數據不丟失
 */

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

/**
 * 計算購物車總價的輔助函數
 * 
 * 遍歷購物車中的所有商品，計算總價格
 * 會處理價格字符串中的非數字字符（如貨幣符號、逗號等）
 * 
 * @param {CartItem[]} items - 購物車商品列表數組
 * @returns {number} 總價格數值
 */
const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
        // 移除價格字符串中的非數字字符（如 $、,、NT$ 等），然後轉換為數字
        const price = parseFloat(item.price.replace(/[^\d]/g, '')) || 0;
        return total + price * item.quantity;
    }, 0);
};

/**
 * 計算購物車商品總數量的輔助函數
 * 
 * 累加購物車中所有商品的數量
 * 
 * @param {CartItem[]} items - 購物車商品列表數組
 * @returns {number} 商品總數量
 */
const calculateTotalQuantity = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * 創建新狀態並同步到 localStorage 的輔助函數
 * 
 * 統一處理狀態更新和持久化邏輯
 * 
 * @param {CartState} currentState - 當前狀態
 * @param {CartItem[]} updatedItems - 更新後的商品列表
 * @returns {CartState} 新的購物車狀態
 */
const createNewStateAndSave = (currentState: CartState, updatedItems: CartItem[]): CartState => {
    const newState = {
        ...currentState,
        items: updatedItems,
        totalQuantity: calculateTotalQuantity(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems)
    };

    // 同步到 localStorage
    saveCartToStorage(newState);

    return newState;
};

/**
 * 獲取初始狀態的函數
 * 
 * 嘗試從 localStorage 載入之前保存的購物車數據
 * 如果載入失敗或沒有保存的數據，則返回空的購物車狀態
 * 包含錯誤處理，確保即使 localStorage 損壞也不會導致應用崩潰
 * 
 * @returns {CartState} 初始購物車狀態
 */
const getInitialState = (): CartState => {
    try {
        const savedCart = loadCartFromStorage();
        if (savedCart && savedCart.items) {
            return {
                items: savedCart.items,
                totalQuantity: calculateTotalQuantity(savedCart.items),
                totalPrice: calculateTotalPrice(savedCart.items)
            };
        }
    } catch (error) {
        console.warn('Failed to load cart from storage:', error);
    }

    // 如果載入失敗或沒有數據，返回默認空狀態
    return {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    };
};

// 初始化購物車狀態
const initialState: CartState = getInitialState();

/**
 * 購物車 Reducer
 * 
 * 根據不同的 action 類型處理購物車狀態變更
 * 每次狀態變更後都會自動同步到 localStorage
 * 
 * @param {CartState} state - 當前購物車狀態
 * @param {CartActionTypes} action - 觸發的動作
 * @returns {CartState} 新的購物車狀態
 */
export const cartReducer = (
    state: CartState = initialState,
    action: CartActionTypes
): CartState => {
    switch (action.type) {
        case ADD_TO_CART: {
            // 檢查商品是否已存在於購物車中
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            let updatedItems: CartItem[];

            if (existingItemIndex >= 0) {
                // 商品已存在，增加數量
                updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 新商品，添加到購物車
                const newItem: CartItem = { ...action.payload, quantity: 1 };
                updatedItems = [...state.items, newItem];
            }

            return createNewStateAndSave(state, updatedItems);
        }

        case REMOVE_FROM_CART: {
            // 從購物車中移除指定商品
            const updatedItems = state.items.filter(item => item.id !== action.payload);
            return createNewStateAndSave(state, updatedItems);
        }

        case UPDATE_CART_ITEM_QUANTITY: {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                // 如果數量為 0 或負數，則移除該商品
                const updatedItems = state.items.filter(item => item.id !== id);
                return createNewStateAndSave(state, updatedItems);
            }

            // 更新指定商品的數量
            const updatedItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            return createNewStateAndSave(state, updatedItems);
        }

        case CLEAR_CART:
            // 清空購物車並從 localStorage 中移除數據
            clearCartFromStorage();
            return getInitialState();

        default:
            // 未知的 action 類型，返回當前狀態
            return state;
    }
};