import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { assignedPackageCreate } from '../../../../redux/transactions/assignedPackageList/action';
import { useForm } from 'react-hook-form';

const AssignForm = ({ TableShowBtn }) => {
  const dispatch = useDispatch();

  const btnChild = () => {
    TableShowBtn()
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col className='d-flex justify-content-end'>
              <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                <div className='d-flex align-items-center'>
                  <h3>
                    <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                  </h3>
                  <div>Package List</div>
                </div>
              </Button>
            </Col>
          </Row>

          <Form noValidate onSubmit={
            handleSubmit((data) => {
              console.log(data)
              dispatch(assignedPackageCreate({
                pkgName: data.packageName,
              }));
            }, (err) => {
              console.log(err)
            })}
            className='px-3'>
            <Row className='p-3 mt-3 border'>
              <Col lg={12}>
                <Row className='my-3'>
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Row className='d-flex align-items-center'>
                        <Col lg={3}><Form.Label>Order id :</Form.Label></Col>
                        <Col lg={9}>
                          <Form.Control required {...register('orderId')} type="text" placeholder="" value='1' disabled />
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Row className='d-flex align-items-center'>
                        <Col lg={3}><Form.Label>Select Customer :</Form.Label></Col>
                        <Col lg={9}>
                          <Form.Group className="" placeholder='Member Group'>
                            <Form.Select id="disabledSelect" {...register('selectCustomer')} aria-label="Default select example" required>
                              <option hidden>--Select Customer--</option>
                              <option value="1">B select</option>
                              <option value="2">C select</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-3' >
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Row className='d-flex align-items-center'>
                        <Col lg={3}><Form.Label>Package Name :<span className='text-danger'>*</span>:</Form.Label></Col>
                        <Col lg={9}>
                          <Form.Group className="" placeholder='Member Group'>
                            <Form.Select id="disabledSelect" {...register('packageName')} aria-label="Default select example" required>
                              <option hidden>--Select Package--</option>
                              <option value="1">B select</option>
                              <option value="2">C select</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Row className='d-flex align-items-center'>
                        <Col lg={3}><Form.Label>Package start date :<span className='text-danger'>*</span>:</Form.Label></Col>
                        <Col lg={9}>
                          <Form.Control required {...register('packageStartDate ')} type="date" placeholder="" />
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Row className='d-flex align-items-center'>
                        <Col lg={3}><Form.Label>Payment Mode :<span className='text-danger'>*</span></Form.Label></Col>
                        <Col lg={9}>
                          <Form.Group className="" placeholder='Member Group'>
                            <Form.Select id="disabledSelect" {...register('paymentMode')} aria-label="Default select example" required>
                              <option hidden>--None--</option>
                              <option value="1">B select</option>
                              <option value="2">C select</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className='text-center  py-3'>
                    <Button type="submit" className='btn btn-success'>Save</Button>
                    <Button type="submit" className='btn btn-light ms-3'>Reset</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default AssignForm