import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const AnimatedToast = ({ show, onClose, title, message, variant = 'success', delay = 3000 }) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const getIcon = () => {
        switch (variant) {
            case 'success': return 'mdi-check-circle';
            case 'error': return 'mdi-alert-circle';
            case 'warning': return 'mdi-alert';
            case 'info': return 'mdi-information';
            default: return 'mdi-check-circle';
        }
    };

    const getColor = () => {
        switch (variant) {
            case 'success': return '#28a745';
            case 'error': return '#dc3545';
            case 'warning': return '#ffc107';
            case 'info': return '#17a2b8';
            default: return '#28a745';
        }
    };

    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast
                show={isVisible}
                onClose={handleClose}
                delay={delay}
                autohide
                className={`animate-slide-right ${isVisible ? '' : 'animate-fade-out'}`}
                style={{
                    borderLeft: `4px solid ${getColor()}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
            >
                <Toast.Header className="bg-light">
                    <i 
                        className={`mdi ${getIcon()} me-2 animate-pulse`} 
                        style={{ color: getColor(), fontSize: '1.2rem' }}
                    ></i>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className="animate-fade-in">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default AnimatedToast;