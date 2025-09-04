import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './ShowHide.css'

const ShowHide = ({ parentShowHide, childEmptyShowHide }) => {
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
        childEmptyShowHide('')
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    useEffect(() => {
        if (parentShowHide == "modal-right") {
            openModalWithClass("modal-right");
        }
    }, [parentShowHide]);

    return (
        <>
            <div className='modal_parent'>

                <Modal show={modal} onHide={toggle} className='modal_height' dialogClassName={className}>
                    <Modal.Header onHide={toggle} closeButton className='bg-light header_div'>
                        <h4 className="modal-title ">Show Hide Columns</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={12} className='px-3'>
                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="check box" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Price List" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} >
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Store" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Customer Name" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Mobile" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Address" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order Dt" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Pickup Dt" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} >
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Due Date" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order Status" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order Type" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order Place" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Order details" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Total quantity(pieces)" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} >
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Currency" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Amount" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Discount/Charges" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Promo/Coupon" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Details" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Item Notes" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} >
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Token No" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Adjustment" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Due Amount" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Payment" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Remarks" />
                                                </Form>
                                            </Col>
                                            <Col lg={4}>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch" label="Racks" />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="success" onClick={toggle}>
                            Reset
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ShowHide