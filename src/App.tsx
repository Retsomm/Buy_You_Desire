import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { THEME_COLORS, SHADOWS } from "./styles/colors";
import "./App.css";

const Home = lazy(() => import("./pages/HomePage"));
const Good = lazy(() => import("./pages/GoodPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const ShopCart = lazy(() => import("./pages/ShopCartPage"));
const Bill = lazy(() => import("./pages/BillPage"));

// 自定義主題配置 - 只使用七種基本顏色
const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // 主要顏色配置 - 使用基本顏色
    colorPrimary: THEME_COLORS.colorPrimary, // cherry-blossom-pink
    colorSuccess: THEME_COLORS.colorSuccess, // platinum
    colorWarning: THEME_COLORS.colorWarning, // champagne-pink
    colorError: THEME_COLORS.colorError, // mountbatten-pink
    colorInfo: THEME_COLORS.colorInfo, // pink

    // 文字顏色配置 - 使用基本顏色
    colorText: THEME_COLORS.colorText, // dark-text
    colorTextSecondary: THEME_COLORS.colorTextSecondary, // medium-text
    colorTextTertiary: THEME_COLORS.colorTextTertiary, // mountbatten-pink

    // 背景顏色配置
    colorBgContainer: THEME_COLORS.colorBgContainer,
    colorBgElevated: THEME_COLORS.colorBgElevated,
    colorBgLayout: THEME_COLORS.colorBgLayout, // champagne-pink

    // 邊框顏色 - 使用基本顏色
    colorBorder: THEME_COLORS.colorBorder, // platinum
    colorBorderSecondary: THEME_COLORS.colorBorderSecondary, // champagne-pink

    // 陰影配置 - 使用基本顏色
    boxShadow: SHADOWS.default,
    boxShadowSecondary: SHADOWS.secondary,

    // 字體配置
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,

    // 圓角配置
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // 間距配置
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,

    // 控制項高度
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
  },
  components: {
    // Button 組件樣式
    Button: {
      primaryShadow: SHADOWS.button,
      dangerShadow: SHADOWS.buttonDanger,
      borderRadius: 8,
      controlHeight: 40,
      fontSize: 14,
      fontWeight: 500,
    },

    // Card 組件樣式
    Card: {
      borderRadius: 16,
      boxShadow: SHADOWS.card,
      headerBg: "transparent",
    },

    // Typography 組件樣式
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },

    // Tag 組件樣式
    Tag: {
      borderRadius: 6,
      defaultBg: `rgba(244, 172, 183, 0.1)`, // cherry-blossom-pink with opacity
      defaultColor: THEME_COLORS.colorText,
    },

    // Input 組件樣式
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },

    // Modal 組件樣式
    Modal: {
      borderRadius: 12,
      headerBg: THEME_COLORS.colorBgContainer,
    },
  },
};

export default function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="good"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Good />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="shopCart"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ShopCart />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="bill"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Bill />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
