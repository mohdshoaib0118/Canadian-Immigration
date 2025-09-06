import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import LatestNewsModal from './LatestNewsModal/LatestNewsModal';
import FloatingActionButton from '../../../components/FloatingActionButton';
import { getLatestNewsActions } from '../../../redux/actions';

const LatestNews = () => {
    const dispatch = useDispatch();
    const { latestNewsDataReducer } = useSelector((state) => state);

    const LatestNewsData = latestNewsDataReducer?.latestNewsData?.response || [];
    const TotalRecords = latestNewsDataReducer?.latestNewsData?.response?.length || 0;
    const LatestNewsLoading = latestNewsDataReducer?.loading;

    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [latestNewsModal, setLatestNewsModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getLatestNewsActions({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleLatestNewsModal = (type, data = null) => {
        setLatestNewsModal({ type, data, isVisible: true });
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Latest News', path: '/admin/latest-news', active: true }]} title="Latest News Management - Canadian Dream Immigration" />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg animate-fade-in hover-lift" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 gradient-animate" style={{ borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-newspaper text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Latest News Management</h4>
                                        <p className="text-muted-50 mb-0">Manage latest news and updates</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-newspaper-variant me-2"></i>
                                        {TotalRecords || 0} News Articles
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
                                            placeholder="Search news by heading..."
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
                                    onClick={() => handleLatestNewsModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Add News
                                </Button>
                            </div>

                            {LatestNewsLoading ? (
                                <Loading />
                            ) : LatestNewsData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="mb-0 modern-table">
                                        <thead>
                                            <tr>
                                                <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Image</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Heading</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Paragraph</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Created Date</th>
                                                <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {LatestNewsData.map((data, index) => (
                                                <tr key={data._id || index} className="stagger-item">
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-light text-dark rounded-pill">{(pageIndex - 1) * pageSize + index + 1}</span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <img
                                                            src={data?.image || '/default-news.png'}
                                                            alt={data?.heading}
                                                            className="rounded shadow-sm"
                                                            style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                                                        />
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="fw-bold text-dark mb-1">{data?.heading || 'No heading'}</div>
                                                        <small className="text-muted">ID: {data?._id?.slice(-6) || 'N/A'}</small>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="text-muted" style={{ maxWidth: '300px' }}>
                                                            {data?.paragraph?.length > 100
                                                                ? `${data.paragraph.substring(0, 100)}...`
                                                                : data?.paragraph || 'No content'}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <small className="text-muted">
                                                            {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}
                                                        </small>
                                                    </td>
                                                    <td className="py-3 align-middle text-center">
                                                        <div className="action-btn-group">
                                                            <button
                                                                className="action-btn edit-btn"
                                                                onClick={() => handleLatestNewsModal('Edit', data)}
                                                                title="Edit News"
                                                            >
                                                                <i className="mdi mdi-pencil"></i>
                                                            </button>
                                                            <button
                                                                className="action-btn delete-btn"
                                                                onClick={() => handleLatestNewsModal('Delete', data)}
                                                                title="Delete News"
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
                                        <i className="mdi mdi-newspaper-variant-outline" style={{ fontSize: '4rem', color: '#dee2e6' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No Latest News Found</h5>
                                    <p className="text-muted mb-4">Start by adding your first news article</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleLatestNewsModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Add First News
                                    </Button>
                                </div>
                            )}

                            {TotalRecords > pageSize && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Pagination
                                        tableProps={{
                                            pageIndex: pageIndex - 1,
                                            pageSize,
                                            pageCount: totalPages,
                                            gotoPage: (page) => setPageIndex(page + 1),
                                            canPreviousPage: pageIndex > 1,
                                            canNextPage: pageIndex < totalPages,
                                            previousPage: () => setPageIndex(pageIndex - 1),
                                            nextPage: () => setPageIndex(pageIndex + 1),
                                        }}
                                    />
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <LatestNewsModal
                latestNewsModal={latestNewsModal}
                setLatestNewsModal={setLatestNewsModal}
            />

            <FloatingActionButton
                onClick={() => handleLatestNewsModal('Add')}
                icon="mdi-newspaper-plus"
                tooltip="Add Latest News"
            />
        </>
    );
};

export default LatestNews;
