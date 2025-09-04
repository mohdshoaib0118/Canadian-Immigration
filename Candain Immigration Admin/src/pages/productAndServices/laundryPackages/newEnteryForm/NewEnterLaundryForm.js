import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const NewEnterLaundryForm = ({ TableShowBtn }) => {
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

    const btnShowHide = () => {
        TableShowBtn()
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnShowHide} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Service Category List</div>
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
                                                <Col lg={3}><Form.Label>Package ID :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" value='1' disabled />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Services :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        required>
                                                        <option hidden value=''>Open this select menu</option>
                                                        <option value="1">Comforters</option>
                                                        <option value="2">Pillows and Cushions</option>
                                                        <option value="2">Blankets</option>
                                                        <option value="2">Wash and fold</option>
                                                        <option value="2">Battroom Rugs</option>
                                                    </Form.Select>
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
                                                <Col lg={3}><Form.Label>Package Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Usage Limit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="number" />
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
                                                <Col lg={3}><Form.Label>Package Unit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        required>
                                                        <option hidden value=''>
                                                            Open this select menu
                                                        </option>
                                                        <option value="1">Quantity</option>
                                                        <option value="2">Lbs</option>
                                                        <option value="2">Costumer</option>

                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">

                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Pickup :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" />
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
                                                <Col lg={3}><Form.Label>Duration :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        required>
                                                        <option hidden value=''>
                                                            Open this select menu
                                                        </option>
                                                        <option value="1">One Month</option>
                                                        <option value="2">Two Month</option>
                                                        <option value="2">Three Month</option>
                                                        <option value="2">Six Month</option>
                                                        <option value="2">twelve Month</option>


                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Amount :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" />
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
                                                <Col lg={3}><Form.Label>Description :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
        </>)
}

export default NewEnterLaundryForm