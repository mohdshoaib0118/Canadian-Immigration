import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { getCitiesByStateAction, updateCityAction, resetLocationAction } from '../../../redux/actions';
import { Loading } from '../../../helpers/loader/Loading';
import Pagination from '../../../helpers/Pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';
const Cities = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const CitiesData = store?.getCitiesByIdReducer?.locationData?.cities;
    const CitiesLoading = store?.getCitiesByIdReducer?.loading || store?.updateCityReducer?.loading;
    const updateStatus = store?.updateCityReducer?.locationData?.status;
    const TotalRecords = store?.getCitiesByIdReducer?.locationData?.totalCities || 0;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getCitiesByStateAction({ id, limit: pageSize, page: pageIndex }));
    }, [dispatch, id, pageSize, pageIndex, search]);

    useEffect(() => {
        if (updateStatus && updateStatus === 201) {
            dispatch(getCitiesByStateAction({ id, limit: pageSize, page: pageIndex }));
            dispatch(resetLocationAction());
        }
    }, [updateStatus, dispatch]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'States', path: `/bmg/cities/${id}` },
                    {
                        label: 'Cities',
                        path: `/bmg/cities/${id}`,
                        active: true,
                    },
                ]}
                title={'Cities'}
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
                                <span><button className='rounded-pill px-1 bg-dark text-light' onClick={() => navigate(-1)}><i class="mdi mdi-arrow-left"></i> Back</button></span>
                                <span className="px-3 py-1 bg-dark text-light rounded">
                                    Total Cities: {TotalRecords || 0}
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

                            {CitiesLoading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {CitiesData && CitiesData?.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table text-start table-striped bg-white ">
                                                    <thead>
                                                        <tr className="text-nowrap">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col">City</th>
                                                            <th scope="col">Country Code</th>
                                                            <th scope="col">Country ID #</th>
                                                            <th scope="col">State Code</th>
                                                            <th scope="col">State ID #</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {CitiesData?.map((data, index) => (
                                                            <tr key={index} className="text-dark fw-bold text-nowrap">
                                                                <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                <td className="fw-bold ">
                                                                    {data?.name ? (
                                                                        <span>{data?.name} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.country_code ? (
                                                                        <span>{data?.country_code} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.country_id ? (
                                                                        <span>{data?.country_id} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.state_code ? (
                                                                        <span>{data?.state_code} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.id ? (
                                                                        <span>{data?.id} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            role="switch"
                                                                            id={`status-toggle-${data._id}`}
                                                                            checked={data.status}
                                                                            onChange={() => {
                                                                                dispatch(updateCityAction({
                                                                                    id: data?._id,
                                                                                    status: !data?.status,
                                                                                }));
                                                                            }}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`status-toggle-${data._id}`}>
                                                                            {data.status ? 'Active' : 'Inactive'}
                                                                        </label>
                                                                    </div>
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
                                            <code className="fs-4">No Cities were found.</code>
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

export default Cities;
