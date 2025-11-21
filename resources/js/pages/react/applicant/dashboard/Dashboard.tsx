
import AppLayout from '@/layouts/app/app-header-layout';
import RecruitmentList from '@/pages/react/applicant/dashboard/recruitment/RecruitmentList';
import { usePage } from '@inertiajs/react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface Company {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    type: string;
    venue: string;
    start: string;
    end: string;
    companies?: Company[];
    registerLink: string;
}

interface PageProps extends Record<string, any> {
    auth: {
        user: AuthUser;
    };
    activities: Activity[];
}

export default function Dashboard() {
    const { auth, activities } = usePage<PageProps>().props;

    const applicantNav = [
        { title: 'Home', href: '/applicant/dashboard' },
        { title: 'Job Search', href: '/applicant/jobs' },
        { title: 'Companies', href: '/applicant/companies' },
    ];

    return (
        <AppLayout rightItems={applicantNav}>
            <div className="flex min-h-screen w-full flex-col">
                <main className="w-full flex-1  p-6">
                    {/* Greeting Section */}
                    <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 shadow-md">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Hello,{' '}
                            {auth.user.name.split(' ').slice(0, -1).join(' ')}!
                        </h1>
                        <p className="text-gray-700">
                            Welcome to{' '}
                            <strong className="text-[#0076ba]">work</strong>
                            <strong className="text-[#084896]">IN</strong>, your
                            ultimate destination for all your career
                            aspirations! We are thrilled to have you join our
                            dynamic job portal, where we connect talented
                            individuals like you with exciting employment
                            opportunities.
                        </p>
                    </div>

                    {/* Recruitment Cards Grid */}
                    <RecruitmentList activities={activities} />
                </main>

            </div>
        </AppLayout>
    );
}
