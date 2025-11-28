'use client';

import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';

interface ExportButtonProps {
    endpoint: string;
    params?: Record<string, any>;
    selectedIds?: number[];
    label?: string;
    className?: string;
}

export default function ExportButton({
    endpoint,
    params = {},
    selectedIds = [],
    label = 'Export',
    className = '',
}: ExportButtonProps) {
    const handleExport = () => {
        const urlParams = new URLSearchParams();

        // Add all regular params
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                urlParams.append(key, String(value));
            }
        });

        // Add selected IDs as array parameters for Laravel
        if (selectedIds.length > 0) {
            selectedIds.forEach((id) => {
                urlParams.append('selected[]', id.toString());
            });
        }

        // Trigger download via backend route
        window.location.href = `${endpoint}?${urlParams.toString()}`;
    };

    return (
        <Button
            onClick={handleExport}
            className={`flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa] ${className}`}
        >
            <FileUp className="h-4 w-4" />
            {label}
            {selectedIds.length > 0 && ` (${selectedIds.length})`}
        </Button>
    );
}
