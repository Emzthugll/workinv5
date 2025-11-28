import { router } from '@inertiajs/react';

export const navigateToVacancies = (
    params: {
        tab: string;
        page: number;
        per_page: number;
        search: string;
    },
    options?: {
        preserveState?: boolean;
        preserveScroll?: boolean;
        only?: string[];
    },
) => {
    router.get('/peso/job-posting', params, options);
};

export const getBreadcrumbs = (activeTab: string) => [
    { title: 'Job Posting', href: '/peso/job-posting', active: false },
    {
        title: activeTab,
        href: `/peso/job-posting/${activeTab.toLowerCase()}`,
        active: true,
    },
];

export const getHeadingText = (activeTab: string) => ({
    title: activeTab === 'Active' ? 'Vacancies' : 'Job Vacancy Archive',
    description:
        activeTab === 'Active'
            ? 'Manage Vacancies'
            : 'List of previous job vacancy postings',
});
