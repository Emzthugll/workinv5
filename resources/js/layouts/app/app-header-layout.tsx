import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { type PropsWithChildren } from 'react';
import Footer from '@/components/footer';

interface AppHeaderLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    navItems?: NavItem[];
    rightItems?: NavItem[];
    currentUrl?: string;
}

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    navItems,
    rightItems,
}: PropsWithChildren<AppHeaderLayoutProps>) {
    return (
        <AppShell>
            <AppHeader
                breadcrumbs={breadcrumbs}
                navItems={navItems} 
                rightItems={rightItems} 
            />
            <AppContent>{children}</AppContent>
            <Footer />
        </AppShell>
    );
}
