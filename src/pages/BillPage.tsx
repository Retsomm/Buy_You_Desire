import React, { useEffect, useState } from "react";
import { Typography, Card, Empty, Button } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { clearCart } from "../store/actions/cartActions";
import { useNavigate } from "react-router-dom";
import "./BillPage.sass";

const { Title, Text, Paragraph } = Typography;

const BillPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const [checkoutItems] = useState(() => [...items]); // 保存結帳時的商品狀態

  useEffect(() => {
    // 清空購物車
    if (items.length > 0) {
      dispatch(clearCart());
    }
  }, [dispatch, items.length]);

  if (checkoutItems.length === 0) {
    return (
      <div className="empty-bill-container">
        <Empty
          description="沒有結帳商品"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button
          type="primary"
          onClick={() => navigate("/good")}
          className="empty-bill-button"
        >
          去購物
        </Button>
      </div>
    );
  }

  // 提取商品名稱，忽略購買數量
  const productNames = checkoutItems.map((item) => item.title);
  const productNamesText = productNames.join("、");

  return (
    <div className="bill-page-container">
      <Card className="bill-card">
        <Title level={1} className="congratulation-title">
          🎉 恭喜你
        </Title>

        <Title level={2} className="become-title">
          已經成為
        </Title>

        <div className="product-info-container">
          <Text className="product-name-text">{productNamesText}</Text>
          <br />
          <Text className="human-text">的人類</Text>
        </div>

        <Paragraph className="message-paragraph">
          但現實生活其實沒有那麼容易得到渴望的東西，期許你可以在擁有目標後，腳踏實地得去行動。
        </Paragraph>

        <div className="bill-actions-container">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/good")}
            className="continue-shopping-button"
          >
            繼續購物
          </Button>
          <Button
            size="large"
            onClick={() => navigate("/")}
            className="back-home-button"
          >
            回到首頁
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BillPage;
