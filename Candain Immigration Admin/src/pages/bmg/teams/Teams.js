import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import TeamsModal from './TeamsModal/TeamsModal';
import { getTeamsActions } from '../../../redux/actions';

const Teams = () => {
    const dispatch = useDispatch();
    const { teamsDataReducer } = useSelector((state) => state);

    const TeamsData = teamsDataReducer?.teamsData?.response || [];
    const TotalRecords = teamsDataReducer?.teamsData?.response?.length || 0;
    const TeamsLoading = teamsDataReducer?.loading;
    console.log(TeamsData, 'TeamsData');

    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [teamsModal, setTeamsModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getTeamsActions({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleTeamsModal = (type, data = null) => {
        setTeamsModal({ type, data, isVisible: true });
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Teams', path: '/admin/teams', active: true }]} title="Teams Management - Canadian Dream Immigration" />

            <Row>
                <Col xs={12}>
                    <Card className="border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-gradient border-0 py-4" style={{ background: 'linear-gradient(135deg, #006AAB 0%, #004d7a 100%)', borderRadius: '15px 15px 0 0' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                                        <i className="mdi mdi-account-group text-muted" style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-muted mb-1 fw-bold">Team Management</h4>
                                        <p className="text-muted-50 mb-0">Manage team members and staff</p>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                                    <span className="text-muted fw-semibold">
                                        <i className="mdi mdi-account-multiple me-2"></i>
                                        {TotalRecords || 0} Team Members
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
                                            placeholder="Search team members by name or position..."
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
                                    onClick={() => handleTeamsModal('Add')}
                                >
                                    <i className="mdi mdi-plus-circle me-2"></i>Add Team Member
                                </Button>
                            </div>

                            {TeamsLoading ? (
                                <Loading />
                            ) : TeamsData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="mb-0 table-hover" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                                            <tr>
                                                <th className="border-0 py-3 text-muted fw-semibold">#</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Photo</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Name</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Designation</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Created Date</th>
                                                <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                                                <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TeamsData.map((data, index) => (
                                                <tr key={data._id || index} className="border-bottom">
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-light text-dark rounded-pill">{(pageIndex - 1) * pageSize + index + 1}</span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <img
                                                            src={data?.image || '/default-avatar.png'}
                                                            alt={data?.name}
                                                            className="rounded-circle shadow-sm"
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="fw-bold text-dark mb-1">{data?.name || 'No name'}</div>
                                                        <small className="text-muted">ID: {data?._id?.slice(-6) || 'N/A'}</small>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <span className="badge bg-info text-white px-3 py-2" style={{ borderRadius: '20px' }}>
                                                            <i className="mdi mdi-briefcase me-1"></i>
                                                            {data?.designation || 'No designation'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                            {new Date(data?.createdAt).toLocaleDateString() || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 align-middle">
                                                        <span
                                                            className={`badge px-3 py-2 ${data?.status ? 'bg-success' : 'bg-warning'}`}
                                                            style={{ borderRadius: '20px' }}
                                                        >
                                                            <i className={`mdi ${data?.status ? 'mdi-check-circle' : 'mdi-pause-circle'} me-1`}></i>
                                                            {data?.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 align-middle text-center">
                                                        <div className="btn-group" role="group">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-primary"
                                                                className="rounded-start"
                                                                onClick={() => handleTeamsModal('Edit', data)}
                                                                title="Edit Team Member"
                                                            >
                                                                <i className="mdi mdi-pencil"></i>
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="rounded-end"
                                                                onClick={() => handleTeamsModal('Delete', data)}
                                                                title="Delete Team Member"
                                                            >
                                                                <i className="mdi mdi-delete"></i>
                                                            </Button>
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
                                        <i className="mdi mdi-account-group-outline text-muted" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h5 className="text-muted mb-3">No Team Members Found</h5>
                                    <p className="text-muted mb-4">Start building your team by adding members</p>
                                    <Button
                                        className="px-4 py-2"
                                        style={{ backgroundColor: '#006AAB', borderColor: '#006AAB', borderRadius: '25px' }}
                                        onClick={() => handleTeamsModal('Add')}
                                    >
                                        <i className="mdi mdi-plus-circle me-2"></i>Add First Team Member
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
            <TeamsModal
                show={teamsModal.isVisible}
                hide={() => setTeamsModal({ ...teamsModal, isVisible: false })}
                teamsData={teamsModal}
            />
        </>
    );
};

export default Teams;
