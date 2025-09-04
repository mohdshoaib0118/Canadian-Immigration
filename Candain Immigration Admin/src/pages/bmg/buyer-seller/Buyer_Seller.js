import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getBuyerSellerActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import Tab from './tabs/Tab';
import { useLocation } from 'react-router-dom';
const Buyer_Seller = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const UserData = store?.userDataReducer?.userData?.users;
    const UserLoading = store?.userDataReducer?.loading;
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();
    const TotalRecords = store?.userDataReducer?.userData?.totalRecords;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        setPageIndex(1);
    }, [location.pathname]);

    useEffect(() => {
        dispatch(
            getBuyerSellerActions({
                search: search,
                limit: pageSize,
                page: pageIndex,
                type: location.pathname === '/bmg/buyers' ? 'buyer' : 'seller',
            })
        );
    }, [dispatch, pageSize, search, pageIndex]);
    return (
        <>
            {/* <PageTitle
                breadCrumbItems={[
                    {
                        label: `${activeTab === 0 ? 'Buyers' : 'Sellers'}`,
                        path: '/bmg/users',
                        active: true,
                    },
                ]}
                title={'Users'}
            /> */}
            <Row>
                <Col lg={6} className="d-flex justify-content-start ">
                    {/* <Tab connectTab={connectTab} /> */}
                    <div className="navbar text-dark ">
                        {/* <div
                    className={`nav-item ${activeTab === 'Buyers' ? 'active' : ''}`}
                    onClick={() => handleClick('Buyers', 0)}>
                    Buyer's
                </div> */}
                        <div
                            className={`nav-item ${activeTab === 'Sellers' ? 'active' : ''}`}
                        // onClick={() => handleClick('Sellers', 1)}
                        >
                            {location?.pathname == '/bmg/sellers' ? `Seller` : 'Buyers'}
                        </div>
                    </div>
                </Col>
                <div>
                    {activeTab === 0 ? (
                        <Col xs={12}>
                            <Card
                                style={{
                                    boxShadow:
                                        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                }}>
                                <Card.Body className="text-center">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="px-3 py-1 bg-dark text-light rounded">
                                            Total {location?.pathname == '/bmg/sellers' ? `Seller` : 'Buyers'}:{' '}
                                            {TotalRecords || 0}
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

                                    {UserLoading ? (
                                        <>
                                            <Loading />
                                        </>
                                    ) : (
                                        <>
                                            {UserData && UserData.length > 0 ? (
                                                <>
                                                    <div className="table-responsive">
                                                        <table className="table table-striped bg-white">
                                                            <thead>
                                                                <tr className="" style={{ color: '#703133' }}>
                                                                    <th scope="col">
                                                                        <i className="mdi mdi-merge"></i>
                                                                    </th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Contact No</th>
                                                                    <th scope="col">Location</th>
                                                                    <th scope="col">Verified</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {UserData?.map((data, index) => (
                                                                    <tr
                                                                        key={index}
                                                                        className="text-dark fw-bold text-nowrap">
                                                                        <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                        <td className="fw-bold text-info">
                                                                            {data?.name || data?.lastName ? (
                                                                                <span>
                                                                                    {`${data?.name
                                                                                        ?.charAt(0)
                                                                                        .toUpperCase() || ''
                                                                                        }${data?.name?.slice(1) || ''} 
                                                                                      ${data?.lastName
                                                                                            ?.charAt(0)
                                                                                            .toUpperCase() || ''
                                                                                        }${data?.lastName?.slice(1) || ''
                                                                                        }`.trim()}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="fw-bold text-success">
                                                                            {data?.email ? (
                                                                                <span>{data?.email} </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="fw-bold">
                                                                            {data?.phoneNumber ? (
                                                                                <span>{data?.phoneNumber} </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="fw-bold text-primary">
                                                                            {data?.primaryAddress ? (
                                                                                <span>
                                                                                    {`${data?.primaryAddress?.address ||
                                                                                        ''
                                                                                        }, 
                                                                                      ${data?.primaryAddress
                                                                                            ?.street || ''
                                                                                        }, 
                                                                                      ${data?.primaryAddress?.city
                                                                                            ?.name || ''
                                                                                        }, 
                                                                                      ${data?.primaryAddress?.state
                                                                                            ?.name || ''
                                                                                        }, 
                                                                                      ${data?.primaryAddress?.country
                                                                                            ?.name || ''
                                                                                        }`
                                                                                        .replace(/,\s*,/g, ',') // Remove empty commas
                                                                                        .trim()}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="fw-bold">
                                                                            {data ? (
                                                                                <span
                                                                                    className={`badge ${data?.isVerified
                                                                                        ? 'bg-success'
                                                                                        : 'bg-danger'
                                                                                        } px-2 py-1`}>
                                                                                    {data?.isVerified
                                                                                        ? '✅ Verified'
                                                                                        : '❌ Not Verified'}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="badge bg-secondary px-2 py-1">
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
                                                    <code className="fs-4">No Buyer's found.</code>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <Pagination
                                        pageIndex={pageIndex}
                                        pageSize={pageSize}
                                        totalPages={totalPages}
                                        setPageIndex={setPageIndex}
                                        onChangePageSize={setPageSize}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ) : activeTab === 1 ? (
                        <Col xs={12}>
                            <Card
                                style={{
                                    boxShadow:
                                        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                }}>
                                <Card.Body className="text-center">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="px-3 py-1 bg-dark text-light rounded">
                                            Total Seller's: {UserData?.length || 0}
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

                                    {UserLoading ? (
                                        <>
                                            <Loading />
                                        </>
                                    ) : (
                                        <>
                                            {UserData && UserData?.length > 0 ? (
                                                <>
                                                    <div className="table-responsive">
                                                        <table className="table table-striped bg-white">
                                                            <thead>
                                                                <tr className="" style={{ color: '#703133' }}>
                                                                    <th scope="col">
                                                                        <i className="mdi mdi-merge"></i>
                                                                    </th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Contact No</th>
                                                                    <th scope="col">Location</th>
                                                                    <th scope="col">Verified</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {UserData?.map((data, index) => (
                                                                    <tr
                                                                        key={index}
                                                                        className="text-dark fw-bold text-nowrap">
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td className="fw-bold text-info">
                                                                            {data?.name || data?.lastName ? (
                                                                                <span>
                                                                                    {`${data?.name
                                                                                        ?.charAt(0)
                                                                                        .toUpperCase() || ''
                                                                                        }${data?.name?.slice(1) || ''} 
                                                                                          ${data?.lastName
                                                                                            ?.charAt(0)
                                                                                            .toUpperCase() || ''
                                                                                        }${data?.lastName?.slice(1) || ''
                                                                                        }`}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="fw-bold text-success">
                                                                            {data?.email ? (
                                                                                <span>{data?.email} </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="fw-bold">
                                                                            {data?.phoneNumber ? (
                                                                                <span>{data?.phoneNumber} </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="fw-bold text-primary">
                                                                            {data?.primaryAddress ? (
                                                                                <span>
                                                                                    {`${data?.primaryAddress?.address ||
                                                                                        ''
                                                                                        }, 
        ${data?.primaryAddress?.street || ''}, 
        ${data?.primaryAddress?.city?.name || ''}, 
        ${data?.primaryAddress?.state?.name || ''}, 
        ${data?.primaryAddress?.country?.name || ''}`
                                                                                        .replace(/,\s*,/g, ',') // Remove empty commas
                                                                                        .trim()}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase fw-bold">
                                                                            {data ? (
                                                                                <span
                                                                                    className={`badge ${data?.isVerified
                                                                                        ? 'bg-success'
                                                                                        : 'bg-danger'
                                                                                        } px-2 py-1`}>
                                                                                    {data?.isVerified
                                                                                        ? '✅ Verified'
                                                                                        : '❌ Not Verified'}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="badge bg-secondary px-2 py-1">
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
                                                    <code className="fs-4">No Seller's found.</code>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <Pagination
                                        pageIndex={pageIndex}
                                        pageSize={pageSize}
                                        totalPages={totalPages}
                                        setPageIndex={setPageIndex}
                                        onChangePageSize={setPageSize}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ) : null}
                </div>
            </Row>
        </>
    );
};

export default Buyer_Seller;
