import React, { useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddGroupForm from '../../model/addGroupModel/AddGroupForm';
import EditRecord from '../../model/addGroupModel/statusModel/EditRecord';

const GroupListTable = () => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    //model Add Group
    const [parentChangeAddGroupForm, setParentChangeAddGroupForm] = useState('')

    const openModalAddGroupForm = (fill) => {
        setParentChangeAddGroupForm(fill)
    };

    const childEmptyChangeAddGroupForm = (empty) => {
        setParentChangeAddGroupForm(empty)
    }

    //model Edit Record
    const [parentChangeEditRecord, setParentChangeEditRecord] = useState('')

    const openModalEditRecord = (fill) => {
        setParentChangeEditRecord(fill)
    };

    const childEmptyChangeEditRecord = (empty) => {
        setParentChangeEditRecord(empty)
    }



    const records = [
        { id: 1, product: 'Rugables', description: 'Permission (Desktop, Cashregister, Joborder, )' },
        { id: 2, product: 'large rugs', description: 'Permission (Null, )' },

    ];
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

            <Row >
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h3>
                                        Group List
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Table className="mb-0 mt-3" size="sm">
                                        <thead className='bg-light'>
                                            <tr>
                                                <th>Sr.No.</th>
                                                <th>Group Name	</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((record, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{record.id}</th>
                                                        <td>{record.product}</td>
                                                        <td className='text-success'>{record.description}</td>
                                                        <td><button className='btn text-success border-0' onClick={() => openModalEditRecord('lg')} >Enable</button></td>
                                                        <td><Dropdown
                                                            addonType="append"
                                                            isOpen={isSortDropdownOpen}
                                                            toggle={toggleSortDropDown}
                                                            align="end">
                                                            <Dropdown.Toggle variant="light ">
                                                                <i className="uil uil-sort-amount-down "></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className='bg-light px-2'>
                                                                <Dropdown.Item className='bg-light'>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                        <Link to='/organization/rolepermission' className='border p-1 px-2 bt_color_hover bg-white'>
                                                                            <i className="mdi mdi-square-edit-outline text-dark" ></i>
                                                                        </Link>
                                                                    </OverlayTrigger>{' '}

                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                        <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
                                                                            <i className="mdi mdi-delete"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
                <AddGroupForm parentChangeAddGroupForm={parentChangeAddGroupForm} childEmptyChangeAddGroupForm={childEmptyChangeAddGroupForm} />
                <EditRecord parentChangeEditRecord={parentChangeEditRecord} childEmptyChangeEditRecord={childEmptyChangeEditRecord} />

            </div>
        </>
    )
}

export default GroupListTable