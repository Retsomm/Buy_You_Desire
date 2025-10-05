import React from "react";
import { Button, Typography, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GoodCard from "../components/GoodCard";
import type { GoodItem } from "./types/good";
import { useAppDispatch } from "../hooks/redux";
import { addToCart } from "../store/actions/cartActions";
import goodData from "../data/goodData.json";
import "./HomePage.sass";
const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 從 goodData 中取前 4 個作為熱門商品
  const featuredProducts = goodData.slice(0, 4);

  const handleAddToCart = (product: GoodItem) => {
    dispatch(addToCart(product));
    console.log("Add to cart:", product);
  };

  return (
    <div className="HomePage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            購買你的未來
          </Title>
          <Paragraph className="hero-subtitle">
            在這裡，你可以購買到理想中的自己。每一個版本的你，都是經過精心設計的未來可能性。
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate("/good")}
            >
              開始購物
            </Button>
            <Button size="large" onClick={() => navigate("/profile")}>
              了解更多
            </Button>
          </Space>
        </div>
        <div className="banner"></div>
      </div>

      {/* Featured Products */}
      <div className="featured-section">
        <Title level={2} className="section-title">
          熱門未來版本
        </Title>
        <Paragraph className="section-subtitle">
          精選最受歡迎的自己，讓你的人生有更多可能性
        </Paragraph>

        <div className="goodList">
          {featuredProducts.map((product) => (
            <GoodCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              tags={product.tags}
              gradient={product.gradient}
              onAddToCart={() => handleAddToCart(product)}
              className="homePageGoodCard"
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="footer">
        <Title level={2}>準備好成為更好的自己了嗎？</Title>
        <Paragraph>
          每一個購買都是對未來的投資。選擇你想要的自己，讓夢想成為現實。
        </Paragraph>
        <Button
          type="primary"
          size="large"
          icon={<UserOutlined />}
          onClick={() => navigate("/login")}
        >
          立即開始
        </Button>
      </div>
    </div>
  );
};

export default Home;
