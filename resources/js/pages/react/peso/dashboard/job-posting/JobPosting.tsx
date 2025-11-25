'use client';

import Heading from '@/components/heading';
import PesoSidebarLayout from '@/layouts/react/peso/peso-sidebar-layout';

export default function JobPostingPage() {
    const BreadcrumbItems = [
        { title: 'Job Posting', href: '/peso/job-posting', active: true },
    ];

    return (
        <PesoSidebarLayout breadcrumbs={BreadcrumbItems}>
            <Heading title="emz" />
        </PesoSidebarLayout>
    );
}
