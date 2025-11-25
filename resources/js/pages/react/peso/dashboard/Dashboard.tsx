'use client';

import { ChartLineDay } from '@/components/react/peso/components/dashboard/ChartLineDay';
import { ChartLineMonth } from '@/components/react/peso/components/dashboard/ChartLineMonth';
import { ChartLineYear } from '@/components/react/peso/components/dashboard/ChartLineYear';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';
import { usePage } from '@inertiajs/react';
import { ActivityIcon, Briefcase, Users } from 'lucide-react';
import { useState } from 'react';

interface YearData {
    year: string;
    loginToday?: number;
    totalAccounts?: number;
    jobVacancy?: number;
}

interface MonthDataType {
    month: string;
    loginToday?: number;
    totalAccounts?: number;
    jobVacancy?: number;
}

interface DashboardProps extends Record<string, any> {
    stats: {
        loginToday: number;
        totalAccounts: number;
        jobVacancy: number;
    };
    yearlyData: YearData[];
    monthlyData: Record<number, MonthDataType[]>;
    startYear: number;
}

export default function Dashboard() {
    const { props } = usePage<DashboardProps>();
    const [activeMetric, setActiveMetric] = useState<
        'loginToday' | 'totalAccounts' | 'jobVacancy'
    >('loginToday');
    const [activeTab, setActiveTab] = useState<'Year' | 'Month' | 'Day'>(
        'Year',
    );

    const BreadcrumbItems = [
        { title: 'Dashboard', href: '/peso/dashboard', active: true },
    ];

    const stats = [
        {
            title: 'Login Today',
            value: props.stats.loginToday,
            icon: ActivityIcon,
            key: 'loginToday',
        },
        {
            title: 'Total Accounts',
            value: props.stats.totalAccounts,
            icon: Users,
            key: 'totalAccounts',
        },
        {
            title: 'Total Job Post',
            value: props.stats.jobVacancy,
            icon: Briefcase,
            key: 'jobVacancy',
        },
    ];

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
                                onClick={() =>
                                    setActiveMetric(
                                        stat.key as
                                            | 'loginToday'
                                            | 'totalAccounts'
                                            | 'jobVacancy',
                                    )
                                }
                                className={`flex flex-1 cursor-pointer items-center justify-between rounded-lg bg-white p-6 shadow-md ${
                                    activeMetric === stat.key
                                        ? 'border-2 border-[#084896] '
                                        : ''
                                }`}
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
                    onValueChange={(value) =>
                        setActiveTab(value as 'Year' | 'Month' | 'Day')
                    }
                    className="space-y-4"
                >
                    <TabsList className="overflow-x-auto">
                        {['Year', 'Month', 'Day'].map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="Year">
                        <ChartLineYear
                            data={props.yearlyData}
                            metric={activeMetric}
                        />
                    </TabsContent>

                    <TabsContent value="Month">
                        <ChartLineMonth
                            monthlyData={props.monthlyData}
                            startYear={props.startYear}
                            metric={activeMetric}
                        />
                    </TabsContent>

                    <TabsContent value="Day">
                        <ChartLineDay metric={activeMetric} />
                    </TabsContent>
                </Tabs>
            </div>
        </PesoSidebarLayout>
    );
}
