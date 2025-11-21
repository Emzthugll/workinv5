import EmployerSidebarLayout from '@/layouts/react/employer/employer-sidebar-layout';
import { usePage } from '@inertiajs/react';

// Define the user type
interface AuthUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface PageProps {
    auth: {
        user: AuthUser;
    };
    [key: string]: any;
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <EmployerSidebarLayout>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="mb-4 text-3xl font-bold">
                    Welcome, {auth.user.name}!
                </h1>
                <p className="text-xl text-gray-700">
                    You are logged in as:{' '}
                    <span className="font-semibold">
                        {auth.user.roles.join(', ')}
                    </span>
                </p>
            </div>
        </EmployerSidebarLayout>
    );
}
