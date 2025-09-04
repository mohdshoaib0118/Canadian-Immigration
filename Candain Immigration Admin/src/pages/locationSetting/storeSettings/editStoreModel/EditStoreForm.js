import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import { WorldVectorMap } from '../../../../../components/VectorMap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { storeUpdate } from '../../../../redux/actions';


const EditStoreForm = ({ parentEditStore, childEmptyEditStore }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeDetails = store.StoreDetails



    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    // console.log(store, "newwwwwwww")
    const toggle = () => {
        setModal(!modal);
        childEmptyEditStore('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const resetForm = () => {
        if (storeDetails.storeDetails !== null) {
            const data = storeDetails.storeDetails
            reset({
                storeId: data.store_id,
                createDate: data.create_date,
                storeName: data.store_name,
                shortName: data.short_name,
                addressAptNo: data.address1,
                address2: data.address2,
                storeCity: data.city,
                storeState: data.state,
                zipCode: data.zipcode,
                storeMobile: data.phone,
                storeLandline: data.landline,
                storeEmail: data.email,
                texId: data.store_tax_no,
                pinCode: data.zipcode,
                isMainStore: "yes",
                defaultPriceListId: data.default_price_list

            })
        }
    }

    useEffect(() => {
        resetForm()
    }, [storeDetails])



    useEffect(() => {
        if (parentEditStore == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditStore]);
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
                                        <Form noValidate onSubmit={
                                            handleSubmit((data) => {
                                                console.log(data)
                                                dispatch(storeUpdate({
                                                    storeId: data.storeId,
                                                    storeName: data.storeName,
                                                    shortName: data.shortName,
                                                    mobile: data.storeMobile,
                                                    emailId: data.storeEmail,
                                                    password: data.storePassword,
                                                    status: "show",
                                                    address1: data.addressAptNo,
                                                    address2: data.address2,
                                                    city: data.storeCity,
                                                    state: data.storeCity,
                                                    zipcode: data.zipCode,
                                                    landline: data.storeLandline,
                                                    storeTaxNo: data.texId,
                                                    isMainStore: "yes",
                                                    defaultPriceListId: data.defaultPriceList
                                                }))
                                                toggle()
                                            }, (err) => {
                                                console.log(err)
                                            })
                                        }>
                                            <Row className="p-3 py-0 position-relative ">
                                                {storeDetails.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden text-center">Loading...</span>
                                                    </Spinner>
                                                </Col>}
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_storeid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Store ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeId')}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Create Date :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Name <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeName', { required: true })}
                                                                            placeholder="maximum 15 characters"
                                                                            // isValid={!errors.firstName}
                                                                            isInvalid={errors.storeName}
                                                                        />
                                                                        <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_shortname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Short_Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('shortName', { required: true })}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Address/Apt no <span className="text-danger"> * </span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Address2 :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('address2', { required: true })}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store City <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeCity', { required: true })}
                                                                            isValid={false}
                                                                            isInvalid={errors.storeCity} />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_storestate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store State <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeState', { required: true })}
                                                                            // isValid={!errors.state}
                                                                            isInvalid={errors.storeState}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Zip Code <span className="text-danger">*</span>:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('zipCode', { required: true })}
                                                                            isValid={false}
                                                                            isInvalid={errors.zipCode}
                                                                        />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Mobile <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                            <Form.Group controlId="ne_storelandline">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Landline :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeLandline', { required: true })}
                                                                            isInvalid={errors.storeLandline}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Email <span className="text-danger">*</span>:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Tax Id :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Show/Hide</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" >
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                {...register('status', { required: true })}
                                                                                required
                                                                                aria-label="Default select example"
                                                                                placeholder="Member Group"
                                                                                // isValid={!errors.memberGroup}
                                                                                isInvalid={errors.memberGroup}
                                                                            >
                                                                                <option value="1">Show</option>
                                                                                <option value="2">Hide</option>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Store Password <span className="text-danger">*</span>:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storePassword', { required: true })}
                                                                            isValid={false}
                                                                            isInvalid={errors.storePassword}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Zip Code :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('pinCode', { required: true })}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Description :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('description', { required: true })}
                                                                            isValid={false}
                                                                            isInvalid={errors.description}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_assignvender">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Assign Vendor :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_uploadstorelogo">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Upload store logo :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <label>Assign Price List :</label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Default Price List <span className="text-danger">*</span>:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder="Member Group">
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                {...register('defaultPriceList', { required: true })}
                                                                                required
                                                                                aria-label="Default select example"
                                                                                isInvalid={errors.defaultPriceList}
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
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
}

export default EditStoreForm