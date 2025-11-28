export interface VacancyData {
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

export interface VacancyPagination {
    data: VacancyData[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface VacancyFilters {
    search: string;
    tab: string;
}

export interface JobPostingPageProps {
    vacancies: VacancyPagination;
    companies: any[];
    subspecializations: any[];
    filters: VacancyFilters;
}

export type TabType = 'Active' | 'Archive';
