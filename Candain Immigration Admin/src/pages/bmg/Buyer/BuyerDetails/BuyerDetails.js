import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Nav, Pagination, Row, Tab, Table } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { debounce } from 'lodash';

// import { purchageHistoryAction } from '../../redux/Purchases/actions';
// import { ButtonLoading, Loading, TableLoading } from '../../../../helpers/loader/Loading'
// import { getBuyOrderAction } from '../../redux/LiveAuction/actions';
// import { addRatingAndReviewAction } from '../../redux/Rating/actions';
import { useForm } from 'react-hook-form';
import ToastHandle from '../../../../helpers/toast/ToastContainer';
import { FcRating } from 'react-icons/fc';
import { getUserFromSession } from '../../../../helpers/api/apiCore';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { ButtonLoading, Loading } from '../../../../helpers/loader/Loading';
import { purchaseOrderForAdmin } from '../../../../redux/Buyers/action';
import './BuyerDetails.css';

const Purchases = () => {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const handleSearch = (value) => {
        // Your API call or filter logic here
        setSearch(value);
    };
    const [activeKey, setActiveKey] = useState('auction');
    const user = getUserFromSession();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const getPurchaseHistory = store?.puchaseHistoryListReducer;
    const getBuyOrder = store?.getBuyOrderReducer?.data?.data?.result;
    const getAddRatingAndReviewResponse = store?.addRatingAndReviewReducer;
    // Extract pagination data safely
    const currentPage = getPurchaseHistory?.data?.data?.currentPage ?? 1;
    const totalPages = getPurchaseHistory?.data?.data?.totalPages ?? 1;

    // Open modal with order details
    const handleOpenModal = (order) => {
        if (order) {
            setSelectedOrder(order);
            setRating(0); // Reset rating on open
            reset(); // Reset form fields
            setShowModal(true);
        }
    };

    // Handle form submission
    const onSubmit = (data) => {
        const formData = {
            productId: selectedOrder?.productId?._id,
            sellerId: selectedOrder?.sellerId,
            buyerId: selectedOrder?.userId,
            rating,
            comment: data.review,
        };
        // dispatch(addRatingAndReviewAction(formData));
    };
    const [activeTab, setActiveTab] = useState('auction');

    const [Type, setType] = useState('Sale');
    useEffect(() => {
        if (activeTab == 'auction') {
            setType('Sale');
        } else if (activeTab == 'buynow') {
            setType('Auction');
        }
    }, [activeTab]);
    useEffect(() => {
        dispatch(purchaseOrderForAdmin({ id, type: Type, productName: search }));
        // dispatch(getBuyOrderAction({ userId: user?.id }));
    }, [dispatch, Type, search]);
    const id = useParams()?.id;
    const purchaseOrderForAdminReducer = store?.purchaseOrderForAdminReducer;
    const purchaseOrderForAdminData =
        Type == 'Auction' ? purchaseOrderForAdminReducer?.data?.result : purchaseOrderForAdminReducer?.data?.orders;
    const debouncedSearch = useCallback(
        debounce((value) => {
            handleSearch(value);
        }, 500), // 500ms debounce
        []
    );
    return (
        <Container fluid className="p-0">
            {getPurchaseHistory?.loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh', // Adjust height as needed
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }}>
                    {/* <TableLoading /> */}
                </div>
            ) : (
                <>
                    <Tab.Container
                        activeKey={activeTab}
                        onSelect={(k) => {
                            setActiveTab(k);
                            // localStorage.setItem('activeTab', k);
                        }}>
                        <Nav
                            variant="pills"
                            className="d-flex justify-content-md-between custom-nav-tab rounded shadow border-bottom mx-2 pt-2"
                            style={{ width: '220px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <Nav.Item className="text-center">
                                <Nav.Link eventKey="auction">Auction</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="text-center">
                                <Nav.Link eventKey="buynow">Direct Buy</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="auction">
                                <>
                                    <Row className="mx-auto py-1">
                                        <Col md={6} xs={6}>
                                            <h1 className="account-title mt-4 text-start px-0">Purchases History</h1>
                                        </Col>
                                        <Col md={6} xs={6} className="d-flex justify-content-end">
                                            <div
                                                className="div-search border mt-lg-4 mt-3 rounded-pill p-1 d-flex align-items-center"
                                                style={{ background: 'transparent' }}>
                                                <input
                                                    type="search"
                                                    onChange={(e) => debouncedSearch(e.target.value)}
                                                    className="border-0 px-3 w-100 flex-grow-1"
                                                    placeholder="Search"
                                                    name="search"
                                                    id="search"
                                                    style={{
                                                        outline: 'none',
                                                        fontSize: '13px',
                                                        background: 'transparent',
                                                        fontWeight: '400',
                                                        fontFamily: 'Poppins',
                                                    }}
                                                />
                                                <FiSearch className="me-3" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mx-auto">
                                        <Col md={12}>
                                            <div
                                                style={{
                                                    boxShadow:
                                                        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                                }}
                                                className="table-responsive">
                                                <table
                                                    // style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                                                    className="w-100 table-bordered rounded text-start table bg-white">
                                                    <thead className="">
                                                        <tr className="">
                                                            <th className="table-heading text-start text-nowrap">
                                                                Order ID
                                                            </th>
                                                            <th className="table-heading text-start text-nowrap">
                                                                Product Name
                                                            </th>

                                                            <th className="table-heading  text-start text-nowrap">
                                                                Status
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Payment Method
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Name
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Date
                                                            </th>
                                                            <th className="table-heading text-start text-nowrap ">
                                                                Total
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Rating
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Review
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Add Rating{' '}
                                                            </th>
                                                            <th className=" table-heading text-start text-nowrap">
                                                                Invoice
                                                            </th>
                                                            {/* <th className="table-heading text-start text-nowrap ">
                                                                Action
                                                            </th> */}
                                                        </tr>
                                                    </thead>
                                                    {purchaseOrderForAdminReducer?.loading ? (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="12" className="text-center py-5">
                                                                    <Loading />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ) : (
                                                        <tbody className=" border">
                                                            {purchaseOrderForAdminData?.map((buy, index) => (
                                                                <tr key={index}>
                                                                    <td
                                                                        className="text-nowrap carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {buy?.orderId}
                                                                    </td>
                                                                    <td
                                                                        className="carousel-desc"
                                                                        style={{ fontWeight: '500' }}
                                                                        title={buy?.productId?.Product_Name} // full text as tooltip
                                                                    >
                                                                        {buy?.productId?.Product_Name?.length > 20 // your limit here
                                                                            ? buy.productId.Product_Name.slice(0, 20) +
                                                                            '...'
                                                                            : buy.productId.Product_Name}
                                                                    </td>

                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{
                                                                            fontWeight: '500',
                                                                            color:
                                                                                buy?.status === 'PENDING'
                                                                                    ? 'green'
                                                                                    : buy?.status === 'DELIVERED'
                                                                                        ? 'yellow'
                                                                                        : buy?.status === 'CANCELLED'
                                                                                            ? 'red'
                                                                                            : 'black', // Default color if status doesn't match
                                                                        }}>
                                                                        {buy?.deliveryStatus &&
                                                                            buy.deliveryStatus.charAt(0).toUpperCase() +
                                                                            buy.deliveryStatus.slice(1)}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {buy?.paymentMethod}
                                                                    </td>

                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {buy?.userId?.name} {buy?.userId?.lastName}
                                                                    </td>
                                                                    <td
                                                                        className="text-nowrap carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {new Date(buy?.orderDate).toLocaleString(
                                                                            'en-US',
                                                                            {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: '2-digit',
                                                                            }
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {new Intl.NumberFormat('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                        }).format(Number(buy?.totalPrice) || 0)}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {buy?.productId?.review?.rating
                                                                            ? [...Array(5)].map((_, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    style={{ color: '#FFD700' }}>
                                                                                    {index <
                                                                                        buy.productId.review.rating ? (
                                                                                        <FaStar />
                                                                                    ) : (
                                                                                        <FaRegStar />
                                                                                    )}
                                                                                </span>
                                                                            ))
                                                                            : 'N/A'}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500', cursor: 'pointer' }}
                                                                        title={buy?.productId?.review?.comment} // Show full comment on hover
                                                                    >
                                                                        {buy?.productId?.review?.comment
                                                                            ? buy.productId.review.comment.length > 20
                                                                                ? buy.productId.review.comment.slice(
                                                                                    0,
                                                                                    20
                                                                                ) + '...'
                                                                                : buy.productId.review.comment
                                                                            : 'N/A'}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500', cursor: 'pointer' }}
                                                                        onClick={() => handleOpenModal(buy)} // Pass ID when clicking
                                                                    >
                                                                        <FcRating className="fs-3" />
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{
                                                                            fontWeight: '500',
                                                                            cursor: 'pointer',
                                                                        }}>
                                                                        <a
                                                                            href={buy?.pdfUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer">
                                                                            <FaFileInvoice
                                                                                className="fs-4"
                                                                                color="rgb(74, 118, 82)"
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                    {/* <td className="">
                                                                        <Link
                                                                            to={`/bmg/orderdetail/${buy.orderId}`}
                                                                            state={{ orderDetails: buy, activeTab }}
                                                                            className="nav-link">
                                                                            <BsEye
                                                                                className=""
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'rgba(74, 118, 82, 1)',
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </td> */}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    )}
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>
                                    {totalPages > 1 && (
                                        <Pagination className="justify-content-center mt-3 custom-pagination">
                                            {/* Previous Button */}
                                            <Pagination.Prev
                                                // onClick={() =>
                                                // dispatch(
                                                //     purchageHistoryAction({
                                                //         userId: user?.id,
                                                //         page: Math.max(currentPage - 1, 1),
                                                //     })
                                                // )
                                                // }
                                                disabled={currentPage === 1}>
                                                Previous
                                            </Pagination.Prev>
                                            {/* Page Numbers */}
                                            {[...Array(totalPages)].map((_, i) => (
                                                <Pagination.Item
                                                    key={i}
                                                    active={i + 1 === currentPage}
                                                // onClick={() =
                                                // >
                                                // dispatch(
                                                //     purchageHistoryAction({ userId: user?.id, page: i + 1 })
                                                // )
                                                // }
                                                >
                                                    {i + 1}
                                                </Pagination.Item>
                                            ))}

                                            {/* Next Button */}
                                            <Pagination.Next
                                                // onClick={() =>
                                                // dispatch(
                                                //     purchageHistoryAction({
                                                //         userId: user?.id,
                                                //         page: Math.min(currentPage + 1, totalPages),
                                                //     })
                                                // )
                                                // }
                                                disabled={currentPage === totalPages}>
                                                Next
                                            </Pagination.Next>
                                        </Pagination>
                                    )}
                                </>
                            </Tab.Pane>
                            <Tab.Pane eventKey="buynow">
                                <>
                                    <Row className="mx-auto py-1">
                                        <Col md={6} xs={6}>
                                            <h1 className="account-title mt-4 text-start px-0">Direct Buy</h1>
                                        </Col>
                                        <Col md={6} xs={6} className="d-flex justify-content-end">
                                            <div
                                                className="div-search border mt-lg-4 mt-3 rounded-pill p-1 d-flex align-items-center"
                                                style={{ background: 'transparent' }}>
                                                <input
                                                    type="search"
                                                    onChange={(e) => debouncedSearch(e.target.value)}
                                                    className="border-0 px-3 w-100 flex-grow-1"
                                                    placeholder="Search"
                                                    name="search"
                                                    id="search"
                                                    style={{
                                                        outline: 'none',
                                                        fontSize: '13px',
                                                        background: 'transparent',
                                                        fontWeight: '400',
                                                        fontFamily: 'Poppins',
                                                    }}
                                                />
                                                <FiSearch className="me-3" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mx-auto">
                                        <Col md={12}>
                                            <div
                                                style={{
                                                    boxShadow:
                                                        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                                }}
                                                className="table-responsive">
                                                <table className="text-start w-100 table-bordered rounded table bg-white">
                                                    <thead
                                                        className=" "
                                                        style={{
                                                            border: '1px solid rgba(189, 185, 185, 0.2)',
                                                            borderRadius: '13px 13px 0px 0px !important',
                                                        }}>
                                                        <tr className="">
                                                            <th className="text-start table-heading text-nowrap">
                                                                Order ID
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Product Name
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Status
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Quantity
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Payment Method
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Date
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Total
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Rating
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Review
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Add Rating{' '}
                                                            </th>
                                                            <th className="text-start table-heading text-nowrap">
                                                                Invoice
                                                            </th>
                                                            {/* <th className="text-start table-heading text-nowrap">
                                                                Action
                                                            </th> */}
                                                        </tr>
                                                    </thead>
                                                    {purchaseOrderForAdminReducer?.loading ? (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="12" className="text-center py-5">
                                                                    <Loading />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ) : (
                                                        <tbody className=" border">
                                                            {purchaseOrderForAdminData?.map((order, index) => (
                                                                <tr key={index}>
                                                                    <td
                                                                        className="text-nowrap carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {order?.orderId}
                                                                    </td>
                                                                    <td
                                                                        className="carousel-desc"
                                                                        style={{ fontWeight: '500' }}
                                                                        title={order?.productId?.Product_Name} // full name as tooltip
                                                                    >
                                                                        {order?.productId?.Product_Name?.length > 20 // set your limit here
                                                                            ? order.productId.Product_Name.slice(
                                                                                0,
                                                                                20
                                                                            ) + '...'
                                                                            : order.productId.Product_Name}
                                                                    </td>

                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{
                                                                            fontWeight: '500',
                                                                            color:
                                                                                order?.status === 'PENDING'
                                                                                    ? 'green'
                                                                                    : order?.status === 'DELIVERED'
                                                                                        ? 'yellow'
                                                                                        : order?.status === 'CANCELLED'
                                                                                            ? 'red'
                                                                                            : 'black', // Default color if status doesn't match
                                                                        }}>
                                                                        {order?.deliveryStatus &&
                                                                            order.deliveryStatus
                                                                                .charAt(0)
                                                                                .toUpperCase() +
                                                                            order.deliveryStatus.slice(1)}
                                                                    </td>
                                                                    <td
                                                                        className="carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {order?.productId?.quantity}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {order?.paymentMethod}
                                                                    </td>
                                                                    <td
                                                                        className="text-nowrap  carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {new Date(order.createdAt).toLocaleString(
                                                                            'en-US',
                                                                            {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: '2-digit',
                                                                                // hour: "2-digit",
                                                                                // minute: "2-digit",
                                                                                // hour12: true
                                                                            }
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {new Intl.NumberFormat('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                        }).format(Number(order?.totalPrice) || 0)}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500' }}>
                                                                        {order?.productId?.review?.rating
                                                                            ? [...Array(5)].map((_, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    style={{ color: '#FFD700' }}>
                                                                                    {index <
                                                                                        order.productId.review.rating ? (
                                                                                        <FaStar />
                                                                                    ) : (
                                                                                        <FaRegStar />
                                                                                    )}
                                                                                </span>
                                                                            ))
                                                                            : 'N/A'}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500', cursor: 'pointer' }}
                                                                        title={order?.productId?.review?.comment} // Show full comment on hover
                                                                    >
                                                                        {order?.productId?.review?.comment
                                                                            ? order.productId.review.comment.length > 20
                                                                                ? order.productId.review.comment.slice(
                                                                                    0,
                                                                                    20
                                                                                ) + '...'
                                                                                : order.productId.review.comment
                                                                            : 'N/A'}
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{ fontWeight: '500', cursor: 'pointer' }}
                                                                        onClick={() => handleOpenModal(order)} // Pass ID when clicking
                                                                    >
                                                                        <FcRating className="fs-3" />
                                                                    </td>
                                                                    <td
                                                                        className=" carousel-desc"
                                                                        style={{
                                                                            fontWeight: '500',
                                                                            cursor: 'pointer',
                                                                        }}>
                                                                        <a
                                                                            href={order?.pdfUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer">
                                                                            <FaFileInvoice
                                                                                className="fs-4"
                                                                                color="rgb(74, 118, 82)"
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                    {/* <td className="">
                                                                        <Link
                                                                            to={`/bmg/orderdetail/${order.orderId}`}
                                                                            state={{ orderDetails: order, activeTab }}
                                                                            className="nav-link">
                                                                            <BsEye
                                                                                className=""
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'rgba(74, 118, 82, 1)',
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </td> */}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    )}
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Add Rating & Review</h2>
                                {/* Star Rating System */}
                                <div className="stars">
                                    {[...Array(5)].map((_, index) => {
                                        const currentRating = index + 1;
                                        return (
                                            <FaStar
                                                key={index}
                                                size={30}
                                                style={{ cursor: 'pointer', transition: 'color 200ms' }}
                                                color={currentRating <= (hover || rating) ? '#FFD700' : '#ccc'}
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                                onClick={() => setRating(currentRating)}
                                            />
                                        );
                                    })}
                                </div>
                                {/* Review Form */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label>Review:</label>
                                    <textarea
                                        rows="3"
                                        {...register('review', { required: 'Review is required' })}
                                        placeholder="Write your review..."
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
                                    {errors.review && <p style={{ color: 'red' }}>{errors.review.message}</p>}
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        style={{
                                            backgroundColor: 'rgba(74, 118, 82, 1)',
                                            color: '#fff',
                                            padding: '10px 15px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                        }}>
                                        {getAddRatingAndReviewResponse?.loading ? <ButtonLoading /> : 'Submit'}
                                    </button>
                                    <button
                                        type="button"
                                        className="close-btn"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            backgroundColor: '#d9534f',
                                            color: '#fff',
                                            padding: '10px 15px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}>
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* Styles */}
                    <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          text-align: center;
        }
        .stars {
          display: flex;
          justify-content: center;
          margin: 10px 0;
        }
        .submit-btn {
          background: rgba(74, 118, 82, 1);
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        .close-btn {
          background: #ccc;
          color: black;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      `}</style>
                </>
            )}
        </Container>
    );
};

export default Purchases;
