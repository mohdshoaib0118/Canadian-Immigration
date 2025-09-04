import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getNotificationActions, getNotificationByAdminActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import NotificationModal from './notificationModal/NotificationModal';
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
                breadCrumbItems={[{ label: 'Notification', path: '/bmg/notification', active: true }]}
                title="Notification Management"
            />

            <Row>
                <Col xs={12}>
                    <Card
                        style={{
                            boxShadow:
                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                        }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="px-3 py-1 bg-dark text-light rounded">
                                    Total Notification's: {TotalRecords || 0}
                                </span>
                                <div className="d-flex">
                                    {/* <input
                                        type="text"
                                        className="form-control w-auto me-2"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <i
                                            className="mdi mdi-backspace-outline text-danger fs-3 me-2"
                                            onClick={() => setSearch('')}
                                            style={{ cursor: 'pointer' }}></i>
                                    )} */}
                                    <Button variant="success" onClick={() => handleNotificationModal('Add')}>
                                        <i className="mdi mdi-plus-circle"></i> Add
                                    </Button>
                                </div>
                            </div>

                            {NotificationLoading ? (
                                <Loading />
                            ) : NotificationData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table bordered hover className="bg-white text-start">
                                        <thead>
                                            <tr className="text-nowrap text-secondary">
                                                <th>
                                                    <i className="mdi mdi-merge"></i>
                                                </th>
                                                <th>Message</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotificationData.map((data, index) => (
                                                <tr key={data._id || index}>
                                                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                                                    <td className="p-1 m-0">
                                                        {' '}
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: data?.message || 'N/A',
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="text-capitalize">{data?.type}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${data?.status ? 'bg-success' : 'bg-danger'
                                                                } px-2 py-1`}>
                                                            {data?.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <i className="mdi mdi-square-edit-outline fs-4 text-primary"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleNotificationModal('Edit', data)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <code className="fs-5 text-muted">
                                        No Notification's found. Add some to display.
                                    </code>
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
        </>
    );
};

export default Notification;
