import React from 'react';

const AnimatedLoader = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 animate-fade-in">
            <div className="position-relative mb-3">
                <div className={`spinner-border text-primary ${sizeClasses[size]} animate-pulse`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <i className="mdi mdi-leaf text-success animate-bounce" style={{ fontSize: '1.2rem' }}></i>
                </div>
            </div>
            <p className="text-muted mb-0 animate-slide-left">{text}</p>
            <div className="mt-2">
                <div className="progress" style={{ width: '200px', height: '4px' }}>
                    <div className="progress-bar bg-primary shimmer" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedLoader;