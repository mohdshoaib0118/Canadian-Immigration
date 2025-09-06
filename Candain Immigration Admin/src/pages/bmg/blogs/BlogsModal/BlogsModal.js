import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addBlogsActions, updateBlogsActions, deleteBlogsActions } from '../../../../redux/actions';

const BlogsModal = ({ show, hide, blogsData }) => {
    const dispatch = useDispatch();
    const { blogsDataReducer } = useSelector((state) => state);

    const [formData, setFormData] = useState({
        heading: '',
        paragraph: '',
        image: null,
        status: true
    });

    const [existingImage, setExistingImage] = useState(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (blogsData.type === 'Edit' && blogsData.data) {
            setFormData({
                heading: blogsData.data.heading || '',
                paragraph: blogsData.data.paragraph || '',
                image: null,
                status: blogsData.data.status !== undefined ? blogsData.data.status : true
            });
            setExistingImage(blogsData.data.image || null);
        } else {
            setFormData({
                heading: '',
                paragraph: '',
                image: null,
                status: true
            });
            setExistingImage(null);
        }
        setSelectedImagePreview(null);
        setErrors({});
    }, [blogsData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            if (files && files[0]) {
                const file = files[0];
                setFormData(prev => ({ ...prev, [name]: file }));

                // Create preview URL for selected image
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                // File input was cleared
                setFormData(prev => ({ ...prev, [name]: null }));
                setSelectedImagePreview(null);
            }
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
        if (!formData.heading.trim() || formData.heading.length < 5) {
            newErrors.heading = 'Heading must be at least 5 characters long';
        }
        if (!formData.paragraph.trim() || formData.paragraph.replace(/<[^>]*>/g, '').length < 10) {
            newErrors.paragraph = 'Content must be at least 10 characters long';
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
            heading: formData.heading,
            paragraph: formData.paragraph
        };

        // Only include image if a new file is actually selected
        if (formData.image && formData.image instanceof File) {
            submitData.image = formData.image;
        } else if (blogsData.type === 'Edit' && existingImage) {
            submitData.existingImage = existingImage;
        }

        if (blogsData.type === 'Edit') {
            submitData._id = blogsData.data._id;
        }

        if (blogsData.type === 'Add') {
            dispatch(addBlogsActions(submitData));
        } else if (blogsData.type === 'Edit') {
            dispatch(updateBlogsActions(blogsData.data._id, submitData));
        }
        hide();
    };

    const handleDelete = () => {
        dispatch(deleteBlogsActions(blogsData.data._id));
        hide();
    };

    const getModalTitle = () => {
        switch (blogsData.type) {
            case 'Add': return 'Add New Blog';
            case 'Edit': return 'Edit Blog';
            case 'View': return 'View Blog';
            case 'Delete': return 'Delete Blog';
            default: return 'Blog';
        }
    };

    if (blogsData.type === 'View') {
        return (
            <Modal show={show} onHide={hide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>View Blog: {blogsData.data?.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{blogsData.data?.heading}</h4>
                    {blogsData.data?.image && (
                        <img
                            src={blogsData.data.image}
                            alt={blogsData.data.heading}
                            className="img-fluid rounded mb-3"
                        />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: blogsData.data?.paragraph }}></div>
                    <p className="mt-3"><strong>Status:</strong> {blogsData.data?.status ? 'Published' : 'Draft'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn-cancel" onClick={hide}>
                        <i className="mdi mdi-close"></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={hide} size={blogsData.type === 'Delete' ? 'sm' : 'lg'} centered className="modal-animate">
            {blogsData.type === 'Delete' ? (
                <>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title className="fw-bold">{getModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center py-4">
                        <div className="mb-3">
                            <i className="mdi mdi-delete-outline text-danger" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h5 className="mb-3 fw-bold">Delete Blog Post</h5>
                        <p className="mb-2">Are you sure you want to delete</p>
                        <p className="fw-bold text-primary mb-3">"{blogsData.data?.heading}"?</p>
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                            <i className="mdi mdi-alert me-2"></i>
                            <small>This action cannot be undone and will permanently remove this blog post.</small>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 justify-content-center">
                        <Button variant="outline-secondary" onClick={hide} className="px-4 me-2 btn-cancel">
                            <i className="mdi mdi-close me-1"></i>Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} className="px-4">
                            <i className="mdi mdi-delete me-1"></i>Delete Blog
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header className="px-3 py-3 text-light border-0" style={{ backgroundColor: '#006AAB', borderRadius: '0.375rem 0.375rem 0 0' }}>
                        <Modal.Title className="fw-bold d-flex align-items-center">
                            <i className={`mdi ${blogsData.type === 'Add' ? 'mdi-plus-circle' : 'mdi-pencil'} me-2`}></i>
                            {getModalTitle()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="bg-white p-4 rounded shadow-sm animate-slide-left">
                            <Form>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-format-title me-2 text-primary"></i>
                                        Blog Heading <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="heading"
                                        value={formData.heading}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.heading}
                                        placeholder="Enter an engaging blog title (minimum 5 characters)..."
                                        className="form-control-lg"
                                        style={{ borderRadius: '8px' }}
                                        minLength={5}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.heading}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-text me-2 text-primary"></i>
                                        Blog Content <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="border rounded" style={{ borderRadius: '8px' }}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={formData.paragraph}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFormData(prev => ({ ...prev, paragraph: data }));
                                                if (errors.paragraph) {
                                                    setErrors(prev => ({ ...prev, paragraph: '' }));
                                                }
                                            }}
                                            config={{
                                                placeholder: 'Write your engaging blog content here (minimum 10 characters)...',
                                                toolbar: [
                                                    'heading', '|',
                                                    'bold', 'italic', 'link', '|',
                                                    'bulletedList', 'numberedList', '|',
                                                    'outdent', 'indent', '|',
                                                    'blockQuote', 'insertTable', '|',
                                                    'undo', 'redo'
                                                ]
                                            }}
                                        />
                                    </div>
                                    {errors.paragraph && (
                                        <div className="text-danger small mt-2 d-flex align-items-center">
                                            <i className="mdi mdi-alert-circle me-1"></i>
                                            {errors.paragraph}
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">
                                        <i className="mdi mdi-image me-2 text-primary"></i>
                                        Featured Image
                                    </Form.Label>

                                    {/* Image Preview Section */}
                                    {(existingImage || selectedImagePreview) && (
                                        <div className="mb-3 p-3 bg-light rounded border">
                                            <small className="text-muted d-block mb-2">Image Preview:</small>
                                            <div className="d-flex gap-3 flex-wrap">
                                                {existingImage && blogsData.type === 'Edit' && (
                                                    <div className="position-relative">
                                                        <img
                                                            src={existingImage}
                                                            alt="Current blog image"
                                                            className="img-thumbnail shadow-sm"
                                                            style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
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
                                                            alt="Selected image preview"
                                                            className="img-thumbnail shadow-sm"
                                                            style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
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

                                {blogsData.type === 'Edit' && (
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold mb-2">
                                            <i className="mdi mdi-eye me-2 text-primary"></i>
                                            Publication Status
                                        </Form.Label>
                                        <Form.Select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="form-select-lg"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <option value="true">📝 Published (Visible to public)</option>
                                            <option value="false">💾 Draft (Save for later)</option>
                                        </Form.Select>
                                    </Form.Group>
                                )}
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="px-4 py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                        <Button variant="outline-secondary" onClick={hide} className="px-4 me-2 btn-cancel">
                            <i className="mdi mdi-close me-1"></i>Cancel
                        </Button>
                        <Button
                            className="px-4 btn-animated hover-glow"
                            style={{ backgroundColor: '#006AAB', borderColor: '#006AAB' }}
                            onClick={handleSubmit}
                            disabled={blogsDataReducer?.loading}
                        >
                            {blogsDataReducer?.loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className={`mdi ${blogsData.type === 'Add' ? 'mdi-plus' : 'mdi-content-save'} me-1`}></i>
                                    {blogsData.type === 'Add' ? 'Create Blog' : 'Update Blog'}
                                </>
                            )}
                        </Button>
                    </Modal.Footer>
                    {/* </div> */}
                </>
            )}
        </Modal>
    );
};

export default BlogsModal;
