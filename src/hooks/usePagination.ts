import { useState, useMemo, useCallback, useEffect } from "react";

export const usePagination = <T>(
    items: T[],//接收從filteredProducts傳來的陣列(篩選完成的商品卡片們)
    itemsPerPage: number = 12
) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    // 當 items 陣列改變時，重置到第一頁
    useEffect(() => {
        setCurrentPage(1);
    }, [items]);

    // 計算總頁數
    const totalPages = useMemo(() => {
        return Math.ceil(items.length / itemsPerPage);
    }, [items.length, itemsPerPage]);

    // 獲取當前頁面的項目
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const result = items.slice(startIndex, endIndex);
        return result;
    }, [items, currentPage, itemsPerPage]);

    // 重置到第一頁（當篩選條件改變時使用）
    const resetToFirstPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    // 跳轉到指定頁面
    const goToPage = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // 下一頁
    const nextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, totalPages]);

    // 上一頁
    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);

    return {
        currentPage, //目前所在的頁面
        totalPages, //篩選後的總頁面
        currentItems, //[...], //包含當前頁面的商品陣列
        totalItems: items.length, //篩選後的總商品數
        itemsPerPage, // 每頁12個商品
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        goToPage,
        nextPage,
        prevPage,
        resetToFirstPage,
    };
};