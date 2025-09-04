import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Modal, Container, Carousel, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getProductActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import { useNavigate } from 'react-router-dom';
const Products = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [type, setType] = useState('Auction');
    const [productType, setProductType] = useState('ongoing');
    const ProductsData = store?.productDataReducer?.productData?.result;
    const ProductsLoading = store?.productDataReducer?.loading;
    const TotalRecords = store?.productDataReducer?.productData?.totalRecords || 0;
    const auctionCounts = store?.productDataReducer?.productData?.auctionCounts || {};
    const saleCounts = store?.productDataReducer?.productData?.saleCounts || {};
    const DraftCount = store?.productDataReducer?.productData?.totalDraftCount || 0;
    const navigate = useNavigate();


    const {
        total: AuctionCounts,
        ongoing: ongoingCounts,
        upcoming: upcomingCounts,
        sold: soldCounts,
        unsold: unSoldCounts,
    } = auctionCounts;

    const { total: SaleCounts, sold: soldSaleCounts, unsold: unsoldSaleCounts } = saleCounts || {};

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(TotalRecords / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);
    useEffect(() => {
        const fetchProducts = () => {
            const params = {
                search,
                limit: pageSize,
                page: pageIndex,
                type: type === 'Direct Sale' ? 'Sale' : type,
                publish: type !== 'Draft',
            };
            // Only add productType if not Draft and not empty
            if (type !== 'Draft' && productType) {
                params.productType = productType;
            }
            dispatch(getProductActions(params));
        };

        // Debounce search to prevent rapid API calls
        const debounceTimer = setTimeout(fetchProducts, 300);

        return () => clearTimeout(debounceTimer);
    }, [dispatch, pageIndex, pageSize, search, type, productType]);

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
        'categoryId',
        'subCategoryId',
        'soldStatus',
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
    const types = ['Auction', 'Direct Sale'];
    // const types = ['Auction', 'Sale', 'Draft'];
    const productTypes = ['ongoing', 'upcoming', 'sold', 'unsold'];

    useEffect(() => {
        if (type === 'Auction') {
            setProductType('ongoing');
        } else if (type === 'Direct Sale') {
            setProductType('sold');
        }
    }, [type]);

    return (
        <>
            {/* <PageTitle
                breadCrumbItems={[
                    {
                        label: 'Item',
                        path: '/bmg/items',
                        active: true,
                    },
                ]}
                title={'Item'}
            /> */}
            <Row className="mb-2 ms-1 border-bottom pb-1 mt-4">
                {types?.map((item) => {
                    let count = '';
                    if (item === 'Auction') count = AuctionCounts ?? '';
                    if (item === 'Direct Sale') count = SaleCounts ?? '';
                    if (item === 'Draft') count = DraftCount ?? '';

                    return (
                        <Col
                            sm="auto"
                            key={item}
                            className={`text-center me-3 px-3 py-1 rounded`}
                            style={{
                                cursor: 'pointer',
                                color: type === item ? '#fff' : '#333',
                                backgroundColor: type === item ? '#008003' : '#f1f1f1',
                                fontSize: '1rem',
                                fontWeight: '600',
                            }}
                            onClick={() => setType(item)}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}{' '}
                            {count !== '' && <span className="badge bg-secondary text-light ms-1">{count}</span>}
                        </Col>
                    );
                })}
            </Row>

            {type !== 'Draft' && (
                <Row className="mb-3 py-1 px-2 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    {productTypes.map((item) => {
                        if (type === 'Direct Sale' && item !== 'sold' && item !== 'unsold') return null;

                        let count = '';
                        if (type === 'Auction') {
                            if (item === 'ongoing') count = ongoingCounts ?? '';
                            if (item === 'upcoming') count = upcomingCounts ?? '';
                            if (item === 'sold') count = soldCounts ?? '';
                            if (item === 'unsold') count = unSoldCounts ?? '';
                        } else if (type === 'Direct Sale') {
                            if (item === 'sold') count = soldSaleCounts ?? '';
                            if (item === 'unsold') count = unsoldSaleCounts ?? '';
                        }

                        return (
                            <Col
                                sm="auto"
                                key={item}
                                className={`text-center me-2 px-3 py-1`}
                                style={{
                                    cursor: 'pointer',
                                    color: productType === item ? '#fff' : '#333',
                                    backgroundColor: productType === item ? '#008003' : '#e9ecef',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    borderRadius: '20px',
                                }}
                                onClick={() => setProductType(item)}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}{' '}
                                {count !== '' && <span className="badge bg-secondary ms-1">{count}</span>}
                            </Col>
                        );
                    })}
                </Row>
            )}

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
                            {ProductsLoading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {ProductsData && ProductsData.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table table-hover bg-white">
                                                    <thead>
                                                        <tr className="text-nowrap">
                                                            <th scope="col">
                                                                <i className="mdi mdi-merge"></i>
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Product Id
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Serial. No
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Seller's Name
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Product Name
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Brand
                                                            </th>
                                                            <th scope="col" className="text-start">
                                                                Amount
                                                            </th>
                                                            {type === 'Auction' && <th scope="col">Bidding Amount</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ProductsData?.map((data, index) => (
                                                            <tr key={index} className="text-dark fw-bold text-nowrap">
                                                                <th scope="row">{(pageIndex - 1) * pageSize + index + 1}</th>
                                                                <td className="text-uppercase text-start fw-bold">
                                                                    {data?.productGenerateId ? (
                                                                        <span>#{data?.productGenerateId} </span>
                                                                    ) : (
                                                                        <span className="">N/A</span>
                                                                    )}
                                                                </td>
                                                                <td className="text-uppercase fw-bold text-start">
                                                                    {data?.serialNumber ? (
                                                                        <span>{data?.serialNumber} </span>
                                                                    ) : (
                                                                        <span className="">N/A</span>
                                                                    )}
                                                                </td>
                                                                <td className="text-uppercase fw-bold text-start">
                                                                    {data?.userId?.name || data?.userId?.lastName ? (
                                                                        <span>
                                                                            {data?.userId?.name || 'N/A'} {data?.userId?.lastName || 'N/A'}
                                                                        </span>
                                                                    ) : (
                                                                        <span>N/A</span>
                                                                    )}
                                                                </td>
                                                                <td
                                                                    className="text-uppercase text-start fw-bold"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        // color: 'crimson',
                                                                        // transition: 'color 0.3s ease-in-out',
                                                                    }}
                                                                // onMouseOver={(e) =>
                                                                //     // (e.target.style.color = 'rgb(10 207 151)')
                                                                // }
                                                                // onMouseOut={(e) =>
                                                                //     // (e.target.style.color = 'crimson')
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
                                                                            {data?.Product_Name ? (
                                                                                <span
                                                                                    // onClick={() =>
                                                                                    //     handleProductClick(data)
                                                                                    // }
                                                                                    onClick={() => {
                                                                                        navigate(
                                                                                            `/bmg/items/${data?._id}`,
                                                                                            {
                                                                                                state: { product: data?.product },
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {data?.Product_Name?.slice(0, 30) +
                                                                                        '...'}{' '}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="d-flex text-danger justify-content-center">
                                                                                    N/A
                                                                                </span>
                                                                            )}
                                                                        </b>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td className="text-uppercase text-start fw-bold">
                                                                    {data?.Brand ? (
                                                                        <span>{data?.Brand} </span>
                                                                    ) : (
                                                                        <span className="">N/A</span>
                                                                    )}
                                                                </td>
                                                                <td className="text-uppercase text-start fw-bold" style={{ color: 'green' }}>
                                                                    {data?.Ask_Price ? (
                                                                        <span>$ {data?.Ask_Price} </span>
                                                                    ) : (
                                                                        <span className="">N/A</span>
                                                                    )}
                                                                </td>

                                                                {type === 'Auction' && (
                                                                    <td className="text-uppercase text-start fw-bold" style={{ color: 'green' }}>
                                                                        {data?.Start_Bid_Price ? (
                                                                            <span>$ {data?.Start_Bid_Price} </span>
                                                                        ) : (
                                                                            <span className="">N/A</span>
                                                                        )}
                                                                    </td>
                                                                )}
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
                                            <code className="fs-4">No Product's found.</code>
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

export default Products;
