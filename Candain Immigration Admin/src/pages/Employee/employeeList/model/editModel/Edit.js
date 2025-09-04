import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { WorldVectorMap } from '../../../../../components/VectorMap';
import { useForm, } from 'react-hook-form';
import './Edit.css';
import { useDispatch, useSelector } from 'react-redux';
import { employeeUpdate } from '../../../../../redux/actions';

const Edit = ({ parentEdit, childEmptyEdit }) => {
    const store = useSelector((state) => state)
    const employeeDetails = store.EmployeeDetails

    console.log(employeeDetails, "oooo")
    const dispatch = useDispatch()
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

    // end model

    // start edit form
    const options = {
        zoomOnScroll: false,
        markers: [
            { name: 'New York', coords: [40.71, -74.0] },
            { name: 'San Francisco', coords: [37.77, -122.41] },
            { name: 'Sydney', coords: [-33.86, 151.2] },
            { name: 'Singapore', coords: [1.3, 103.8] },
        ],
        markerStyle: {
            initial: {
                r: 9,
                fill: '#727cf5',
                'fill-opacity': 0.9,
                stroke: '#fff',
                'stroke-width': 7,
                'stroke-opacity': 0.4,
            },
            hover: {
                fill: '#727cf5',
                stroke: '#fff',
                'fill-opacity': 1,
                'stroke-width': 1.5,
            },
        },
        regionStyle: {
            initial: {
                fill: '#e3eaef',
            },
        },
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    // end edit form

    useEffect(() => {
        if (parentEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEdit]);

    const resetForm = () => {
        if (employeeDetails.employeeDetails !== null) {
            const data = employeeDetails.employeeDetails
            reset({
                employeeId: data.employee_id,
                joinDate: data.join_date,
                firstName: data.first_name,
                lastName: data.last_name,
                addressAptNo: data.address1,
                address2: data.address2,
                city: data.emp_city,
                state: data.state,
                pinCode: data.zipcode,
                // country: "india",
                emailId: data.email_id,
                mobile: data.mobile,
                designation: data.designation,
                memberGroup: data.group_member_id,
                password: "saurabh12@",
                pin: data.pin,
                loginStatus: data.status,
                driverRole: data.driver_role,
                topwashKandivali: "gghg",
                topwashMalad: "grty",
            })
        }
    }

    useEffect(() => {
        resetForm()
    }, [employeeDetails])

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
                                        <Form noValidate onSubmit={handleSubmit(
                                            (data) => {
                                                console.log(data, 'update saurabh sani');
                                                dispatch(employeeUpdate({
                                                    employeeId: data.employeeId,
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
                                                    countryCode: "+91",
                                                    city: data.city,
                                                    state: data.state,
                                                    zipcode: data.pinCode,
                                                    designation: data.designation,
                                                    groupMemberId: 3,
                                                    driverRole: data.driverRole,
                                                    pin: data.pin,
                                                    stores: [
                                                        11,
                                                        1
                                                    ]
                                                }))
                                                toggle()
                                            },
                                            (err) => {
                                                console.log(err, "update error");
                                            }
                                        )}>
                                            <Row className="p-3  position-relative">
                                                {employeeDetails.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden text-center">Loading...</span>
                                                    </Spinner>
                                                </Col>}

                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_employeeid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Employee ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('employeeId')}
                                                                            placeholder="Employee ID"
                                                                            isValid={false}
                                                                            isInvalid={false}
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
                                                            <Form.Group controlId="ne_joindate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Join Date :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="date"
                                                                            {...register('joinDate')}
                                                                            placeholder="Join Date"
                                                                            isValid={false}
                                                                            isInvalid={false}
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
                                                            <Form.Group controlId="ne_fistname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            First Name
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('firstName', { required: true })}
                                                                            placeholder="First name"
                                                                            // isValid={!errors.firstName}
                                                                            isInvalid={errors.firstName}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_lastname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Last Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('lastName')}
                                                                            placeholder="Last Name"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Address/Apt no
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('addressAptNo', { required: true })}
                                                                            placeholder="addressAptNo"
                                                                            // isValid={!errors.addressAptNo}
                                                                            isInvalid={errors.addressAptNo}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_address2">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Address2 :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('address2', { required: true })}
                                                                            placeholder="Address2"
                                                                            isValid={false}
                                                                            isInvalid={errors.address2}
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
                                                            <Form.Group controlId="ne_city">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            City <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('city')}
                                                                            placeholder="City"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_state">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            State <span className="text-danger">*</span>
                                                                            :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('state', { required: true })}
                                                                            placeholder="State"
                                                                            // isValid={!errors.state}
                                                                            isInvalid={errors.state}
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
                                                            <Form.Group controlId="ne_pincode">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Pin Code :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('pinCode', { required: true })}
                                                                            placeholder="Pin Code"
                                                                            isValid={false}
                                                                            isInvalid={errors.pinCode} />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_country">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Country :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('country')}
                                                                            placeholder="Country"
                                                                            value="India"
                                                                            disabled
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Email ID
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('emailId', { required: true })}
                                                                            placeholder="Email ID"
                                                                            // isValid={!errors.emailId}
                                                                            isInvalid={errors.emailId}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_mobile">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Mobile{' '}
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <InputGroup>
                                                                            <DropdownButton
                                                                                variant="outline-secondary"
                                                                                title=<i class="bi bi-flag me-2"></i>>
                                                                                <Dropdown.Item href="#">
                                                                                    Action
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item href="#">
                                                                                    Another action
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item href="#">
                                                                                    Something else here
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Divider />
                                                                                <Dropdown.Item href="#">
                                                                                    Separated link
                                                                                </Dropdown.Item>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Designation
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('designation', { required: true })}
                                                                            placeholder="Designation"
                                                                            // isValid={!errors.designation}
                                                                            isInvalid={errors.designation}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        {/* <Col lg={6}>
                                                            <Form.Group controlId="ne_membergroup">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Member Group
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group
                                                                            className=""
                                                                            placeholder="Member Group">
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                aria-label="Default select example"
                                                                                {...register('memberGroup', { required: true })}
                                                                                required
                                                                                placeholder="Member Group"
                                                                                // isValid={!errors.memberGroup}
                                                                                isInvalid={errors.memberGroup}
                                                                            >
                                                                                <option hidden>-- Select Member Group --</option>
                                                                                <option value="manager">Manager</option>
                                                                                <option value="driver">Driver</option>

                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col> */}
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_password">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Password :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="password"
                                                                            {...register('password')}
                                                                            placeholder="Password"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_pin">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>PIN :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('pin', { required: true })}
                                                                            placeholder="PIN"
                                                                            isValid={false}
                                                                            isInvalid={errors.pin}
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
                                                            <Form.Group controlId="ne_loginstatus">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Login Status :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group
                                                                            className=""
                                                                            placeholder="Member Group">
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Driver Role
                                                                            <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group
                                                                            className=""
                                                                            placeholder="Member Group">
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                {...register('driverRole', { required: true })}
                                                                                aria-label="Default select example"
                                                                                // isValid={!errors.driverRole}
                                                                                isInvalid={errors.driverRole}
                                                                                required>
                                                                                <option value="enable">Enable</option>
                                                                                <option value="disable">Disable</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_googlemap">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <label>Google Map :</label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <div className=" border">
                                                                            <WorldVectorMap
                                                                                height="224px"
                                                                                width="100%"
                                                                                options={options}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_topwash">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <label>Laundry Stores</label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="">
                                                                            <Form.Check
                                                                                required
                                                                                {...register('topwashKandivali')}
                                                                                label="TOPWASH KANDIVALI"
                                                                                feedback="You must agree before submitting." />
                                                                            <Form.Check
                                                                                required
                                                                                {...register('topwashMalad')}
                                                                                label="TOPWASH MALAD"
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
    );
};

export default Edit;
