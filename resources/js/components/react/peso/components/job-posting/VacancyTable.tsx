'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteVacancyModal from './action/DeleteVacancyModal';
import EditVacancySheet from './action/EditVacancySheet';

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

interface VacancyTableProps {
    data: VacancyData[];
    selectedRows: number[];
    onSelectionChange: (selectedIds: number[]) => void;
    onView?: (id: number) => void;
    onDelete?: (id: number) => void;
    companies: Company[];
    subspecializations: SubSpecialization[];
}

const tableHeaders = [
    { label: 'Title', width: 'w-[100px]' },
    { label: 'Company', width: 'w-[130px]' },
    { label: 'Total Applicant', width: 'w-[80px]' },
    { label: 'Job Type', width: 'w-[70px]' },
    { label: 'Place of Assignment', width: 'w-[110px]' },
    { label: 'Salary', width: 'w-[120px]' },
    { label: 'Total Vacancy', width: 'w-[70px]' },
    { label: 'Date Posted', width: 'w-[100px]' },
    { label: 'Action', width: 'w-[80px]' },
];

export default function VacancyTable({
    data,
    selectedRows,
    onSelectionChange,
    onView,
    onDelete,
    companies,
    subspecializations,
}: VacancyTableProps) {
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState<VacancyData | null>(
        null,
    );

    

    const handleSelectAll = (checked: boolean) => {
        onSelectionChange(checked ? data.map((row) => row.id) : []);
    };

    const handleSelectRow = (id: number, checked: boolean) => {
        onSelectionChange(
            checked
                ? [...selectedRows, id]
                : selectedRows.filter((rowId) => rowId !== id),
        );
    };

    const hasApplicants = (totalApplicants: number) => totalApplicants > 0;

    const handleEditClick = (vacancy: VacancyData) => {
        setSelectedVacancy(vacancy);
        setEditSheetOpen(true);
    };

    const handleDeleteClick = (vacancy: VacancyData) => {
        setSelectedVacancy(vacancy);
        setDeleteSheetOpen(true);
    };

    return (
        <>
            <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
                <Table className="w-full min-w-[1200px] table-fixed text-xs">
                    <TableHeader className="sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[50px] border px-2 text-center">
                                <Checkbox
                                    checked={
                                        selectedRows.length === data.length &&
                                        data.length > 0
                                    }
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            {tableHeaders.map((header) => (
                                <TableHead
                                    key={header.label}
                                    className={`${header.width} truncate border px-2 ${header.label === 'Action' ? 'text-center' : ''}`}
                                >
                                    {header.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No vacancies found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="border px-2 text-center">
                                        <Checkbox
                                            checked={selectedRows.includes(
                                                row.id,
                                            )}
                                            onCheckedChange={(checked) =>
                                                handleSelectRow(
                                                    row.id,
                                                    !!checked,
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="truncate border px-2">
                                        {row.title}
                                    </TableCell>
                                    <TableCell className="truncate border px-2">
                                        {row.company}
                                    </TableCell>
                                    <TableCell className="border px-2">
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onView?.(row.id)
                                                    }
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEditClick(row)
                                                    }
                                                    disabled={hasApplicants(
                                                        row.totalApplicants,
                                                    )}
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDeleteClick(row)
                                                    }
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Vacancy Sheet */}
            {selectedVacancy && (
                <EditVacancySheet
                    vacancy={selectedVacancy}
                    open={editSheetOpen}
                    onOpenChange={setEditSheetOpen}
                    companies={companies}
                    subspecializations={subspecializations}
                />
            )}

            {/* Delete Vacancy Modal */}
            <DeleteVacancyModal
                vacancy={selectedVacancy}
                open={deleteSheetOpen}
                onOpenChange={setDeleteSheetOpen}
            />
        </>
    );
}
