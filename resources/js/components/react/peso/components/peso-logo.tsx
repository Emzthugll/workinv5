import { cn } from '@/lib/utils';
import PesoLogoIcon from '@/components/react/peso/components/peso-logo-icon';

interface AppLogoProps {
    size?: string; 
    iconSize?: string; 
    rounded?: string; 
    className?: string; 
}

export default function PesoLogo({
    size = 'h-10 w-20', 
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
            <PesoLogoIcon
                className={cn(
                    iconSize,
                    'fill-current text-white ',
                )}
            />
            
        </div>
    );
}
