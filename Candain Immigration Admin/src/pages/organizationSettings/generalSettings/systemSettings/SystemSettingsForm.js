import React, { useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';




const SystemSettingsForm = (props) => {

    const apiKey = 'AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA'

    // Form Data Get
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    console.log(errors)
    return (
        <>
            <Card>
                <Card.Body>
                    <Form noValidate onSubmit={
                        handleSubmit((data) => {
                            console.log(data)

                        }, (err) => {
                            console.log(err)
                        })
                    }>
                        <Row className="p-3 py-0">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_employeeid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Name :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('employeeId')}
                                                        isValid={false}
                                                        isInvalid={false}
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
                                                    <Form.Label>Business Address/Apt no. :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('employeeId')}
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
                                                        Business Address2 :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('firstName', { required: true })}
                                                        // isValid={!errors.firstName}
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
                                                    <Form.Label>Business City :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('lastName')}
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
                                                        Business State :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('addressAptNo', { required: true })}
                                                        // isValid={!errors.addressAptNo}
                                                        isInvalid={errors.addressAptNo}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_address2">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Zip Code :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('address2')}
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
                                                        Business Country <span className="text-danger">*</span>:
                                                    </Form.Label>
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>

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
                                                        Choose Language :
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>
                                                        </Form.Select>
                                                    </Form.Group>
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
                                                    <Form.Label>Business Mobile :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pinCode')}
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
                                                    <Form.Label>Business Landline :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('country')}
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
                                                        Business Email ID :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('emailId', { required: true })}
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
                                                        Business Logo :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        {...register('emailId', { required: true })}
                                                        // isValid={!errors.emailId}
                                                        isInvalid={errors.emailId}
                                                    />
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
                                                        TimeZone :
                                                    </Form.Label>
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>

                                                        </Form.Select>
                                                    </Form.Group>
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
                                                        Currency (USD) :
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
                                                            isInvalid={errors.memberGroup}
                                                        >
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>
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
                                                    <Form.Label>Show System :</Form.Label>
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pin">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Set currency in no. of decimal places :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        {...register('pin')}
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
                                                    <Form.Label>Open For All Zip Code <span className='text-danger'>*</span>:</Form.Label>
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>

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
                                                        Template Name :
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
                                                            <option hidden>Open this select menu</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>
                                                        </Form.Select>
                                                    </Form.Group>
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
                                                    <Form.Label>Mobile Template :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        {...register('pin')}
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start orderid from :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pin')}
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
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
                                                    <Form.Label>Auto Driver Assign :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group controlId="ne_topwash" className='d-flex'>
                                                        <Form.Check
                                                            required
                                                            {...register('topwashKandivali')}
                                                            label="ON"
                                                            feedback="You must agree before submitting."
                                                        />
                                                        <Form.Check
                                                            required
                                                            {...register('topwashMalad')}
                                                            label="OFF"
                                                            className='ms-3'
                                                            feedback="You must agree before submitting."
                                                        />
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
                                                        Start Challan from :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pin')}
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
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
                                                    <Form.Label>Start Pickup Request Id from :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value='PIC'
                                                        disabled

                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start Delivery Request Id from :                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value='DEL'
                                                            disabled

                                                        />
                                                    </Form.Group>
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
                                                    <Form.Label>Facebook Link :</Form.Label>
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
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        InstaGram Link :                                                    </Form.Label>
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
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_loginstatus">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Twitter Link :</Form.Label>
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
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Skype Link :
                                                    </Form.Label>
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
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_loginstatus">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Linkedin Link :</Form.Label>
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
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverrole">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Yelp Link :
                                                    </Form.Label>
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
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_loginstatus">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Address Map :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <div className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
                                                        <Map
                                                            google={props.google}
                                                            zoom={14}
                                                            initialCenter={{ lat: 21.569874, lng: 71.5893798 }}
                                                            style={{ width: '100%', height: '100%', position: 'relative' }}
                                                            zoomControlOptions={{
                                                                position: props.google.maps.ControlPosition.LEFT_TOP,
                                                            }}></Map>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_loginstatus">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Pinterest Link :</Form.Label>
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
    )
}

export default (GoogleApiWrapper({
    apiKey: 'AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA',
})(SystemSettingsForm));
