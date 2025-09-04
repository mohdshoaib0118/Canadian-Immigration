import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Modal, Container, Carousel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getSoldProductDataActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import { useNavigate } from 'react-router-dom';
const SoldProducts = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const SoldAuctionData = store?.soldProductDataReducer?.leadData?.data;
    const SoldAuctionLoading = store?.soldProductDataReducer?.loading;
    const TotalRecords = store?.soldProductDataReducer?.leadData?.pagination?.totalRecords || 0;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));
    const navigate = useNavigate();

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getSoldProductDataActions({ search: search, limit: pageSize, page: pageIndex, soldStatus: true }));
    }, [dispatch, pageIndex, pageSize, search]);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        if (product) {
            setSelectedProduct(product);
            setShowModal(true);
        }
    };

    // Function to format keys into human-readable format
    const formatKey = (key) => {
        switch (key) {
            case 'categoryId':
                return 'Category Name';
            case 'subCategoryId':
                return 'Subcategory Name';
            // Add more custom labels if needed
            default:
                // Convert camelCase or snake_case to readable words
                return key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/[_-]/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());
        }
    };

    // Function to format values (including nested objects and dates
    // Function to check if a string is a valid date
    const isDateString = (value) => {
        if (typeof value !== 'string') return false;

        // Regex to match ISO date strings (e.g., "2025-03-28T00:00:00.000Z")
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
        return isoDateRegex.test(value);
    };

    // Function to format values (including nested objects and dates)
    // Function to format values (including nested objects and dates)
    const formatValue = (value, key) => {
        // Handle categoryId and subCategoryId specifically
        if (key === 'categoryId' || key === 'subCategoryId') {
            return value?.name || value?.subCategoryName || 'N/A'; // Display the name or "N/A" if not available
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div style={{ paddingLeft: '20px', borderLeft: '2px solid #ddd' }}>
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey}>
                            <strong>{formatKey(subKey)}:</strong> {formatValue(subValue, subKey)}
                        </div>
                    ))}
                </div>
            );
        }

        // Check if the value is a valid date string
        if (isDateString(value)) {
            const dateOnly = new Date(value).toISOString().split('T')[0];
            return dateOnly;
        }

        return value;
    };
    const excludedKeys = [
        '_id',
        'createdAt',
        'updatedAt',
        'image',
        'status',
        'userId',
        'publish',
        'negotiable',
        'productGenerateId',
        'endBidDateTime',
        'startBidDateTime',
        'buyerId',
    ];

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

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: 'Sold Items',
                        path: '/bmg/sold-items',
                        active: true,
                    },
                ]}
                title={`Sold Items`}
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
                                    Total Products: {TotalRecords}
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
                                            className="mdi mdi-backspace-outline fs-3"
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
                                    {SoldAuctionData && SoldAuctionData?.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table table-hover bg-white">
                                                    <thead className="text-start">
                                                        <tr className="text-nowrap">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col">Product Id</th>
                                                            <th scope="col">Product Name</th>
                                                            <th scope="col">Brand</th>
                                                            <th scope="col">Ask Price</th>
                                                            <th scope="col">User Name</th>
                                                            <th scope="col">User Email</th>
                                                            {/* <th scope="col">User Verified</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-start">
                                                        {SoldAuctionData?.map((data, index) => (
                                                            <tr key={index} className="text-dark fw-bold text-nowrap">
                                                                <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                <td className="text-uppercase fw-bold">
                                                                    {data?.paymentId ? (
                                                                        <span>#{data?.paymentId} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td
                                                                    className="text-uppercase fw-bold"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        // color: 'crimson',
                                                                        // transition: 'color 0.3s ease-in-out',
                                                                    }}
                                                                // onMouseOver={(e) =>
                                                                //     (e.target.style.color = 'rgb(10 207 151)')
                                                                // }
                                                                // onMouseOut={(e) =>
                                                                //     (e.target.style.color = 'crimson')
                                                                // }
                                                                >
                                                                    <OverlayTrigger
                                                                        placement="left"
                                                                        overlay={
                                                                            <Tooltip id="overlay-example">
                                                                                View Detail's
                                                                            </Tooltip>
                                                                        }>
                                                                        <b>
                                                                            {data?.productName ? (
                                                                                <span
                                                                                    onClick={() => {
                                                                                        navigate(
                                                                                            `/bmg/items/${data?.productId?._id}`,
                                                                                            {
                                                                                                state: {
                                                                                                    product:
                                                                                                        data?.product,
                                                                                                },
                                                                                            }
                                                                                        );
                                                                                    }}>
                                                                                    {data?.productName?.slice(0, 30) +
                                                                                        '...'}{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </b>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td className="text-uppercase fw-bold">
                                                                    {data?.productId?.Brand ? (
                                                                        <span>{data?.productId?.Brand} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="text-uppercase fw-bold">
                                                                    {data?.productId?.Ask_Price ? (
                                                                        <span>$ {data?.productId?.Ask_Price} </span>
                                                                    ) : (
                                                                        <span className="d-flex justify-content-center">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="fw-bold">
                                                                    {data?.userId ? (
                                                                        <span className="fw-semibold">
                                                                            {`${data?.userId?.name || ''} ${data?.userId?.lastName || ''
                                                                                }`.trim() || 'N/A'}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="">N/A</span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-bold ">
                                                                    {data?.userId?.email ? (
                                                                        <span>{data?.userId?.email} </span>
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
                                            <code className="fs-4">No Products found.</code>
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
                                    .filter(([key, value]) => !excludedKeys.includes(key) && value) // Exclude unnecessary fields
                                    .map(([key, value]) => (
                                        <Col md={6} key={key} className="mb-3">
                                            <div className="d-flex flex-column">
                                                <strong className="text-muted mb-1">{formatKey(key)}</strong>
                                                <div className="fw-bold" style={{ wordBreak: 'break-word' }}>
                                                    {formatValue(value, key)}
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                            </Row>
                        </Container>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SoldProducts;
