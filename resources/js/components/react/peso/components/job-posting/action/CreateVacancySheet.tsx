'use client';

import React from 'react';
import VacancyForm from '@/components/react/peso/components/job-posting/VacancyForm';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';
import { AlertCircle, CheckCircle, Plus, Save } from 'lucide-react';
import { useState } from 'react';

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

interface CreateVacancySheetProps {
    companies: Company[];
    subspecializations: SubSpecialization[];
    onSuccess?: () => void;
}

export default function CreateVacancySheet({
    companies,
    subspecializations,
    onSuccess,
}: CreateVacancySheetProps) {
    const [formData, setFormData] = useState<VacancyFormData>({
        company: '',
        jobTitle: '',
        place: '',
        category: '',
        salaryFrom: '',
        salaryTo: '',
        totalVacancies: '',
        jobType: '',
        details: '',
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const sheetContentRef = React.useRef<HTMLDivElement>(null);

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setNotification(null);
        setFormErrors({});

        // Validate all required fields
        const missingFields = [];

        if (!formData.company) missingFields.push('company');
        if (!formData.jobTitle) missingFields.push('job title');
        if (!formData.place) missingFields.push('place of assignment');
        if (!formData.category) missingFields.push('category');
        if (!formData.totalVacancies) missingFields.push('total vacancies');
        if (!formData.jobType) missingFields.push('job type');

        if (missingFields.length > 0) {
            setNotification({
                type: 'error',
                message: `Please fill in: ${missingFields.join(', ')}`,
            });
            setLoading(false);
            // Scroll sheet to top
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

            await axios.post(
                'job-posting',
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
                message: 'Vacancy created successfully!',
            });

            // Reset form
            setFormData({
                company: '',
                jobTitle: '',
                place: '',
                category: '',
                salaryFrom: '',
                salaryTo: '',
                totalVacancies: '',
                jobType: '',
                details: '',
            });

            // Scroll sheet to top
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }

            setTimeout(() => {
                setSheetOpen(false);
                if (onSuccess) onSuccess();
                window.location.reload();
            }, 1500);
        } catch (error: any) {
            console.error(error);
            let errorMessage = 'Failed to create vacancy.';

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
            // Scroll sheet to top
            if (sheetContentRef.current) {
                sheetContentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button className="flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa]">
                        <Plus className="h-4 w-4" /> Create
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="w-[800px] max-w-none overflow-y-auto rounded-l-xl p-6 shadow-xl"
                    ref={sheetContentRef}
                >
                    <SheetHeader>
                        <div className="flex items-center justify-between">
                            <SheetTitle>Create Vacancy</SheetTitle>
                            <SheetClose asChild />
                        </div>
                        <SheetDescription>
                            Fill out the fields below to add a new vacancy.
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
                        errors={formErrors}
                    />

                    <div className="mt-6">
                        <Button
                            className="w-full bg-[#2a5296] hover:bg-[#325eaa]"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            <Save className="h-4 w-4" />
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
