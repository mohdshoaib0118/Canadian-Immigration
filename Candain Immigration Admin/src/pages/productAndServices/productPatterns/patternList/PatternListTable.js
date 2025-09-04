import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components';
import EditPattern from './model/editModelPattern/EditPattern';


const ActionColumn = ({ row }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

    //model

    const [parentEditModel, setParentEditModel] = useState('')

    const openModalEditModel = (fill) => {
        setParentEditModel(fill)
    };

    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
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
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                            <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalEditModel('lg')} >
                                <i className="mdi mdi-square-edit-outline" ></i>
                            </button>
                        </OverlayTrigger>{' '}

                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </OverlayTrigger>{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <EditPattern parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
            </div>
        </>
    );
};


const PatternListTable = ({ TableShowBtn }) => {

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };

    const columns = [
        {
            Header: 'Sr.No',
            accessor: 'order_id',
            sort: true,
            Cell: '2',
        },
        {
            Header: 'Pattern Name',
            accessor: 'order_date',
            sort: true,
            Cell: "Checks",
        },
        {
            Header: 'Image',
            accessor: 'payment_status',
            sort: true,
            Cell: "WASH AND FOLD",
        },
        {
            Header: 'Remarks',
            sort: true,
            Cell: "WASH AND FOLD",
        },
        {
            Header: 'Action',
            // accessor: 'action',
            sort: false,
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
                                <Row className="mb-2 d-flex align-items-center">
                                    <Col xl={12}>
                                        <div className="text-lg-end mt-xl-0 mt-2">
                                            <Button
                                                variant="white"
                                                className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                                onClick={btnHideShow}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <h3>
                                                        <i class="bi bi-plus me-1 text-dark" />
                                                    </h3>
                                                    <div>New Entery</div>
                                                </div>
                                            </Button>
                                        </div>
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
                                                {/* <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
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
                                                </Col> */}
                                            </Row>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table
                                            columns={columns}
                                            data={orders}
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
        </>)
}

export default PatternListTable