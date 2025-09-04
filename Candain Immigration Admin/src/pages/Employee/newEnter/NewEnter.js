import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import './NewEnter.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { employeeCreate } from '../../../redux/actions';

const NewEntery = ({ showBtn }) => {
    const dispatch = useDispatch();

    const btnTransfer = () => {
        showBtn();
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        dispatch(
            employeeCreate({
                firstName: data.firstName,
                lastName: data.lastName,
                mobile: data.mobile,
                emailId: data.emailId,
                password: data.password,
                status: data.loginStatus,
                lat: 454523524324.54,
                long: 34545454545.45,
                address1: data.addressAptNo,
                address2: data.address2,
                countryCode: '+91',
                city: data.city,
                state: data.state,
                zipcode: data.pinCode,
                designation: data.designation,
                groupMemberId: 3,
                driverRole: data.driverRole,
                pin: data.pin,
                stores: [1],
            })
        );
        showBtn();
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <Row className="mb-2 d-flex align-items-center">
                        <Col xl={12}>
                            <div className="text-lg-end mt-xl-0 mt-2">
                                <Button
                                    variant="white"
                                    className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                    onClick={btnTransfer}>
                                    <div className="d-flex align-items-center ">
                                        <h4>
                                            <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                        </h4>
                                        <div>Employee List</div>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Form
                        noValidate
                        onSubmit={handleSubmit(
                            (data) => {
                                console.log(data, 'saurabh sani');
                                submitData(data);
                            },
                            (err) => {
                                console.log(err);
                            }
                        )}>
                        <Row className="p-3 py-0">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_employeeid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Employee ID :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('employeeId')}
                                                        placeholder="Employee ID"
                                                        isValid={false}
                                                        isInvalid={false}
                                                        disabled
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_joindate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Join Date :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="date"
                                                        {...register('joinDate')}
                                                        placeholder="Join Date"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_fistname">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        First Name <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('firstName', { required: true })}
                                                        placeholder="First name"
                                                        isValid={!errors.firstName}
                                                        isInvalid={errors.firstName}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_lastname">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Last Name :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('lastName')}
                                                        placeholder="Last Name"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_addressaptno">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Address/Apt no <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('addressAptNo', { required: true })}
                                                        placeholder="addressAptNo"
                                                        // isValid={!errors.addressAptNo}
                                                        isInvalid={errors.addressAptNo}
                                                        isValid={false}
                                                    />
                                                    <Form.Control.Feedback >
                                                        Looks good!
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_address2">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Address2 :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('address2')}
                                                        placeholder="Address2"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_city">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        City <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('city')}
                                                        placeholder="City"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_state">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        State <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('state', { required: true })}
                                                        placeholder="State"
                                                        // isValid={!errors.state}
                                                        isInvalid={errors.state}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pincode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Pin Code :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pinCode')}
                                                        placeholder="Pin Code"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_country">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Country :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('country')}
                                                        placeholder="Country"
                                                        value="India"
                                                        disabled
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_emailid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Email ID <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('emailId', { required: true })}
                                                        placeholder="Email ID"
                                                        // isValid={!errors.emailId}
                                                        isInvalid={errors.emailId}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_mobile">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Mobile <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <InputGroup>
                                                        <DropdownButton
                                                            variant="outline-secondary"
                                                            title=""><i class="bi bi-flag me-2"></i>
                                                            <Dropdown.Item href="#">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                            <Dropdown.Divider />
                                                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                                        </DropdownButton>
                                                        <Form.Control
                                                            aria-label="Text input with dropdown button"
                                                            {...register('mobile', { required: true })}
                                                            required
                                                            type="text"
                                                            placeholder="Mobile"
                                                            // isValid={!errors.mobile}
                                                            isInvalid={errors.mobile}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_designation">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Designation <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('designation', { required: true })}
                                                        placeholder="Designation"
                                                        // isValid={!errors.designation}
                                                        isInvalid={errors.designation}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_membergroup">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Member Group <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('memberGroup', { required: true })}
                                                            required
                                                            aria-label="Default select example"
                                                            placeholder="Member Group"
                                                            // isValid={!errors.memberGroup}
                                                            isInvalid={errors.memberGroup}>
                                                            <option hidden>-- Select Member Group --</option>
                                                            <option value="manager">Manager</option>
                                                            <option value="driver">Driver</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_password">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Password :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        {...register('password')}
                                                        placeholder="Password"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pin">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>PIN :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pin')}
                                                        placeholder="PIN"
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_loginstatus">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Login Status :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('loginStatus')}
                                                            aria-label="Default select example"
                                                            isValid={false}
                                                            isInvalid={false}
                                                            required>
                                                            <option value="enable">Enable</option>
                                                            <option value="disable">Disable</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Driver Role <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('driverRole', { required: true })}
                                                            aria-label="Default select example"
                                                            // isValid={!errors.driverRole}
                                                            isInvalid={errors.driverRole}
                                                            required>
                                                            <option value="disable">Disable</option>
                                                            <option value="enable">Enable</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Row className="d-flex align-items-center">
                                            <Col lg={3}>
                                                <label>Laundry Stores</label>
                                            </Col>
                                            <Col lg={9}>
                                                <Form.Group controlId="ne_topwash">
                                                    <Form.Check
                                                        required
                                                        {...register('topwashKandivali')}
                                                        label="TOPWASH KANDIVALI"
                                                        feedback="You must agree before submitting."
                                                    />
                                                    <Form.Check
                                                        required
                                                        {...register('topwashMalad')}
                                                        label="TOPWASH MALAD"
                                                        feedback="You must agree before submitting."
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
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
    );
};

export default NewEntery;
