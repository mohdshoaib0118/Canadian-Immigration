import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getNotificationActions, getNotificationByAdminActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import NotificationModal from './notificationModal/NotificationModal';
import FloatingActionButton from '../../../components/FloatingActionButton';
const Notification = () => {
    const dispatch = useDispatch();
    const { getNotificationByAdminReducer } = useSelector((state) => state);
    const NotificationData = getNotificationByAdminReducer?.notificationData?.data || [];
    const TotalRecords = getNotificationByAdminReducer?.notificationData?.totalRecords || 0;
    const NotificationLoading = getNotificationByAdminReducer?.loading;
    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [nofificationModal, setNotificationModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);
    const [apiCall, setApiCall] = useState(false);
    // useEffect(() => {
    //     // dispatch(getNotificationActions({ search, limit: pageSize, page: pageIndex, type: 'both' }));
    //     dispatch(getNotificationByAdminActions({ search }));
    // }, [dispatch, search, pageIndex, pageSize, apiCall]);

    // Calculate total pages
    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    // API call function with proper parameter encoding
    const fetchNotifications = useCallback(() => {
        const params = {
            search: encodeURIComponent(search),
            limit: pageSize,
            page: pageIndex
        };

        dispatch(getNotificationByAdminActions(params));
    }, [search, pageSize, pageIndex, dispatch]);

    // Debounced API call effect
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchNotifications();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [fetchNotifications]);

    // Force refresh when apiCall state changes
    useEffect(() => {
        if (apiCall) {
            fetchNotifications();
            setApiCall(false);
        }
    }, [apiCall, fetchNotifications]);

    const handleNotificationModal = (type, data = null) => {
        setNotificationModal({ type, data, isVisible: true });
    };
    // useEffect(() => {
    //     if (!search.trim()) return;

    //     const delayDebounce = setTimeout(() => {
    //         // ✅ Call your API or search logic here
    //     }, 200); // wait 200ms after user stops typing

    //     return () => clearTimeout(delayDebounce);
    // }, [search]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: 'Notification', path: '/admin/notification', active: true }]}
                title="Notification Management"
            />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg animate-fade-in hover-lift" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 gradient-animate" style={{ borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-bell text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Notification Management</h4>
                                        <p className="text-muted-50 mb-0">Manage system notifications and alerts</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-message-alert me-2"></i>
                                        {TotalRecords || 0} Notifications
                                    </span>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="py-0">
                            <div className="d-flex justify-content-end align-items-center mb-4">
                                <Button
                                    className="px-4 py-2 fw-semibold btn-animated hover-glow"
                                    style={{
                                        backgroundColor: '#006AAB',
                                        borderColor: '#006AAB',
                                        borderRadius: '25px',
                                        boxShadow: '0 4px 15px rgba(0, 106, 171, 0.3)'
                                    }}
                                    onClick={() => handleNotificationModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Create Notification
                                </Button>
                            </div>

                            {NotificationLoading ? (
                                <Loading />
                            ) : NotificationData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="mb-0 modern-table">
                                        <thead>
                                            <tr>
                                                <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Message</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Type</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                                                <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotificationData.map((data, index) => (
                                                <tr key={data._id || index} className="stagger-item">
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-light text-dark rounded-pill">{(pageIndex - 1) * pageSize + index + 1}</span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="text-dark" style={{ maxWidth: '400px' }}>
                                                            <span dangerouslySetInnerHTML={{ __html: data?.message || 'No message' }} />
                                                        </div>
                                                        <small className="text-muted">ID: {data?._id?.slice(-6) || 'N/A'}</small>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-info text-muted px-3 py-2 text-capitalize" style={{ borderRadius: '20px' }}>
                                                            <i className="mdi mdi-tag me-1"></i>
                                                            {data?.type || 'General'}
                                                        </span>
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
                                                                onClick={() => handleNotificationModal('Edit', data)}
                                                                title="Edit Notification"
                                                            >
                                                                <i className="mdi mdi-pencil"></i>
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
                                        <i className="mdi mdi-bell-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No Notifications Found</h5>
                                    <p className="text-muted mb-4">Create notifications to keep users informed</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleNotificationModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Create First Notification
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
            <NotificationModal
                setApiCall={() => setApiCall((prev) => !prev)}
                show={nofificationModal.isVisible}
                hide={() => setNotificationModal({ ...nofificationModal, isVisible: false })}
                notificationData={nofificationModal}
            />

            <FloatingActionButton
                onClick={() => handleNotificationModal('Add')}
                icon="mdi-bell-plus"
                tooltip="Create Notification"
            />
        </>
    );
};

export default Notification;
