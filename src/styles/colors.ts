// Color constants - 五種基本顏色符合對比色協定
export const COLORS = {
    platinum: '#d8e2dcff',
    champagnePink: '#ffe5d9ff',
    pink: '#ffcad4ff',
    cherryBlossomPink: '#f4acb7ff',
    mountbattenPink: '#9d8189ff',

    // 符合對比色協定的文字顏色
    textOnLight: '#2c1810',    // 深色文字用於淺色背景
    textSecondary: '#5d4037',  // 次要文字
    textOnDark: '#ffffff',     // 淺色文字用於深色背景
} as const;

// 使用基本顏色創建語義化的顏色映射
export const THEME_COLORS = {
    // App theme colors - 使用基本顏色
    colorPrimary: COLORS.cherryBlossomPink,
    colorSuccess: COLORS.platinum,
    colorWarning: COLORS.champagnePink,
    colorError: COLORS.mountbattenPink,
    colorInfo: COLORS.pink,

    // Text colors - 使用符合對比度的顏色
    colorText: COLORS.textOnLight,
    colorTextSecondary: COLORS.textSecondary,
    colorTextTertiary: COLORS.mountbattenPink,

    // Background colors - 使用基本顏色和白色
    colorBgContainer: '#ffffff',
    colorBgElevated: '#fefefe',
    colorBgLayout: COLORS.champagnePink,

    // Border colors - 使用基本顏色的變化
    colorBorder: COLORS.platinum,
    colorBorderSecondary: COLORS.champagnePink,
} as const;

// Shadow helpers - 使用基本顏色
export const SHADOWS = {
    default: `0 6px 16px 0 rgba(157, 129, 137, 0.08), 0 3px 6px -4px rgba(157, 129, 137, 0.12), 0 9px 28px 8px rgba(157, 129, 137, 0.05)`,
    secondary: `0 6px 16px 0 rgba(244, 172, 183, 0.08), 0 3px 6px -4px rgba(244, 172, 183, 0.12), 0 9px 28px 8px rgba(244, 172, 183, 0.05)`,
    button: `0 2px 4px rgba(244, 172, 183, 0.2)`,
    buttonDanger: `0 2px 4px rgba(157, 129, 137, 0.2)`,
    card: `0 4px 12px rgba(157, 129, 137, 0.08)`,
} as const;