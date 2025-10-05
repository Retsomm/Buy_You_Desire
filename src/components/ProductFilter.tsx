import React, { useState } from "react";
import { Typography, Tag, Space, Button, Collapse } from "antd";
import {
  FilterOutlined,
  ClearOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import type { GoodItem } from "../pages/types/good";
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
            <UpOutlined className="expand-icon" />
          ) : (
            <DownOutlined className="expand-icon" />
          )
        }
        items={[
          {
            key: "filter",
            label: (
              <div className="collapse-label">
                <Text strong className="title-text">
                  <FilterOutlined className="title-icon" />
                  標籤篩選
                  {selectedTags.length > 0 && (
                    <span className="title-badge">{selectedTags.length}</span>
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
                    className="clear-button"
                  >
                    清除篩選
                  </Button>
                )}
              </div>
            ),
            children: (
              <div className="filter-content">
                <Space size={[8, 8]} wrap>
                  {allTags.map((tag) => (
                    <Tag.CheckableTag
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagClick(tag)}
                      className="filter-tag"
                    >
                      {tag}
                    </Tag.CheckableTag>
                  ))}
                </Space>
                {selectedTags.length > 0 && (
                  <div className="filter-summary">
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
