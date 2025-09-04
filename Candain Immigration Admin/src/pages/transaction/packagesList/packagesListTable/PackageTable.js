import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Pagination, Table } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import { FormInput } from '../../../../components';
import { useEffect } from 'react';
import { assignedPackageList } from '../../../../redux/transactions/assignedPackageList/action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../../../components/MainLoader"

const PackageTable = ({ TableShowBtn, showBtn }) => {

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const toggleSortDropDown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const btnChild = () => {
    TableShowBtn()
  }
  const dispatch = useDispatch();

  const store = useSelector((state) => state);
  const getPackageListdata = store.AssignedPackageList;
  const packageDataList = store.AssignedPackageList;
  const [searchText, setSearchText] = useState("")
  const paginationValues = store.AssignedPackageList?.assignedPackageLists?.meta?.pagination
  const [showLimit, setShowLimit] = useState(10)
  const [page, setPage] = useState(1)

  const btnTransfer = () => {
    showBtn();
  };
  //start Model
  const [parentEdit, setParentEdit] = useState('');


  const childEmptyEdit = (empty) => {
    setParentEdit(empty);
  };
  // end model
  const getPackageList = () => {
    dispatch(
      assignedPackageList({
        searchValue: searchText,
        pageNumber: page,
        showLimit: showLimit,
      })
    );
  };
  useEffect(() => {
    getPackageList();
  }, [page, showLimit, searchText]);

  const [parentDelivery, setParentDelivery] = useState('')

  const openModalWithScrolls = (fill) => {
    setParentDelivery(fill)
  };

  const childEmptyDelivery = (empty) => {
    setParentDelivery(empty)
  }

  const [parentRocks, setParentRocks] = useState('')

  const openModalWithScroll = (fill) => {
    setParentRocks(fill)
  };

  const childEmptyRock = (empty) => {
    setParentRocks(empty)
  }

  const [parentFill, setParentFill] = useState('')

  const openModalWithSize = (fill) => {
    setParentFill(fill)
  };

  const childEmpty = (empty) => {
    setParentFill(empty)
  }

  const [parentShowHide, setParentShowHide] = useState('');

  const openModalWithClass = (fill) => {
    setParentShowHide(fill);
  };

  const childEmptyShowHide = (empty) => {
    setParentShowHide(empty);
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
                        <div>Assign Package</div>
                      </div>
                    </Button>
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

                <Row className='h-100'>
                  {packageDataList?.loading && <Loader />}
                  <Col lg={12} className='overflow-auto table_container'>
                    <Table className="mb-0 mt-3" size="sm">
                      <thead>
                        <tr className="bg-light">
                          <th scope="col" className="text-truncate">
                            Order#
                          </th>
                          <th scope="col" className="text-truncate">
                            Name
                          </th>
                          <th scope="col" className="text-truncate">
                            Package
                          </th>
                          <th scope="col" className="text-truncate">
                            Period
                          </th>
                          <th scope="col" className="text-truncate">
                            Pickup
                          </th>
                          <th scope="col" className="text-truncate">
                            Pickup Start Date
                          </th>
                          <th scope="col" className="text-truncate">
                            Expire
                          </th>
                          <th scope="col" className="text-truncate">
                            Pay Mode
                          </th>
                          <th scope="col" className="text-truncate">
                            Pay Date
                          </th>
                          <th scope="col" className="text-truncate">
                            Pkg Status
                          </th>
                          <th scope="col" className="text-truncate">
                            Amount
                          </th>
                          <th scope="col" className="text-truncate">
                            Capacity
                          </th>
                          <th scope="col" className="text-truncate">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPackageListdata?.assignedPackageLists?.data?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{item.pkg_id}</th>
                              <td className="text-truncate">{item.customer_name}</td>
                              <td className="text-truncate">{item.pref_pkg}</td>
                              <td className="text-truncate">{item.pref_period}</td>
                              <td className="text-truncate">{item.pref_pickup}</td>
                              <td className="text-truncate">{item.pref_pickup_date}</td>
                              <td className="text-truncate">{item.pkg_expire_date}</td>
                              <td className="text-truncate">{item.payment_mode}</td>
                              <td className="text-truncate">{item.payment_date}</td>
                              <td className="text-truncate">{item.pkg_active}</td>
                              <td className="text-truncate">{item.amount}</td>
                              <td className="text-truncate">{item.pkg_unit}</td>
                              <td>
                                <Dropdown
                                  addonType="append"
                                  isOpen={isSortDropdownOpen}
                                  toggle={toggleSortDropDown}
                                  align="end">
                                  <Dropdown.Toggle variant="light ">
                                    <i className="uil uil-sort-amount-down "></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="bg-light px-2">
                                    <Dropdown.Item className="bg-light">
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            Order Notes{' '}
                                          </Tooltip>
                                        }>
                                        <button
                                          className="border p-1 px-2 bt_color_hover bg-white"
                                          onClick={() => openModalWithSize('lg')}>
                                          <i class="bi bi-info-lg text-dark  "></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example"> Edit </Tooltip>
                                        }>
                                        <button className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                          <i class="bi bi-pencil-square"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example"> Delete </Tooltip>
                                        }>
                                        <button className="border p-1 px-2 ms-3  bg-white bt_color_hover">
                                          <i class="bi bi-trash3"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                    </Dropdown.Item>
                                    <Dropdown.Item className="bg-light">
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            Mini invoice{' '}
                                          </Tooltip>
                                        }>
                                        <button className="border p-1 px-2 bt_color_hover bg-white ">
                                          <i class="bi bi-file-earmark-text"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            whats App{' '}
                                          </Tooltip>
                                        }>
                                        <button className="border p-1 ms-3 px-2 bt_color_hover bg-white">
                                          <i class="bi bi-whatsapp"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            Send sms{' '}
                                          </Tooltip>
                                        }>
                                        <button className="border p-1 px-2 ms-3  bg-white bt_color_hover">
                                          <i class="bi bi-envelope"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                    </Dropdown.Item>
                                    <Dropdown.Item className="bg-light">
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example"> Racks</Tooltip>
                                        }>
                                        <button
                                          className="border p-1 px-2  bg-white bt_color_hover"
                                          onClick={() => openModalWithScroll('lg')}>
                                          <i class="bi bi-image"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            Delivery Request{' '}
                                          </Tooltip>
                                        }>
                                        <button
                                          className="border p-1 px-2 ms-3  bg-white bt_color_hover"
                                          onClick={() => openModalWithScrolls('lg')}>
                                          <i className="uil uil-truck"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example">
                                            {' '}
                                            Packing Sticker{' '}
                                          </Tooltip>
                                        }>
                                        <button className="border p-1 px-2 ms-3  bg-white bt_color_hover">
                                          <i className="uil uil-smile"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                    </Dropdown.Item>
                                    <Dropdown.Item className="bg-light">
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="overlay-example"> Barcode</Tooltip>
                                        }>
                                        <button className="border p-1 px-2  bg-white bt_color_hover">
                                          <i className="uil uil-newspaper"></i>
                                        </button>
                                      </OverlayTrigger>{' '}
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
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
        </Row>
      </div>
    </>
  );
};

export default PackageTable;