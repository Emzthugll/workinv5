'use client';

import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalRows: number;
    rowsPerPage: number;
    startIndex: number;
    endIndex: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalRows,
    rowsPerPage,
    startIndex,
    endIndex,
    onPageChange,
    onRowsPerPageChange,
}: PaginationProps) {
    const generatePageButtons = () => {
        const pages: (number | string)[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(i);
            } else if (
                (i === currentPage - 2 && currentPage > 3) ||
                (i === currentPage + 2 && currentPage < totalPages - 2)
            ) {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="mt-4 flex flex-col items-center justify-between gap-2 px-2 py-1 sm:flex-row">
            <div className="text-xs text-gray-600">
                {totalRows > 0 ? (
                    <>
                        Showing <b>{startIndex + 1}</b> to <b>{endIndex}</b> of{' '}
                        <b>{totalRows}</b> Results
                    </>
                ) : (
                    'No results'
                )}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">Rows per page:</span>
                <select
                    className="rounded border px-2 py-1 text-xs"
                    value={rowsPerPage}
                    onChange={(e) =>
                        onRowsPerPageChange(Number(e.target.value))
                    }
                >
                    {[10, 20, 50, 100].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            {totalPages > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        ‹
                    </Button>

                    {generatePageButtons().map((p, idx) =>
                        p === '...' ? (
                            <span key={idx} className="px-2">
                                ...
                            </span>
                        ) : (
                            <Button
                                key={idx}
                                variant={
                                    p === currentPage ? 'darkblue' : 'outline'
                                }
                                onClick={() => onPageChange(Number(p))}
                                className="px-3"
                            >
                                {p}
                            </Button>
                        ),
                    )}

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        ›
                    </Button>
                </div>
            )}
        </div>
    );
}
