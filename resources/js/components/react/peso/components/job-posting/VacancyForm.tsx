'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formFields = [
    { label: 'Company', type: 'input' },
    { label: 'Job Title', type: 'input' },
    { label: 'Place of Assignment', type: 'input' },
    { label: 'Category (Specialization)', type: 'input' },
    { label: 'Salary Range', type: 'range' },
    { label: 'Total Vacancies', type: 'number' },
    { label: 'Job Type', type: 'input' },
    { label: 'Details', type: 'textarea' },
] as const;

export default function VacancyForm() {
    return (
        <div className="mt-4 space-y-4">
            {formFields.map((field) => (
                <div key={field.label}>
                    <Label>{field.label}</Label>
                    {field.type === 'range' ? (
                        <div className="flex gap-2">
                            <Input placeholder="From" className="w-1/2" />
                            <Input placeholder="To" className="w-1/2" />
                        </div>
                    ) : field.type === 'textarea' ? (
                        <textarea
                            className="w-full rounded-md border p-2"
                            rows={4}
                        />
                    ) : (
                        <Input type={field.type} />
                    )}
                </div>
            ))}
        </div>
    );
}
