import { router } from '@inertiajs/react';
import { useState } from 'react';

interface UsePaginationProps {
    initialPage: number;
    initialPerPage: number;
    initialSearch: string;
    tab: string;
    route: string;
}

export function usePagination({
    initialPage,
    initialPerPage,
    initialSearch,
    tab,
    route,
}: UsePaginationProps) {
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialPerPage);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const navigateToPage = (newPage: number) => {
        setPage(newPage);
        router.get(
            route,
            {
                page: newPage,
                per_page: rowsPerPage,
                search: searchQuery,
                tab,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const changeRowsPerPage = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        router.get(
            route,
            {
                page: 1,
                per_page: newRowsPerPage,
                search: searchQuery,
                tab,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return {
        page,
        rowsPerPage,
        searchQuery,
        setPage,
        setRowsPerPage,
        setSearchQuery,
        navigateToPage,
        changeRowsPerPage,
    };
}
