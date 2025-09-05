import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamsActions, updateTeamsActions, deleteTeamsActions } from '../../../../redux/actions';

const TeamsModal = ({ show, hide, teamsData }) => {
    const dispatch = useDispatch();
    const { teamsDataReducer } = useSelector((state) => state);

    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        image: null,
        status: true
    });

    const [existingImage, setExistingImage] = useState(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (teamsData.type === 'Edit' && teamsData.data) {
            setFormData({
                name: teamsData.data.name || '',
                designation: teamsData.data.designation || '',
                image: null,
                status: teamsData.data.status !== undefined ? teamsData.data.status : true
            });
            setExistingImage(teamsData.data.image || null);
        } else {
            setFormData({
                name: '',
                designation: '',
                image: null,
                status: true
            });
            setExistingImage(null);
        }
        setSelectedImagePreview(null);
        setErrors({});
    }, [teamsData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file' && files[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, [name]: file }));
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }
        if (!formData.designation.trim() || formData.designation.length < 3) {
            newErrors.designation = 'Designation must be at least 3 characters long';
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

        const submitData = {
            name: formData.name,
            designation: formData.designation
        };
        
        if (formData.image) {
            submitData.image = formData.image;
        }
        
        if (teamsData.type === 'Edit') {
            submitData._id = teamsData.data._id;
        }

        if (teamsData.type === 'Add') {
            dispatch(addTeamsActions(submitData));
        } else if (teamsData.type === 'Edit') {
            dispatch(updateTeamsActions(teamsData.data._id, submitData));
        }
        hide();
    };

    const handleDelete = () => {
        dispatch(deleteTeamsActions(teamsData.data._id));
        hide();
    };

    const getModalTitle = () => {
        switch (teamsData.type) {
            case 'Add': return 'Add Team Member';
            case 'Edit': return 'Edit Team Member';
            case 'Delete': return 'Delete Team Member';
            default: return 'Team Member';
        }
    };

    return (
        <Modal show={show} onHide={hide} size={teamsData.type === 'Delete' ? 'sm' : 'lg'} centered backdrop="static">
            {teamsData.type === 'Delete' ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{getModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center py-3">
                        <i className="mdi mdi-delete-outline text-danger mb-2" style={{ fontSize: '2.5rem' }}></i>
                        <h6 className="mb-2">Delete Team Member</h6>
                        <p className="mb-1">Delete <strong>{teamsData.data?.name}</strong>?</p>
                        <small className="text-muted">This cannot be undone.</small>
                    </Modal.Body>
                    <Modal.Footer className="py-2">
                        <Button variant="secondary" size="sm" onClick={hide}>Cancel</Button>
                        <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header className="px-2 py-1 text-light" style={{ backgroundColor: '#006AAB' }}>
                        <Modal.Title>{getModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <Form>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-account me-2 text-primary"></i>
                                        Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.name}
                                        placeholder="Enter full name (minimum 2 characters)..."
                                        className="form-control-lg"
                                        style={{ borderRadius: '8px' }}
                                        minLength={2}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-briefcase me-2 text-primary"></i>
                                        Designation <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.designation}
                                        placeholder="e.g., Immigration Consultant (minimum 3 characters)"
                                        className="form-control-lg"
                                        style={{ borderRadius: '8px' }}
                                        minLength={3}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.designation}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-image me-2 text-primary"></i>
                                        Profile Image
                                    </Form.Label>
                                    
                                    {(existingImage || selectedImagePreview) && (
                                        <div className="mb-3 p-3 bg-light rounded border">
                                            <small className="text-muted d-block mb-2">Image Preview:</small>
                                            <div className="d-flex gap-3 flex-wrap">
                                                {existingImage && teamsData.type === 'Edit' && (
                                                    <div className="position-relative">
                                                        <img
                                                            src={existingImage}
                                                            alt="Current profile"
                                                            className="img-thumbnail shadow-sm"
                                                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                                        />
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="position-absolute top-0 end-0 rounded-circle shadow"
                                                            style={{ width: '24px', height: '24px', padding: '0', transform: 'translate(8px, -8px)' }}
                                                            onClick={() => setExistingImage(null)}
                                                        >
                                                            <i className="mdi mdi-close" style={{ fontSize: '12px' }}></i>
                                                        </Button>
                                                        <small className="d-block text-center mt-1 text-muted">Current</small>
                                                    </div>
                                                )}
                                                {selectedImagePreview && (
                                                    <div className="position-relative">
                                                        <img
                                                            src={selectedImagePreview}
                                                            alt="Selected preview"
                                                            className="img-thumbnail shadow-sm"
                                                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                                        />
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="position-absolute top-0 end-0 rounded-circle shadow"
                                                            style={{ width: '24px', height: '24px', padding: '0', transform: 'translate(8px, -8px)' }}
                                                            onClick={() => {
                                                                setSelectedImagePreview(null);
                                                                setFormData(prev => ({ ...prev, image: null }));
                                                            }}
                                                        >
                                                            <i className="mdi mdi-close" style={{ fontSize: '12px' }}></i>
                                                        </Button>
                                                        <small className="d-block text-center mt-1 text-success">New</small>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="form-control-lg"
                                        style={{ borderRadius: '8px' }}
                                    />
                                    <Form.Text className="text-muted mt-2">
                                        <i className="mdi mdi-information me-1"></i>
                                        Recommended: JPG, PNG files. Max size: 5MB
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="px-2 py-1">
                        <Button variant="danger" onClick={hide}>Cancel</Button>
                        <Button style={{ backgroundColor: '#006AAB' }} onClick={handleSubmit}>
                            {teamsData.type === 'Add' ? 'Add Team Member' : 'Update Team Member'}
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
};

export default TeamsModal;