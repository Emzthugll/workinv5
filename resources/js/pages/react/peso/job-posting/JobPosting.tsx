'use client';

import ExportButton from '@/components/ExportButton';
import Heading from '@/components/heading';
import CreateVacancySheet from '@/components/react/peso/components/job-posting/action/CreateVacancySheet';
import SearchInput from '@/components/react/peso/components/job-posting/SearchInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDebounce } from '@/hooks/useDebounce';
import { useInertiaLoading } from '@/hooks/useInertiaLoading';
import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';
import ActiveTab from '@/pages/react/peso/job-posting/Active';
import ArchiveTab from '@/pages/react/peso/job-posting/Archive';
import {
    JobPostingPageProps,
    TabType,
} from '@/types/react/peso/job/vacancy.types';
import {
    getBreadcrumbs,
    getHeadingText,
    navigateToVacancies,
} from '@/utils/react/peso/job-posting/vacancy.utils';
import { useState } from 'react';

export default function JobPostingPage({
    vacancies,
    companies,
    subspecializations,
    filters = { search: '', tab: 'active' },
}: JobPostingPageProps) {
    const [activeTab, setActiveTab] = useState<TabType>(
        filters.tab === 'archive' ? 'Archive' : 'Active',
    );
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedVacancyIds, setSelectedVacancyIds] = useState<number[]>([]);
    const isSearching = useInertiaLoading();

    // Debounced search handler
    const debouncedSearch = useDebounce((value: string) => {
        navigateToVacancies(
            {
                tab: activeTab.toLowerCase(),
                page: 1,
                per_page: 10,
                search: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['vacancies', 'filters'],
            },
        );
    }, 300);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Tab change handler
    const handleTabChange = (value: string) => {
        setActiveTab(value as TabType);
        setSelectedVacancyIds([]);

        navigateToVacancies(
            {
                tab: value.toLowerCase(),
                page: 1,
                per_page: 10,
                search: searchTerm,
            },
            {
                preserveState: false,
                preserveScroll: false,
                only: ['vacancies', 'filters'],
            },
        );
    };

    // Callback after creating a vacancy to refresh Active tab
    const refreshActiveTab = () => {
        if (activeTab === 'Active') {
            navigateToVacancies(
                {
                    tab: 'active',
                    page: 1,
                    per_page: 10,
                    search: searchTerm,
                },
                {
                    preserveState: false,
                    preserveScroll: false,
                    only: ['vacancies', 'filters'],
                },
            );
        }
    };

    const { title, description } = getHeadingText(activeTab);
    const breadcrumbs = getBreadcrumbs(activeTab);

    return (
        <PesoSidebarLayout breadcrumbs={breadcrumbs}>
            <div className="m-4">
                <Heading title={title} description={description} />

                {/* Top Controls */}
                <div className="mb-4 flex items-center justify-between">
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="overflow-x-auto">
                            <TabsTrigger value="Active">Active</TabsTrigger>
                            <TabsTrigger value="Archive">Archive</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex items-center gap-2">
                        {activeTab === 'Active' && (
                            <CreateVacancySheet
                                companies={companies}
                                subspecializations={subspecializations}
                                onSuccess={refreshActiveTab}
                            />
                        )}

                        <ExportButton
                            endpoint="/peso/job-posting/export"
                            params={{
                                tab: activeTab.toLowerCase(),
                                search: searchTerm,
                            }}
                            selectedIds={selectedVacancyIds}
                            label="Export"
                        />

                        <SearchInput
                            value={searchTerm}
                            onChange={handleSearch}
                            isLoading={isSearching}
                            placeholder="Search Vacancies..."
                        />
                    </div>
                </div>

                {/* Tabs Content */}
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsContent value="Active">
                        <ActiveTab
                            vacancies={vacancies}
                            companies={companies} 
                            subspecializations={subspecializations} 
                            search={filters.search || ''}
                        />
                    </TabsContent>

                    <TabsContent value="Archive">
                        <ArchiveTab
                            vacancies={vacancies}
                            search={filters.search || ''}
                            onSelectionChange={setSelectedVacancyIds}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PesoSidebarLayout>
    );
}
