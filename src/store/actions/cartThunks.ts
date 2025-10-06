/**
 * 購物車 Thunk Actions
 * 
 * 功能說明：
 * 1. 處理複雜的異步邏輯和副作用
 * 2. 組合多個同步 action (購物車操作 + 消息提示)
 * 3. 提供更好的用戶體驗（操作後顯示相應提示）
 * 4. 統一管理購物車相關的業務邏輯
 */

import type { ThunkAction } from 'redux-thunk';
import type { GoodItem } from '../../pages/types/good';
import type { CartItem } from '../types/cartTypes';
import type { RootActionTypes } from '../types';
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

/**
 * 應用 Thunk 類型定義
 * 
 * @template ReturnType - thunk 函數的返回類型，預設為 void
 * 
 * 泛型參數說明：
 * - ReturnType: thunk 執行後的返回值類型
 * - RootState: 應用的根狀態類型
 * - unknown: thunk 的額外參數類型（這裡不使用）
 * - RootActionTypes: 可以 dispatch 的 action 類型聯合
 */
type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    RootActionTypes
>;

/**
 * 添加商品到購物車並顯示提示消息
 * 
 * 業務流程：
 * 1. 將商品添加到購物車
 * 2. 顯示添加成功的提示消息
 * 
 * @param item - 要添加的商品信息
 * @returns AppThunk - 返回一個 thunk 函數
 * 
 * 使用場景：
 * - 商品列表頁面的"加入購物車"按鈕
 * - 商品詳情頁面的購買操作
 */
export const addToCartWithMessage = (item: GoodItem): AppThunk => {
    return (dispatch) => {
        // 執行添加到購物車的操作
        dispatch(addToCartAction(item));
        // 顯示添加成功的提示消息
        dispatch(showAddToCartMessage(item.title));
    };
};

/**
 * 從購物車移除商品並顯示提示消息
 * 
 * 業務流程：
 * 1. 從當前狀態中查找要移除的商品信息
 * 2. 執行移除操作
 * 3. 顯示移除成功的提示消息（包含商品名稱）
 * 
 * @param id - 要移除的商品 ID
 * @returns AppThunk - 返回一個 thunk 函數
 * 
 * 特殊處理：
 * - 如果找不到商品，使用預設名稱 "商品"
 * - 先獲取商品名稱再執行移除，確保提示消息的準確性
 */
export const removeFromCartWithMessage = (id: number): AppThunk => {
    return (dispatch, getState) => {
        // 獲取當前應用狀態
        const state = getState();
        // 從購物車中查找要移除的商品
        const item = state.cart.items.find((item: CartItem) => item.id === id);
        // 獲取商品名稱，如果找不到則使用預設值
        const itemName = item ? item.title : '商品';

        // 執行移除商品操作
        dispatch(removeFromCartAction(id));
        // 顯示移除成功的提示消息
        dispatch(showRemoveFromCartMessage(itemName));
    };
};

/**
 * 更新購物車商品數量
 * 
 * 業務邏輯：
 * 1. 如果數量 <= 0，則移除該商品（調用 removeFromCartWithMessage）
 * 2. 如果數量 > 0，則更新商品數量
 * 
 * @param id - 商品 ID
 * @param quantity - 新的數量
 * @returns AppThunk - 返回一個 thunk 函數
 * 
 * 智能處理：
 * - 自動處理數量為 0 的情況（轉為移除操作）
 * - 避免購物車中出現數量為 0 或負數的商品
 * - 統一的用戶體驗（移除時也會顯示相應提示）
 */
export const updateCartItemQuantityWithMessage = (id: number, quantity: number): AppThunk => {
    return (dispatch) => {
        if (quantity <= 0) {
            // 如果數量小於等於 0，則移除該商品
            // 這樣可以避免購物車中出現數量為 0 的商品
            const removeThunk = removeFromCartWithMessage(id);
            dispatch(removeThunk);
        } else {
            // 數量大於 0，正常更新商品數量
            dispatch(updateCartItemQuantityAction(id, quantity));
        }
    };
};

/**
 * 清空購物車並顯示提示消息
 * 
 * 業務流程：
 * 1. 清空購物車中的所有商品
 * 2. 顯示清空成功的提示消息
 * 
 * @returns AppThunk - 返回一個 thunk 函數
 * 
 * 使用場景：
 * - 購物車頁面的"清空購物車"按鈕
 * - 結算完成後清空購物車
 * - 用戶手動清理購物車
 */
export const clearCartWithMessage = (): AppThunk => {
    return (dispatch) => {
        // 清空購物車中的所有商品
        dispatch(clearCartAction());
        // 顯示清空成功的提示消息
        dispatch(showClearCartMessage());
    };
};

/**
 * 結算流程並顯示提示消息
 * 
 * 業務流程：
 * 1. 顯示結算成功的提示消息
 * 
 * @returns AppThunk - 返回一個 thunk 函數
 * 
 * 使用場景：
 * - 購物車結算頁面的確認結算
 * - 訂單提交成功後的反饋
 * 
 * 注意：
 * - 這裡只處理消息提示，實際的結算邏輯可能需要額外的 API 調用
 * - 可以根據需要擴展為包含支付、庫存檢查等複雜邏輯
 */
export const checkoutWithMessage = (): AppThunk => {
    return (dispatch) => {
        // 顯示結算/購買成功的提示消息
        dispatch(showCheckoutMessage());
    };
};