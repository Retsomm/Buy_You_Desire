import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const Home = lazy(() => import("./pages/HomePage"));
const Good = lazy(() => import("./pages/GoodPage"));
const ShopCart = lazy(() => import("./pages/ShopCartPage"));
const Bill = lazy(() => import("./pages/BillPage.tsx"));

// 簡化的主題配置，直接使用 CSS 變數值
const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#f4acb7",
    colorSuccess: "#d8e2dc",
    colorWarning: "#ffe5d9",
    colorError: "#9d8189",
    colorInfo: "#ffcad4",
    colorText: "#2c1810",
    colorTextSecondary: "#5d4037",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#fefefe",
    colorBgLayout: "#ffe5d9",
    colorBorder: "#d8e2dc",
    borderRadius: 8,
    controlHeight: 40,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={customTheme}>
        <Toaster
          position="top-right"
          containerStyle={{
            top: "80px",
          }}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#2c1810",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(157, 129, 137, 0.08)",
              border: "1px solid #d8e2dc",
            },
            success: {
              style: {
                background: "#d8e2dc",
                color: "#2c1810",
              },
              iconTheme: {
                primary: "#f4acb7",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                background: "#9d8189",
                color: "#fff",
              },
            },
            loading: {
              style: {
                background: "#ffcad4",
                color: "#2c1810",
              },
            },
          }}
        />
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
              path="shopCart"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopCart />
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
    </Provider>
  );
}
