import type { CartActionTypes } from './cartTypes';
import type { MessageActionTypes } from './messageTypes';

// Union of all action types
export type RootActionTypes = CartActionTypes | MessageActionTypes;


// 統一管理：所有 action 類型集中在一個地方
// 類型安全：整個應用的 action 都有類型檢查
// 易於維護：新增功能時只需要在一個地方修改
// 避免錯誤：防止使用不存在的 action 類型
// 開發體驗：IDE 可以提供完整的自動完成和錯誤檢查
