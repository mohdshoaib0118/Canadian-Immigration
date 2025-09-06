import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createFaqActions, getFaqActions, updateFaqActions, deleteFaqActions } from "../../../../redux/actions";
import { ButtonLoading } from "../../../../helpers/loader/Loading";

const FaqModal = ({ show, hide, faqData }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const requiredStar = <span className="text-danger fs-4">*</span>;
    const loading = store?.createFaqDataReducer?.loading || store?.updateFaqDataReducer?.loading || store?.deleteFaqDataReducer?.loading
    const createStatus = store?.createFaqDataReducer?.faqData?.status
    const updateStatus = store?.updateFaqDataReducer?.faqData?.status
    const deleteStatus = store?.deleteFaqDataReducer?.faqData?.status
    // State to manage form data
    const [faq, setFaq] = useState({
        question: "",
        answer: "",
        status: false,
    });
    const closeModal = () => {
        setFaq({
            question: "",
            answer: "",
            status: false,
        })
        hide()
    }
    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaq((prev) => ({ ...prev, [name]: value }));
    };

    // Handle ReactQuill editor changes
    const handleQuillChange = (value) => {
        setFaq((prev) => ({ ...prev, answer: value }));
    };

    // Load existing FAQ data for editing
    useEffect(() => {
        if (faqData?.data) {
            setFaq({
                question: faqData?.data?.question || "",
                answer: faqData?.data?.answer || "",
                status: faqData?.data?.status ?? false,
            });
        }
    }, [faqData?.data]);


    // Handle form submission
    const handleSubmit = () => {
        if (!faq.question.trim() || faq.question.length < 5) {
            alert("Question must be at least 5 characters long.");
            return;
        }
        if (!faq.answer.trim() || faq.answer.replace(/<[^>]*>/g, '').length < 10) {
            alert("Answer must be at least 10 characters long.");
            return;
        }

        const data = {
            _id: faqData?.data?._id,
            question: faq?.question,
            answer: faq?.answer,
            status: faq?.status
        }
        if (faqData?.data?._id) {
            dispatch(updateFaqActions(data));
        } else {
            dispatch(createFaqActions(faq));
        }

    };
    // Close modal after successful operation
    useEffect(() => {
        const createSuccess = store?.createFaqDataReducer?.faqData;
        const updateSuccess = store?.updateFaqDataReducer?.faqData;
        const deleteSuccess = store?.deleteFaqDataReducer?.faqData;
        
        if (!loading && (createSuccess || updateSuccess || deleteSuccess)) {
            closeModal();
        }
    }, [store?.createFaqDataReducer?.faqData, store?.updateFaqDataReducer?.faqData, store?.deleteFaqDataReducer?.faqData, loading]);

    const handleDelete = () => {
        dispatch(deleteFaqActions(faqData?.data?._id));
    };

    if (faqData?.type === 'Delete') {
        return (
            <Modal show={show} onHide={closeModal} centered size="sm" className="modal-animate">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold">Delete FAQ</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <div className="mb-3">
                        <i className="mdi mdi-delete-outline text-danger" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h5 className="mb-3 fw-bold">Delete FAQ</h5>
                    <p className="mb-2">Are you sure you want to delete this FAQ?</p>
                    <p className="fw-bold text-primary mb-3">"{faqData.data?.question}"</p>
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <i className="mdi mdi-alert me-2"></i>
                        <small>This action cannot be undone.</small>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    <Button variant="outline-secondary" onClick={closeModal} className="px-4 me-2 btn-cancel">
                        <i className="mdi mdi-close me-1"></i>Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} className="px-4" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <i className="mdi mdi-delete me-1"></i>Delete FAQ
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={closeModal} centered size="lg" className="modal-animate">
            <Modal.Header className="px-3 py-3 text-light border-0" style={{ backgroundColor: '#006AAB', borderRadius: '0.375rem 0.375rem 0 0' }}>
                <Modal.Title className="fw-bold d-flex align-items-center">
                    <i className={`mdi ${faqData?.type === 'Add' ? 'mdi-plus-circle' : 'mdi-pencil'} me-2`}></i>
                    {faqData?.type} FAQ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="bg-white p-4 rounded shadow-sm animate-slide-left">
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold mb-2">
                                <i className="mdi mdi-help-circle me-2 text-primary"></i>
                                Question <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter frequently asked question (minimum 5 characters)..."
                                name="question"
                                value={faq.question}
                                onChange={handleChange}
                                className="form-control-lg"
                                style={{ borderRadius: '8px' }}
                                required
                                minLength={5}
                            />
                            {faq.question.length > 0 && faq.question.length < 5 && (
                                <Form.Text className="text-danger">
                                    Question must be at least 5 characters long
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold mb-2">
                                <i className="mdi mdi-comment-text me-2 text-primary"></i>
                                Answer <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="border rounded" style={{ borderRadius: '8px' }}>
                                <ReactQuill
                                    value={faq.answer}
                                    onChange={handleQuillChange}
                                    theme="snow"
                                    placeholder="Provide a detailed answer..."
                                />
                            </div>
                        </Form.Group>
                        
                        {faqData?.data && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold mb-2">
                                    <i className="mdi mdi-eye me-2 text-primary"></i>
                                    Status
                                </Form.Label>
                                <Form.Select 
                                    name="status" 
                                    value={faq.status} 
                                    onChange={handleChange}
                                    className="form-select-lg"
                                    style={{ borderRadius: '8px' }}
                                >
                                    <option value="true">✅ Active (Visible to users)</option>
                                    <option value="false">⏸️ Inactive (Hidden from users)</option>
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="px-4 py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                <Button variant="outline-secondary" onClick={closeModal} className="px-4 me-2 btn-cancel">
                    <i className="mdi mdi-close me-1"></i>Cancel
                </Button>
                <Button 
                    className="px-4 btn-animated hover-glow"
                    style={{ backgroundColor: '#006AAB', borderColor: '#006AAB' }}
                    onClick={handleSubmit} 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Saving...
                        </>
                    ) : (
                        <>
                            <i className={`mdi ${faqData?.type === 'Add' ? 'mdi-plus' : 'mdi-content-save'} me-1`}></i>
                            {faqData?.type === 'Edit' ? 'Update FAQ' : 'Create FAQ'}
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FaqModal;
