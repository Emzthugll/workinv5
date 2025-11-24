import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';
import { Briefcase, User, Users } from 'lucide-react';

export default function Dashboard() {
    const BreadcrumbItems = [{ title: 'Dashboard', href: '#' }];

    const stats = [
        { title: 'Login Today', value: 25, icon: User },
        { title: 'Total Accounts', value: 150, icon: Users },
        { title: 'Job Vacancy', value: 12, icon: Briefcase },
    ];

    return (
        <PesoSidebarLayout breadcrumbs={BreadcrumbItems}>
            <div className="space-y-4 p-4">
                <div className="flex gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className="flex flex-1 items-center justify-between rounded-lg bg-white p-4 shadow-md"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">
                                        {stat.title}
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </span>
                                </div>

                                <div className="text-gray-300">
                                    <Icon size={36} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Rest of dashboard content */}
                <div className="mt-6">{/* other dashboard sections */}</div>
            </div>
        </PesoSidebarLayout>
    );
}
