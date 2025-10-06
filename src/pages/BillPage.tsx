import React, { useEffect, useState } from "react";
import { Typography, Card, Empty, Button } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { clearCart } from "../store/actions/cartActions";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const BillPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state);
  const [checkoutItems] = useState(() => [...items]); // 保存結帳時的商品狀態

  useEffect(() => {
    // 清空購物車
    if (items.length > 0) {
      dispatch(clearCart());
    }
  }, [dispatch, items.length]);

  if (checkoutItems.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          flexDirection: "column",
        }}
      >
        <Empty
          description="沒有結帳商品"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button
          type="primary"
          onClick={() => navigate("/good")}
          style={{ marginTop: 16 }}
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
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
        }}
      >
        <Title
          level={1}
          style={{
            color: "#2d3436",
            marginBottom: "20px",
            fontSize: "2.5rem",
          }}
        >
          🎉 恭喜你
        </Title>

        <Title
          level={2}
          style={{
            color: "#636e72",
            marginBottom: "30px",
            fontWeight: "normal",
          }}
        >
          已經成為
        </Title>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "12px",
            margin: "20px 0",
          }}
        >
          <Text
            style={{
              fontSize: "1.2rem",
              color: "#2d3436",
              fontWeight: "bold",
              lineHeight: 1.6,
            }}
          >
            {productNamesText}
          </Text>
          <br />
          <Text
            style={{
              fontSize: "1.2rem",
              color: "#2d3436",
              fontWeight: "bold",
            }}
          >
            的人類
          </Text>
        </div>

        <Paragraph
          style={{
            fontSize: "1rem",
            color: "#636e72",
            lineHeight: 1.8,
            marginTop: "30px",
            textAlign: "left",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          但現實生活其實沒有那麼容易得到渴望的東西，期許你可以在擁有目標後，腳踏實地得去行動。
        </Paragraph>

        <div style={{ marginTop: "40px" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/good")}
            style={{
              marginRight: "16px",
              borderRadius: "8px",
              height: "48px",
              paddingLeft: "32px",
              paddingRight: "32px",
            }}
          >
            繼續購物
          </Button>
          <Button
            size="large"
            onClick={() => navigate("/")}
            style={{
              borderRadius: "8px",
              height: "48px",
              paddingLeft: "32px",
              paddingRight: "32px",
            }}
          >
            回到首頁
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BillPage;
