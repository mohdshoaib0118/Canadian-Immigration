import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, Collapse, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components';
// import DriverForm from './driverListForm/DriverForm';
import DriverForm from '../driverFormAccordions/DriverForm';

const DriverListTable = () => {
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


  // Accordions

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  };


  const columns = [
    {
      Header: 'Order	',
      accessor: 'order_id',
      Cell: '',
    },
    {
      Header: 'Customer Name	',
      accessor: 'order_date',
      Cell: "",
    },
    {
      Header: 'Driver Name	',
      accessor: 'payment_status',
      Cell: "",
    },
    {
      Header: 'Mobile',
      Cell: "",
    },
    {
      Header: 'Store Name	',
      Cell: '',

    },
    {
      Header: 'Pickup Date	',
      Cell: "",
    },
    {
      Header: 'Delivery Date	',
      accessor: 'order_status',
      Cell: '',
    },
    {
      Header: 'Order Status	',
      Cell: '',
    },
    {
      Header: 'Payment Status	',
      Cell: '',
    },
    {
      Header: 'Payment Date	',
      Cell: '',
    },
    {
      Header: 'Order Type	',
      Cell: '',
    },
    {
      Header: 'Payment Details	',
      Cell: '',
    },
    {
      Header: 'Qty/Kg		',
      Cell: '',
    },
    {
      Header: 'Currency	',
      Cell: '',
    },
    {
      Header: 'Amount	',
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
                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                      <div className='d-flex align-items-center'>
                        <h3>
                          <i class="bi bi-plus me-1 text-dark" />
                        </h3>
                        <div>Driver Form</div>
                      </div>
                    </Button></Col>
                  <DriverForm isOpen={isOpen} />
                  {/* <Collapse in={isOpen}>
                    <div>
                      <div className="card card-body mb-0">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                        richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                        anderson cred nesciunt sapiente ea proident.
                      </div>
                    </div>
                  </Collapse> */}
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
                    <Col lg={12} className="d-flex justify-content-end mb-1 pe-2">
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

export default DriverListTable