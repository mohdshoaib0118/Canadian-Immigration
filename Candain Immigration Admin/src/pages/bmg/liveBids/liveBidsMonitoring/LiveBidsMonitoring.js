import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { io } from 'socket.io-client';
import config from '../../../../config';
import AuctionCountdown from '../../../../helpers/AuctionCountDown';
import locations from '../../../../assets/images/location.svg';
import { formatDate } from '../../../../helpers/Functions';

const LiveMonitoring = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [liveMonitoringData, setLiveMonitoringData] = useState([]);
    const auctionData = useLocation()?.state?.product;
    const ProductId = useParams()?.id;
    const [showModal, setShowModal] = useState(false);
    const [bidEndDate, setBidEndDate] = useState('');
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config.API_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        if (!auctionData?._id) return;
        const socket = socketRef.current;

        if (!socket.connected) {
            socket.connect();
        }
        const handleLiveUpdate = (data) => {
            // alert('dd');
            if (data?.data?.[0]?.productId === ProductId) {
                setLiveMonitoringData(data?.data);
            } else {
                setLiveMonitoringData([]);
            }
        };

        socket.on('liveMonitorResponse', handleLiveUpdate);
        socket.emit('liveBid', { productId: ProductId });
        socket.emit('liveMonitor', { productId: ProductId });
        return () => {
            socket.off('liveMonitorResponse', handleLiveUpdate);
        };
    }, [ProductId]);
    const handleModalClose = () => setShowModal(false);
    const handleUpdate = () => {
        // Add your update logic here
        setShowModal(false);
    };
    const handleDateChange = (e) => {
        setBidEndDate(e.target.value);
    };
    const getOrdinalSuffix = (num) => {
        if (num % 100 >= 11 && num % 100 <= 13) {
            return 'th';
        }
        switch (num % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const formatUserName = (user) => {
        const mask = (str) => {
            if (!str) return '';
            return '*'.repeat(str.length - 1);
        };
        const maskedFirstName = mask(user?.name);
        const maskedLastName = mask(user?.lastName);
        if (maskedFirstName && maskedLastName) {
            return `${maskedFirstName} ${maskedLastName}`;
        } else if (maskedFirstName) {
            return maskedFirstName;
        } else if (maskedLastName) {
            return maskedLastName;
        } else {
            return '';
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleEditClick = (product) => {
        if (product) {
            sessionStorage.setItem('productData', JSON.stringify(product));
            navigate(`/bmg/post-a-list/${product?.type.toLowerCase()}`);
        }
        switch (location.pathname) {
            case '/bmg/live-bid-monitoring':
                navigate(`/bmg/post-a-list/${product?.type.toLowerCase()}`, {
                    state: { disabled: true },
                });
                break;

            default:
                break;
        }
    };

    return (
        <Container fluid className="my-md-4 my-2 px-md-5 px-3">
            <Row className="align-items-center mb-3 mx-auto">
                {/* Header Section */}
                <Col className="d-flex align-items-center mt-2 pt-1 justify-content-center justify-content-md-start ">
                    <h5 className="fw-bold text-success">
                        <i
                            className="bi bi-arrow-left-circle-fill text-dark me-2 cursor-pointer"
                            onClick={handleBack}></i>
                        Auction &gt; Live Auction
                    </h5>
                </Col>
            </Row>
            <Row className="mx-auto">
                {/* Auction Card */}
                <Col sm={12} className="bg-light rounded-3">
                    <Card className="border-0 bg-transparent">
                        <Row className="mt-0 mx-auto">
                            {/* Product Image */}
                            <Col md={3} className="d-flex align-items-center mt-0 px-0">
                                <Card.Img
                                    src={auctionData?.image?.[0]}
                                    alt="Product image"
                                    className=" object-fit-cover add_width_height"
                                />
                            </Col>
                            <Col
                                md={9}
                                className="p-4 ps-md-4 ps-0 pe-0 py-0 d-flex flex-column justify-content-between">
                                <div className="row mx-auto">
                                    {/* Left Details Column */}
                                    <div className="col-md-9 col-12">
                                        <div className="row">
                                            <div className="top_heading_font col-12 mb-2">
                                                {auctionData?.Product_Name}
                                            </div>
                                            <div className="col-12 mb-2 add_condition_font">
                                                <img src={locations} alt="Location" className="me-1" />
                                                {auctionData?.Location || 'N/A'}
                                            </div>
                                            <div className="col-12 mb-2 add_condition_font">
                                                Condition :{' '}
                                                <span className="fw-bold">{auctionData?.condition || 'N/A'}</span>
                                            </div>
                                            <div className="col-12 mb-2 add_condition_font">
                                                Category :{' '}
                                                <span className="fw-bold">
                                                    {auctionData?.categoryId?.name || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="col-12 mb-2 add_condition_font">
                                                Product ID :{' '}
                                                <span className="fw-bold">
                                                    {auctionData?.productGenerateId || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="col-12 mb-2 add_condition_font">
                                                Manufacturing :{' '}
                                                <span className="fw-bold">
                                                    {auctionData?.yearofManufacturer || 'N/A'}
                                                </span>
                                            </div>
                                            <div
                                                className="col-12 mb-1 add_condition_font d-flex align-items-start justify-content-start"
                                                title={auctionData?.serialNumber ? auctionData.serialNumber
                                                    .replace(/<[^>]*>?/gm, '') // Strip HTML for tooltip
                                                    : 'N/A'
                                                }>
                                                Serial Number
                                                :
                                                <span
                                                    className="fw-bold add_botton_zero ms-1"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            auctionData?.serialNumber
                                                                ?.length > 100
                                                                ? `${auctionData.serialNumber
                                                                    .slice(0, 100)}...`
                                                                : auctionData?.serialNumber
                                                                || 'N/A',
                                                    }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right Auction Info Column */}
                                    <div className="col-md-3 col-12 d-flex align-items-start justify-content-md-end justify-content-start">
                                        <div className="row">
                                            <div className="add_font_small col-12 d-flex align-items-center justify-content-md-end justify-content-start">
                                                <span className="ms-1 add_date_time_font fw-medium">
                                                    <AuctionCountdown
                                                        startBidDateTime={formatDate(auctionData?.startBidDateTime)}
                                                        endBidDateTime={formatDate(auctionData?.endBidDateTime)}
                                                        className="p-0"
                                                    />
                                                </span>
                                            </div>
                                            <div className="add_font_small col-12 d-flex align-items-center justify-content-md-end pt-4 justify-content-start">
                                                Buy-Out Price :
                                                <span className="ms-1 add_date_time_font_price fw-bold">
                                                    ${auctionData?.Ask_Price || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="add_font_small col-12 d-flex align-items-center justify-content-md-end pt-2 justify-content-start">
                                                Start Bid Price :{' '}
                                                <span className="ms-1 add_date_time_font_price fw-bold">
                                                    {' '}
                                                    ${auctionData?.Start_Bid_Price || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="add_font_small col-12 d-flex align-items-center justify-content-md-end pt-2 justify-content-start">
                                                Highest Bid Amount :{' '}
                                                <span className="ms-1 add_date_time_font_price fw-bold">
                                                    {' '}
                                                    ${auctionData?.highBidingAmount || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="add_font_small col-12 d-flex align-items-center justify-content-md-end pt-2 justify-content-start">
                                                Time Zone :{' '}
                                                <span className="ms-1 add_date_time_font_price fw-bold">
                                                    {' '}
                                                    {auctionData?.timeZone || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="d-flex gap-2 mt-4 flex-wrap">
                                    <Button
                                        className="d-flex align-items-center justify-content-center rounded-3 add_font_button add_btn_color_varient px-4"
                                        onClick={() => {
                                            navigate(`/bmg/items/${auctionData?._id}`);
                                        }}>
                                        Product Info
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-2 mt-3">
                <hr className="my-3" />
                <Col xs={12} className="">
                    <h4 className="mx-1 mb-0 fs-6 fw-semibold">Live Monitoring</h4>
                </Col>
                {liveMonitoringData?.length > 0 ? (
                    <Row className="mx-auto mt-3">
                        <div className="table-container px-0">
                            <Table responsive hover className="custom-table mb-0">
                                <thead>
                                    <tr className="table-header">
                                        <th>Sno</th>
                                        <th>Customer Name</th>
                                        <th>Amount</th>
                                        <th>Product Name</th>
                                        <th>Model</th>
                                        <th>Seller's Location</th>
                                        <th>Buyer's Location</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liveMonitoringData?.map(({ user, bidingAmount, bidingId, product }, index) => (
                                        <tr
                                            key={product.id}
                                            style={{
                                                borderBottom:
                                                    index !== liveMonitoringData?.length - 1
                                                        ? '1px solid #d7d2d2'
                                                        : 'none',
                                                backgroundColor: index === 0 ? '#C9FAD2' : '',
                                            }}>
                                            <td>{index + 1}</td>
                                            <td>{formatUserName(user)}</td>
                                            <td className="text-success">
                                                {bidingAmount ? (
                                                    <>
                                                        <span className="text-dark">$</span>
                                                        {bidingAmount}
                                                    </>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>{product?.Product_Name || 'N/A'}</td>
                                            <td>{product?.Model || '-'}</td>
                                            <td style={{ cursor: 'pointer' }}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="overlay-example">{product?.Location}</Tooltip>
                                                    }>
                                                    <span className="text-primary">
                                                        {product?.Location?.slice(0, 30).concat('...') || 'N/A'}
                                                    </span>
                                                </OverlayTrigger>
                                            </td>
                                            <td style={{ cursor: 'pointer' }}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="overlay-example">{user?.address}</Tooltip>
                                                    }>
                                                    <span className="text-primary">
                                                        {user?.address?.slice(0, 30).concat('...') || 'N/A'}
                                                    </span>
                                                </OverlayTrigger>
                                            </td>
                                            <td
                                                className={`fw-bold ${index === 0
                                                    ? 'text-success'
                                                    : index === 1
                                                        ? 'text-warning'
                                                        : index === 2
                                                            ? 'text-danger'
                                                            : 'text-dark'
                                                    }`}>
                                                {`${index + 1}${getOrdinalSuffix(index + 1)}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                ) : (
                    <div className="text-danger text-center fw-bold">No Bid's Available !</div>
                )}

                <Modal show={showModal} size="md" onHide={handleModalClose} centered>
                    <Modal.Body>
                        <Row style={{ borderBottom: '3px solid #4a7652' }} className="mb-2 pb-2">
                            <Col sm={2}></Col>
                            <Col sm={8}>
                                <div className="d-flex justify-content-center">
                                    <h4>Edit Auction Details</h4>
                                </div>
                            </Col>
                            <Col sm={2} className="d-flex justify-content-end">
                                <IoIosCloseCircleOutline
                                    onClick={handleModalClose}
                                    className="text-danger fs-3 cursor-pointer"
                                />
                            </Col>
                        </Row>
                        <form>
                            <Row className="px-3">
                                <div className="mb-2 col-12">
                                    <label htmlFor="bidEndDate" className="form-label">
                                        Bid End Date :
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="bidEndDate"
                                        value={bidEndDate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                            </Row>
                            <Row className="me-1">
                                <div className="d-flex justify-content-end gap-2 mt-3 mb-2 pe-3">
                                    <Button className="custom-bordered-buttons" onClick={handleModalClose}>
                                        Close
                                    </Button>
                                    <Button className="custom-buttons" onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </div>
                            </Row>
                        </form>
                    </Modal.Body>
                </Modal>
            </Row>
        </Container>
    );
};

export default LiveMonitoring;
