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
import { router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface VacancyData {
    id: number;
    title: string;
    company: string;
    totalApplicants: number;
    jobType: string;
    place: string;
    salary: string;
    totalVacancy: number;
    datePosted: string;
}

interface ActiveTabProps {
    vacancies?: {
        data: VacancyData[];
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
    search?: string;
}

export default function ActiveTab({ vacancies, search = '' }: ActiveTabProps) {
    // Provide default values if vacancies is undefined
    const defaultVacancies = {
        data: [],
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
    };

    const vacancyData = vacancies || defaultVacancies;

    // Debug: Log what we received
    console.log('Vacancies received:', vacancies);
    console.log('Vacancy data:', vacancyData);

    const [page, setPage] = useState(vacancyData.current_page);
    const [rowsPerPage, setRowsPerPage] = useState(vacancyData.per_page);
    const [searchQuery, setSearchQuery] = useState(search);

    const data = vacancyData.data;
    const totalRows = vacancyData.total;
    const totalPages = vacancyData.last_page;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

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
        <div className="mt-4 rounded-lg">
            <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
                <Table className="w-full min-w-[1200px] table-fixed text-xs">
                    <TableHeader className="sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[100px] truncate border px-2">
                                Title
                            </TableHead>
                            <TableHead className="w-[130px] truncate border px-2">
                                Company
                            </TableHead>
                            <TableHead className="w-[100px] border px-2">
                                Total Applicant
                            </TableHead>
                            <TableHead className="w-[100px] border px-2">
                                Job Type
                            </TableHead>
                            <TableHead className="w-[150px] truncate border px-2">
                                Place of Assignment
                            </TableHead>
                            <TableHead className="w-[120px] truncate border px-2">
                                Salary
                            </TableHead>
                            <TableHead className="w-[90px] border px-2">
                                Total Vacancy
                            </TableHead>
                            <TableHead className="w-[100px] border px-2">
                                Date Posted
                            </TableHead>
                            <TableHead className="w-[80px] border px-2 text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="max-h-[400px] overflow-y-auto">
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No vacancies found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="truncate border px-2">
                                        {row.title}
                                    </TableCell>
                                    <TableCell className="truncate border px-2">
                                        {row.company}
                                    </TableCell>
                                    <TableCell className="w-full border px-2">
                                        {row.totalApplicants}
                                    </TableCell>
                                    <TableCell className="border px-2">
                                        {row.jobType}
                                    </TableCell>
                                    <TableCell className="truncate border px-2">
                                        {row.place}
                                    </TableCell>
                                    <TableCell className="truncate border px-2">
                                        {row.salary}
                                    </TableCell>
                                    <TableCell className="border px-2">
                                        {row.totalVacancy}
                                    </TableCell>
                                    <TableCell className="border px-2">
                                        {row.datePosted}
                                    </TableCell>
                                    <TableCell className="border px-2 text-center">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-2 px-2 py-1 sm:flex-row">
                <div className="text-xs text-gray-600">
                    {totalRows > 0 ? (
                        <>
                            Showing <b>{startIndex + 1}</b> to <b>{endIndex}</b>{' '}
                            of <b>{totalRows}</b> Results
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
                        onChange={(e) => {
                            const newRowsPerPage = Number(e.target.value);
                            setRowsPerPage(newRowsPerPage);
                            setPage(1);
                            router.get(
                                '/peso/job-posting',
                                {
                                    page: 1,
                                    per_page: newRowsPerPage,
                                    search: searchQuery,
                                    tab: 'active',
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
                            );
                        }}
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
                            disabled={page === 1}
                            onClick={() => {
                                const newPage = page - 1;
                                setPage(newPage);
                                router.get(
                                    '/peso/job-posting',
                                    {
                                        page: newPage,
                                        per_page: rowsPerPage,
                                        search: searchQuery,
                                        tab: 'active',
                                    },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
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
                                        p === page ? 'darkblue' : 'outline'
                                    }
                                    onClick={() => {
                                        const newPage = Number(p);
                                        setPage(newPage);
                                        router.get(
                                            '/peso/job-posting',
                                            {
                                                page: newPage,
                                                per_page: rowsPerPage,
                                                search: searchQuery,
                                                tab: 'active',
                                            },
                                            {
                                                preserveState: true,
                                                preserveScroll: true,
                                            },
                                        );
                                    }}
                                    className="px-3"
                                >
                                    {p}
                                </Button>
                            ),
                        )}

                        <Button
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => {
                                const newPage = page + 1;
                                setPage(newPage);
                                router.get(
                                    '/peso/job-posting',
                                    {
                                        page: newPage,
                                        per_page: rowsPerPage,
                                        search: searchQuery,
                                        tab: 'active',
                                    },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
                        >
                            ›
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
