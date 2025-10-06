/**
 * 消息類型定義
 * 定義應用程序中可能出現的不同類型的消息
 * - success: 成功操作的提示消息
 * - error: 錯誤操作的提示消息  
 * - loading: 加載中的狀態消息
 * - custom: 自定義類型的消息
 */
export type MessageType = 'success' | 'error' | 'loading' | 'custom';

/**
 * 消息狀態接口
 * 定義Redux store中消息模塊的狀態結構
 */
export interface MessageState {
    /** 
     * 消息數組，存儲當前顯示的所有消息
     * 每個消息都有唯一的ID和相關屬性
     */
    messages: {
        /** 消息的唯一標識符，用於追蹤和管理消息 */
        id: string;
        /** 消息類型，決定消息的樣式和行為 */
        type: MessageType;
        /** 消息的文本內容 */
        content: string;
        /** 消息顯示的持續時間（毫秒），可選項，如果未設置則不會自動隱藏 */
        duration?: number;
    }[];
}

/**
 * Redux Action 類型常量
 * 定義消息相關的所有action類型字符串常量
 */

/** 顯示新消息的action類型 */
export const SHOW_MESSAGE = 'SHOW_MESSAGE';

/** 隱藏特定消息的action類型 */
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

/** 清除所有消息的action類型 */
export const CLEAR_ALL_MESSAGES = 'CLEAR_ALL_MESSAGES';

/**
 * Redux Action 接口定義
 * 定義各種消息操作的action結構
 */

/**
 * 顯示消息的action接口
 * 用於向消息列表中添加新的消息
 */
export interface ShowMessageAction {
    /** action類型標識 */
    type: typeof SHOW_MESSAGE;
    /** action的數據載荷 */
    payload: {
        /** 新消息的唯一標識符 */
        id: string;
        /** 消息類型 */
        type: MessageType;
        /** 消息內容 */
        content: string;
        /** 可選的消息顯示持續時間（毫秒） */
        duration?: number;
    };
}

/**
 * 隱藏消息的action接口
 * 用於從消息列表中移除特定的消息
 */
export interface HideMessageAction {
    /** action類型標識 */
    type: typeof HIDE_MESSAGE;
    /** 要隱藏的消息ID */
    payload: string;
}

/**
 * 清除所有消息的action接口
 * 用於一次性清空所有顯示的消息
 */
export interface ClearAllMessagesAction {
    /** action類型標識 */
    type: typeof CLEAR_ALL_MESSAGES;
}

/**
 * 消息模塊所有action類型的聯合類型
 * 包含所有可能的消息相關action，用於reducer中的類型檢查
 * 這確保了reducer能夠正確處理所有類型的消息action
 */
export type MessageActionTypes =
    | ShowMessageAction
    | HideMessageAction
    | ClearAllMessagesAction;