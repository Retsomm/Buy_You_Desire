import React from "react";
import {
  HeartOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import "./GoodCard.sass";

const { Text, Paragraph, Title } = Typography;

interface GoodCardProps {
  loading?: boolean;
  title: string;
  description: string;
  price: string;
  tags: string[];
  gradient: string;
  onFavorite?: () => void;
  onDetails?: () => void;
  onAddToCart?: () => void;
}

const actions = (
  onFavorite?: () => void,
  onDetails?: () => void,
  onAddToCart?: () => void
): React.ReactNode[] => [
  <HeartOutlined key="favorite" onClick={onFavorite} />,
  <InfoCircleOutlined key="details" onClick={onDetails} />,
  <ShoppingCartOutlined key="addToCart" onClick={onAddToCart} />,
];

const GoodCard: React.FC<GoodCardProps> = ({
  loading = false,
  title,
  description,
  price,
  tags,
  gradient,
  onFavorite,
  onDetails,
  onAddToCart,
}) => {
  return (
    <Card
      loading={loading}
      actions={actions(onFavorite, onDetails, onAddToCart)}
      style={{
        background: gradient,
      }}
      className="product-card"
    >
      <Card.Meta
        title={
          <Text
            strong
            className="card-title"
            style={{ writingMode: "horizontal-tb", textOrientation: "mixed" }}
          >
            {title}
          </Text>
        }
        description={
          <div
            style={{ writingMode: "horizontal-tb", textOrientation: "mixed" }}
          >
            <Paragraph className="card-description">{description}</Paragraph>
            <div className="card-tags-container">
              {tags.map((tag) => (
                <Tag key={tag} className="card-tag">
                  {tag}
                </Tag>
              ))}
            </div>
            <Title level={4} className="card-price">
              {price}
            </Title>
          </div>
        }
      />
    </Card>
  );
};

export default GoodCard;
