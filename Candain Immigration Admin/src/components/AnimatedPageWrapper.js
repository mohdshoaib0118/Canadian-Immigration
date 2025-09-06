import React, { useEffect, useState } from 'react';

const AnimatedPageWrapper = ({ children, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'} ${className}`}>
            {children}
        </div>
    );
};

export default AnimatedPageWrapper;