'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function ActiveTab() {
    // Pagination state
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Sample data
    const totalRows = 837;
    const data = Array.from({ length: totalRows }).map((_, i) => ({
        title: `Frontend Developer ${i + 1}`,
        company: `Company ${i + 1}`,
        totalApplicants: Math.floor(Math.random() * 50),
        jobType: i % 2 === 0 ? 'Full-time' : 'Part-time',
        place: 'Manila',
        salary: '₱30,000 - ₱50,000',
        totalVacancy: Math.floor(Math.random() * 10),
        datePosted: '2025-01-10',
    }));

    // Pagination calculations
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const currentRows = data.slice(startIndex, endIndex);

    // Generate page buttons with "..."
    const generatePageButtons = () => {
        const pages: (number | string)[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(i);
            } else if (
                (i === page - 2 && page > 3) ||
                (i === page + 2 && page < totalPages - 2)
            ) {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="mt-4 rounded-lg ">
            {/* Scrollable container */}
            <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
                <Table className="w-full min-w-[1200px] table-fixed text-xs">
                    <TableHeader className="sticky top-0 z-10 bg-gray-50">
                        <TableRow >
                            <TableHead className="w-[200px] truncate border px-3">
                                Title
                            </TableHead>
                            <TableHead className="w-[150px] truncate border px-3">
                                Company
                            </TableHead>
                            <TableHead className="w-[100px] border px-3">
                                Total Applicant
                            </TableHead>
                            <TableHead className="w-[100px] border px-3">
                                Job Type
                            </TableHead>
                            <TableHead className="w-[150px] truncate border px-3">
                                Place of Assignment
                            </TableHead>
                            <TableHead className="w-[120px] truncate border px-3">
                                Salary
                            </TableHead>
                            <TableHead className="w-[90px] border px-3">
                                Total Vacancy
                            </TableHead>
                            <TableHead className="w-[100px] border px-3">
                                Date Posted
                            </TableHead>
                            <TableHead className="w-[80px] border px-3 text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="max-h-[400px] overflow-y-auto">
                        {currentRows.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="truncate border px-3">
                                    {row.title}
                                </TableCell>
                                <TableCell className="truncate border px-3">
                                    {row.company}
                                </TableCell>
                                <TableCell className="w-full border px-3">
                                    {row.totalApplicants}
                                </TableCell>
                                <TableCell className="border px-3">
                                    {row.jobType}
                                </TableCell>
                                <TableCell className="truncate border px-3">
                                    {row.place}
                                </TableCell>
                                <TableCell className="truncate border px-3">
                                    {row.salary}
                                </TableCell>
                                <TableCell className="border px-3">
                                    {row.totalVacancy}
                                </TableCell>
                                <TableCell className="border px-3">
                                    {row.datePosted}
                                </TableCell>
                                <TableCell className="border px-3 text-center">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-col items-center justify-between gap-2 px-2 py-1 sm:flex-row">
                
                <div className="text-xs text-gray-600">
                    Showing <b>{startIndex + 1}</b> to <b>{endIndex}</b> of{' '}
                    <b>{totalRows}</b> Results
                </div>

                {/* Rows per page selector */}
                <div className="flex items-center gap-2">
                    <span className="text-sm">Rows per page:</span>
                    <select
                        className="rounded text-xs border px-2 py-1"
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {[10, 20, 50, 100].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Page numbers */}
                <div className="flex flex-wrap items-center gap-1">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
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
                                variant={p === page ? 'default' : 'outline'}
                                onClick={() => setPage(Number(p))}
                                className="px-3"
                            >
                                {p}
                            </Button>
                        ),
                    )}

                    <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        ›
                    </Button>
                </div>
            </div>
        </div>
    );
}
