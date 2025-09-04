import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import Table from '../../../../components/Table';
import { Link } from 'react-router-dom';
import { FormInput } from '../../../../components';
import AssignModel from './model/assignDriver/AssignModel';
import ViewModel from './model/view/ViewModel';



const Slno = ({ row }) => {

    return (
        <>
            <Link to="#" className="text-body fw-bold">
                1
            </Link>
        </>
    );
};

const Source = ({ row }) => {
    return (
        <>
            On Demand
        </>
    );
};

const pickupDate = () => {
    return (
        <>
            <p>Jan-04-2023</p>
        </>
    );
};

const customerName = ({ row }) => {
    return (
        <>
            <div>
                AJ
            </div>
        </>
    );
};



const driverName = () => {
    return (
        <>
            <div></div>
        </>
    )
}

const storeName = () => {
    return (
        <>
            <p>
                TOPWASH KANDIVALI
            </p>
        </>
    )
}

const Phone = () => {
    return (
        <>
            <div>
                123456789
            </div>
        </>
    );
};

const Address = () => {
    return (
        <>
            <div>
                G8PM+J26, Alirajpur-Dahod Rd Chandrashekhar Azad Nagar
                Madhya Pradesh 457882
            </div>
        </>
    )
}

const qtyBag = () => {
    return (
        <>
            <div>
                9
            </div>
        </>
    )
}

const pickupIdRequest = () => {
    return (
        <>
            <div>
                PIC77
            </div>
        </>
    )
}

const orderPlace = () => {
    return (
        <>
            <div>
                admin
            </div>
        </>
    )
}

const pickupTime = () => {
    return (
        <>
            <div>8AM-10AM</div>
        </>
    )
}

const orderStatus = () => {
    return (
        <>
            <div>Order is not created.</div>
        </>
    )
}

const pickupStatus = () => {
    return (
        <>
            <div>
                Ready to Driver
            </div>
        </>
    )
}

const ActionColumn = () => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    /**assign driver model */

    const [parentAssign, setParentAssign] = useState('')

    const openModalWithScroll = (fill) => {
        setParentAssign(fill)
    };

    const childEmptyAssign = (empty) => {
        setParentAssign(empty)
    }

    /**View model  */
    const [parentView, setParentView] = useState('')


    const opernMoalView = (fill) => {
        setParentView(fill)
    }

    const childEmptyView = (empty) => {
        setParentAssign(empty)
    }


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
                            <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalWithScroll("lg")}>
                                <i className="uil uil-truck"></i>
                            </button>
                        </OverlayTrigger>{' '}

                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white' onClick={() => opernMoalView("lg")}>
                                <i className="uil uil-search-plus"></i>
                            </button>
                        </OverlayTrigger>{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AssignModel parentAssign={parentAssign} childEmptyAssign={childEmptyAssign} />
            <ViewModel parentView={parentView} childEmptyView={childEmptyView} />
        </>
    );
};

const PickupTable = ({ TableShowBtn }) => {
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
            Cell: Slno,
        },
        {
            Header: 'Source',
            accessor: 'order_date',
            sort: true,
            Cell: Source,
        },
        {
            Header: 'Order Place',
            accessor: 'payment_status',
            sort: true,
            Cell: orderPlace,
        },
        {
            Header: 'Store Name',
            sort: true,
            Cell: storeName,

        },
        {
            Header: 'Driver Name',
            sort: true,
            Cell: driverName,

        },
        {
            Header: 'Customer Name',
            accessor: 'order_status',
            sort: true,
            Cell: customerName,
        },
        {
            Header: 'Phone',
            // accessor: 'action',
            sort: false,
            Cell: Phone,

        },
        {
            Header: 'Address',
            // accessor: 'order_status',
            sort: true,
            Cell: Address,
        },
        {
            Header: 'Qty/Bag',
            // accessor: 'order_status',
            sort: true,
            Cell: qtyBag,
        },
        {
            Header: 'Pickup Id Request',
            // accessor: 'order_status',
            sort: true,
            Cell: pickupIdRequest,
        },
        {
            Header: 'Pickup Date',
            // accessor: 'order_status',
            sort: true,
            Cell: pickupDate,
        },
        {
            Header: 'Pickup Time',
            sort: true,
            Cell: pickupTime,

        },
        {
            Header: 'Order Status',
            sort: true,
            Cell: orderStatus,

        },
        {
            Header: 'Pickup Status',
            sort: true,
            Cell: pickupStatus,

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
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className='d-flex justify-content-end'>
                                    <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                        <div className='d-flex align-items-center'>
                                            <h3>
                                                <i class="bi bi-plus me-1 text-dark" />
                                            </h3>
                                            <div>Create Pickup Request</div>
                                        </div>
                                    </Button></Col>
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
    )
}

export default PickupTable