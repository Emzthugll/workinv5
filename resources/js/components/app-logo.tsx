import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    size?: string; 
    iconSize?: string; 
    rounded?: string; 
    className?: string; 
}

export default function AppLogo({
    size = 'h-10 w-10', 
    iconSize = 'h-5 w-5', 
    rounded = 'rounded-lg', 
    className = '',
}: AppLogoProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-center  text-sidebar-primary-foreground',
                size,
                rounded,
                className,
            )}
        >
            <AppLogoIcon
                className={cn(
                    iconSize,
                    'fill-current text-white ',
                )}
            />
        </div>
    );
}
