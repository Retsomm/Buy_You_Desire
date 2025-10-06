/**
 * Redux Store 主配置文件
 * 
 * 功能說明：
 * 1. 創建應用的全局 Redux store
 * 2. 整合多個 reducers (購物車、消息)
 * 3. 配置 thunk 中間件支持異步操作
 * 4. 導出 TypeScript 類型定義
 */

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';
import { messageReducer } from './reducers/messageReducer';

// 合併所有 reducers 成為根 reducer
// cart: 管理購物車狀態 (商品、數量、總價等)
// message: 管理消息狀態 (通知、錯誤提示等)
const rootReducer = combineReducers({
    cart: cartReducer,
    message: messageReducer
});

// 創建 Redux store
// 參數1: rootReducer - 處理所有狀態變更的根 reducer
// 參數2: undefined - 預設狀態 (使用 reducer 的初始狀態)
// 參數3: applyMiddleware(thunk) - 配置 thunk 中間件，讓 action 可以是函數(支持異步操作)
export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
);

/**
 * TypeScript 類型定義
 */

// RootState: 整個應用狀態的類型
// 自動從 store.getState() 的返回值推斷類型
// 包含 cart 和 message 兩個狀態分支
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: dispatch 函數的類型
// 用於 useDispatch hook 的類型檢查
// 確保只能 dispatch 有效的 actions
export type AppDispatch = typeof store.dispatch;