import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
// import { addTicketsAction, resetTicketsDataAction } from '../../redux/actions';
import { ButtonLoading } from '../loader/Loading';

const HelpSupportModal = ({ show, hide, file }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState('');
    const [issueType, setIssueType] = useState('');
    const [priorityType, setPriorityType] = useState('Medium');
    const store = useSelector((state) => state);
    const createStatus = null; // store?.createTicketReducer?.supportData?.status;
    const user = store?.Auth?.user;

    const getCurrentPageInfo = () => {
        const segments = location.pathname.split('/').filter(Boolean);
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
            currentPageURL: location.pathname,
            currentPageName: currentPageName || 'Unknown Page'
        };
    };

    function dataURLtoFile(dataUrl, fileName) {
        try {
            const arr = dataUrl.split(',');
            const mimeMatch = arr[0].match(/:(.*?);/);
            if (!mimeMatch || !arr[1]) return null;

            const mime = mimeMatch[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], fileName, { type: mime });
        } catch (err) {
            console.error('Invalid base64 file:', err);
            return null;
        }
    }

    const onSubmitData = (e) => {
        e.preventDefault();

        let finalAttachment = null;

        if (attachment) {
            finalAttachment = attachment;
        } else if (file && typeof file === 'string' && file.startsWith('data:image/')) {
            finalAttachment = dataURLtoFile(file, 'screenshot.png');
        }

        const formData = new FormData();
        if (finalAttachment) {
            formData.append('attachment', finalAttachment);
        }

        formData.append('description', description);
        formData.append('pageName', getCurrentPageInfo().currentPageName);
        formData.append('url', window.location.href);
        formData.append('issueType', issueType);
        formData.append('priority', priorityType);
        formData.append('userId', user?.id);
        formData.append('sellerMail', user?.email);
    };

    const resetForm = () => {
        setAttachment(null);
        setDescription('');
        setIssueType('');
    };

    const close = () => {
        hide();
        resetForm();
    };

    useEffect(() => {
        if (createStatus === 200) {
            close();
            // dispatch(resetTicketsDataAction());
        }
    }, [createStatus]);

    const handleContentClick = (e) => {
        e.stopPropagation()
    }
    return (
        <div onMouseDown={handleContentClick}>
            <Modal
                show={show}
                onHide={close}
                centered
                backdrop="static"
                size="lg"
                className="help-support-modal"
            >
                <Modal.Header className="bg-success text-white border-0 py-1">
                    <Modal.Title className="fw-bold fs-4">
                        <i className="mdi mdi-headset me-2"></i>
                        Help & Support
                    </Modal.Title>
                    <button
                        type="button"
                        className="btn-close btn-close-white m-0"
                        onClick={close}
                        aria-label="Close"
                    />
                </Modal.Header>

                <Modal.Body className="p-3">
                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-info-circle fs-5 text-primary me-2"></i>
                            <h6 className="mb-0 fw-bold fs-6">Page Information</h6>
                        </div>

                        <div className="row g-2 mb-2">
                            <div className="col-md-6">
                                <div className="p-2 bg-light rounded small">
                                    <div className="text-muted">Page Name</div>
                                    <div className="fw-bold text-primary text-truncate">
                                        {getCurrentPageInfo().currentPageName}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-2 bg-light rounded small">
                                    <div className="text-muted">URL</div>
                                    <a
                                        href={location.pathname}
                                        className="text-truncate d-block text-primary"
                                        style={{ maxWidth: '100%' }}
                                        title={location.pathname}
                                    >
                                        {location.pathname.length > 30
                                            ? `${location.pathname.substring(0, 30)}...`
                                            : location.pathname}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form onSubmit={onSubmitData}>
                        <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-paperclip fs-5 text-primary me-2"></i>
                                <h6 className="mb-0 fw-bold fs-6">{file ? 'Captured screenshot' : 'Attachment'}</h6>
                            </div>

                            {file ? (
                                <div className="text-center border rounded p-2 bg-light">
                                    <img
                                        src={file}
                                        alt="Screenshot"
                                        className="img-fluid rounded border"
                                        style={{ maxHeight: '150px' }}
                                    />
                                </div>
                            ) : (
                                <Form.Group controlId="formFile" className="mb-2">
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        size="sm"
                                        onChange={(e) => setAttachment(e.target.files[0])}
                                    />
                                </Form.Group>
                            )}
                        </div>

                        <div className="row g-2 mb-3">
                            <div className="col-md-6">
                                <Form.Group controlId="issueType">
                                    <Form.Label className="small fw-bold">Issue Type</Form.Label>
                                    <Form.Select
                                        value={issueType}
                                        required
                                        size="sm"
                                        onChange={(e) => setIssueType(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Select issue type</option>
                                        <option value="Bug">Bug Report</option>
                                        <option value="Recommendation">Feature Request</option>
                                        <option value="Enhancement">Improvement</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="priorityType">
                                    <Form.Label className="small fw-bold">Priority</Form.Label>
                                    <Form.Select
                                        value={priorityType}
                                        required
                                        size="sm"
                                        onChange={(e) => setPriorityType(e.target.value)}
                                    >
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label className="small fw-bold">
                                {issueType ? `Describe your ${issueType === 'Other' ? 'other type of issue' : issueType}` : 'Description'}
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder='Describe..'
                                style={{ height: '80px' }}
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2 pt-2">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={close}
                                disabled={false}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                size="sm"
                                type="submit"
                                disabled={false}
                            >
                                <>
                                    <i className="mdi mdi-send me-1"></i>
                                    Submit
                                </>
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HelpSupportModal;
