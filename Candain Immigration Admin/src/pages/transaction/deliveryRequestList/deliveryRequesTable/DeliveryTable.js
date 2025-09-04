import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components';
import ViewModel from './model/view/ViewModel';
import DeliveryModel from './model/deliveryStatus/DeliveryModel';


const DeliveryStatus = () => {
    /**Delivery model */

    const [parentDelivery, setParentDelivery] = useState('');

    const opernMoalDelivery = (fill) => { setParentDelivery(fill) };

    const childEmptyDelivery = (empty) => { setParentDelivery(empty) };

    return (
        <>
            <div>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Schedule</Tooltip>}>
                    <button className='btn' onClick={() => opernMoalDelivery('lg')}>Schedule</button>
                </OverlayTrigger>{' '}
            </div>
            <div>
                <DeliveryModel parentDelivery={parentDelivery} childEmptyDelivery={childEmptyDelivery} />
            </div>
        </>
    )
}

const ActionColumn = () => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

    /**View model  */
    const [parentView, setParentView] = useState('');


    const opernMoalView = (fill) => { setParentView(fill) };

    const childEmptyView = (empty) => { setParentView(empty) };


    return (
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
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Assign Driver </Tooltip>}>
                            <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => alert("You can not assign a driver until the order status is Ready for Delivery.")}>
                                <i className="uil uil-truck"></i>
                            </button>
                        </OverlayTrigger>{' '}

                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white' onClick={() => opernMoalView("lg")}>
                                <i className="uil uil-search-plus"></i>
                            </button>
                        </OverlayTrigger>{' '}
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white' >
                                <i class="bi bi-trash3"></i>
                            </button>
                        </OverlayTrigger>{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <ViewModel parentView={parentView} childEmptyView={childEmptyView} />
            </div>
        </>
    );
};

const DeliveryTable = ({ TableShowBtn }) => {
    const [orderList, setOrderList] = useState(orders);

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnChild = () => {
        TableShowBtn()
    }
    const columns = [
        {
            Header: 'Slno',
            accessor: 'order_id',
            sort: true,
            Cell: '1',
        },
        {
            Header: 'Source',
            accessor: 'order_date',
            sort: true,
            Cell: "On Demand",
        },
        {
            Header: 'Order Place',
            accessor: 'payment_status',
            sort: true,
            Cell: "From Mobile	",
        },
        {
            Header: 'Store Name',
            sort: true,
            Cell: "The Wash House",

        },
        {
            Header: 'Driver Name',
            sort: true,
            Cell: '',

        },
        {
            Header: 'Order ID',
            sort: true,
            Cell: "OrderID",

        },
        {
            Header: 'Customer Name',
            accessor: 'order_status',
            sort: true,
            Cell: 'sdfs',
        },
        {
            Header: 'Phone',
            // accessor: 'action',
            sort: false,
            Cell: '7883647847	',

        },
        {
            Header: 'Address',
            // accessor: 'order_status',
            sort: true,
            Cell: '32, 145, Khas Bazar, General Ganj Kanpur',
        },
        {
            Header: 'Qty/Bag',
            // accessor: 'order_status',
            sort: true,
            Cell: '14',
        },
        {
            Header: 'Delivery Id Request',
            // accessor: 'order_status',
            sort: true,
            Cell: 'DEL100',
        },
        {
            Header: 'Delivery Date',
            // accessor: 'order_status',
            sort: true,
            Cell: 'Aug-05-2022',
        },
        {
            Header: 'Delivery time',
            sort: true,
            Cell: '6PM-8PM',

        },
        {
            Header: 'Order Status',
            sort: true,
            Cell: "Delivered",

        },
        {
            Header: 'Delivery Status',
            sort: true,
            Cell: DeliveryStatus,

        },
        {
            Header: "Action",
            accessor: 'action',
            sort: true,
            classes: 'table-action',
            Cell: ActionColumn,
        }
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className='d-flex justify-content-end'>
                                        <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild}>
                                            <div className='d-flex align-items-center'>
                                                <h3>
                                                    <i class="bi bi-plus me-1 text-dark" />
                                                </h3>
                                                <div>Create Delivery Request</div>
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className='d-flex align-items-center my-1'>
                                    <Col>
                                        <Row>
                                            <Col className="d-flex align-items-center mt-2 mb-2">
                                                <div>
                                                    <p className='mb-0 me-2' >Display</p>
                                                </div>
                                                <FormInput name="select" type="select" className="form-select form-select-sm" key="select">
                                                    <option>10</option>
                                                    <option>25</option>
                                                    <option>50</option>
                                                    <option>100</option>

                                                </FormInput>
                                                <div>
                                                    <p className='mb-0 ms-2' >records</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Col lg={12} className="d-flex justify-content-end mb-1 pe-3">
                                            <Row>
                                                <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
                                                    <span className="mdi mdi-magnify search-icon"></span>
                                                    <InputGroup>
                                                        <Form.Control placeholder="Search..." className='border-0 bg-light' />
                                                        <Dropdown
                                                            addonType="append"
                                                            isOpen={isSortDropdownOpen}
                                                            toggle={toggleSortDropDown}
                                                            align="end">
                                                            <Dropdown.Toggle variant="secondary">
                                                                <i className="uil uil-sort-amount-down "></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className='bg-light'>
                                                                <Dropdown.Item className='bg-light'>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
                                                                        <button className='border p-1 px-2 bt_color_hover bg-white'>
                                                                            <i class="bi bi-file-earmark-richtext"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}

                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Print</Tooltip>}>
                                                                        <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                            <i class="bi bi-printer"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className='bg-light'>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to PDF</Tooltip>}>
                                                                        <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                            <i class="bi bi-file-earmark-x"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}

                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to Excel</Tooltip>}>
                                                                        <button className='border p-1 ms-3 px-2 bt_color_hover  bg-white'>
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
                                <Row>
                                    <Col>
                                        <Table
                                            columns={columns}
                                            data={orderList}
                                            pageSize={10}
                                            sizePerPageList={sizePerPageList}
                                            isSortable={true}
                                            pagination={true}
                                            isSelectable={true}
                                            // isSearchable={true}
                                            theadClass="table-light"
                                        // searchBoxClass="mb-2"
                                        />
                                        <Row className='mt-3'>
                                            <Col>
                                                <div>
                                                    <p className='mb-0'>Showing 1 to 25 of 50 entries1 row selected</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DeliveryTable