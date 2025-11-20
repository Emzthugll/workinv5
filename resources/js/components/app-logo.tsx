import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    size?: string; // overall container size
    iconSize?: string; // size of the inner icon
    rounded?: string; // border radius
    className?: string; // extra custom classes
}

export default function AppLogo({
    size = 'h-10 w-10', // default for dashboard
    iconSize = 'h-5 w-5', // default icon size
    rounded = 'rounded-lg', // default border radius
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
