import React from "react";
import { Button, Typography, Row, Col, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GoodCard from "../components/GoodCard";
import type { GoodItem } from "../types/good";
import goodData from "../data/goodData.json";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 從 goodData 中取前 4 個作為熱門商品
  const featuredProducts = goodData.slice(0, 4);

  const handleAddToCart = (product: GoodItem) => {
    // TODO: 加入購物車邏輯
    console.log("Add to cart:", product);
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/good?id=${productId}`);
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

        <Row gutter={[24, 24]} className="products-grid">
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} lg={6} key={product.id}>
              <GoodCard
                title={product.title}
                description={product.description}
                price={product.price}
                tags={product.tags}
                gradient={product.gradient}
                onFavorite={() => console.log("Favorite:", product)}
                onDetails={() => handleViewDetails(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            </Col>
          ))}
        </Row>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
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
