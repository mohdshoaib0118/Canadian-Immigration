import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Table, Button, Modal } from 'react-bootstrap';
import AddGroupForm from '../../model/addGroupModel/AddGroupForm';
const PermissionForm = () => {
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


    const records = [
        { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
        { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
        { id: 3, firstName: 'Dave', lastName: 'G', username: '@dave' },
        { id: 4, firstName: 'Nik', lastName: 'N', username: '@nikn' },
        { id: 5, firstName: 'Shreyu', lastName: 'Navadiya', username: '@sn' },
    ];

    //model Add Group
    const [parentChangeAddGroupForm, setParentChangeAddGroupForm] = useState('')

    const openModalAddGroupForm = (fill) => {
        setParentChangeAddGroupForm(fill)
    };

    const childEmptyChangeAddGroupForm = (empty) => {
        setParentChangeAddGroupForm(empty)
    }



    return (
        <>
            <Row className='mt-4 mb-2'>
                <Col className='d-flex justify-content-end'>
                    <Button
                        variant="white"
                        className="border py-0 pe-4 bg-primary text-white me-2"
                        onClick={() => openModalAddGroupForm('lg')}
                    >
                        <div className="d-flex align-items-center">
                            <h3>
                                <i class="bi bi-plus me-1 text-dark" />
                            </h3>
                            <div>Add Group</div>
                        </div>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="px-0">
                    <>
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="p-3">
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={12}>
                                                    <Form.Group controlId="validationCustom01">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>
                                                                    Group Name :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Select
                                                                    id="disabledSelect"
                                                                    aria-label="Default select example"
                                                                    placeholder="Member Group"
                                                                    required>
                                                                    <option value=''>
                                                                        --Select Group--
                                                                    </option>
                                                                    <option value="1"
                                                                    >Manager</option>
                                                                    <option value="2">Hide</option>
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
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
                                            <Row className='mt-3'>
                                                <Col className='d-flex justify-content-center'>
                                                    <button className='btn bg-success text-white'>Update</button>
                                                    <button className='btn bg-primary ms-3 text-white'>Reset</button>
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
            <div>
                <AddGroupForm parentChangeAddGroupForm={parentChangeAddGroupForm} childEmptyChangeAddGroupForm={childEmptyChangeAddGroupForm} />
            </div>
        </>
    )
}

export default PermissionForm