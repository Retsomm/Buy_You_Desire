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

// Helper function to generate unique ID
const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Action creators
export const showMessage = (
    type: MessageType,
    content: string,
    duration?: number
): ShowMessageAction => {
    const id = generateId();

    // Show toast using react-hot-toast
    switch (type) {
        case 'success':
            toast.success(content, {
                id,
                duration: duration || 4000
            });
            break;
        case 'error':
            toast.error(content, {
                id,
                duration: duration || 4000
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
                duration: duration || 3000
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

export const hideMessage = (id: string): HideMessageAction => {
    toast.dismiss(id);

    return {
        type: HIDE_MESSAGE,
        payload: id
    };
};

export const clearAllMessages = (): ClearAllMessagesAction => {
    toast.dismiss();

    return {
        type: CLEAR_ALL_MESSAGES
    };
};

// Convenience methods for common message types
export const showSuccessMessage = (content: string, duration?: number) =>
    showMessage('success', content, duration);

export const showErrorMessage = (content: string, duration?: number) =>
    showMessage('error', content, duration);

export const showLoadingMessage = (content: string, duration?: number) =>
    showMessage('loading', content, duration);

// Cart-specific message actions
export const showAddToCartMessage = (productName: string) =>
    showSuccessMessage(`已將「${productName}」加入購物車`);

export const showRemoveFromCartMessage = (productName: string) =>
    showSuccessMessage(`已將「${productName}」從購物車移除`);

export const showClearCartMessage = () =>
    showSuccessMessage('購物車已清空');

export const showCheckoutMessage = () =>
    showLoadingMessage('正在處理結帳...', 3000);