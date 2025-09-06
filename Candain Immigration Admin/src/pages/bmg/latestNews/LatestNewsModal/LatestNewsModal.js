import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addLatestNewsActions, editLatestNewsActions, deleteLatestNewsActions } from '../../../../redux/actions';

const LatestNewsModal = ({ latestNewsModal, setLatestNewsModal }) => {
    const dispatch = useDispatch();
    const { type, data, isVisible } = latestNewsModal;

    const [formData, setFormData] = useState({
        heading: '',
        paragraph: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (type === 'Edit' && data) {
            setFormData({
                heading: data.heading || '',
                paragraph: data.paragraph || '',
                image: null,
            });
            setImagePreview(data.image || '');
        } else {
            setFormData({
                heading: '',
                paragraph: '',
                image: null,
            });
            setImagePreview('');
        }
    }, [type, data]);

    const handleClose = () => {
        setLatestNewsModal({ type: '', data: null, isVisible: false });
        setShowDeleteConfirm(false);
        setFormData({ heading: '', paragraph: '', image: null });
        setImagePreview('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.paragraph.length < 10) {
            return;
        }
        
        const submitData = new FormData();
        submitData.append('heading', formData.heading);
        submitData.append('paragraph', formData.paragraph);
        
        if (formData.image) {
            submitData.append('image', formData.image);
        }

        if (type === 'Add') {
            dispatch(addLatestNewsActions(submitData));
        } else if (type === 'Edit') {
            submitData.append('_id', data._id);
            dispatch(editLatestNewsActions(submitData));
        }
        
        handleClose();
    };

    const handleDelete = () => {
        if (type === 'Delete' && data) {
            dispatch(deleteLatestNewsActions({ _id: data._id }));
            handleClose();
        }
    };

    if (type === 'Delete') {
        return (
            <Modal show={isVisible} onHide={handleClose} centered className="modal-animate">
                <Modal.Header className="border-0 pb-0" style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', borderRadius: '15px 15px 0 0' }}>
                    <Modal.Title className="text-white fw-bold">
                        <i className="mdi mdi-delete-alert me-2"></i>Delete News
                    </Modal.Title>
                    <Button variant="link" className="text-white p-0" onClick={handleClose}>
                        <i className="mdi mdi-close" style={{ fontSize: '1.5rem' }}></i>
                    </Button>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="text-center">
                        <div className="mb-4">
                            <i className="mdi mdi-alert-circle-outline text-danger" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h5 className="mb-3">Are you sure you want to delete this news?</h5>
                        <p className="text-muted mb-4">
                            <strong>"{data?.heading}"</strong><br />
                            This action cannot be undone.
                        </p>
                        <div className="d-flex gap-3 justify-content-center">
                            <Button variant="outline-secondary" onClick={handleClose} className="px-4 btn-cancel">
                                <i className="mdi mdi-close"></i>Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete} className="px-4">
                                <i className="mdi mdi-delete me-2"></i>Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={isVisible} onHide={handleClose} size="lg" centered className="modal-animate">
            <Modal.Header className="border-0 pb-0" style={{ background: 'linear-gradient(135deg, #006AAB 0%, #004d7a 100%)', borderRadius: '15px 15px 0 0' }}>
                <Modal.Title className="text-white fw-bold">
                    <i className={`mdi ${type === 'Add' ? 'mdi-plus-circle' : 'mdi-pencil'} me-2`}></i>
                    {type === 'Add' ? 'Add New News' : 'Edit News'}
                </Modal.Title>
                <Button variant="link" className="text-white p-0" onClick={handleClose}>
                    <i className="mdi mdi-close" style={{ fontSize: '1.5rem' }}></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="bg-white p-4 animate-slide-left" style={{ borderRadius: '0 0 15px 15px' }}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold text-dark mb-2">
                                        <i className="mdi mdi-format-title me-2 text-primary"></i>Heading
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="heading"
                                        value={formData.heading}
                                        onChange={handleInputChange}
                                        placeholder="Enter news heading"
                                        required
                                        className="form-control-lg"
                                        style={{ borderRadius: '10px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold text-dark mb-2">
                                        <i className="mdi mdi-text me-2 text-primary"></i>Paragraph
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="paragraph"
                                        value={formData.paragraph}
                                        onChange={handleInputChange}
                                        placeholder="Enter news content (minimum 10 characters)"
                                        required
                                        minLength={10}
                                        style={{ borderRadius: '10px', border: '2px solid #e9ecef' }}
                                    />
                                    {formData.paragraph.length > 0 && formData.paragraph.length < 10 && (
                                        <Form.Text className="text-danger">
                                            Paragraph must be at least 10 characters long
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold text-dark mb-2">
                                        <i className="mdi mdi-image me-2 text-primary"></i>News Image
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control-lg"
                                        style={{ borderRadius: '10px', border: '2px solid #e9ecef' }}
                                    />
                                    {imagePreview && (
                                        <div className="mt-3 text-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="img-fluid rounded shadow-sm"
                                                style={{ maxHeight: '200px', maxWidth: '100%' }}
                                            />
                                        </div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-3 pt-3 border-top">
                            <Button variant="outline-secondary" onClick={handleClose} className="px-4 btn-cancel">
                                <i className="mdi mdi-close"></i>Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 btn-animated hover-glow"
                                style={{ backgroundColor: '#006AAB', borderColor: '#006AAB' }}
                            >
                                <i className={`mdi ${type === 'Add' ? 'mdi-plus' : 'mdi-check'} me-2`}></i>
                                {type === 'Add' ? 'Add News' : 'Update News'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LatestNewsModal;