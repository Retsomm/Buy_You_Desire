import { useMemo } from "react";
import type { GoodItem } from "../pages/types/good";

export const useProductFilter = (products: GoodItem[], selectedTags: string[]) => {
    // 從所有商品中提取唯一的標籤
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        products.forEach((product) => {
            product.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [products]);

    // 根據選中的標籤篩選商品
    const filteredProducts = useMemo(() => {
        if (selectedTags.length === 0) {
            return products;
        }
        //篩選出在標籤陣列中有包含任一個被選中標籤的商品們
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