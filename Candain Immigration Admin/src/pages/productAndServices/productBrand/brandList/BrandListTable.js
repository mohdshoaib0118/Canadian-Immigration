import React, { useState, useEffect } from 'react';
import { FormInput } from '../../../../components';
import BrandEditModel from './model/brandEditModel/BrandEditModel';
import { brandList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import './BrandList.css'
import Loader from "../../../../components/MainLoader"

const ActionColumn = (props) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);


    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

    //model
    const [getRowData, setRowData] = useState('')

    const [parentBrandEditModel, setParentBrandEditModel] = useState('')

    const openModalBrandEditModel = (fill) => {
        setParentBrandEditModel(fill);
        setRowData(props.rowData)
    };

    const childEmptyEditModel = (empty) => {
        setParentBrandEditModel(empty)
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
                            <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalBrandEditModel('lg')} >
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
                <BrandEditModel rowData={getRowData} parentBrandEditModel={parentBrandEditModel} openModalBrandEditModel={openModalBrandEditModel} />
            </div>
        </>
    );
};

const imageFormatter = (cell) => {
    return (<img style={{ width: 50 }} src={cell} />)
}

const BrandListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandListData = store.BrandList;
    const brandListDataList = store.BrandList;
    const paginationValues = store.BrandList?.brandList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const btnHideShow = () => {
        TableShowBtn();
    };

    // start pagination 
    const getPaginationNumberView = () => {
        const collectionPagination = []
        console.log(paginationValues.total_page - page, "pagination")
        if ((paginationValues.total_page - page) <= 5) {
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

    useEffect(() => {
        dispatch(brandList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])


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
                                        <Col lg={12} className="d-flex justify-content-end mb-1 pe-3">
                                            <Row>
                                                <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
                                                    <span className="mdi mdi-magnify search-icon"></span>
                                                    <InputGroup>
                                                        <Form.Control placeholder="Search..." className='border-0 bg-light' onChange={(e) => {
                                                            setSearchText(e.target.value)
                                                        }} />
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
                                    {brandListDataList?.loading && <Loader />}

                                    <Col>
                                        <Table className="mb-0 mt-3" size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Sr.No.</th>
                                                    <th>Brand Name</th>
                                                    <th>Image</th>
                                                    <th>Remarks</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brandListData?.brandList?.data?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td >{item.brand_name}</td>
                                                            <td >{imageFormatter(item.images)}</td>
                                                            <td >{item.brand_remark}</td>
                                                            <td><ActionColumn
                                                                rowData={item}
                                                            ></ActionColumn></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
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
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>)
}

export default BrandListTable