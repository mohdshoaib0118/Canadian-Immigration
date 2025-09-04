import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal, Table } from 'react-bootstrap';

const AddGroupForm = ({ parentChangeAddGroupForm, childEmptyChangeAddGroupForm }) => {
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
        childEmptyChangeAddGroupForm('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentChangeAddGroupForm == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentChangeAddGroupForm]);
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Add Group</h4>
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
                                                                        <Form.Label>Group ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='1'
                                                                            disabled

                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Group Name :</Form.Label>
                                                                    </Col>
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

                                                    <Row>
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Group Status :                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row>
                                                                    <Col>
                                                                        <Table className="mb-0" size="sm">
                                                                            <thead className='bg-light'>
                                                                                <tr>
                                                                                    <th>Model Name</th>
                                                                                    <th>Group Permission ( Manager )</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-user-times"></i></div>
                                                                                        <div className='ms-2'>Null (No Permission )</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-dashboard"></i></div>
                                                                                        <div className='ms-2'>Dashboard</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Cash Register</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Master</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-tear"></i></div>
                                                                                        <div className='ms-2'>Products</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-truck"></i></div>
                                                                                        <div className='ms-2'>Services</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-list-ul"></i></div>
                                                                                        <div className='ms-2'>Transaction</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-file-edit-alt"></i></div>
                                                                                        <div className='ms-2'>Reports</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-bright"></i></div>
                                                                                        <div className='ms-2'>Settings</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-users-alt"></i></div>
                                                                                        <div className='ms-2'>Group and Roles</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="text-center  py-3">
                                                            <Button type="submit" className="btn btn-success">
                                                                Update
                                                            </Button>
                                                            <Button type="submit" className="btn btn-primary ms-3">
                                                                Reset
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

export default AddGroupForm