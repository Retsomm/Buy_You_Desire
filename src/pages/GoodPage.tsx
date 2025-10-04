import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import GoodCard from "../components/GoodCard";
import ProductFilter from "../components/ProductFilter";
import type { GoodItem } from "../types/good";
import { useProductFilter } from "../hooks/useProductFilter";
import goodData from "../data/goodData.json";

const { Title, Text } = Typography;

const Good: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { filteredProducts } = useProductFilter(goodData, selectedTags);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleAddToCart = (product: GoodItem) => {
    console.log("Add to cart:", product);
  };

  const handleViewDetails = (productId: number) => {
    console.log("View details:", productId);
  };

  const handleFavorite = (product: GoodItem) => {
    console.log("Favorite:", product);
  };

  return (
    <div className="GoodPage">
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        所有商品
      </Title>

      {/* 標籤篩選區域 */}
      <ProductFilter
        products={goodData}
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
        filteredCount={filteredProducts.length}
      />

      {/* 商品展示區域 */}
      <Row gutter={[24, 24]}>
        {filteredProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <GoodCard
              title={product.title}
              description={product.description}
              price={product.price}
              tags={product.tags}
              gradient={product.gradient}
              onFavorite={() => handleFavorite(product)}
              onDetails={() => handleViewDetails(product.id)}
              onAddToCart={() => handleAddToCart(product)}
            />
          </Col>
        ))}
      </Row>

      {/* 沒有符合條件的商品時顯示 */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px", color: "#999" }}>
          <Text style={{ fontSize: "16px" }}>
            沒有符合篩選條件的商品，請嘗試調整篩選條件
          </Text>
        </div>
      )}
    </div>
  );
};

export default Good;
