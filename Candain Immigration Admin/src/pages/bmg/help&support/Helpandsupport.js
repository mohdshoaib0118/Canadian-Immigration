import { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { getTicketsAction } from '../../../redux/actions';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import { getUserFromSession } from '../../../helpers/api/apiCore';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/Functions';
const HelpAndSupport = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const SupportData = store?.getTicketsReducer?.supportData?.response;
    const createStatus = store?.createTicketReducer?.supportData?.status;
    const SupportLoading = store?.getTicketsReducer?.loading;
    const user = getUserFromSession();

    const TotalRecords = store?.getTicketsReducer?.supportData?.totalRecords;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        if (createStatus === 200) {
            dispatch(getTicketsAction({ limit: pageSize, page: pageIndex }));
        }
        dispatch(getTicketsAction({ limit: pageSize, page: pageIndex }));
    }, [dispatch, createStatus, pageIndex, pageSize, search]);

    const getStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'secondary';
            case 'resolved':
                return 'success';
            case 'in progress':
                return 'warning';
            case 'not feasible':
                return 'danger';
            default:
                return 'info';
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Settings', path: '/bmg/help-support' },
                    {
                        label: 'Help & Support',
                        path: '/bmg/help-support',
                        active: true,
                    },
                ]}
                title={'Help & Support'}
            />
            <Row>
                <Col xs={12}>
                    <Card
                        style={{
                            boxShadow:
                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                        }}>
                        <Card.Body className="text-center">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="px-3 py-1 bg-dark text-light rounded">
                                    Total Tickets: {TotalRecords || 0}
                                </span>
                                {/* <div className="d-flex">
                                    <input
                                        type="text"
                                        className="form-control w-auto me-1"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <i
                                            className="mdi mdi-backspace-outline text-danger fs-3"
                                            onClick={() => setSearch("")}
                                            style={{ cursor: "pointer" }}
                                        ></i>
                                    )}
                                </div> */}
                            </div>

                            {SupportLoading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {SupportData && SupportData?.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table text-start table-striped bg-white ">
                                                    <thead>
                                                        <tr className="text-nowrap">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col">Ticket #</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Issue Type</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Created On</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {SupportData?.map((data, index) => (
                                                            <tr key={index} className="text-dark fw-bold text-nowrap">
                                                                <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                <td className="text-uppercase fw-bold">
                                                                    {data?.ticketId ? (
                                                                        <OverlayTrigger
                                                                            placement="left"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example">
                                                                                    View Detail's
                                                                                </Tooltip>
                                                                            }>
                                                                            <Link
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    // color: 'crimson',
                                                                                }}
                                                                                // onMouseOver={(e) =>
                                                                                //     (e.target.style.color =
                                                                                //         'rgb(10 207 151)')
                                                                                // }
                                                                                // onMouseOut={(e) =>
                                                                                //     (e.target.style.color = 'crimson')
                                                                                // }
                                                                                to={`/bmg/ticket/${data?._id}`}
                                                                                state={data}>
                                                                                {data?.ticketId}{' '}
                                                                            </Link>
                                                                        </OverlayTrigger>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.user?.email ? (
                                                                        <span>{data?.user?.email} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold " style={{ cursor: 'pointer' }}>
                                                                    {data?.issueType ? (
                                                                        <span>{data?.issueType} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    <Badge
                                                                        pill
                                                                        bg={getStatusBadgeColor(data?.status)}
                                                                        className="px-3 py-2 text-capitalize"
                                                                        style={{ fontSize: '0.75rem' }}>
                                                                        {data?.status || 'N/A'}
                                                                    </Badge>
                                                                </td>
                                                                <td className="fw-bold " style={{ cursor: 'pointer' }}>
                                                                    {data?.createdAt ? (
                                                                        <span>{formatDate(data?.createdAt)} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            className="text-center d-flex align-items-center justify-content-center"
                                            style={{ height: '30vh' }}>
                                            <code className="fs-4">No Tickets found.</code>
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

export default HelpAndSupport;
