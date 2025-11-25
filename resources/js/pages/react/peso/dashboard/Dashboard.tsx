'use client';

import { ChartLineDay } from '@/components/react/peso/components/dashboard/ChartLineDay';
import { ChartLineMonth } from '@/components/react/peso/components/dashboard/ChartLineMonth';
import { ChartLineYear } from '@/components/react/peso/components/dashboard/ChartLineYear';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';
import { ActivityIcon, Briefcase, Users } from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { props } = usePage<{
        stats: {
            loginToday: number;
            totalAccounts: number;
            jobVacancy: number;
        };
    }>();

    const BreadcrumbItems = [
        { title: 'Dashboard', href: '/peso/dashboard', active: true },
    ];

    const stats = [
        {
            title: 'Login Today',
            value: props.stats.loginToday,
            icon: ActivityIcon,
        },
        {
            title: 'Total Accounts',
            value: props.stats.totalAccounts,
            icon: Users,
        },
        {
            title: 'Job Vacancy',
            value: props.stats.jobVacancy,
            icon: Briefcase,
        },
    ];

    const tabs = ['Year', 'Month', 'Day'];
    const [activeTab, setActiveTab] = useState('Year');

    return (
        <PesoSidebarLayout breadcrumbs={BreadcrumbItems}>
            <div className="space-y-6 p-4">
                {/* Top Cards */}
                <div className="flex flex-col gap-4 md:flex-row">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className="flex flex-1 items-center justify-between rounded-lg bg-white p-6 shadow-md"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">
                                        {stat.title}
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </span>
                                </div>
                                <div className="text-black">
                                    <Icon size={25} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4"
                >
                    <TabsList className="overflow-x-auto">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="Year">
                        <div className="w-full">
                            <ChartLineYear />
                        </div>
                    </TabsContent>

                    <TabsContent value="Month">
                        <div className="w-full">
                            <ChartLineMonth />
                        </div>
                    </TabsContent>

                    <TabsContent value="Day">
                        <div className="w-full">
                            <ChartLineDay />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PesoSidebarLayout>
    );
}

