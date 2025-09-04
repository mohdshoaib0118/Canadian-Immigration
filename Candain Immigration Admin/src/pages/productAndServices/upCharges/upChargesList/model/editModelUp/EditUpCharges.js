import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

const EditUpCharges = ({ parentEditModel, childEmptyEditModel }) => {
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
        childEmptyEditModel('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);
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
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
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
                                                        <Col lg={12} className="mt-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Price (USD) :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
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
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Unit :                                                                        </Form.Label>
                                                                    </Col>
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
        </>)
}

export default EditUpCharges