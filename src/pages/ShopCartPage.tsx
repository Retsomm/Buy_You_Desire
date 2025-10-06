/**
 * React 核心 hooks 導入
 * useState: 管理組件局部狀態
 * useEffect: 處理副作用和生命週期
 */
import React, { useState, useEffect } from "react";

/**
 * Ant Design 組件導入
 * Typography: 文字排版組件
 * List: 列表組件，用於顯示購物車商品
 * Button: 按鈕組件
 * InputNumber: 數字輸入框，用於商品數量調整
 * Empty: 空狀態組件，當購物車為空時顯示
 */
import { Typography, List, Button, InputNumber, Empty } from "antd";

/**
 * Ant Design 圖標導入
 * DeleteOutlined: 刪除圖標，用於移除商品按鈕
 */
import { DeleteOutlined } from "@ant-design/icons";

/**
 * React Router 導航 hook
 * 用於頁面跳轉和路由導航
 */
import { useNavigate } from "react-router-dom";

/**
 * 自定義 Redux hooks 導入
 * useAppSelector: 用於從 Redux store 選擇狀態
 * useAppDispatch: 用於分發 Redux actions
 */
import { useAppSelector, useAppDispatch } from "../hooks/redux";

/**
 * 購物車相關的 thunk actions 導入
 * 這些是異步 action creators，包含業務邏輯和消息提示
 */
import {
  removeFromCartWithMessage,
  updateCartItemQuantityWithMessage,
  clearCartWithMessage,
  checkoutWithMessage,
} from "../store/actions/cartThunks";

/**
 * 購物車頁面樣式導入
 */
import "./ShopCartPage.sass";

/**
 * 解構 Typography 組件
 * Title: 標題組件
 * Text: 文本組件
 */
const { Title, Text } = Typography;

/**
 * 購物車頁面組件
 *
 * 功能特性：
 * - 顯示購物車中的所有商品
 * - 支持商品數量調整
 * - 支持單個商品移除
 * - 支持清空整個購物車
 * - 支持結帳功能
 * - 空購物車狀態處理
 * - iOS 設備鍵盤縮放問題修復
 *
 * 狀態管理：
 * - 使用 Redux 管理購物車數據
 * - 使用本地狀態管理結帳加載狀態
 */
