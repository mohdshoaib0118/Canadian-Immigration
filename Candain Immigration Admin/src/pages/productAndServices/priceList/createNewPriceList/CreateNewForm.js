import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import AddItemForm from '../model/addItem/AddItemForm';

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

    //model
    const [parentAddItemForm, setParentAddItemForm] = useState('')

    const openModalAddItemForm = (fill) => {
        setParentAddItemForm(fill)
    };

    const childEmptyAddItemForm = (empty) => {
        setParentAddItemForm(empty)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={() => openModalAddItemForm('lg')} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i class="bi bi-plus me-1 text-dark" />
                                    </h3>
                                    <div>Add Item</div>
                                </div>
                            </Button>
                            <AddItemForm parentAddItemForm={parentAddItemForm} childEmptyAddItemForm={childEmptyAddItemForm} />
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Prices List</div>
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
                                                <Col lg={3}><Form.Label>Price list name <span className='text-danger'>*</span> :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <h4>Advanced settings</h4>
                                    </Col>
                                </Row>
                                <Row className='my-3' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price List :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group
                                                        className=""
                                                        placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            required>
                                                            <option hidden value=''>
                                                                -Select-
                                                            </option>
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
                                                <Col lg={3}><Form.Label>Price of price list :<span className='text-danger'>*</span>:</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group
                                                        className=""
                                                        placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            required>
                                                            <option hidden value=''>
                                                                Open this select menu
                                                            </option>
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