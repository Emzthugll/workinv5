'use client';

import Pagination from '@/components/Pagination';
import VacancyTable from '@/components/react/peso/components/job-posting/VacancyTable';
import { usePagination } from '@/hooks/usePagination';
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
    details?: string;
    subSpecializationId?: number;
    salary_from?: number;
    salary_to?: number;
    company_id?: number;
}

interface Company {
    id: number;
    name: string;
}

interface SubSpecialization {
    id: number;
    name: string;
}

interface VacancyResponse {
    data: VacancyData[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface ArchiveTabProps {
    vacancies?: VacancyResponse;
    companies: Company[];
    subspecializations: SubSpecialization[];
    search?: string;
    onSelectionChange?: (selectedIds: number[]) => void;
}

const defaultVacancies: VacancyResponse = {
    data: [],
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
};

export default function ArchiveTab({
    vacancies,
    companies,
    subspecializations,
    search = '',
    onSelectionChange,
}: ArchiveTabProps) {
    const vacancyData = vacancies || defaultVacancies;
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const { page, rowsPerPage, navigateToPage, changeRowsPerPage } =
        usePagination({
            initialPage: vacancyData.current_page,
            initialPerPage: vacancyData.per_page,
            initialSearch: search,
            tab: 'archive',
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
                onView={(id) => console.log('View:', id)}
                onDelete={(id) => console.log('Delete:', id)}
                companies={companies}
                subspecializations={subspecializations}
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
