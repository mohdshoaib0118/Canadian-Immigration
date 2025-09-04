import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap';
import './Racks.css'


const Racks = ({ parentRocks, childEmptyRock }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    const toggle = () => {
        setModal(!modal);
        childEmptyRock("")
    };

    const openModalWithScroll = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentRocks == "lg") {
            openModalWithScroll();
        }
    }, [parentRocks]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Edit Racks</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex align-items-center'>
                            <Col lg={3} className='fw-bold'>Rack Number :</Col>
                            <Col lg={9} className='input_outline border'><input type="text" className='w-100 input_outline border py-1' /></Col>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="light" onClick={toggle}>
                        Close
                    </Button>{' '} */}
                    <Button variant="success" onClick={toggle}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Racks