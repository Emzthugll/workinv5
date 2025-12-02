'use client';

import { useState } from 'react';
import VacancyTable from '@/components/react/peso/components/job-posting/VacancyTable';
import Pagination from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';

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
    onSelectionChange?: (selectedIds: number[]) => void;
}

const defaultVacancies = {
    data: [],
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
};

export default function ActiveTab({
    vacancies,
    search = '',
    onSelectionChange,
}: ActiveTabProps) {
    const vacancyData = vacancies || defaultVacancies;
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const { page, rowsPerPage, navigateToPage, changeRowsPerPage } = usePagination({
        initialPage: vacancyData.current_page,
        initialPerPage: vacancyData.per_page,
        initialSearch: search,
        tab: 'active',
        route: '/peso/job-posting',
    });

    const handleSelectionChange = (newSelection: number[]) => {
        setSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, vacancyData.total);

    return (
        <div className="mt-4 rounded-lg">
            <VacancyTable
                data={vacancyData.data}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
            />

            <Pagination
                currentPage={page}
                totalPages={vacancyData.last_page}
                totalRows={vacancyData.total}
                rowsPerPage={rowsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={navigateToPage}
                onRowsPerPageChange={changeRowsPerPage}
            />
        </div>
    );
}