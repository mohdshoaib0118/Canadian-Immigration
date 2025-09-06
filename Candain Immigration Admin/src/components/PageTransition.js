import React, { useEffect, useState } from 'react';

const PageTransition = ({ children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} ${className}`}>
            {children}
        </div>
    );
};

export default PageTransition;