const ShopCart: React.FC = () => {
  /** Redux dispatch 函數，用於分發 actions */
  const dispatch = useAppDispatch();

  /** 路由導航函數，用於頁面跳轉 */
  const navigate = useNavigate();

  /**
   * 從 Redux store 中選擇購物車相關狀態
   * items: 購物車商品列表
   * totalQuantity: 商品總數量
   * totalPrice: 商品總價格
   */
  const { items, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  /**
   * 結帳加載狀態
   * 用於控制結帳按鈕的加載狀態和防止重複點擊
   */
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  /**
   * 重置頁面縮放的函數
   *
   * 解決 iOS 設備上鍵盤彈出時頁面縮放的問題
   * 當用戶在 InputNumber 組件中輸入時，iOS Safari 會自動縮放頁面
   * 這個函數通過臨時禁用縮放來解決這個問題
   */
  const resetViewportScale = () => {
    // 僅在 iOS 設備上執行
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const content = viewport.getAttribute("content");
        // 臨時禁用用戶縮放
        viewport.setAttribute("content", content + ", user-scalable=no");

        // 短暫延遲後恢復用戶縮放功能
        setTimeout(() => {
          viewport.setAttribute(
            "content",
            content || "width=device-width, initial-scale=1"
          );
        }, 100);
      }

      // 強制重置頁面滾動位置
      if (window.scrollTo) {
        window.scrollTo(0, 0);
      }
    }
  };

  /**
   * 監聽頁面縮放和可見性變化的 effect
   *
   * 處理 iOS 設備的特殊情況：
   * 1. 當頁面重新變為可見時重置縮放
   * 2. 當窗口大小改變時重置縮放
   *
   * 這確保了在各種場景下頁面都能保持正確的縮放比例
   */
  useEffect(() => {
    /**
     * 處理頁面可見性變化
     * 當用戶切換回應用時重置縮放
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetViewportScale();
      }
    };

    /**
     * 處理窗口大小變化
     * 延遲執行以確保 iOS 鍵盤動畫完成
     */
    const handleResize = () => {
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        setTimeout(() => {
          resetViewportScale();
        }, 300);
      }
    };

    // 添加事件監聽器
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    // 清理函數：移除事件監聽器
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * 處理商品數量變更
   *
   * @param id - 商品ID
   * @param quantity - 新的數量
   */
  const handleQuantityChange = (id: number, quantity: number) => {
    // 分發更新數量的 thunk action
    dispatch(updateCartItemQuantityWithMessage(id, quantity));

    // 在數量改變後重置縮放，防止 iOS 縮放問題
    setTimeout(() => {
      resetViewportScale();
    }, 100);
  };

  /**
   * 處理移除單個商品
   *
   * @param id - 要移除的商品ID
   */
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCartWithMessage(id));
  };

  /**
   * 處理清空整個購物車
   * 移除所有商品並顯示相應的消息提示
   */
  const handleClearCart = () => {
    dispatch(clearCartWithMessage());
  };

  /**
   * 處理結帳流程
   *
   * 執行步驟：
   * 1. 設置加載狀態，防止重複點擊
   * 2. 分發結帳 thunk action
   * 3. 延遲 3 秒後跳轉到賬單頁面
   */
  const handleCheckout = () => {
    setIsCheckingOut(true);
    dispatch(checkoutWithMessage());

    // 模擬結帳處理時間，然後跳轉到賬單頁面
    setTimeout(() => {
      navigate("/bill");
    }, 3000);
  };

  /**
   * 空購物車狀態渲染
   * 當購物車中沒有商品時顯示空狀態頁面
   */
  if (items.length === 0) {
    return (
      <div className="shop-cart-container">
        <div className="empty-cart-container">
          <Empty
            description="購物車是空的"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button
            type="primary"
            onClick={() => navigate("/good")}
            className="empty-cart-button"
          >
            去購物
          </Button>
        </div>
      </div>
    );
  }

  /**
   * 主要購物車界面渲染
   * 包含商品列表、價格統計和操作按鈕
   */
  return (
    <div className="shop-cart-container">
      {/* 購物車標題區域 */}
      <div className="cart-header">
        <Title level={2}>購物車</Title>
      </div>

      {/* 商品列表區域 */}
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="cart-item">
            <div className="cart-item-content">
              {/* 商品信息區域 */}
              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-description">{item.description}</div>
                <div className="cart-item-tags">
                  {item.tags.map((tag: string) => (
                    <span key={tag} className="cart-item-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 商品操作區域 */}
              <div className="cart-item-actions">
                {/* 商品價格顯示 */}
                <div className="cart-item-price">{item.price}</div>

                {/* 數量調整控件 */}
                <div className="cart-item-quantity">
                  <Text>數量：</Text>
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.id, value || 1)
                    }
                    onPressEnter={() => resetViewportScale()}
                    onBlur={() => resetViewportScale()}
                    size="small"
                  />
                </div>

                {/* 移除商品按鈕 */}
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-button"
                >
                  移除
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* 購物車統計摘要 */}
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span className="cart-summary-label">總商品數量：</span>
          <span className="cart-summary-value">{totalQuantity} 件</span>
        </div>
        <div className="cart-summary-row">
          <span className="cart-summary-label">總金額：</span>
          <span className="cart-summary-value cart-summary-total">
            NT$ {totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 底部操作按鈕區域 */}
      <div className="cart-footer">
        {/* 清空購物車按鈕 */}
        <Button onClick={handleClearCart}>清空購物車</Button>

        {/* 結帳按鈕 */}
        <Button
          type="primary"
          size="large"
          onClick={handleCheckout}
          loading={isCheckingOut}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "處理中..." : "結帳"}
        </Button>
      </div>
    </div>
  );
};

export default ShopCart;
