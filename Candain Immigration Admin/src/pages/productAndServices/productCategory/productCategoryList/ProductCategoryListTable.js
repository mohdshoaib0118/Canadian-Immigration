import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import { FormInput } from '../../../../components';
import EditProductModel from './model/editProduct/EditProductModel';
import './ProductCategoryList.css'


const ProductCategoryListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };

    //model

    const [parentEditModel, setParentEditModel] = useState('')

    const openModalEditModel = (fill) => {
        setParentEditModel(fill)
    };

    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
    }


    const records = [
        { id: 1, product: 'Rugables', description: '', showHide: 'show' },
        { id: 2, product: 'large rugs', description: '', showHide: 'show' },
        { id: 3, product: 'Rugables', description: '', showHide: 'show' },
        { id: 4, product: 'Rugables', description: '', showHide: 'show' },
        { id: 5, product: 'Rugables', description: '', showHide: 'show' },
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
                                                    <div>New Product Category</div>
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
                                        <Table className="mb-0 mt-3" size="sm">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product Category Name</th>
                                                    <th>Description</th>
                                                    <th>Show/Hide</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {records.map((record, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{record.id}</th>
                                                            <td>{record.product}</td>
                                                            <td>{record.description}</td>
                                                            <td>{record.showHide}</td>
                                                            <td><Dropdown
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
                                                            </Dropdown></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>

                                        <div>
                                            <EditProductModel parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
                                        </div>
                                        <Row className='mt-3'>
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
                                                            <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <p className='mb-0 ms-2 me-2' >Go to page:
                                                            </p>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                className='input_Style px-1 py-1'
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <Pagination>
                                                    <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                                    <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                                    <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                                    <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                                    <Pagination className='pagination_style'>...</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>

                                                    <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                                </Pagination>
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

export default ProductCategoryListTable