'use client';

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
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';
import VacancyForm from './VacancyForm';

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
    onSuccess?: () => void; // optional callback after successful submission
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

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

   const handleSubmit = async () => {
       setLoading(true);
       try {
           // Get CSRF token from meta tag
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

           if (onSuccess) onSuccess();
           alert('Vacancy created successfully!');
       } catch (error: any) {
           console.error(error);
           if (error.response?.data?.errors) {
               alert(
                   'Validation failed: ' +
                       JSON.stringify(error.response.data.errors),
               );
           } else {
               alert('Failed to create vacancy.');
           }
       } finally {
           setLoading(false);
       }
   };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa]">
                    <Plus className="h-4 w-4" /> Create
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[800px] max-w-none overflow-y-auto rounded-l-xl p-6 shadow-xl"
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

                <VacancyForm
                    value={formData}
                    onChange={handleChange}
                    companies={companies}
                    subspecializations={subspecializations}
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
    );
}
