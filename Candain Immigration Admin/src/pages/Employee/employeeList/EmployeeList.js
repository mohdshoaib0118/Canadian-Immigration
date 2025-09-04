import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, InputGroup, Spinner, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import FormInput from "../../../components/FormInput"
import { Link } from 'react-router-dom';
import './Employee.css';
import Edit from './model/editModel/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDetails, employeeList } from '../../../redux/actions';
import Loader from "../../../components/MainLoader"

const EmployeeList = ({ showBtn }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const store = useSelector((state) => state);
    const employeListData = store.EmployeeList;
    const [searchEmp, setSearchEmp] = useState("")
    const employeeDataList = store.EmployeeList;
    const paginationValues = store.EmployeeList?.employeeList?.meta?.pagination
    const [searchText, setSearchText] = useState("")
    console.log(store, 'store');

    const btnTransfer = () => {
        showBtn();
    };
    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const openModalWithScrolls = (fill, emp_id) => {
        setParentEdit(fill);
        dispatch(employeeDetails({ employeeId: emp_id }))
    };

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model

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

    useEffect(() => {
        dispatch(
            employeeList({
                storeId: [],
                searchValue: searchEmp,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [page, showLimit, searchText]);
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2 d-flex align-items-center">
                                <Col xl={8}>
                                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <label htmlFor="status-select" className="me-2">
                                                    Search :
                                                </label>
                                                <div>
                                                    <input
                                                        value={searchEmp}
                                                        onChange={(e) => {
                                                            setSearchEmp(e.target.value)
                                                        }}
                                                        type="text "
                                                        className="border_none border p-1"
                                                        placeholder="100 words.."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 mt-2">
                                        <Button
                                            variant="white"
                                            className="mb-2 border py-0 pe-4 bg-primary btn-sm text-white me-2"
                                            onClick={() => { btnTransfer() }}>
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

                            <Row className="h-100 position-relative">
                            {employeeDataList.loading && <Loader />}
                                <Col className=" overflow-auto table_container">
                                    <Table className="mb-0 table">
                                        <thead>
                                            <tr className="bg-light">
                                                <th scope="col" className="text-truncate">
                                                    Emp Id
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Join Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Name
                                                </th>
                                                {/* <th scope="col" className="text-truncate">
                                                    Last Name
                                                </th> */}
                                                {/* <th scope="col" className="text-truncate">
                                                    Country Code
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Country Prefix Code
                                                </th> */}
                                                <th scope="col" className="text-truncate">
                                                    Contact
                                                </th>
                                                {/* <th scope="col" className="text-truncate">
                                                    Email Id
                                                </th> */}
                                                {/* <th scope="col" className="text-truncate">
                                                    Address1
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Address2
                                                </th> */}
                                                {/* <th scope="col" className="text-truncate">
                                                    City
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    State
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Zipcode
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Gender
                                                </th> */}
                                                <th scope="col" className="text-truncate">
                                                    Laundry Store
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Login Status
                                                </th>
                                                {/* <th scope="col" className="text-truncate">
                                                    Designation
                                                </th>*/}
                                                <th scope="col" className="text-truncate">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner> */}
                                            {employeListData?.employeeList?.data?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.emp_id}</th>
                                                        <td className="text-truncate">{item.join_date}</td>
                                                        <td className="text-truncate">  {item.first_name} {item.last_name}</td>
                                                        {/* <td className="text-truncate">{item.last_name}</td> */}
                                                        {/* <td className="text-truncate">{item.country_prefix_code}</td> */}
                                                        {/* <td className="text-truncate">{item.country_code}</td> */}
                                                        <td className="text-truncate">{item.mobile}</td>
                                                        {/* <td className="text-truncate">{item.email_id}</td> */}
                                                        {/* <td className="text-truncate">{item.address1}</td> */}
                                                        {/* <td className="text-truncate">{item.address2}</td> */}
                                                        {/* <td className="text-truncate">{item.city}</td> */}
                                                        {/* <td className="text-truncate">{item.state}</td> */}
                                                        {/* <td className="text-truncate">{item.zipcode}</td> */}
                                                        {/* <td className="text-truncate">{item.gender}</td> */}
                                                        {/* <td className="text-truncate">{item.designation}</td> */}
                                                        <td className="text-truncate">{item.store_list}</td>
                                                        <td className="text-truncate">{item.status.toUpperCase()}</td>
                                                        <td className="text-truncate">
                                                            <Link to="#" className="action-icon">
                                                                <i
                                                                    className="mdi mdi-square-edit-outline"
                                                                    onClick={() => openModalWithScrolls('lg', item.emp_id)}></i>
                                                            </Link>
                                                            <Link to="#" className="action-icon">
                                                                <i className="mdi mdi-delete"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Edit parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default EmployeeList;
