import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import BlogsModal from './BlogsModal/BlogsModal';
import FloatingActionButton from '../../../components/FloatingActionButton';
import { getBlogsActions } from '../../../redux/actions';

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogsDataReducer } = useSelector((state) => state);

    const blogsData = blogsDataReducer?.blogsData?.blogs || [];
    const totalRecords = blogsDataReducer?.blogsData?.totalRecords || 0;
    const loading = blogsDataReducer?.loading;
    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [blogsModal, setBlogsModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageSize));
    }, [totalRecords, pageSize]);

    useEffect(() => {
        dispatch(getBlogsActions({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleBlogsModal = (type, data = null) => {
        setBlogsModal({ type, data, isVisible: true });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA');
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Blogs', path: '/admin/blogs', active: true }]} title="Blog Management - Canadian Dream Immigration" />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg animate-fade-in hover-lift" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 gradient-animate" style={{ borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-post text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Blog Management</h4>
                                        <p className="text-muted-50 mb-0">Create and manage your blog posts</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-file-document-multiple me-2"></i>
                                        {totalRecords || 0} Total Posts
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
                                            placeholder="Search blogs by title or content..."
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
                                    onClick={() => handleBlogsModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Create New Blog
                                </Button>
                            </div>

                            {loading ? (
                                <Loading />
                            ) : blogsData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="mb-0 modern-table">
                                        <thead>
                                            <tr>
                                                <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Image</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Title</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Content Preview</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Date</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                                                <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogsData.map((data, index) => (
                                                <tr key={data._id || index} className="stagger-item">
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-light text-dark rounded-pill">{index + 1}</span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="position-relative">
                                                            <img
                                                                src={data?.image || '/default-blog.jpg'}
                                                                alt={data?.heading}
                                                                className="rounded shadow-sm"
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            />
                                                            {data?.image && (
                                                                <div className="position-absolute top-0 end-0 bg-success rounded-circle" style={{ width: '12px', height: '12px', transform: 'translate(25%, -25%)' }}></div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="fw-bold text-dark mb-1" style={{ maxWidth: '200px' }}>
                                                            {data?.heading || 'Untitled Blog'}
                                                        </div>
                                                        <small className="text-muted">ID: {data?._id?.slice(-6) || 'N/A'}</small>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="text-muted" style={{ maxWidth: '250px', fontSize: '0.9rem' }}>
                                                            {data?.paragraph ?
                                                                data.paragraph.replace(/<[^>]*>/g, '').slice(0, 100) + '...'
                                                                : 'No content available'
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="d-flex flex-column">
                                                            <span className="fw-semibold">{formatDate(data?.createdAt) || 'N/A'}</span>
                                                            <small className="text-muted">{new Date(data?.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</small>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <span className={`modern-badge ${data?.status ? 'status-active' : 'status-inactive'}`}>
                                                            <i className={`mdi ${data?.status ? 'mdi-eye' : 'mdi-eye-off'} me-1`}></i>
                                                            {data?.status ? 'Published' : 'Draft'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 align-middle text-center">
                                                        <div className="action-btn-group">
                                                            <button
                                                                className="action-btn view-btn"
                                                                onClick={() => handleBlogsModal('View', data)}
                                                                title="View Blog"
                                                            >
                                                                <i className="mdi mdi-eye"></i>
                                                            </button>
                                                            <button
                                                                className="action-btn edit-btn"
                                                                onClick={() => handleBlogsModal('Edit', data)}
                                                                title="Edit Blog"
                                                            >
                                                                <i className="mdi mdi-pencil"></i>
                                                            </button>
                                                            <button
                                                                className="action-btn delete-btn"
                                                                onClick={() => handleBlogsModal('Delete', data)}
                                                                title="Delete Blog"
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
                                        <i className="mdi mdi-post-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No Blog Posts Found</h5>
                                    <p className="text-muted mb-4">Start creating engaging content for your audience</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleBlogsModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Create Your First Blog
                                    </Button>
                                </div>
                            )}
                            {totalRecords > 20 && (
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
            <BlogsModal
                show={blogsModal.isVisible}
                hide={() => setBlogsModal({ ...blogsModal, isVisible: false })}
                blogsData={blogsModal}
            />

            <FloatingActionButton
                onClick={() => handleBlogsModal('Add')}
                icon="mdi-post-outline"
                tooltip="Create New Blog"
            />
        </>
    );
};

export default Blogs;
