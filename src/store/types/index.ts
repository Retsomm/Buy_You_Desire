import type { CartActionTypes } from './cartTypes';
import type { MessageActionTypes } from './messageTypes';

// Union of all action types
export type RootActionTypes = CartActionTypes | MessageActionTypes;