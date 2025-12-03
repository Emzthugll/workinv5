'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle, CheckCircle, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface DeleteVacancyModalProps {
    vacancy: VacancyData | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteVacancyModal({
    vacancy,
    open,
    onOpenChange,
}: DeleteVacancyModalProps) {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [displayVacancy, setDisplayVacancy] = useState<VacancyData | null>(
        null,
    );

    useEffect(() => {
        if (open && vacancy) {
            setDisplayVacancy(vacancy);
        }
    }, [open, vacancy]);

    if (!displayVacancy) return null;

    const handleDelete = async () => {
        setLoading(true);
        setNotification(null);

        const vacancyId = displayVacancy.id;
        const url = `/peso/job-posting?id=${vacancyId}`;

        try {
            let token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');
            if (!token) {
                token = document
                    .querySelector('meta[name="XSRF-TOKEN"]')
                    ?.getAttribute('content');
            }
            if (!token) {
                token = (window as any).Laravel?.csrfToken;
            }

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token || '',
                    Accept: 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({
                    type: 'success',
                    message:
                        displayVacancy.totalApplicants > 0
                            ? 'Job vacancy has been moved to archive.'
                            : 'Job vacancy has been permanently deleted.',
                });

                setTimeout(() => {
                    onOpenChange(false);
                    window.location.reload();
                }, 1500);
            } else {
                setNotification({
                    type: 'error',
                    message: data.error || 'Failed to delete vacancy.',
                });
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Delete error:', error);
            setNotification({
                type: 'error',
                message: error.message || 'An unexpected error occurred.',
            });
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Vacancy</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this job posting?
                    </DialogDescription>
                </DialogHeader>

                {/* Notification */}
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

               

                    {/* Warning Message */}
                    <div
                        className={`rounded-lg border p-3 ${
                            displayVacancy.totalApplicants > 0
                                ? 'border-yellow-200 bg-yellow-50'
                                : 'border-red-200 bg-red-50'
                        }`}
                    >
                        <p
                            className={`text-xs font-medium ${
                                displayVacancy.totalApplicants > 0
                                    ? 'text-yellow-800'
                                    : 'text-red-800'
                            }`}
                        >
                            {displayVacancy.totalApplicants > 0
                                ? `This vacancy has ${displayVacancy.totalApplicants} applicant(s). It will be moved to archive.`
                                : 'This will permanently delete this vacancy. This cannot be undone.'}
                        </p>
                    </div>
                

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        <Trash2 className="h-4 w-4" />
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
