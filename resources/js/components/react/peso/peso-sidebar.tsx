import PesoLogo from '@/components/react/peso/components/peso-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Building2, FileText, FileUser, Folder, LayoutDashboard, Pin, UserCog } from 'lucide-react';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/peso/dashboard', icon: LayoutDashboard },
    { title: 'Job Posting', href: '/peso/job-posting', icon: Pin },
    { title: 'Companies', href: '/peso/companies', icon: Building2 },
    {
        title: 'Recruitment Activity',
        href: '/peso/recruitment-activity',
        icon: FileUser,
    },
    { title: 'MAT Report', href: '/peso/mat-report', icon: FileText },
    { title: 'Manage Users', href: '/peso/manage-users', icon: UserCog },
];



const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function PesoSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <PesoLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
