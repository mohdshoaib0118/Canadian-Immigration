import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { serviceCategoryUpdate ,serviceCategoryList} from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
 
const EditModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch()

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     event.preventDefault();
    //     setValidated(true);
    // };

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEditModel('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset({
            service_id: rowData.id,
            service_name: rowData.service_name2,
            service_name1: rowData.service_name1,
            service_unit: rowData.service_unit,
            service_code: rowData.service_code,
            show_hide: rowData.show_hide,
            show_hide_on_website: rowData.show_hide_on_website,
            priority: rowData.priority,
            image: rowData.image
        })
    }, [rowData])


    const onSubmit = async (data) => { 
        data.brand_id = rowData.id;  
        data.image = rowData.images;
     await dispatch(serviceCategoryUpdate(data));
     dispatch(serviceCategoryList(
        {
            searchValue: "",
            pageNumber: 1,
            showLimit: 20,
        }
    ))
    toggle();
    }


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Recordx</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form   noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Service ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='5'
                                                                            disabled
                                                                            {...register('priority')}
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Service Name [English] :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            {...register('service_name1', { required: true })}
                                                                            type="text"
                                                                            placeholder='WASH AND FOLD'
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
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Service Name [ english ] :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            {...register('service_name')}
                                                                            type="text"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Show/Hide :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            {...register('show_hide', { required: true })}
                                                                            isInvalid={errors.show_hide}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="Show">Show</option>
                                                                            <option value="Hide">Hide</option>
                                                                        </Form.Select>
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
                                                                        <Form.Label>
                                                                            Show/Hide On Website :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            {...register('show_hide_on_website', { required: true })}

                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="Show">Show</option>
                                                                            <option value="Hide">Hide</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Description :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control

                                                                            type="text"
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
                                                        {/* <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Image
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control

                                                                            type="file"
                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col> */}
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Priority :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="number"
                                                                            placeholder='0'
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
    )
}

export default EditModel