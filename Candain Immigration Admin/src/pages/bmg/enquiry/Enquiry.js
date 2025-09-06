import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Modal, Container, Carousel, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getEnquiryActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
const Enquiry = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const EnquiryData = store?.enquiryDataReducer?.enquiryData?.contacts;
    const EnquiryLoading = store?.enquiryDataReducer?.loading;
    const TotalRecords = store?.enquiryDataReducer?.enquiryData?.totalRecords;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);
    useEffect(() => {
        dispatch(getEnquiryActions({ search: search, limit: pageSize, page: pageIndex }));
    }, [dispatch, pageIndex, pageSize, search]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: `Enquiries`,
                        path: '/admin/enquiry',
                        active: true,
                    },
                ]}
                title={`Enquiries`}
            />
            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg animate-fade-in hover-lift" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 gradient-animate" style={{ borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-email text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Enquiry Management</h4>
                                        <p className="text-muted-50 mb-0">View and manage customer enquiries</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-message-text me-2"></i>
                                        {TotalRecords || 0} Enquiries
                                    </span>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="py-0">
                            <div className="d-flex justify-content-start align-items-center mb-4">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control ps-5"
                                        placeholder="Search enquiries by name, email or message..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{ borderRadius: '25px', width: '350px', border: '2px solid #e9ecef' }}
                                    />
                                    <i className="mdi mdi-magnify position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}></i>
                                </div>
                                {search && (
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="rounded-circle ms-3"
                                        onClick={() => setSearch('')}
                                        style={{ width: '35px', height: '35px' }}
                                    >
                                        <i className="mdi mdi-close"></i>
                                    </Button>
                                )}
                            </div>

                            {EnquiryLoading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {EnquiryData && EnquiryData?.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table mb-0 modern-table">
                                                    <thead>
                                                        <tr>
                                                            <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                            <th className="border-0 py-3 text-muted fw-semibold">Full Name</th>
                                                            <th className="border-0 py-3 text-muted fw-semibold">Email</th>
                                                            <th className="border-0 py-3 text-muted fw-semibold">Contact No</th>
                                                            <th className="border-0 py-3 text-muted fw-semibold">Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {EnquiryData?.map((data, index) => (
                                                            <tr key={index} className="stagger-item">
                                                                <td className="py-3 align-middle">
                                                                    <span className="badge bg-light text-dark rounded-pill">{(pageIndex - 1) * pageSize + index + 1}</span>
                                                                </td>
                                                                <td className="py-3 align-middle">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                                            <i className="mdi mdi-account text-muted"></i>
                                                                        </div>
                                                                        <div>
                                                                            <div className="fw-bold text-dark">{data?.fullName || 'N/A'}</div>
                                                                            <small className="text-muted">Customer</small>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 align-middle">
                                                                    <div className="text-dark">{data?.email || 'N/A'}</div>
                                                                </td>
                                                                <td className="py-3 align-middle">
                                                                    <div className="text-dark">{data?.phoneNumber || 'N/A'}</div>
                                                                </td>
                                                                <td className="py-3 align-middle">
                                                                    <OverlayTrigger
                                                                        placement="left"
                                                                        overlay={
                                                                            <Tooltip id={`tooltip-${index}`}>
                                                                                {data?.message || 'No message'}
                                                                            </Tooltip>
                                                                        }>
                                                                        <div className="text-muted" style={{ maxWidth: '200px', cursor: 'pointer' }}>
                                                                            {data?.message ? data.message.slice(0, 50) + '...' : 'No message'}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-5">
                                            <div className="mb-4">
                                                <i className="mdi mdi-email-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                            </div>
                                            <h5 className="text-muted mb-3">No Enquiries Found</h5>
                                            <p className="text-muted mb-4">Customer enquiries will appear here when submitted</p>
                                        </div>
                                    )}
                                </>
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
        </>
    );
};

export default Enquiry;
