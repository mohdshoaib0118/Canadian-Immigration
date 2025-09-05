import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import ServicesModal from './ServicesModal/ServicesModal';

const Services = () => {

    const [servicesData, setServicesData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [servicesModal, setServicesModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageSize));
    }, [totalRecords, pageSize]);

    useEffect(() => {
        // Fetch services data
        console.log('Fetching services:', { search, limit: pageSize, page: pageIndex });
    }, [search, pageIndex, pageSize]);

    const handleServicesModal = (type, data = null) => {
        setServicesModal({ type, data, isVisible: true });
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Services', path: '/admin/services', active: true }]} title="Services Management - Canadian Dream Immigration" />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 py-4" style={{ background: 'linear-gradient(135deg, #006AAB 0%, #004d7a 100%)', borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-briefcase text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Services Management</h4>
                                        <p className="text-muted-50 mb-0">Manage immigration services and offerings</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-cog me-2"></i>
                                        {totalRecords || 0} Total Services
                                    </span>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control ps-5"
                                            placeholder="Search services by title or description..."
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
                                    className="px-4 py-2 fw-semibold"
                                    style={{
                                        backgroundColor: '#006AAB',
                                        borderColor: '#006AAB',
                                        borderRadius: '25px',
                                        boxShadow: '0 4px 15px rgba(0, 106, 171, 0.3)'
                                    }}
                                    onClick={() => handleServicesModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Add New Service
                                </Button>
                            </div>

                            {loading ? (
                                <Loading />
                            ) : servicesData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table bordered hover className="bg-white text-center">
                                        <thead className="text-start">
                                            <tr className="text-nowrap text-secondary">
                                                <th>
                                                    <i className="mdi mdi-merge"></i>
                                                </th>
                                                <th>Icon</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-stat">
                                            {servicesData.map((data, index) => (
                                                <tr key={data._id || index}>
                                                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                                                    <td>
                                                        <i className={`${data?.icon || 'mdi mdi-briefcase'} fs-3 text-primary`}></i>
                                                    </td>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>{data?.title}</Tooltip>
                                                        }>
                                                        <td>{data?.title?.slice(0, 30) + '...' || 'N/A'}</td>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-desc-${index}`}>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: data?.description || 'N/A',
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        }>
                                                        <td>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: data?.description?.slice(0, 50) + '...' || 'N/A',
                                                                }}
                                                            />
                                                        </td>
                                                    </OverlayTrigger>
                                                    <td>{data?.price ? `$${data.price}` : 'Contact Us'}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${data?.status ? 'bg-success' : 'bg-danger'
                                                                } px-2 py-1`}>
                                                            {data?.status ? '✅ Active' : '❌ Inactive'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <i
                                                            className="mdi mdi-square-edit-outline fs-4 text-primary me-2"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleServicesModal('Edit', data)}></i>
                                                        <i
                                                            className="mdi mdi-delete-outline fs-4 text-danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleServicesModal('Delete', data)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="mb-4">
                                        <i className="mdi mdi-briefcase-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No Services Found</h5>
                                    <p className="text-muted mb-4">Start adding your immigration services</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleServicesModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Add Your First Service
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
            <ServicesModal
                show={servicesModal.isVisible}
                hide={() => setServicesModal({ ...servicesModal, isVisible: false })}
                servicesData={servicesModal}
            />
        </>
    );
};

export default Services;
