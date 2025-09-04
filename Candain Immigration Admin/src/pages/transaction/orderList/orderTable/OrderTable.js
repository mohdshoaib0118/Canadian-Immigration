import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Spinner, Card, OverlayTrigger, Tooltip, Table, Pagination } from 'react-bootstrap';
import './OrderTable.css';
import { FormInput } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { ordersList } from '../../../../redux/transactions/order/actions';
import Racks from '../model/racks/Racks';
import DeliveryModel from '../model/deliveryRequest/DeliveryModel';
import ShowHide from '../model/showHideColumns/ShowHide';
import OrderNotes from '../model/order/OrderNotes';
import Loader from "../../../../components/MainLoader"

const OrderTable = () => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const orderListdata = store.OrderList;
    const ordersDataList = store.OrderList;
    const paginationValues = store.OrderList?.orderList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const storeList = JSON.parse(localStorage.getItem('storeList')).map((itm) => itm.order_id);

    const getOrderList = () => {
        console.log('first');
        dispatch(
            ordersList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
                orderDate: '',
            })
        );
    };

    useEffect(() => {
        getOrderList();
    }, [page, showLimit, searchText]);


    //Dropdown 
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    //order Table all model
    const [parentFill, setParentFill] = useState('')

    const openModalWithSize = (fill) => {
        setParentFill(fill)
    };

    const childEmpty = (empty) => {
        setParentFill(empty)
    }

    /***model Rocks*/
    const [parentRocks, setParentRocks] = useState('')

    const openModalWithScroll = (fill) => {
        setParentRocks(fill)
    };
    // start pagination 
    const getPaginationNumberView = () => {
        const collectionPagination = []
        console.log(paginationValues.total_page - page, "pagination")
        if ((paginationValues.total_page - page) <= 5) {
            console.log("cmcm")
            for (let i = paginationValues.total_page - 5; i <= paginationValues.total_page; i++) {
                const active = page === i
                collectionPagination.push((<Pagination className={active ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"} onClick={() => {
                    setPage(i)
                }}>{i}</Pagination>))
            }
        } else {

            for (let i = 0; i < 5; i++) {
                const active = page === (page + i)
                collectionPagination.push((<Pagination className={active ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"} onClick={() => {
                    setPage(page + i)
                }}>{page + i}</Pagination>))
            }
            collectionPagination.push((<Pagination className='pagination_style'>...</Pagination>
            ))
            collectionPagination.push((<Pagination onClick={() => {
                setPage(paginationValues.total_page)
            }} className={page === paginationValues.total_page ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"}>{paginationValues.total_page}</Pagination>))
        }

        return collectionPagination
    }
    // end pagination 


    const childEmptyRock = (empty) => {
        setParentRocks(empty)
    }

    /** model Delivery */
    const [parentDelivery, setParentDelivery] = useState('')

    const openModalWithScrolls = (fill) => {
        setParentDelivery(fill)
    };

    const childEmptyDelivery = (empty) => {
        setParentDelivery(empty)
    }

    //model sidebar model hide and show
    const [parentShowHide, setParentShowHide] = useState('')

    const openModalWithClass = (fill) => {
        setParentShowHide(fill)
    };

    const childEmptyShowHide = (empty) => {
        setParentShowHide(empty)
    }


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card className='h-100'>
                        <Card.Body>
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <Col lg={12} className="d-flex justify-content-end mb-1 pe-3">
                                        <Row>
                                            <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
                                                <span className="mdi mdi-magnify search-icon"></span>
                                                <InputGroup>
                                                    <Form.Control
                                                        placeholder="Search..."
                                                        className="border-0 bg-light"
                                                        onChange={(e) => {
                                                            setSearchText(e.target.value)
                                                        }}
                                                    />
                                                    <Dropdown
                                                        addonType="append"
                                                        isOpen={isSortDropdownOpen}
                                                        toggle={toggleSortDropDown}
                                                        align="end">
                                                        <Dropdown.Toggle variant="secondary">
                                                            <i className="uil uil-sort-amount-down "></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="bg-light">
                                                            <Dropdown.Item className="bg-light">
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            Show hide columns
                                                                        </Tooltip>
                                                                    }>
                                                                    <button
                                                                        className="border p-1 px-2 bt_color_hover bg-white"
                                                                        onClick={() =>
                                                                            openModalWithClass('modal-right')
                                                                        }>
                                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                                    </button>
                                                                </OverlayTrigger>{' '}
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            Copy to clipboard
                                                                        </Tooltip>
                                                                    }>
                                                                    <button className="border p-1 px-2 ms-3 bt_color_hover bg-white">
                                                                        <i class="bi bi-file-earmark-richtext"></i>
                                                                    </button>
                                                                </OverlayTrigger>{' '}
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example"> Print</Tooltip>
                                                                    }>
                                                                    <button className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                                                        <i class="bi bi-printer"></i>
                                                                    </button>
                                                                </OverlayTrigger>{' '}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="bg-light">
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            {' '}
                                                                            Export to PDF
                                                                        </Tooltip>
                                                                    }>
                                                                    <button className="border p-1 px-2 bt_color_hover bg-white ">
                                                                        <i class="bi bi-file-earmark-x"></i>
                                                                    </button>
                                                                </OverlayTrigger>{' '}
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            {' '}
                                                                            Export to Excel
                                                                        </Tooltip>
                                                                    }>
                                                                    <button className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
                                                                        <i class="bi bi-file-earmark-pdf"></i>
                                                                    </button>
                                                                </OverlayTrigger>{' '}
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className='h-100'>
                                {ordersDataList?.loading && <Loader />}
                                <Col className='overflow-auto table_container'>
                                    <Table className="mb-0 mt-3" size="sm">
                                        <thead>
                                            <tr className="bg-light">
                                                <th scope="col" className="text-truncate">
                                                    Order Id
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Source
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Zero Order
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Invoice Number
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Customer Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    qty
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    kg
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Unit
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Paid Status
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Service Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Total Amount
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Days
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order Status
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Delivery Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Delivery Time
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Pickup Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Pickup Time
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Bag Count
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Rack Count
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Recorded Weight
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order Note
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Item Note
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order Time
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Customer Phone Number
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Customer Exist
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderListdata?.orderList?.data?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.order_id}</th>
                                                        <td className="text-truncate">{item.source}</td>
                                                        <td className="text-truncate">{item.zero_order}</td>
                                                        <td className="text-truncate">{item.invoice_number}</td>
                                                        <td className="text-truncate">{item.customer_name}</td>
                                                        <td className="text-truncate">{item.qty}</td>
                                                        <td className="text-truncate">{item.kg}</td>
                                                        <td className="text-truncate">{item.unit}</td>
                                                        <td className="text-truncate">{item.paid_status}</td>
                                                        <td className="text-truncate">{item.service_name}</td>
                                                        <td className="text-truncate">{item.total_amount}</td>
                                                        <td className="text-truncate">{item.days}</td>
                                                        <td className="text-truncate">{item.order_status}</td>
                                                        <td className="text-truncate">{item.delivery_date}</td>
                                                        <td className="text-truncate">{item.delivery_time}</td>
                                                        <td className="text-truncate">{item.pickup_date}</td>
                                                        <td className="text-truncate">{item.pickup_time}</td>
                                                        <td className="text-truncate">{item.bag_count}</td>
                                                        <td className="text-truncate">{item.rack_count}</td>
                                                        <td className="text-truncate">23</td>
                                                        <td className="text-truncate">false</td>
                                                        <td className="text-truncate">false</td>
                                                        <td className="text-truncate">{item.order_date}</td>
                                                        <td className="text-truncate">{item.order_time}</td>
                                                        <td className="text-truncate">{item.customer_phone_number}</td>
                                                        <td className="text-truncate">true</td>
                                                        <td>
                                                            <>
                                                                <Dropdown
                                                                    addonType="append"
                                                                    isOpen={isSortDropdownOpen}
                                                                    toggle={toggleSortDropDown}
                                                                    align="end">
                                                                    <Dropdown.Toggle variant="light ">
                                                                        <i className="uil uil-sort-amount-down "></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className='bg-light px-2'>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Order Notes </Tooltip>}>
                                                                                <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalWithSize("lg")}>
                                                                                    <i class="bi bi-info-lg text-dark  "></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                                    <i class="bi bi-pencil-square"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'>
                                                                                    <i class="bi bi-trash3"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Mini invoice </Tooltip>}>
                                                                                <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                                    <i class="bi bi-file-earmark-text"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> whats App </Tooltip>}>
                                                                                <button className='border p-1 ms-3 px-2 bt_color_hover bg-white'>
                                                                                    <i class="bi bi-whatsapp"></i></button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Send sms </Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'><i class="bi bi-envelope"></i></button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Racks</Tooltip>}>
                                                                                <button className='border p-1 px-2  bg-white bt_color_hover' onClick={() => openModalWithScroll("lg")}>
                                                                                    <i class="bi bi-image"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delivery Request </Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3  bg-white bt_color_hover' onClick={() => openModalWithScrolls("lg")}><i className="uil uil-truck"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Packing Sticker </Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'><i className="uil uil-smile"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Barcode</Tooltip>}>
                                                                                <button className='border p-1 px-2  bg-white bt_color_hover' >
                                                                                    <i className="uil uil-newspaper"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                                <div>
                                    <Racks parentRocks={parentRocks} childEmptyRock={childEmptyRock} />
                                    <OrderNotes parentFill={parentFill} childEmpty={childEmpty} />
                                    <DeliveryModel parentDelivery={parentDelivery} childEmptyDelivery={childEmptyDelivery} />
                                </div>
                                {paginationValues && <Col lg={12}>
                                    <Row className='mt-3'>
                                        <Col>
                                            <Row>
                                                <Col className="d-flex align-items-center mt-2 mb-2">
                                                    <div>
                                                        <p className='mb-0 me-2' >Display</p>
                                                    </div>
                                                    <FormInput name="select" type="select" className="form-select form-select-sm" key="select" onChange={(e) => {
                                                        console.log(e.target.value)
                                                        setShowLimit(e.target.value)
                                                    }}>
                                                        <option>10</option>
                                                        <option>25</option>
                                                        <option>50</option>
                                                        <option>100</option>
                                                    </FormInput>
                                                    <div>
                                                        <p className='mb-0 ms-2' >Page <span className='fw-bold'>{`${page} of ${paginationValues.total_page}`}</span></p>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <p className='mb-0 ms-2 me-2' >Go to page:
                                                        </p>
                                                        <Form.Control
                                                            max={paginationValues.total_page}
                                                            min={1}
                                                            value={page}
                                                            required
                                                            type="number"
                                                            className='input_Style px-1 py-1'
                                                            onChange={(e) => {
                                                                setPage(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='d-flex justify-content-end'>
                                            <Pagination>
                                                <Pagination onClick={() => {
                                                    setPage((page - 1) > 0 ? page - 1 : 1)
                                                }} className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                                {getPaginationNumberView()}
                                                <Pagination onClick={() => {
                                                    setPage((page + 1) < paginationValues.total_page ? page + 1 : paginationValues.total_page)
                                                }} className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                            </Pagination>
                                        </Col>
                                    </Row>
                                </Col>}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
            {/* model */}
            <div div >
                <ShowHide parentShowHide={parentShowHide} childEmptyShowHide={childEmptyShowHide} />
            </div >
        </>
    );
};

export default OrderTable;
