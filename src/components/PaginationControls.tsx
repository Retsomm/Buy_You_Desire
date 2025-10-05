import React from "react";
import { Pagination, Space, Typography } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import "./PaginationControls.sass";

const { Text } = Typography;

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // 計算當前頁面顯示的項目範圍
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const itemRender = (
    _current: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return (
        <span className="pagination-item-render">
          <LeftOutlined />
        </span>
      );
    }
    if (type === "next") {
      return (
        <span className="pagination-item-render">
          <RightOutlined />
        </span>
      );
    }
    if (type === "jump-prev") {
      return (
        <span className="pagination-item-render">
          <DoubleLeftOutlined />
        </span>
      );
    }
    if (type === "jump-next") {
      return (
        <span className="pagination-item-render">
          <DoubleRightOutlined />
        </span>
      );
    }
    return originalElement;
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="paginationContainer">
      {/* 顯示當前頁面信息 */}
      <Space>
        <Text type="secondary">
          顯示第 {startItem} - {endItem} 項，共 {totalItems} 項
        </Text>
      </Space>

      {/* 分頁控制 */}

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={onPageChange}
        itemRender={itemRender}
        size="small"
        className="paginationWrapper"
        hideOnSinglePage={true}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationControls;
