import React from "react";
import { Typography, List, Button, InputNumber, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../store/actions/cartActions";
import "./ShopCartPage.sass";

const { Title, Text } = Typography;

const ShopCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartItemQuantity(id, quantity));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="shop-cart-container">
        <div className="empty-cart-container">
          <Empty
            description="購物車是空的"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button type="primary" href="/good" style={{ marginTop: 16 }}>
            去購物
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-cart-container">
      <div className="cart-header">
        <Title level={2}>購物車</Title>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="cart-item">
            <div className="cart-item-content">
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

              <div className="cart-item-actions">
                <div className="cart-item-price">{item.price}</div>

                <div className="cart-item-quantity">
                  <Text>數量：</Text>
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.id, value || 1)
                    }
                    size="small"
                  />
                </div>

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

      <div className="cart-footer">
        <Button onClick={handleClearCart}>清空購物車</Button>
        <Button type="primary" size="large">
          結帳
        </Button>
      </div>
    </div>
  );
};

export default ShopCart;
