'use client';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';
import ActiveTab from '@/pages/react/peso/job-posting/Active';
import ArchiveTab from '@/pages/react/peso/job-posting/Archive';
import { FileUp, Plus, Save } from 'lucide-react';
import { useState } from 'react';

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
}

interface JobPostingPageProps {
    vacancies: {
        data: VacancyData[];
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
    companies: any[];
    subspecializations: any[];
    filters: {
        search: string;
        tab: string;
    };
}

export default function JobPostingPage({
    vacancies,
    companies,
    subspecializations,
    filters = { search: '', tab: 'active' },
}: JobPostingPageProps) {
    const [activeTab, setActiveTab] = useState<'Active' | 'Archive'>(
        filters?.tab === 'archive' ? 'Archive' : 'Active',
    );

    const BreadcrumbItems = [
        { title: 'Job Posting', href: '/peso/job-posting', active: false },
        {
            title: activeTab,
            href: `/peso/job-posting/${activeTab.toLowerCase()}`,
            active: true,
        },
    ];

    return (
        <PesoSidebarLayout breadcrumbs={BreadcrumbItems}>
            <div className="m-4">
                <Heading
                    title={
                        activeTab === 'Active'
                            ? 'Vacancies'
                            : 'Job Vacancy Archive'
                    }
                    description={
                        activeTab === 'Active'
                            ? 'Manage Vacancies'
                            : 'List of previous job vacancy postings'
                    }
                />

                <div className="mb-4 flex items-center justify-between">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) =>
                            setActiveTab(value as 'Active' | 'Archive')
                        }
                    >
                        <TabsList className="overflow-x-auto">
                            {['Active', 'Archive'].map((tab) => (
                                <TabsTrigger key={tab} value={tab}>
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <div className="flex items-center gap-2">
                    
                        {activeTab === 'Active' && (
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa]">
                                        <Plus className="h-4 w-4" />
                                        Create
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="w-[800px] max-w-none overflow-y-auto rounded-l-xl p-6 shadow-xl"
                                >
                                    <SheetHeader>
                                        <div className="flex items-center justify-between">
                                            <SheetTitle>
                                                Create Vacancy
                                            </SheetTitle>
                                            <SheetClose asChild></SheetClose>
                                        </div>
                                        <SheetDescription>
                                            Fill out the fields below to add a
                                            new vacancy.
                                        </SheetDescription>
                                    </SheetHeader>

                                    {/* FORM FIELDS */}
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <Label>Company</Label>
                                            <Input />
                                        </div>

                                        <div>
                                            <Label>Job Title</Label>
                                            <Input />
                                        </div>

                                        <div>
                                            <Label>Place of Assignment</Label>
                                            <Input />
                                        </div>

                                        <div>
                                            <Label>
                                                Category (Specialization)
                                            </Label>
                                            <Input />
                                        </div>

                                        <div>
                                            <Label>Salary Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="From"
                                                    className="w-1/2"
                                                />
                                                <Input
                                                    placeholder="To"
                                                    className="w-1/2"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Total Vacancies</Label>
                                            <Input type="number" />
                                        </div>

                                        <div>
                                            <Label>Job Type</Label>
                                            <Input />
                                        </div>

                                        <div>
                                            <Label>Details</Label>
                                            <textarea
                                                className="w-full rounded-md border p-2"
                                                rows={4}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* SAVE BUTTON */}
                                    <div className="mt-6">
                                        <Button className="w-full bg-[#2a5296] hover:bg-[#325eaa]">
                                            <Save className="h-4 w-4" />
                                            Save
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        )}

                        {/* EXPORT BUTTON - Show in both tabs */}
                        <Button className="flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa]">
                            <FileUp className="h-4 w-4" />
                            Export
                        </Button>

                        {/* SEARCH INPUT - Show in both tabs */}
                        <Input
                            className="w-[300px]"
                            placeholder="Search Vacancies..."
                        />
                    </div>
                </div>

                <Tabs
                    value={activeTab}
                    onValueChange={(value) =>
                        setActiveTab(value as 'Active' | 'Archive')
                    }
                >
                    <TabsContent value="Active">
                        <ActiveTab
                            vacancies={vacancies}
                            search={filters?.search || ''}
                        />
                    </TabsContent>

                    <TabsContent value="Archive">
                        <ArchiveTab
                            
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PesoSidebarLayout>
    );
}
