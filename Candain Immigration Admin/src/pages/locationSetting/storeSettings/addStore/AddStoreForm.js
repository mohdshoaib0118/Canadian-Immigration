import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { storeCreate } from '../../../../redux/locationStore/actions';

const AddStoreForm = ({ showBtn }) => {
    const dispatch = useDispatch()
    //component show
    const btnTransfer = () => {
        showBtn();
    };


    // Form Data Get
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const createStoreData = (data) => {
        dispatch(storeCreate({
            storeName: data.storeName,
            shortName: data.shortName,
            mobile: data.storeMobile,
            emailId: data.storeEmail,
            password: data.storePassword,
            status: data.status,
            address1: data.addressAptNo,
            address2: data.address2,
            city: data.storeCity,
            state: data.storeState,
            zipcode: data.pinCode,
            landline: data.storeMobileLandline,
            storeTaxNo: data.texId,
            isMainStore: "yes",
            defaultPriceListId: data.defaultPriceList
        }))
        showBtn()

    }

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
                                        <div>Store List</div>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Form noValidate onSubmit={

                        handleSubmit((data) => {
                            console.log(data)
                            createStoreData(data)
                        }, (err) => {
                            console.log(err)
                        })
                    }>
                        <Row className="p-3 py-0">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storeid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Store ID :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeid')}
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
                                        <Form.Group controlId="ne_createdate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Create Date :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="date"
                                                        {...register('createDate')}
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
                                        <Form.Group controlId="ne_storename">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Name <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeName', { required: true })}
                                                        placeholder="maximum 15 characters"
                                                        // isValid={!errors.firstName}
                                                        isInvalid={errors.firstName}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_shortname">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Short_Name :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('shortName')}
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
                                                    <Form.Label>Address2 :</Form.Label>
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
                                        <Form.Group controlId="ne_storecity">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store City <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeCity')}
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storestate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store State <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeState', { required: true })}
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
                                        <Form.Group controlId="ne_zipcode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Zip Code <span className="text-danger">*</span>:</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('zipCode')}
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
                                                        value="United States of America"
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
                                        <Form.Group controlId="ne_storemobile">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Mobile <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeMobile', { required: true })}
                                                        // isValid={!errors.emailId}
                                                        isInvalid={errors.storeMobile}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storemobilelandline">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Store Landline :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeMobileLandline', { required: true })}
                                                        isInvalid={errors.mobile}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storeemail">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Email :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeEmail', { required: true })}
                                                        isInvalid={errors.storeEmail}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_texid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Tax Id :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('texId', { required: true })}
                                                        isInvalid={errors.texId}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_status">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>status :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" >
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('status', { required: true })}
                                                            required
                                                            aria-label="Default select example"
                                                            placeholder="Show"
                                                            // isValid={!errors.memberGroup}
                                                            isInvalid={errors.status}
                                                        >
                                                            <option value="show">Show</option>
                                                            <option value="hide">Hide</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="storepassword">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Store Password <span className="text-danger">*</span>:</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storePassword')}
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
                                        <Form.Group controlId="ne_pincode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Zip Code :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pinCode')}
                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_description">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Description :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('description')}
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
                                        <Form.Group controlId="ne_password">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Assign Vendor :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_uploadstorelogo">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Upload store logo :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        {...register('uploadStoreLogo')}
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
                                        <Form.Group controlId="assignpricelist ">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <label>Assign Price List :</label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="">
                                                        <Form.Check
                                                            required
                                                            label="The Wash House Pricelist"
                                                            feedback="You must agree before submitting."
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_defaultpricelist">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Default Price List <span className="text-danger">*</span>:</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" >
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('defaultPriceList', { required: true })}
                                                            required
                                                            aria-label="Default select example"
                                                            isInvalid={errors.memberGroup}
                                                        >
                                                            <option value="1">-- select --</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

export default AddStoreForm