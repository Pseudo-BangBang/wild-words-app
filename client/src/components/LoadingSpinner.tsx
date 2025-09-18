import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    message = 'Loading...'
}) => {
    const sizeClasses = {
        small: 'w-5 h-5 border-2',
        medium: 'w-10 h-10 border-3',
        large: 'w-15 h-15 border-4'
    };

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className={`${sizeClasses[size]} border-muted border-t-primary rounded-full animate-spin`}></div>
            {message && <p className="mt-4 text-muted-foreground text-sm">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
