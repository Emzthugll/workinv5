import AppLayoutTemplate from '@/layouts/react/employer/employer-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    title?: string;
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    
}

export default ({ children, title, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
    
);
