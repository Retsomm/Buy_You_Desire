import React, { useState } from "react";
import { Typography } from "antd";
import GoodCard from "../components/GoodCard";
import ProductFilter from "../components/ProductFilter";
import PaginationControls from "../components/PaginationControls";
import type { GoodItem } from "./types/good";
import { useProductFilter } from "../hooks/useProductFilter";
import { usePagination } from "../hooks/usePagination";
import { useAppDispatch } from "../hooks/redux";
import { addToCart } from "../store/actions/cartActions";
import goodData from "../data/goodData.json";
import "./GoodPage.sass";

const { Text } = Typography;

const Good: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { filteredProducts } = useProductFilter(goodData, selectedTags);

  const { currentPage, totalPages, currentItems, totalItems, goToPage } =
    usePagination(filteredProducts, 12); // 固定每頁 12 項

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handlePageChange = (page: number) => {
    goToPage(page);
    // 滾動到頁面頂部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product: GoodItem) => {
    dispatch(addToCart(product));
    console.log("Add to cart:", product);
  };



  return (
    <div className="GoodPage">
      {/* 標籤篩選區域 */}
      <ProductFilter
        products={goodData}
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
        filteredCount={filteredProducts.length}
      />

      {/* 商品展示區域 */}
      <div className="goodList">
        {currentItems.map((product) => (
          <GoodCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            tags={product.tags}
            gradient={product.gradient}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {/* 分頁控制 */}
      {filteredProducts.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={12}
          onPageChange={handlePageChange}
        />
      )}

      {/* 沒有符合條件的商品時顯示 */}
      {filteredProducts.length === 0 && (
        <div className="no-products-message">
          <Text className="no-products-text">
            沒有符合篩選條件的商品，請嘗試調整篩選條件
          </Text>
        </div>
      )}
    </div>
  );
};

export default Good;
