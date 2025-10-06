import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    CLEAR_ALL_MESSAGES
} from '../types/messageTypes';
import type {
    MessageState,
    MessageActionTypes
} from '../types/messageTypes';

// Initial state
const initialState: MessageState = {
    messages: []
};

// Message reducer
export const messageReducer = (
    state: MessageState = initialState,
    action: MessageActionTypes
): MessageState => {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };

        case HIDE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload)
            };

        case CLEAR_ALL_MESSAGES:
            return {
                ...state,
                messages: []
            };

        default:
            return state;
    }
};