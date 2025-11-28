'use client';

import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
    value,
    onChange,
    isLoading = false,
    placeholder = 'Search...',
    className = 'w-[300px]',
}: SearchInputProps) {
    return (
        <div className="relative">
            <Input
                className={`${className} pr-10`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {isLoading && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
            )}
        </div>
    );
}
