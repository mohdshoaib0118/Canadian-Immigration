import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';


const EditForm = ({ parentEdit, childEmptyEdit }) => {
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

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEdit]);


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Price ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='18'
                                                                            disabled
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Price List <span className='text-danger'>*</span>:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group
                                                                            className=""
                                                                            placeholder="Member Group">
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                aria-label="Default select example"
                                                                                placeholder="Member Group"
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
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Service Name
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Category Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Product List
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Short Code <span className='text-danger'>*</span>:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Price ($)  <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Min Price ($) :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Pieces :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Price Unit <span className='text-danger'>*</span> :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Active
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Online <span className='text-danger'>*</span> :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            required>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Priority
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Taxes :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="">
                                                                            <Form.Check
                                                                                required
                                                                                label=" TAX(10.00)%"
                                                                                feedback="You must agree before submitting."
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="text-center  py-3">
                                                            <Button type="submit" className="btn btn-success">
                                                                Save
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditForm