/**
 * 引入商品項目類型定義
 * GoodItem 包含商品的基本信息，用於添加到購物車時的數據結構
 */
import type { GoodItem } from '../../pages/types/good';

/**
 * 引入購物車相關的 action 類型常量
 * 這些常量確保 action 類型的一致性，避免字符串拼寫錯誤
 */
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART
} from '../types/cartTypes';

/**
 * 引入購物車相關的 action 接口類型
 * 這些類型定義確保 action creator 返回的對象結構正確
 */
import type {
    AddToCartAction,
    RemoveFromCartAction,
    UpdateCartItemQuantityAction,
    ClearCartAction
} from '../types/cartTypes';

/**
 * 購物車 Action Creators
 * 
 * Action Creator 是純函數，負責創建 Redux action 對象
 * 它們提供了一個統一的接口來創建特定類型的 action
 * 使組件代碼更加清晰，並提供類型安全保障
 */

/**
 * 添加商品到購物車的 action creator
 * 
 * 當用戶點擊"加入購物車"按鈕時調用此函數
 * 如果商品已存在於購物車中，reducer 會增加其數量
 * 如果商品不存在，reducer 會添加新的購物車項目
 * 
 * @param item - 要添加到購物車的商品信息
 * @returns 包含商品信息的 ADD_TO_CART action
 * 
 * 使用示例：
 * dispatch(addToCart(selectedProduct));
 */
export const addToCart = (item: GoodItem): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: item
});

/**
 * 從購物車移除商品的 action creator
 * 
 * 當用戶點擊"移除"按鈕時調用此函數
 * 會完全移除該商品，不論其數量是多少
 * 
 * @param id - 要移除的商品ID
 * @returns 包含商品ID的 REMOVE_FROM_CART action
 * 
 * 使用示例：
 * dispatch(removeFromCart(productId));
 */
export const removeFromCart = (id: number): RemoveFromCartAction => ({
    type: REMOVE_FROM_CART,
    payload: id
});

/**
 * 更新購物車商品數量的 action creator
 * 
 * 當用戶修改商品數量時調用此函數（通過輸入框、增減按鈕等）
 * 如果數量設為 0，reducer 應該移除該商品
 * 如果數量為負數，應該在調用前進行驗證
 * 
 * @param id - 要更新的商品ID
 * @param quantity - 新的商品數量，必須為非負整數
 * @returns 包含商品ID和新數量的 UPDATE_CART_ITEM_QUANTITY action
 * 
 * 使用示例：
 * dispatch(updateCartItemQuantity(productId, newQuantity));
 */
export const updateCartItemQuantity = (id: number, quantity: number): UpdateCartItemQuantityAction => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { id, quantity }
});

/**
 * 清空整個購物車的 action creator
 * 
 * 當用戶點擊"清空購物車"按鈕或完成結帳後調用此函數
 * 會移除購物車中的所有商品，重置為空狀態
 * 通常需要用戶確認操作，因為這是不可逆的
 * 
 * @returns CLEAR_CART action，不需要任何數據載荷
 * 
 * 使用示例：
 * dispatch(clearCart());
 */
export const clearCart = (): ClearCartAction => ({
    type: CLEAR_CART
});