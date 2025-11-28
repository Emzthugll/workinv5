'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Plus, Save } from 'lucide-react';
import VacancyForm from './VacancyForm';

export default function CreateVacancySheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="flex cursor-pointer items-center gap-1 bg-[#2a5296] p-1 hover:bg-[#325eaa]">
                    <Plus className="h-4 w-4" />
                    Create
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[800px] max-w-none overflow-y-auto rounded-l-xl p-6 shadow-xl"
            >
                <SheetHeader>
                    <div className="flex items-center justify-between">
                        <SheetTitle>Create Vacancy</SheetTitle>
                        <SheetClose asChild></SheetClose>
                    </div>
                    <SheetDescription>
                        Fill out the fields below to add a new vacancy.
                    </SheetDescription>
                </SheetHeader>

                <VacancyForm />

                <div className="mt-6">
                    <Button className="w-full bg-[#2a5296] hover:bg-[#325eaa]">
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
