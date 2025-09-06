import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const FloatingActionButton = ({ onClick, icon = 'mdi-plus', tooltip = 'Add New' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <OverlayTrigger
            placement="left"
            overlay={<Tooltip>{tooltip}</Tooltip>}
        >
            <Button
                className="fab animate-bounce"
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: 'none',
                    zIndex: 1000,
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                }}
            >
                <i className={`mdi ${icon} ${isHovered ? 'icon-spin' : ''}`} style={{ fontSize: '1.5rem' }}></i>
            </Button>
        </OverlayTrigger>
    );
};

export default FloatingActionButton;