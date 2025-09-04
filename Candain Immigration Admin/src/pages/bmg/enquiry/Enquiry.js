import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Modal, Container, Carousel } from 'react-bootstrap';
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
                        path: '/bmg/enquiry',
                        active: true,
                    },
                ]}
                title={`Enquiries`}
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
                                    Total Enquiries: {TotalRecords || 0}
                                </span>
                                <div className="d-flex">
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
                                            onClick={() => setSearch('')}
                                            style={{ cursor: 'pointer' }}></i>
                                    )}
                                </div>
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
                                                <table className="table text-start table-striped bg-white ">
                                                    <thead>
                                                        <tr className="text-nowrap">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col">Full Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Contact No</th>
                                                            <th scope="col">Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {EnquiryData?.map((data, index) => (
                                                            <tr key={index} className="text-dark fw-bold text-nowrap">
                                                                <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                <td className="text-uppercase fw-bold">
                                                                    {data?.fullName ? (
                                                                        <span>{data?.fullName} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.email ? (
                                                                        <span>{data?.email} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.phoneNumber ? (
                                                                        <span>{data?.phoneNumber} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold" style={{ cursor: 'pointer' }}>
                                                                    <OverlayTrigger
                                                                        placement="left"
                                                                        overlay={
                                                                            <Tooltip id="overlay-example">
                                                                                {data?.message}
                                                                            </Tooltip>
                                                                        }>
                                                                        <b>
                                                                            {data?.message ? (
                                                                                <span>
                                                                                    {data?.message.slice(0, 20)}{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </b>
                                                                    </OverlayTrigger>
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
                                            <code className="fs-4">No Enquiries found. </code>
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
