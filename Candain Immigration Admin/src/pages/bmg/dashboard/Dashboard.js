import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { getDashboardActions, getRecentRegistrationsForDashboardActions } from '../../../redux/actions';
import { FaUsers, FaLayerGroup, FaTags, FaUserShield, FaGavel } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const store = useSelector((state) => state);
    const dashboardData = store?.dashboardDataReducer?.dashboardData;
    const getRecentRegistrationsForDashboard = store?.getRecentRegistrationsForDashboardReducer;
    const dashboardLoading = store?.dashboardDataReducer?.loading;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        dispatch(getDashboardActions());
        dispatch(getRecentRegistrationsForDashboardActions({ page, limit }));
    }, [dispatch, page, limit]);

    const dashboardItems = [
        { title: 'Total Users', value: dashboardData?.totalUser || 0, icon: <FaUsers />, color: 'primary-subtle', redirect: '/bmg/users' },
        { title: 'Total Categories', value: dashboardData?.totalCategory || 0, icon: <FaLayerGroup />, color: 'success-subtle', redirect: '/bmg/categories' },
        { title: 'Total Sub-Categories', value: dashboardData?.totalSubCategory || 0, icon: <FaTags />, color: 'info-subtle', redirect: '/bmg/subcategories' },
        { title: 'Total Admins', value: dashboardData?.totalAdmin || 0, icon: <FaUserShield />, color: 'warning-subtle', redirect: '/bmg/admins' },
        { title: 'Auction', value: dashboardData?.totalLiveAuction || 0, icon: <FaGavel />, color: 'danger-subtle', redirect: '/bmg/auctions' },
        { title: 'Sales', value: dashboardData?.totalUpComingAuction || 0, icon: <AiOutlineLineChart />, color: 'secondary-subtle', redirect: '/bmg/sales' },
    ];

    return (
        <>
            <style>
                {`
          .dashboard-card {
            transition: all 0.3s ease;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            border: none;
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
          }

          .card-icon {
            opacity: 0.3;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3.5rem;
          }

          .table-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 1.5rem;
          }

          .table-hover tr:hover {
            background-color: #f8f9fa;
            transition: background-color 0.2s ease;
          }

          .table-header {
            background: #f1f3f5;
            color: #495057;
          }

          .role-badge {
            font-size: 0.85rem;
            padding: 0.4em 0.8em;
          }

          .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            gap: 0.5rem;
          }

          .pagination-container .page-item .page-link {
            border-radius: 8px;
            transition: all 0.2s ease;
            color: #495057;
            border: 1px solid #dee2e6;
          }

          .pagination-container .page-item.active .page-link {
            background-color: #0d6efd;
            border-color: #0d6efd;
            color: white;
          }

          .pagination-container .page-item .page-link:hover {
            background-color: #e9ecef;
            border-color: #dee2e6;
          }

          .redirect-btn {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .redirect-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          @media (max-width: 768px) {
            .card-icon {
              font-size: 2.5rem;
            }

            .dashboard-card h2 {
              font-size: 1.5rem;
            }

            .table-container {
              padding: 1rem;
            }

            .redirect-btn {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}
            </style>

            <PageTitle
                breadCrumbItems={[
                    { label: 'BMG Dashboard', path: '/bmg/dashboard' },
                    { label: 'Dashboard', path: '/bmg/dashboard', active: true },
                ]}
                title={'Dashboard'}
            />

            {dashboardLoading ? (
                <Loading />
            ) : (
                <>
                    <Row className="g-4 mb-4">
                        {dashboardItems?.map((item, index) => (
                            <Col key={index} md={6} lg={4}>
                                <Card className={`shadow border-0 bg-${item.color} text-dark`}>
                                    <Card.Body className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-semibold">{item.title}</h6>
                                            <h2 className="fw-bold">{item.value}</h2>
                                        </div>
                                        <div className="fs-1">{item.icon}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="table-container">
                        <Table hover className="text-center align-middle mb-0">
                            <thead className="table-header">
                                <tr className="text-nowrap">
                                    <th className="py-3">#</th>
                                    <th className="text-start">Name</th>
                                    <th className="text-start">Email</th>
                                    <th className="text-start">Phone Number</th>
                                    <th className="text-start">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getRecentRegistrationsForDashboard?.dashboardData?.allUsers?.map((data, index) => (
                                    <tr
                                        style={{ cursor: 'pointer' }}
                                        key={data._id || index}
                                    // onClick={() => navigate(`/bmg/user/${data._id}`)}
                                    >
                                        <td className="fw-medium">{(page - 1) * limit + index + 1}</td>
                                        <td className="text-start">
                                            {data?.name ? `${data?.name} ${data?.lastName || ''}` : <span className="text-muted">N/A</span>}
                                        </td>
                                        <td className="text-start">
                                            {data?.email ? (
                                                <a href={`mailto:${data.email}`} className="text-decoration-none">
                                                    {data.email}
                                                </a>
                                            ) : (
                                                <span className="text-muted">N/A</span>
                                            )}
                                        </td>
                                        <td className="text-start">
                                            {data?.phoneNumber ? (
                                                <a href={`tel:${data.phoneNumber}`} className="text-decoration-none">
                                                    {data.phoneNumber}
                                                </a>
                                            ) : (
                                                <span className="text-muted">N/A</span>
                                            )}
                                        </td>
                                        <td className="text-start">
                                            <Badge
                                                className="role-badge"
                                                bg={data?.role === 'admin' ? 'primary' : data?.role === 'user' ? 'success' : 'secondary'}
                                            >
                                                {data?.role?.charAt(0).toUpperCase() + data?.role?.slice(1)}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {/* <div className="pagination-container">
                            <Pagination
                                pageIndex={page}
                                pageSize={limit}
                                totalPages={getRecentRegistrationsForDashboard?.dashboardData?.totalPages || 1}
                                setPageIndex={setPage}
                                onChangePageSize={setLimit}
                            />
                        </div> */}
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard;
