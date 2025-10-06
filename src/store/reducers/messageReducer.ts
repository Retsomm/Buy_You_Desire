/**
 * 引入消息相關的 action 類型常量
 * 這些常量用於 switch case 中的類型匹配
 */
import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    CLEAR_ALL_MESSAGES
} from '../types/messageTypes';

/**
 * 引入消息相關的類型定義
 * MessageState: 消息模塊的狀態接口
 * MessageActionTypes: 所有消息 action 的聯合類型
 */
import type {
    MessageState,
    MessageActionTypes
} from '../types/messageTypes';

/**
 * 消息模塊的初始狀態
 * 當應用首次啟動時，消息列表為空
 * 這是一個純粹的初始狀態，不包含任何消息
 */
const initialState: MessageState = {
    messages: []
};

/**
 * 消息模塊的 Redux Reducer
 * 
 * 這個 reducer 負責處理所有與消息相關的狀態變更：
 * - 顯示新消息（添加到消息列表）
 * - 隱藏特定消息（從消息列表中移除）
 * - 清空所有消息（重置消息列表）
 * 
 * @param state - 當前的消息狀態，默認為初始狀態
 * @param action - 要處理的 action，包含類型和數據載荷
 * @returns 更新後的消息狀態
 */
export const messageReducer = (
    state: MessageState = initialState,
    action: MessageActionTypes
): MessageState => {
    switch (action.type) {
        /**
         * 處理顯示新消息的 action
         * 將新消息添加到現有消息列表的末尾
         * 使用展開運算符保持狀態的不可變性
         */
        case SHOW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };

        /**
         * 處理隱藏特定消息的 action
         * 通過過濾消息 ID 來移除指定的消息
         * 保留所有 ID 不匹配的消息
         */
        case HIDE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload)
            };

        /**
         * 處理清空所有消息的 action
         * 將消息列表重置為空數組
         * 通常在用戶明確要求清除所有通知時使用
         */
        case CLEAR_ALL_MESSAGES:
            return {
                ...state,
                messages: []
            };

        /**
         * 默認情況：未識別的 action 類型
         * 直接返回當前狀態，不做任何修改
         * 這確保了 reducer 的純函數特性
         */
        default:
            return state;
    }
};