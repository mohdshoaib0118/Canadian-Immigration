import React, { useState } from 'react';
import { Alert, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMinus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const Specification = ({ onSpecificationsChange, savedData }) => {
    const [specifications, setSpecifications] = useState([]);

    const handleAdd = () => {
        const updatedSpecs = [...specifications, { key: '', value: '' }];
        setSpecifications(updatedSpecs);
        onSpecificationsChange(updatedSpecs);
    };

    const handleRemove = (index) => {
        const updatedSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(updatedSpecs);
        onSpecificationsChange(updatedSpecs);
    };

    const handleChange = (index, field, value) => {
        const updatedSpecs = specifications.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec));
        setSpecifications(updatedSpecs);
        onSpecificationsChange(updatedSpecs);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-dark">Specification</h5>
                <Button
                    variant="success"
                    onClick={handleAdd}
                    className="custom-buttons d-flex align-items-center justify-content-center">
                    <FiPlus className="me-2" />
                    Add
                </Button>
            </div>

            {specifications.length === 0 ? (
                <Alert variant="warning" className="text-center fw-bold">
                    No specifications added yet.
                </Alert>
            ) : (
                specifications.map((spec, index) => (
                    <Row
                        key={index}
                        className="align-items-center mb-0 border mx-auto"
                        style={{ background: '#f9f9f9' }}>
                        <Col xs={12} md={3} className="mb-2 mb-md-0  px-0 rounded-0">
                            <Form.Control
                                type="text"
                                placeholder="e.g. Product ID"
                                value={spec.key}
                                onChange={(e) => handleChange(index, 'key', e.target.value)}
                                className="rounded-0 border-0 fw-medium"
                                style={{ background: '#ECECEC', fontSize: '14px' }}
                            />
                        </Col>
                        <Col xs={12} md={8} className="mb-2 mb-md-0 px-0">
                            <Form.Control
                                type="text"
                                placeholder="e.g. Make"
                                value={spec.value}
                                onChange={(e) => handleChange(index, 'value', e.target.value)}
                                className="rounded-0 border-0 bg-transparent"
                                style={{ background: '#ECECEC', fontSize: '12px', color: '#A3A3A3' }}
                            />
                        </Col>
                        <Col
                            xs={12}
                            md={1}
                            className="text-md-center px-0 d-flex align-items-center justify-content-end">
                            <Button
                                variant=""
                                onClick={() => handleRemove(index)}
                                className="w-100 rounded-0 text-end border-0">
                                <FaMinus className="text-danger" />
                            </Button>
                        </Col>
                    </Row>
                ))
            )}
        </div>
    );
};

export default Specification;
