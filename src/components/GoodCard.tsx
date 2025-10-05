import React from "react";
import {
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
  onAddToCart?: () => void;
  className?: string;
}
//.ant-card-actions 是 Ant Design 自動生成的：當你使用 Card 組件的 actions 屬性時，Ant Design 會自動創建一個帶有 ant-card-actions 類名的容器。
const actions = (
  onAddToCart?: () => void
): React.ReactNode[] => [
  <ShoppingCartOutlined key="addToCart" onClick={onAddToCart} />,
];

const GoodCard: React.FC<GoodCardProps> = ({
  loading = false,
  title,
  description,
  price,
  tags,
  gradient,
  onAddToCart,
}) => {
  return (
    <Card
      loading={loading}
      actions={actions( onAddToCart)}
      style={{
        background: gradient,
      }}
      className="goodCard"
    >
      <Card.Meta
        title={
          <Text strong className="cardTitle">
            {title}
          </Text>
        }
        description={
          <div>
            <Paragraph className="cardDescription">{description}</Paragraph>
            <div className="cardTagsContainer">
              {tags.map((tag) => (
                <Tag key={tag} className="cardTag">
                  {tag}
                </Tag>
              ))}
            </div>
            <Title level={4} className="cardPrice">
              {price}
            </Title>
          </div>
        }
      />
    </Card>
  );
};

export default GoodCard;
