import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Container, Carousel, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getPaidAuctionActions, getNonPaidAuctionActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import Tab from './tabs/Tab';
import { useNavigate } from 'react-router-dom';
const Transactions = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const PaidAuctionData = store?.getPaidAuctionDataReducer?.transactionData?.result;
    const NonPaidAuctionData = store?.getNonPaidAuctionDataReducer?.transactionData?.result;
    const PaidAuctionLoading = store?.getPaidAuctionDataReducer?.loading;
    const NonPaidAuctionLoading = store?.getNonPaidAuctionDataReducer?.loading;
    const [activeTab, setActiveTab] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const connectTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageSize));
    }, [totalRecords, pageSize]);

    useEffect(() => {
        if (activeTab === 0) {
            dispatch(getPaidAuctionActions({ search, limit: pageSize, page: pageIndex }));
        } else if (activeTab === 1) {
            dispatch(getNonPaidAuctionActions({ search, limit: pageSize, page: pageIndex }));
        }
    }, [dispatch, activeTab, pageIndex, pageSize, search]);

    // Separate useEffect to watch for store updates and set totalRecords
    useEffect(() => {
        if (activeTab === 0) {
            setTotalRecords(store?.getPaidAuctionDataReducer?.transactionData?.totalRecords || 0);
            setPageIndex(1);
        } else if (activeTab === 1) {
            setTotalRecords(store?.getNonPaidAuctionDataReducer?.transactionData?.totalRecords || 0);
            setPageIndex(1);
        }
    }, [
        store?.getPaidAuctionDataReducer?.transactionData?.totalRecords,
        store?.getNonPaidAuctionDataReducer?.transactionData?.totalRecords,
        activeTab,
    ]);

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

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        if (product) {
            setSelectedProduct(product);
            setShowModal(true);
        }
    };

    const formatUserName = (user) => {
        const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

        const firstName = capitalize(user?.name);
        const lastName = capitalize(user?.lastName);

        if (firstName && lastName) return `${firstName} ${lastName}`;
        if (firstName) return firstName;
        if (lastName) return lastName;
        return 'N/A';
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
        'categoryId',
        'subCategoryId',
        'image',
        'status',
        'userId',
        'publish',
        'negotiable',
        'productGenerateId',
        'endBidDateTime',
        'startBidDateTime',
        'buyerId',
        'soldStatus',
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: `${activeTab === 0 ? 'Paid-Transactions' : 'Unpaid-Transactions'}`,
                        path: '/bmg/transactions',
                        active: true,
                    },
                ]}
                title={'Transactions'}
            />
            <Row>
                <Col lg={6} className="d-flex justify-content-start ">
                    <Tab connectTab={connectTab} />
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
                                            Paid Transactions: {totalRecords}
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
                                                    className="mdi mdi-backspace-outline fs-3"
                                                    onClick={() => setSearch('')}
                                                    style={{ cursor: 'pointer' }}></i>
                                            )}
                                        </div>
                                    </div>

                                    {PaidAuctionLoading ? (
                                        <>
                                            <Loading />
                                        </>
                                    ) : (
                                        <>
                                            {PaidAuctionData && PaidAuctionData?.length > 0 ? (
                                                <>
                                                    <div className="table-responsive">
                                                        <table className="table table-hover bg-white">
                                                            <thead>
                                                                <tr className="text-start">
                                                                    <th scope="col">
                                                                        <i className="mdi mdi-merge"></i>
                                                                    </th>
                                                                    <th scope="col">Payment Id</th>
                                                                    <th scope="col">Product Id</th>
                                                                    <th scope="col">Order Id</th>
                                                                    <th scope="col">Product Name</th>
                                                                    <th scope="col">Buyer</th>
                                                                    <th scope="col">Seller</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Delivery Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {PaidAuctionData?.map((data, index) => (
                                                                    <tr
                                                                        key={index}
                                                                        className="text-dark fw-bold text-nowrap text-start">
                                                                        <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                        <td className="text-uppercase">
                                                                            {data?.paymentId ? (
                                                                                <span>#{data?.paymentId}</span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            <span>#{data?.productId?.productGenerateId || 'N/A'}</span>
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            {data?.orderId ? (
                                                                                <span>#{data?.orderId}</span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.productId ? (
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={() =>
                                                                                        handleProductClick(
                                                                                            data?.productId
                                                                                        )
                                                                                    }>
                                                                                    {data?.productId?.Product_Name
                                                                                        ?.length > 30
                                                                                        ? data?.productId?.Product_Name?.slice(
                                                                                            0,
                                                                                            30
                                                                                        ) + '...'
                                                                                        : data?.productId?.Product_Name}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.userId ? (
                                                                                <span>
                                                                                    {formatUserName(data?.userId)}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.sellerId ? (
                                                                                <span>
                                                                                    {formatUserName(data?.sellerId)}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.totalPrice ? (
                                                                                <span>${data?.totalPrice}</span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.deliveryStatus ? (
                                                                                <span>{data?.deliveryStatus}</span>
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
                                                    <code className="fs-4">No Paid Transactions found.</code>
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
                                            UnPaid Transactions: {totalRecords}
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
                                                    className="mdi mdi-backspace-outline fs-3"
                                                    onClick={() => setSearch('')}
                                                    style={{ cursor: 'pointer' }}></i>
                                            )}
                                        </div>
                                    </div>
                                    {NonPaidAuctionLoading ? (
                                        <>
                                            <Loading />
                                        </>
                                    ) : (
                                        <>
                                            {NonPaidAuctionData && NonPaidAuctionData?.length > 0 ? (
                                                <>
                                                    <div className="table-responsive">
                                                        <table className="table table-hover bg-white">
                                                            <thead>
                                                                <tr className="" style={{ color: '#703133' }}>
                                                                    <th scope="col">
                                                                        <i className="mdi mdi-merge"></i>
                                                                    </th>
                                                                    <th scope="col">Product Id</th>
                                                                    <th scope="col">Product Name</th>
                                                                    <th scope="col">Category</th>
                                                                    <th scope="col">Sub Category</th>
                                                                    <th scope="col">Buyer</th>
                                                                    <th scope="col">Seller</th>
                                                                    <th scope="col">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {NonPaidAuctionData?.map((data, index) => (
                                                                    <tr
                                                                        key={index}
                                                                        className="text-dark fw-bold text-nowrap">
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td className="text-uppercase">
                                                                            <span>#{data?.productGenerateId || 'N/A'}</span>
                                                                        </td>
                                                                        <td className="text-uppercase text-success">
                                                                            {data ? (
                                                                                <span
                                                                                    style={{
                                                                                        cursor: 'pointer',
                                                                                        color: 'crimson',
                                                                                    }}
                                                                                    onMouseOver={(e) =>
                                                                                    (e.target.style.color =
                                                                                        'green')
                                                                                    }
                                                                                    onMouseOut={(e) =>
                                                                                    (e.target.style.color =
                                                                                        'crimson')
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleProductClick(data)
                                                                                    }>
                                                                                    {data?.Product_Name?.slice(0, 30) +
                                                                                        '...'}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            {data?.categoryId ? (
                                                                                <span>{data?.categoryId?.name} </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            {data?.subCategoryId ? (
                                                                                <span>
                                                                                    {
                                                                                        data?.subCategoryId
                                                                                            ?.subCategoryName
                                                                                    }{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            {data?.buyerId ? (
                                                                                <span>
                                                                                    {formatUserName(data?.buyerId)}{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-uppercase">
                                                                            {data?.userId ? (
                                                                                <span>
                                                                                    {formatUserName(data?.userId)}{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex  justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        <td className="text-uppercase">
                                                                            {data?.highBidingAmount ? (
                                                                                <span>$ {data?.highBidingAmount} </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td>

                                                                        {/* <td className='text-uppercase fw-bold text-primary'>
                                                                            {data?.createdAt ? (
                                                                                <span>{formatDate(data?.createdAt)}  </span>
                                                                            ) : (
                                                                                <span className="d-flex justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </td> */}
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
                                                    <code className="fs-4">No UnPaid Transactions were found.</code>
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

export default Transactions;
