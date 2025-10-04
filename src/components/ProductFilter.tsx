import React, { useState } from "react";
import { Typography, Tag, Space, Button, Collapse } from "antd";
import {
  FilterOutlined,
  ClearOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import type { GoodItem } from "../types/good";
import { useProductFilter } from "../hooks/useProductFilter";
import "./ProductFilter.sass";

const { Text } = Typography;

interface ProductFilterProps {
  products: GoodItem[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  filteredCount: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  selectedTags,
  onTagsChange,
  filteredCount,
}) => {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(true);
  const { allTags } = useProductFilter(products, selectedTags);

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const clearAllFilters = () => {
    onTagsChange([]);
  };

  return (
    <div className="product-filter">
      <Collapse
        activeKey={isFilterCollapsed ? [] : ["filter"]}
        onChange={() => setIsFilterCollapsed(!isFilterCollapsed)}
        ghost
        expandIcon={({ isActive }) =>
          isActive ? (
            <UpOutlined className="product-filter__expand-icon" />
          ) : (
            <DownOutlined className="product-filter__expand-icon" />
          )
        }
        items={[
          {
            key: "filter",
            label: (
              <div className="product-filter__collapse-label">
                <Text strong className="product-filter__title-text">
                  <FilterOutlined className="product-filter__title-icon" />
                  標籤篩選
                  {selectedTags.length > 0 && (
                    <span className="product-filter__title-badge">
                      {selectedTags.length}
                    </span>
                  )}
                </Text>
                {selectedTags.length > 0 && (
                  <Button
                    size="small"
                    icon={<ClearOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAllFilters();
                    }}
                    type="text"
                    className="product-filter__clear-button"
                  >
                    清除篩選
                  </Button>
                )}
              </div>
            ),
            children: (
              <div className="product-filter__content">
                <Space size={[8, 8]} wrap>
                  {allTags.map((tag) => (
                    <Tag.CheckableTag
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagClick(tag)}
                      className="product-filter__tag"
                    >
                      {tag}
                    </Tag.CheckableTag>
                  ))}
                </Space>
                {selectedTags.length > 0 && (
                  <div className="product-filter__summary">
                    <Text type="secondary">
                      已選擇標籤：{selectedTags.join(", ")} | 符合條件的商品：
                      {filteredCount} 個
                    </Text>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProductFilter;
