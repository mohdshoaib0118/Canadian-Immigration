import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

const ViewImageModal = ({ open, close, img }) => {
    return (
        <Modal show={open} onHide={close} centered size="sm">
            <Modal.Body style={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
                <Carousel style={{ width: '275px' }}>
                    {img?.map((imageUrl, index) => (
                        <Carousel.Item key={index}>
                            <div
                                style={{
                                    height: '205px',
                                    width: '275px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f5f5f5',
                                }}>
                                <img
                                    src={imageUrl}
                                    alt={`Slide ${index + 1}`}
                                    style={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
};

export default ViewImageModal;
