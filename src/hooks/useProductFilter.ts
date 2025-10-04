import { useMemo } from "react";
import type { GoodItem } from "../types/good";

/**
 * Custom hook for product filtering logic
 */
export const useProductFilter = (products: GoodItem[], selectedTags: string[]) => {
    // 從所有商品中提取唯一的標籤
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        products.forEach((product) => {
            product.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [products]);

    // 根據選中的標籤篩選商品 (OR邏輯)
    const filteredProducts = useMemo(() => {
        if (selectedTags.length === 0) {
            return products;
        }
        return products.filter((product) =>
            selectedTags.some((selectedTag) => product.tags.includes(selectedTag))
        );
    }, [products, selectedTags]);

    return {
        allTags,
        filteredProducts,
        hasFilters: selectedTags.length > 0,
        filteredCount: filteredProducts.length,
    };
};