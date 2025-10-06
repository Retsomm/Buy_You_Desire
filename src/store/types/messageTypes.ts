// Message types
export type MessageType = 'success' | 'error' | 'loading' | 'custom';

// Message interface
export interface MessageState {
    messages: {
        id: string;
        type: MessageType;
        content: string;
        duration?: number;
    }[];
}

// Action types
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const CLEAR_ALL_MESSAGES = 'CLEAR_ALL_MESSAGES';

// Action interfaces
export interface ShowMessageAction {
    type: typeof SHOW_MESSAGE;
    payload: {
        id: string;
        type: MessageType;
        content: string;
        duration?: number;
    };
}

export interface HideMessageAction {
    type: typeof HIDE_MESSAGE;
    payload: string; // message id
}

export interface ClearAllMessagesAction {
    type: typeof CLEAR_ALL_MESSAGES;
}

// Union type for all message actions
export type MessageActionTypes =
    | ShowMessageAction
    | HideMessageAction
    | ClearAllMessagesAction;