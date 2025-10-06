/**
 * 引入商品項目類型定義
 * GoodItem 包含商品的基本信息，如ID、名稱、價格等
 */
import type { GoodItem } from '../../pages/types/good';

/**
 * 購物車商品項目接口
 * 繼承自 GoodItem，並添加購物車特有的數量屬性
 * 這樣可以復用商品的基本信息，同時擴展購物車所需的功能
 */
export interface CartItem extends GoodItem {
    /** 購物車中該商品的購買數量，必須為正整數 */
    quantity: number;
}

/**
 * 購物車狀態接口
 * 定義Redux store中購物車模塊的完整狀態結構
 * 包含商品列表和計算後的統計數據
 */
export interface CartState {
    /** 購物車中的所有商品項目列表 */
    items: CartItem[];
    /** 購物車中所有商品的總數量（所有商品數量之和） */
    totalQuantity: number;
    /** 購物車中所有商品的總價格（價格 × 數量的總和） */
    totalPrice: number;
}

/**
 * Redux Action 類型常量
 * 定義購物車相關的所有action類型字符串常量
 * 使用常量可以避免拼寫錯誤並提供更好的類型檢查
 */

/** 添加商品到購物車的action類型 */
export const ADD_TO_CART = 'ADD_TO_CART';

/** 從購物車中移除商品的action類型 */
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/** 更新購物車中商品數量的action類型 */
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';

/** 清空整個購物車的action類型 */
export const CLEAR_CART = 'CLEAR_CART';

/**
 * Redux Action 接口定義
 * 定義各種購物車操作的action結構
 */

/**
 * 添加商品到購物車的action接口
 * 當用戶點擊"加入購物車"按鈕時觸發
 */
export interface AddToCartAction {
    /** action類型標識 */
    type: typeof ADD_TO_CART;
    /** 要添加的商品信息 */
    payload: GoodItem;
}

/**
 * 從購物車移除商品的action接口
 * 當用戶點擊"移除"按鈕時觸發
 */
export interface RemoveFromCartAction {
    /** action類型標識 */
    type: typeof REMOVE_FROM_CART;
    /** 要移除的商品ID */
    payload: number;
}

/**
 * 更新購物車商品數量的action接口
 * 當用戶修改商品數量時觸發（增加、減少或直接輸入數量）
 */
export interface UpdateCartItemQuantityAction {
    /** action類型標識 */
    type: typeof UPDATE_CART_ITEM_QUANTITY;
    /** 更新數量的相關數據 */
    payload: {
        /** 要更新的商品ID */
        id: number;
        /** 新的商品數量，如果為0則相當於移除該商品 */
        quantity: number;
    };
}

/**
 * 清空購物車的action接口
 * 當用戶點擊"清空購物車"或完成結帳後觸發
 */
export interface ClearCartAction {
    /** action類型標識 */
    type: typeof CLEAR_CART;
}

/**
 * 購物車模塊所有action類型的聯合類型
 * 包含所有可能的購物車相關action，用於reducer中的類型檢查
 * 這確保了reducer能夠正確處理所有類型的購物車action
 * 同時為dispatch函數提供準確的類型推斷
 */
export type CartActionTypes =
    | AddToCartAction
    | RemoveFromCartAction
    | UpdateCartItemQuantityAction
    | ClearCartAction;