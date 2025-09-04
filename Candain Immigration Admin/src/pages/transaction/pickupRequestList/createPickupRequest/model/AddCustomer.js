import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AddCustomer = ({ parentFill, childEmpty }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmpty("")
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    useEffect(() => {
        if (parentFill == "lg") {
            openModalWithSize('lg');
        }
    }, [parentFill]);

    /*** validation */

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



    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light '>
                    <h4 className="modal-title ">Customer Details</h4>
                </Modal.Header>
                <Modal.Body className='pt-0 '>
                    <Row>
                        <Col className='px-0'>
                            <>
                                <Card className='mb-0'>
                                    <Card.Body className='py-0'>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Row className='p-3 pb-0'>
                                                <Col lg={12}>
                                                    <Row >
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Customer ID :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Employee ID" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Join Date :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Join Date" />
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
                                                                    <Col lg={12}><Form.Label>First Name <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="First name" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Last Name :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Last Name" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className='my-3'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Address/Apt no <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Address/Apt no" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>City :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Address2" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className='my-3 d-flex align-items-center'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">

                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Zip Code : <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="City" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">

                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Use this location for : <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12} className='d-flex justify-content-between'>
                                                                        <Form.Check type="radio" name='radio' id="default-checkbox" label="Home" />
                                                                        <Form.Check type="radio" name='radio' id="default-checkbox" label="Office" />
                                                                        <Form.Check type="radio" name='radio' id="default-checkbox" label="Others" />

                                                                        {/* <Form.Control required type="text" placeholder="State" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Email ID :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Pin Code" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Phone : <span className='text-danger'>*</span> </Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <InputGroup >
                                                                            <DropdownButton
                                                                                variant="outline-secondary"
                                                                                title=<i class="bi bi-flag me-2"></i>                                                    >
                                                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                                                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                                                <Dropdown.Divider />
                                                                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                                                            </DropdownButton>
                                                                            <Form.Control aria-label="Text input with dropdown button" required type="text" placeholder='Mobile' />
                                                                        </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className='my-3 d-flex align-items-center'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Tax Id:<span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Email ID" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Tax Exempt : <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Check type="checkbox" id="default-checkbox" label="" />

                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className='my-3' >
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Discount /Charges: <span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
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
                                                                    <Col lg={12}><Form.Label>Promo / Coupon :<span className='text-danger'>*</span>:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
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

                                                    <Row className='my-3'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">

                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Store Name :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
                                                                                <option hidden>The Wash Home</option>
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
                                                                    <Col lg={12}><Form.Label>Price List:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
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

                                                    <Row className='my-3'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Preferences:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" placeholder="Preferences" />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className='text-center  py-3'>
                                                            <Button type="submit" className='btn btn-success'>Save</Button>
                                                            <Button type="submit" className='btn btn-light ms-3'>Rest</Button>
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

export default AddCustomer