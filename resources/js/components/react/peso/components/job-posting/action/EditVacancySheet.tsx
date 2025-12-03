'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import axios from 'axios';
import { AlertCircle, CheckCircle, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import VacancyForm from '../VacancyForm';

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

interface VacancyFormData {
    company: string;
    jobTitle: string;
    place: string;
    category: string;
    salaryFrom: string;
    salaryTo: string;
    totalVacancies: string;
    jobType: string;
    details: string;
}

interface EditVacancySheetProps {
    vacancy: VacancyData;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    companies: Company[];
    subspecializations: SubSpecialization[];
}

export default function EditVacancySheet({
    vacancy,
    open,
    onOpenChange,
    companies,
    subspecializations,
}: EditVacancySheetProps) {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [formData, setFormData] = useState<VacancyFormData>({
        company: vacancy.company_id?.toString() || '',
        jobTitle: vacancy.title,
        place: vacancy.place,
        category: vacancy.subSpecializationId?.toString() || '',
        salaryFrom: vacancy.salary_from?.toString() || '',
        salaryTo: vacancy.salary_to?.toString() || '',
        totalVacancies: vacancy.totalVacancy.toString(),
        jobType: vacancy.jobType,
        details: vacancy.details || '',
    });
    const sheetContentRef = React.useRef<HTMLDivElement>(null);

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setNotification(null);

        // Validate required fields
        if (!formData.company) {
            setNotification({
                type: 'error',
                message: 'Please select a company',
            });
            setLoading(false);
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
            return;
        }

        if (!formData.category) {
            setNotification({
                type: 'error',
                message: 'Please select a category',
            });
            setLoading(false);
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
            return;
        }

        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            await axios.put(
                `/peso/job-posting/${vacancy.id}`,
                {
                    company_id: formData.company,
                    title: formData.jobTitle,
                    location: formData.place,
                    sub_specialization_id: formData.category,
                    salary_from: formData.salaryFrom || null,
                    salary_to: formData.salaryTo || null,
                    total_vacancy: formData.totalVacancies,
                    job_type: formData.jobType,
                    details: formData.details || null,
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                },
            );

            setNotification({
                type: 'success',
                message: 'Vacancy updated successfully!',
            });
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
            setTimeout(() => {
                onOpenChange(false);
                window.location.reload();
            }, 1500);
        } catch (error: any) {
            console.error(error);
            let errorMessage = 'Failed to update vacancy.';

            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join(', ');
            }

            setNotification({
                type: 'error',
                message: errorMessage,
            });
        } finally {
            setLoading(false);
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-[800px] max-w-none overflow-y-auto rounded-l-xl p-6 shadow-xl"
                ref={sheetContentRef}
            >
                <SheetHeader>
                    <div className="flex items-center justify-between">
                        <SheetTitle>Edit Vacancy</SheetTitle>
                    </div>
                    <SheetDescription>
                        Update the vacancy details below.
                    </SheetDescription>
                </SheetHeader>

                {/* Notification - Inside Sheet at Top */}
                {notification && (
                    <div
                        className={`mb-4 flex items-center gap-3 rounded-lg p-4 ${
                            notification.type === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <p className="text-sm font-medium">
                            {notification.message}
                        </p>
                    </div>
                )}

                <VacancyForm
                    value={formData}
                    onChange={handleChange}
                    companies={companies}
                    subspecializations={subspecializations}
                />

                <div className="mt-6 flex gap-2">
                    <Button
                        className="flex-1 bg-[#2a5296] hover:bg-[#325eaa]"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <Save className="h-4 w-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
