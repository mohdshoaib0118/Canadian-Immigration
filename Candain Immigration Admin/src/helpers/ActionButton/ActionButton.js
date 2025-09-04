import React, { useState, useRef, useEffect } from 'react';
import ScreenshotButton from '../screenshot/ScreenShot';
import CroppedScreenShot from '../screenshot/CroppedScreenShot';
import HelpSupportModal from '../modal/HelpSupportModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ActionButton = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const cardRef = useRef(null);

    const toggleCard = () => {
        if (isCardOpen) {
            setIsCardOpen(false);
        }else{
            setIsCardOpen(true);
        }
        // setIsCardOpen(!isCardOpen);
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setIsCardOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [showHelpAndSupportModal, setshowHelpAndSupportModal] = useState(false);
    const openHelpAndSupportModal = () => {
        setshowHelpAndSupportModal(true);
    };

    const closeHelpAndSupportModal = () => {
        setshowHelpAndSupportModal(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
            <button
                style={{
                    background: 'linear-gradient(135deg, rgba(74, 118, 82, 0.87), rgb(100, 233, 125))',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'center',
                    position: 'relative',
                }}
                onClick={toggleCard}>
                <i className="mdi mdi-robot-vacuum fs-3"></i>
            </button>
            {isCardOpen && (
                <div
                    ref={cardRef}
                    style={{
                        position: 'absolute',
                        top: '-130px',
                        right: '0',
                        width: '50px',
                        borderRadius: '8px',
                        boxShadow: 'rgb(125 139 132 / 64%) -3px 4px 8px 1px',
                        zIndex: '9999',
                        padding: '10px',
                        background: 'linear-gradient(135deg, rgb(7 9 8), rgb(46 229 118))',
                    }}
                    className="text-center">
                    <OverlayTrigger placement="left" overlay={<Tooltip id="overlay-example">Help & Support</Tooltip>}>
                        <i
                            className="mdi mdi-help-circle-outline fs-4 text-light"
                            onClick={openHelpAndSupportModal}></i>
                    </OverlayTrigger>
                    <div className="my-2"><CroppedScreenShot color={'text-light'} height={'fs-4'}/></div>
                    <ScreenshotButton color={'text-light'} height={'fs-4'} />
                </div>
            )}
            <HelpSupportModal show={showHelpAndSupportModal} hide={closeHelpAndSupportModal} />
        </div>
    );
};

export default ActionButton;
