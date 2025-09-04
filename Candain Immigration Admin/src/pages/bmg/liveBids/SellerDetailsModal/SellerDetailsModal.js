import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const SellerDetailsModal = ({ open, close, sellerDetails }) => {
    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Seller Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="container">
                    {[
                        { label: 'Name', value: `${sellerDetails?.name} ${sellerDetails?.lastName}` },
                        { label: 'Email', value: sellerDetails?.email },
                        { label: 'Phone Number', value: sellerDetails?.phoneNumber },
                        { label: 'State', value: sellerDetails?.state },
                        { label: 'City', value: sellerDetails?.city },
                    ].map(({ label, value }, idx) => (
                        <div className="row mb-2" key={idx}>
                            <div className="col-4 text-secondary fw-medium">{label}</div>
                            <div className="col-8 text-dark fw-semibold">{value}</div>
                        </div>
                    ))}
                </div>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
                <Button className="btn btn-danger" onClick={close}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SellerDetailsModal;
