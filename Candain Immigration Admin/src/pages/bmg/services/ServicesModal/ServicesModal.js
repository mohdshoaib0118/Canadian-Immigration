import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ServicesModal = ({ show, hide, servicesData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        price: '',
        features: '',
        status: true
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (servicesData.type === 'Edit' && servicesData.data) {
            setFormData({
                title: servicesData.data.title || '',
                description: servicesData.data.description || '',
                icon: servicesData.data.icon || '',
                price: servicesData.data.price || '',
                features: servicesData.data.features || '',
                status: servicesData.data.status !== undefined ? servicesData.data.status : true
            });
        } else {
            setFormData({
                title: '',
                description: '',
                icon: '',
                price: '',
                features: '',
                status: true
            });
        }
        setErrors({});
    }, [servicesData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim() || formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }
        if (!formData.description.trim() || formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        hide();
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            hide();
        }
    };

    const getModalTitle = () => {
        switch (servicesData.type) {
            case 'Add': return 'Add Service';
            case 'Edit': return 'Edit Service';
            case 'Delete': return 'Delete Service';
            default: return 'Service';
        }
    };

    return (
        <Modal show={show} onHide={hide} size={servicesData.type === 'Delete' ? 'sm' : 'lg'} centered className="modal-animate">
            {servicesData.type === 'Delete' ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{getModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center py-3">
                        <i className="mdi mdi-delete-outline text-danger mb-2" style={{ fontSize: '2.5rem' }}></i>
                        <h6 className="mb-2">Delete Service</h6>
                        <p className="mb-1">Delete <strong>{servicesData.data?.title}</strong>?</p>
                        <small className="text-muted">This cannot be undone.</small>
                    </Modal.Body>
                    <Modal.Footer className="py-2">
                        <Button variant="secondary" size="sm" className="btn-cancel" onClick={hide}>Cancel</Button>
                        <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header className="px-2 py-1 text-light" style={{ backgroundColor: '#006AAB' }}>
                        <Modal.Title>{getModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Service Title <span className="text-danger fs-4">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.title}
                                            placeholder="e.g., Express Entry Program (minimum 3 characters)"
                                            minLength={3}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Icon Class</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="icon"
                                            value={formData.icon}
                                            onChange={handleInputChange}
                                            placeholder="mdi mdi-briefcase"
                                        />
                                        <Form.Text className="text-muted">
                                            Material Design Icons class
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Description <span className="text-danger fs-4">*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.description}
                                    placeholder="Enter detailed service description (minimum 10 characters)"
                                    minLength={10}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Price (Optional)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="Enter price in CAD"
                                        />
                                        <Form.Text className="text-muted">
                                            Leave empty for "Contact Us" pricing
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleInputChange}
                                            label="Active Status"
                                            className="mt-4"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Key Features</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    placeholder="List key features (one per line)"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="px-2 py-1">
                        <Button variant="danger" className="btn-cancel" onClick={hide}>
                            <i className="mdi mdi-close"></i>Cancel
                        </Button>
                        <Button className="btn-animated hover-glow" style={{ backgroundColor: '#006AAB' }} onClick={handleSubmit}>
                            <i className={`mdi ${servicesData.type === 'Add' ? 'mdi-plus' : 'mdi-content-save'} me-1`}></i>
                            {servicesData.type === 'Add' ? 'Add Service' : 'Update Service'}
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
};

export default ServicesModal;
