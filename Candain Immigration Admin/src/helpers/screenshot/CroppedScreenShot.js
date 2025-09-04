import { useState, useRef, useEffect, useCallback } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import HelpSupportModal from '../modal/HelpSupportModal';
import { useSelector } from 'react-redux';
import { Loading } from '../loader/Loading';

const CroppedScreenShot = ({ color, height }) => {
    const store = useSelector((state) => state);
    const [capturing, setCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [showHelpAndSupportModal, setShowHelpAndSupportModal] = useState(false);
    const cardRef = useRef(null);
    const status = store?.createSupportReducer?.createSupport?.status;

    // Prevent text selection during capture
    useEffect(() => {
        if (capturing) {
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
            return () => {
                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';
            };
        }
    }, [capturing]);

    const getCurrentPageInfo = useCallback(() => {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const currentPageName = segments
            .filter((seg) => !/^[a-f\d]{24}$/i.test(seg))
            .map((seg) =>
                seg
                    .replace(/-/g, ' ')
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/\b\w/g, (c) => c.toUpperCase())
            )
            .join(' / ');

        return {
            currentPageURL: window.location.href,
            currentPageName: currentPageName || 'Unknown Page'
        };
    }, []);

    const { currentPageURL, currentPageName } = getCurrentPageInfo();

    const handleCapture = useCallback(async (uri) => {
        try {
            setCapturing(true);
            await new Promise((resolve) => setTimeout(resolve, 100));
            setCapturedImage(uri);
            setShowCard(true);
        } finally {
            setCapturing(false);
        }
    }, []);

    const handleDownload = useCallback(() => {
        if (capturedImage) {
            const link = document.createElement('a');
            link.href = capturedImage;
            link.download = `${currentPageName.replace(/\s+/g, '_')}_screenshot.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [capturedImage, currentPageName]);

    const handleCancel = useCallback(() => {
        setShowCard(false);
        setCapturedImage(null);
    }, []);

    const openHelpAndSupportModal = useCallback(() => {
        setShowCard(false);
        setShowHelpAndSupportModal(true);
    }, []);

    const closeHelpAndSupportModal = useCallback(() => {
        setShowHelpAndSupportModal(false);
    }, []);

    useEffect(() => {
        if (status === 200) {
            setCapturedImage(null);
            setCapturing(false);
        }
    }, [status]);

    return (
        <div style={{ position: 'relative' }}>
            <style>{`
                .crosshairs {
                    position: fixed;
                    width: auto;
                    z-index: 2147483645;
                }
                .screenshot-card {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border: 1px solid #2c2c2c;
                    padding: 16px;
                    width: min(900px, 90vw);
                    background: #1e1e1e;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                }
                .screenshot-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                /* Prevent text selection globally during capture */
                body.no-select {
                    user-select: none;
                    -webkit-user-select: none;
                }
            `}</style>

            <ScreenCapture onEndCapture={handleCapture}>
                {({ onStartCapture }) => (
                    <OverlayTrigger placement="left" overlay={<Tooltip>Select Area</Tooltip>}>
                        <i
                            className={`mdi mdi-crop ${color} ${height}`}
                            onClick={() => {
                                setCapturedImage(null);
                                setShowCard(false);
                                document.body.classList.add('no-select');
                                onStartCapture();
                            }}
                            disabled={capturing}
                            style={{ 
                                cursor: capturing ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.2s',
                                opacity: capturing ? 0.7 : 1
                            }}
                        />
                    </OverlayTrigger>
                )}
            </ScreenCapture>

            {capturing && (
                <div className="screenshot-overlay">
                    <Loading />
                </div>
            )}

            {showCard && (
                <>
                    <div 
                        className="modal-backdrop"
                        onClick={(e) => e.stopPropagation()} 
                    />
                    <div ref={cardRef} className="screenshot-card">
                        <img 
                            src={capturedImage} 
                            alt="Captured Screenshot" 
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto',
                                borderRadius: '4px',
                                marginBottom: '12px'
                            }} 
                        />
                        <div className="d-flex justify-content-between align-items-center">
                            <code className="text-nowrap text-light">{currentPageName}</code>
                            <div className="d-flex gap-3">
                                    <button 
                                        onClick={openHelpAndSupportModal}
                                        className="btn btn-link p-0 border-0"
                                        aria-label="Share screenshot"
                                    >
                                        <i className="mdi mdi-share fs-3 text-primary" />
                                    </button>
                                    <button 
                                        onClick={handleDownload}
                                        className="btn btn-link p-0 border-0"
                                        aria-label="Download screenshot"
                                    >
                                        <i className="mdi mdi-tray-arrow-down fs-3 text-success" />
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        className="btn btn-link p-0 border-0"
                                        aria-label="Close screenshot"
                                    >
                                        <i className="mdi mdi-close-circle fs-3 text-danger" />
                                    </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <HelpSupportModal 
                show={showHelpAndSupportModal} 
                hide={closeHelpAndSupportModal} 
                file={capturedImage} 
            />
        </div>
    );
};

export default CroppedScreenShot;