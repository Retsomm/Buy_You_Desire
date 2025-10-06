/**
 * 引入 Redux 的 combineReducers 工具函數
 * combineReducers 用於將多個小的 reducer 組合成一個根 reducer
 * 這是 Redux 推薦的模塊化狀態管理方式
 */
import { combineReducers } from 'redux';

/**
 * 引入各個功能模塊的 reducer
 * 每個 reducer 負責管理應用狀態樹的一個特定分支
 */
import { cartReducer } from './cartReducer';
import { messageReducer } from './messageReducer';

/**
 * 根 Reducer (Root Reducer)
 * 
 * 使用 combineReducers 將所有子 reducer 組合成一個統一的根 reducer
 * 這個根 reducer 將被傳遞給 Redux store，用於管理整個應用的狀態
 * 
 * 狀態樹結構：
 * {
 *   cart: CartState,      // 購物車相關狀態
 *   message: MessageState // 消息通知相關狀態
 * }
 * 
 * 每個 key 對應一個狀態分支，value 是對應的 reducer 函數
 * Redux 會自動將相應的 action 分發給對應的 reducer 處理
 */
export const rootReducer = combineReducers({
    /** 購物車模塊的狀態管理，處理商品添加、移除、數量更新等操作 */
    cart: cartReducer,
    /** 消息模塊的狀態管理，處理通知消息的顯示、隱藏和清除操作 */
    message: messageReducer
});

/**
 * 根狀態類型定義 (Root State Type)
 * 
 * 使用 TypeScript 的 ReturnType 工具類型自動推斷根 reducer 的返回類型
 * 這確保了整個應用的狀態類型與實際的 reducer 結構保持同步
 * 
 * 優點：
 * 1. 類型安全：編譯時檢查狀態訪問的正確性
 * 2. 自動推斷：當添加新的 reducer 時，類型會自動更新
 * 3. 智能提示：IDE 可以提供準確的狀態屬性自動完成
 * 
 * 使用示例：
 * const state: RootState = useSelector((state: RootState) => state);
 * const cartItems = useSelector((state: RootState) => state.cart.items);
 * const messages = useSelector((state: RootState) => state.message.messages);
 */
export type RootState = ReturnType<typeof rootReducer>;