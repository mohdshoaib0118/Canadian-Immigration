import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal,Form } from 'react-bootstrap';

const AssignModel = ({ parentAssign, childEmptyAssign }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    const toggle = () => {
        setModal(!modal);
        childEmptyAssign("")
    };

    const openModalWithScroll = () => {
        setScroll(true);
        setSize(null);
        setClassName(null);
        toggle();
    };

    useEffect(() => {
        if (parentAssign == "lg") {
            openModalWithScroll();
        }
    }, [parentAssign]);
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Assign Driver</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex align-items-center'>
                            <Col lg={4} className='fw-bold'>Pickup Request Id :</Col>
                            <Col lg={8} className='input_outline border'><input type="text" className='w-100 input_outline border py-1' value="PIC123" disabled /></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex align-items-center mt-2'>
                            <Col lg={4} className='fw-bold'>Driver Name <span className='text-danger'>*</span>:</Col>
                            <Col lg={8} className='input_outline border'>
                                <Form.Group className="" placeholder='Member Group'>
                                    <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
                                        <option hidden>The Wash Home</option>
                                        <option value="1">B select</option>
                                        <option value="2">C select</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Reset
                    </Button>{' '}
                    <Button variant="success" onClick={toggle}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AssignModel