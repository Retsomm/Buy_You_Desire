/**
 * Message Actions - Redux 消息管理動作創建器
 * 
 * 此模組負責處理應用程式中的消息顯示邏輯，包括：
 * - 成功消息
 * - 錯誤消息
 * - 加載消息
 * - 購物車相關的特定消息
 * 
 * 使用 react-hot-toast 庫來顯示實際的 toast 通知
 */

import toast from 'react-hot-toast';
import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    CLEAR_ALL_MESSAGES
} from '../types/messageTypes';
import type {
    MessageType,
    ShowMessageAction,
    HideMessageAction,
    ClearAllMessagesAction
} from '../types/messageTypes';

/**
 * 生成唯一 ID 的輔助函數
 * 
 * 使用當前時間戳和隨機字符串組合來確保 ID 的唯一性
 * 用於為每個消息分配唯一標識符，便於後續的隱藏和管理操作
 * 
 * @returns {string} 唯一的字符串 ID
 */
const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).slice(2, 11);
};

/**
 * 顯示消息的主要動作創建器
 * 
 * 根據消息類型顯示不同樣式的 toast 通知，並創建對應的 Redux action
 * 
 * @param {MessageType} type - 消息類型 ('success' | 'error' | 'loading' | 'info')
 * @param {string} content - 消息內容文本
 * @param {number} [duration] - 可選的顯示持續時間（毫秒）
 * @returns {ShowMessageAction} Redux action 對象
 */
export const showMessage = (
    type: MessageType,
    content: string,
    duration?: number
): ShowMessageAction => {
    const id = generateId();

    // 根據消息類型使用 react-hot-toast 顯示對應的 toast
    switch (type) {
        case 'success':
            toast.success(content, {
                id,
                duration: duration || 2000
            });
            break;
        case 'error':
            toast.error(content, {
                id,
                duration: duration || 2000
            });
            break;
        case 'loading':
            toast.loading(content, {
                id,
                duration: duration || 2000
            });
            break;
        default:
            toast(content, {
                id,
                duration: duration || 1000
            });
    }

    return {
        type: SHOW_MESSAGE,
        payload: {
            id,
            type,
            content,
            duration
        }
    };
};

/**
 * 隱藏指定 ID 的消息
 * 
 * 根據消息 ID 隱藏對應的 toast 通知，並創建隱藏消息的 Redux action
 * 
 * @param {string} id - 要隱藏的消息 ID
 * @returns {HideMessageAction} Redux action 對象
 */
export const hideMessage = (id: string): HideMessageAction => {
    toast.dismiss(id);

    return {
        type: HIDE_MESSAGE,
        payload: id
    };
};

/**
 * 清除所有顯示中的消息
 * 
 * 隱藏所有當前顯示的 toast 通知，並創建清除所有消息的 Redux action
 * 通常用於頁面切換或需要重置消息狀態的場景
 * 
 * @returns {ClearAllMessagesAction} Redux action 對象
 */
export const clearAllMessages = (): ClearAllMessagesAction => {
    toast.dismiss();

    return {
        type: CLEAR_ALL_MESSAGES
    };
};

/**
 * 便利方法 - 常用消息類型的快捷函數
 * 
 * 這些函數提供了更簡潔的 API 來顯示特定類型的消息，
 * 避免每次都需要指定消息類型參數
 */

/**
 * 顯示成功消息
 * @param {string} content - 消息內容
 * @param {number} [duration] - 可選的顯示持續時間
 */
export const showSuccessMessage = (content: string, duration?: number) =>
    showMessage('success', content, duration);

/**
 * 顯示錯誤消息
 * @param {string} content - 消息內容
 * @param {number} [duration] - 可選的顯示持續時間
 */
export const showErrorMessage = (content: string, duration?: number) =>
    showMessage('error', content, duration);

/**
 * 顯示加載消息
 * @param {string} content - 消息內容
 * @param {number} [duration] - 可選的顯示持續時間
 */
export const showLoadingMessage = (content: string, duration?: number) =>
    showMessage('loading', content, duration);

/**
 * 購物車專用消息動作
 * 
 * 這些函數專門處理購物車相關的用戶操作反饋消息，
 * 提供統一的消息格式和用戶體驗
 */

/**
 * 顯示商品加入購物車的成功消息
 * @param {string} productName - 商品名稱
 */
export const showAddToCartMessage = (productName: string) =>
    showSuccessMessage(`已將「${productName}」加入購物車`);

/**
 * 顯示商品從購物車移除的成功消息
 * @param {string} productName - 商品名稱
 */
export const showRemoveFromCartMessage = (productName: string) =>
    showSuccessMessage(`已將「${productName}」從購物車移除`);

/**
 * 顯示購物車清空的成功消息
 */
export const showClearCartMessage = () =>
    showSuccessMessage('購物車已清空');

/**
 * 顯示結帳處理中的加載消息
 */
export const showCheckoutMessage = () =>
    showLoadingMessage('正在處理結帳...', 3000);