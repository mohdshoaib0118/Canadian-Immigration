import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getFaqActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import FaqModal from './FaqModal/FaqModal';
import FloatingActionButton from '../../../components/FloatingActionButton';

const Faq = () => {
    const dispatch = useDispatch();
    const { faqDataReducer } = useSelector((state) => state);

    const FaqData = faqDataReducer?.faqData?.response || [];
    const TotalRecords = faqDataReducer?.faqData?.response?.length || 0;
    const FaqLoading = faqDataReducer?.loading;
    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [faqModal, setFaqModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getFaqActions({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleFaqModal = (type, data = null) => {
        setFaqModal({ type, data, isVisible: true });
    };

    const handleModalClose = () => {
        setFaqModal({ ...faqModal, isVisible: false });
        // Refresh data when modal closes
        dispatch(getFaqActions({ search, limit: pageSize, page: pageIndex }));
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Faq', path: '/admin/faq', active: true }]} title="FAQ Management - Canadian Dream Immigration" />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg animate-fade-in hover-lift" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 gradient-animate" style={{ borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-help-circle text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">FAQ Management</h4>
                                        <p className="text-muted-50 mb-0">Manage frequently asked questions</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-comment-question me-2"></i>
                                        {TotalRecords || 0} Total FAQs
                                    </span>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="py-0">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control ps-5"
                                            placeholder="Search FAQs by question or answer..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{ borderRadius: '25px', width: '300px', border: '2px solid #e9ecef' }}
                                        />
                                        <i className="mdi mdi-magnify position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}></i>
                                    </div>
                                    {search && (
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-circle"
                                            onClick={() => setSearch('')}
                                            style={{ width: '35px', height: '35px' }}
                                        >
                                            <i className="mdi mdi-close"></i>
                                        </Button>
                                    )}
                                </div>
                                <Button
                                    className="px-4 py-2 fw-semibold btn-animated hover-glow"
                                    style={{
                                        backgroundColor: '#006AAB',
                                        borderColor: '#006AAB',
                                        borderRadius: '25px',
                                        boxShadow: '0 4px 15px rgba(0, 106, 171, 0.3)'
                                    }}
                                    onClick={() => handleFaqModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Add New FAQ
                                </Button>
                            </div>

                            {FaqLoading ? (
                                <Loading />
                            ) : FaqData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="mb-0 modern-table">
                                        <thead>
                                            <tr>
                                                <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Question</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Answer Preview</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                                                <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FaqData.map((data, index) => (
                                                <tr key={data._id || index} className="stagger-item">
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-light text-dark rounded-pill">{(pageIndex - 1) * pageSize + index + 1}</span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="fw-bold text-dark mb-1" style={{ maxWidth: '300px' }}>
                                                            {data?.question || 'No question'}
                                                        </div>
                                                        <small className="text-muted">ID: {data?._id?.slice(-6) || 'N/A'}</small>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="text-muted" style={{ maxWidth: '250px', fontSize: '0.9rem' }}>
                                                            {data?.answer ?
                                                                data.answer.replace(/<[^>]*>/g, '').slice(0, 100) + '...'
                                                                : 'No answer available'
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <span className={`modern-badge ${data?.status ? 'status-active' : 'status-inactive'}`}>
                                                            <i className={`mdi ${data?.status ? 'mdi-check-circle' : 'mdi-pause-circle'} me-1`}></i>
                                                            {data?.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 align-middle text-center">
                                                        <div className="action-btn-group">
                                                            <button
                                                                className="action-btn edit-btn"
                                                                onClick={() => handleFaqModal('Edit', data)}
                                                                title="Edit FAQ"
                                                            >
                                                                <i className="mdi mdi-pencil"></i>
                                                            </button>
                                                            <button
                                                                className="action-btn delete-btn"
                                                                onClick={() => handleFaqModal('Delete', data)}
                                                                title="Delete FAQ"
                                                            >
                                                                <i className="mdi mdi-delete"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="mb-4">
                                        <i className="mdi mdi-help-circle-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No FAQs Found</h5>
                                    <p className="text-muted mb-4">Start building your FAQ section to help customers</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleFaqModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Create Your First FAQ
                                    </Button>
                                </div>
                            )}
                            {TotalRecords > 20 && (
                                <Pagination
                                    pageIndex={pageIndex}
                                    pageSize={pageSize}
                                    totalPages={totalPages}
                                    setPageIndex={setPageIndex}
                                    onChangePageSize={setPageSize}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FaqModal
                show={faqModal.isVisible}
                hide={handleModalClose}
                faqData={faqModal}
            />

            <FloatingActionButton
                onClick={() => handleFaqModal('Add')}
                icon="mdi-help-circle-outline"
                tooltip="Add New FAQ"
            />
        </>
    );
};

export default Faq;
