import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Modal, Container, Carousel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getLiveBidDataActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import SellerDetailsModal from './SellerDetailsModal/SellerDetailsModal';
import { BsInfoCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa6';

const LiveBidMonitoring = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const LiveBidData = store?.getLiveBidDataReducer?.leadData?.result;
    const SoldAuctionLoading = store?.getLiveBidDataReducer?.loading;
    const TotalRecords = store?.getLiveBidDataReducer?.leadData?.totalRecords;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(
            getLiveBidDataActions({
                pageSize,
                pageIndex,
            })
        );
    }, [dispatch, pageIndex, pageSize, search]);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        if (product) {
            setSelectedProduct(product);
            setShowModal(true);
        }
    };

    // Format keys: Remove underscores, convert camelCase to words
    const formatKey = (key) => {
        return key
            .replace(/_/g, ' ') // Replace underscores
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Convert camelCase
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'short', // "Thu"
            month: 'short', // "Feb"
            day: '2-digit', // "27"
            year: 'numeric', // "2025"
            hour: '2-digit', // "12"
            minute: '2-digit', // "00"
            hour12: true, // "AM/PM"
        });
    };
    const isValidISODate = (value) => {
        if (typeof value !== 'string') return false; // Ensure it's a string before calling includes()

        const date = new Date(value);
        return !isNaN(date.getTime()) && value.includes('T');
    };
    const [sellerDetailModal, setSellerDetailModal] = useState(false);
    const [sellerDetails, setSellerDetails] = useState('');
    const readableDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const navigate = useNavigate();
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: 'Live Bid Monitoring',
                        path: '/bmg/live-bids',
                        active: true,
                    },
                ]}
                title={`Live Bid Monitoring`}
            />
            <SellerDetailsModal
                open={sellerDetailModal}
                close={() => setSellerDetailModal(false)}
                sellerDetails={sellerDetails}
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
                                    Total Bid's: {TotalRecords || 0}
                                </span>
                                <div className="d-flex">
                                    {/* <input
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
                                    )} */}
                                </div>
                            </div>

                            {SoldAuctionLoading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {LiveBidData && LiveBidData?.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table table-hover bg-white">
                                                    <thead>
                                                        <tr className="text-nowrap text-dark">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Seller Name
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Product Name
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Start Date
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                End Date
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Start Bid Price
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Highest Bid
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                No. of Bids
                                                            </th>
                                                            <th scope="col">Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {LiveBidData?.map((data, index) => (
                                                            <tr
                                                                key={data._id || index} // style={{
                                                                //     cursor: 'pointer',
                                                                // }}
                                                                className="text-nowrap">
                                                                <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                                                                <td className="text-capitalize text-start fw-bold">
                                                                    <OverlayTrigger
                                                                        placement="left"
                                                                        overlay={
                                                                            <Tooltip id="overlay-example">
                                                                                View Detail's
                                                                            </Tooltip>
                                                                        }>
                                                                        <b>
                                                                            <span
                                                                                onClick={() => {
                                                                                    setSellerDetailModal(true);
                                                                                    setSellerDetails(
                                                                                        data?.product?.userId
                                                                                    );
                                                                                }}
                                                                                className=" text-start"
                                                                                style={{ cursor: 'pointer', color: 'green', textDecoration: 'underline' }}>
                                                                                {data?.product?.userId?.name}
                                                                            </span>
                                                                        </b>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td
                                                                    className="text-uppercase text-start fw-bold"
                                                                // style={{ cursor: 'pointer' }}
                                                                >
                                                                    <b title={data?.product?.Product_Name || 'N/A'}>
                                                                        {data?.product?.Product_Name ? (
                                                                            <span>
                                                                                {data?.product?.Product_Name.length > 20
                                                                                    ? data?.product?.Product_Name.substring(
                                                                                        0,
                                                                                        20
                                                                                    ) + '...'
                                                                                    : data?.product?.Product_Name}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="d-flex justify-content-center text-dark">
                                                                                N/A
                                                                            </span>
                                                                        )}
                                                                    </b>

                                                                    {/* </OverlayTrigger> */}
                                                                </td>

                                                                <td className="text-uppercase text-start fw-bold">
                                                                    {data?.product?.startBidDateTime ? (
                                                                        <span>
                                                                            {readableDate(
                                                                                data?.product?.startBidDateTime
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center text-dark">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="text-uppercase text-start fw-bold">
                                                                    {data?.product?.endBidDateTime ? (
                                                                        <span>
                                                                            {readableDate(
                                                                                data?.product?.endBidDateTime
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center text-dark">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="fw-bold text-start">
                                                                    {data?.product ? (
                                                                        <span className="fw-semibold text-dark">
                                                                            {data?.product?.Start_Bid_Price}
                                                                        </span>
                                                                    ) : (
                                                                        <span>N/A</span>
                                                                    )}
                                                                </td>

                                                                <td className="fw-bold text-start">
                                                                    {data?.product?.highBidingAmount ? (
                                                                        <span>{data?.product?.highBidingAmount}</span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center text-dark">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="fw-bold text-start">
                                                                    {data?.product?.totalBidders ? (
                                                                        <span>{data?.product?.totalBidders}</span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center text-dark">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold text-start">
                                                                    <FaRegEye
                                                                        onClick={() => {
                                                                            navigate(
                                                                                `/bmg/live-bids/live-monitoring/${data?.product?._id}`,
                                                                                {
                                                                                    state: { product: data?.product },
                                                                                }
                                                                            );
                                                                        }}
                                                                        size={18}
                                                                        cursor={'pointer'}
                                                                        className="me-1"
                                                                        style={{
                                                                            color: 'green', // optional: makes it look like a link/info icon
                                                                        }}
                                                                    />

                                                                    <BsInfoCircle
                                                                        size={17}
                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/bmg/items/${data?.product?._id}`,
                                                                                {
                                                                                    state: { product: data?.product },
                                                                                }
                                                                            )
                                                                        }
                                                                        style={{
                                                                            // marginRight: '5px',
                                                                            cursor: 'pointer',
                                                                            color: 'green', // optional: makes it look like a link/info icon
                                                                        }}
                                                                    />
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
                                            <code className="fs-4">No Bid's found.</code>
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

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header className="px-2 py-1 text-light" style={{ backgroundColor: '#008003' }}>
                    <Modal.Title className="fw-semibold">Product Details</Modal.Title>
                    <i
                        className="mdi mdi-close fs-3"
                        onClick={() => setShowModal(false)}
                        style={{ cursor: 'pointer' }}></i>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <Container>
                            {/* Image Section */}
                            {selectedProduct.image?.length > 0 && (
                                <Carousel interval={5000} className="mb-3 shadow-sm rounded">
                                    {selectedProduct.image.map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={img}
                                                alt={`Slide ${index}`}
                                                className="d-block w-100 rounded"
                                                style={{
                                                    maxHeight: '400px',
                                                    objectFit: 'contain',
                                                    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                                                }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}

                            <Row className="border rounded p-3 bg-light">
                                {Object.entries(selectedProduct)
                                    .filter(
                                        ([key, value]) =>
                                            !['_id', 'createdAt', 'updatedAt', 'image', 'status'].includes(key) && // Remove unnecessary fields
                                            !(typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value)) && // Remove any 24-char hex ID
                                            value // Ensure it's not empty
                                    )
                                    .map(([key, value]) => {
                                        let displayValue;

                                        if (Array.isArray(value)) {
                                            displayValue = (
                                                <ul className="mb-0">
                                                    {value
                                                        .filter(
                                                            (item) =>
                                                                !(
                                                                    typeof item === 'string' &&
                                                                    /^[0-9a-fA-F]{24}$/.test(item)
                                                                )
                                                        ) // Remove ID-like values inside arrays
                                                        .map((item, index) => (
                                                            <li key={index}>
                                                                {typeof item === 'object'
                                                                    ? JSON.stringify(item, null, 2)
                                                                    : item}
                                                            </li>
                                                        ))}
                                                </ul>
                                            );
                                        } else if (typeof value === 'object' && value !== null) {
                                            displayValue = (
                                                <ul className="mb-0">
                                                    {Object.entries(value)
                                                        .filter(
                                                            ([subKey, subValue]) =>
                                                                ![
                                                                    '_id',
                                                                    'createdAt',
                                                                    'updatedAt',
                                                                    'status',
                                                                    'image',
                                                                ].includes(subKey) &&
                                                                !(
                                                                    typeof subValue === 'string' &&
                                                                    /^[0-9a-fA-F]{24}$/.test(subValue)
                                                                )
                                                        )
                                                        .map(([subKey, subValue]) => (
                                                            <li key={subKey}>
                                                                <strong>{formatKey(subKey)}:</strong>{' '}
                                                                {isValidISODate(subValue)
                                                                    ? formatDate(subValue)
                                                                    : subValue}
                                                            </li>
                                                        ))}
                                                </ul>
                                            );
                                        } else if (typeof value === 'string' && isValidISODate(value)) {
                                            displayValue = formatDate(value);
                                        } else {
                                            displayValue = value;
                                        }

                                        return (
                                            <Col md={6} key={key} className="mb-3">
                                                <strong className="text-muted">{formatKey(key)}</strong>
                                                <div className="fw-bold">{displayValue}</div>
                                            </Col>
                                        );
                                    })}
                            </Row>
                            {/* Product Details */}
                            {/* <Row className="border rounded p-3 bg-light">
                                {Object.entries(selectedProduct)
                                    .filter(([key, value]) =>
                                        !["_id", "createdAt", "updatedAt", "image"].includes(key) &&
                                        !/^[0-9a-fA-F]{24}$/.test(value) && value // Remove ID fields & empty values
                                    )
                                    .map(([key, value]) => (
                                        <Col md={6} key={key} className="mb-3">
                                            <strong className="text-muted">{formatKey(key)}</strong>
                                            <div className="fw-bold">{typeof value === "object" ? JSON.stringify(value) : value}</div>
                                        </Col>
                                    ))}
                            </Row> */}
                        </Container>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LiveBidMonitoring;
