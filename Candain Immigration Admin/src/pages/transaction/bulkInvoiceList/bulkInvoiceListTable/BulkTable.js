import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components';

const BulkTable = () => {
    const order = [{
        id: 1,
        name: '2500 Club Coupe',
        category: 'GMC',
        image: 'https://robohash.org/optioanimiullam.png?size=100x100&set=set1',
        added_date: '2/17/2019',
        rating: 3,
        price: 451.05,
        quantity: 157,
        status: true,
    }]

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };


    const columns = [
        {
            Header: 'Sr.No.',
            accessor: 'order_id',
            sort: true,
            Cell: '',
        },
        {
            Header: 'Bulk Invoice Id',
            accessor: 'order_date',
            sort: true,
            Cell: "",
        },
        {
            Header: 'Customer Name',
            accessor: 'payment_status',
            sort: true,
            Cell: "",
        },
        {
            Header: 'Bulk Invoice Created Date',
            sort: true,
            Cell: "",
        },
        {
            Header: 'Total Amount',
            sort: true,
            Cell: '',

        },
        {
            Header: 'Details',
            sort: true,
            Cell: "",
        },
        {
            Header: 'Status',
            accessor: 'order_status',
            sort: true,
            Cell: '',
        },
        {
            Header: 'Action',
            // accessor: 'action',
            sort: false,
            Cell: '',
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
                                            data={order}
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

export default BulkTable