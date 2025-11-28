import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function useInertiaLoading() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    return isLoading;
}
