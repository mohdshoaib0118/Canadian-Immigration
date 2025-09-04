import React, { useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
// import AddCustomer from './model/AddCustomer';

const CreateForm = ({ TableShowBtn }) => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
    };

    const btnChild = () => {
        TableShowBtn()
    }
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
                                    <div>Pickup Request List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Col lg={12}>
                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Order id <span className='text-danger'>*</span> :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder='Member Group'>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
                                                            <option hidden>Choose Order Id...</option>
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
                                                <Col lg={3}><Form.Label>Customer Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" placeholder="" disabled />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='my-3' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Delivery Id Request :<span className='text-danger'>*</span>:</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" placeholder="DEL125" disabled />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Delivery Date :<span className='text-danger'>*</span>:</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="date" placeholder="" />
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
                                                <Col lg={3}><Form.Label>Delivery Time  : <span className='text-danger'>*</span></Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder='Member Group'>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example" required>
                                                            <option hidden>--None--</option>
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
                                                <Col lg={3}><Form.Label>Qty/Bag :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" disabled placeholder="" />
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
                                                <Col lg={3}><Form.Label>Store :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder='Member Group'>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example" required>
                                                            <option hidden>--None--</option>
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
                                                <Col lg={3}><Form.Label>Driver Assign :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder='Member Group'>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example" required>
                                                            <option hidden>--Select--</option>
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

export default CreateForm