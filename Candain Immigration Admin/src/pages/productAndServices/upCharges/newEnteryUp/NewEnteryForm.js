import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const NewEnteryForm = ({ TableShowBtn }) => {

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
                                    <h4>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h4>
                                    <div>Upcharges List</div>
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
                                                <Col lg={3}><Form.Label>Name :</Form.Label></Col>
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
                                                <Col lg={3}><Form.Label>Price Unit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder='Member Group'>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example" required>
                                                            <option hidden>--Select Package--</option>
                                                            <option value="1">Qty/Lbs</option>
                                                            <option value="2">Lbs</option>
                                                            <option value="3">Sq.Ft</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='my-4' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price (USD) :</Form.Label></Col>
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

export default NewEnteryForm