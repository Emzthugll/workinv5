'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

interface VacancyFormProps {
    value: VacancyFormData;
    onChange: (key: string, value: string) => void;
    companies?: Company[];
    subspecializations?: SubSpecialization[];
    errors?: Record<string, string>;
    isEdit?: boolean;
}

export default function VacancyForm({
    value,
    onChange,
    companies = [],
    subspecializations = [],
    errors = {},
}: VacancyFormProps) {
    return (
        <div className="space-y-4">
            {/* Company */}
            <div>
                <Label>Company</Label>
                <select
                    value={value.company}
                    onChange={(e) => onChange('company', e.target.value)}
                    className="w-full rounded border p-2"
                >
                    <option value="">Select company</option>
                    {companies &&
                        companies.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                </select>
                {errors.company_id && (
                    <p className="text-sm text-red-500">{errors.company_id}</p>
                )}
            </div>

            {/* Job Title */}
            <div>
                <Label>Job Title</Label>
                <Input
                    type="text"
                    value={value.jobTitle}
                    onChange={(e) => onChange('jobTitle', e.target.value)}
                />
                {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                )}
            </div>

            {/* Place */}
            <div>
                <Label>Place of Assignment</Label>
                <Input
                    type="text"
                    value={value.place}
                    onChange={(e) => onChange('place', e.target.value)}
                />
                {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <Label>Category</Label>
                <select
                    value={value.category}
                    onChange={(e) => onChange('category', e.target.value)}
                    className="w-full rounded border p-2"
                >
                    <option value="">Select category</option>
                    {subspecializations &&
                        subspecializations.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                </select>
                {errors.sub_specialization_id && (
                    <p className="text-sm text-red-500">
                        {errors.sub_specialization_id}
                    </p>
                )}
            </div>

            {/* Salary Range */}
            <div>
                <Label>Salary Range</Label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="From"
                        value={value.salaryFrom}
                        onChange={(e) => onChange('salaryFrom', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="To"
                        value={value.salaryTo}
                        onChange={(e) => onChange('salaryTo', e.target.value)}
                    />
                </div>
                {(errors.salary_from || errors.salary_to) && (
                    <p className="text-sm text-red-500">
                        {errors.salary_from || errors.salary_to}
                    </p>
                )}
            </div>

            {/* Total Vacancies */}
            <div>
                <Label>Total Vacancies</Label>
                <Input
                    type="number"
                    value={value.totalVacancies}
                    onChange={(e) => onChange('totalVacancies', e.target.value)}
                />
                {errors.total_vacancy && (
                    <p className="text-sm text-red-500">
                        {errors.total_vacancy}
                    </p>
                )}
            </div>

            {/* Job Type */}
            <div>
                <Label>Job Type</Label>
                <select
                    value={value.jobType}
                    onChange={(e) => onChange('jobType', e.target.value)}
                    className="w-full rounded border p-2"
                >
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                </select>
                {errors.job_type && (
                    <p className="text-sm text-red-500">{errors.job_type}</p>
                )}
            </div>

            {/* Details */}
            <div>
                <Label>Details</Label>
                <textarea
                    className="w-full rounded border p-2"
                    rows={4}
                    value={value.details}
                    onChange={(e) => onChange('details', e.target.value)}
                />
                {errors.details && (
                    <p className="text-sm text-red-500">{errors.details}</p>
                )}
            </div>
        </div>
    );
}
