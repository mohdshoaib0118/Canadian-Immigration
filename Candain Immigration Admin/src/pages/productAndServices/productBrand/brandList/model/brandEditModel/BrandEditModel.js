import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { brandUpdate, brandList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';

const BrandEditModel = ({ rowData, parentBrandEditModel, openModalBrandEditModel }) => {
    const [validated, setValidated] = useState(false);

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     event.preventDefault();
    //     setValidated(true);
    // };

    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandCreateData = store.BrandCreate;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        openModalBrandEditModel('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };


    const curdAction = (data) => {
        dispatch(brandUpdate(data))
        setTimeout(() => { 
        dispatch(brandList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ));
    },
    1000
);
toggle() 
    }

    const onSubmit = async (data) => {
        data.brand_id = rowData.id;
        let file = data.image[0];
        if (file) {
            await getBase64(file)
                .then(result => {
                    data.image = result
                    curdAction(data)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            data.image = ''
            curdAction(data);
        }

    };

    useEffect(() => {
        if (parentBrandEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentBrandEditModel]);


    useEffect(() => {

        reset({
            brand_name: rowData.brand_name,
            brand_remark: rowData.brand_remark
        })
    }, [rowData])
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
                                        <Form
                                            noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }
                                            className='px-3'>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        {/* <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Brand ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            disabled
                                                                            required
                                                                            type="text"
                                                                            value='6'

                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col> */}
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Brand Name </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('brand_name', { required: true })}
                                                                            isInvalid={errors.brand_name}
                                                                            type="text"
                                                                            placeholder='Nike'
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={12} >
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Remarks :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('brand_remark')}

                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Image:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('image')}

                                                                            type="file"
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
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
}

export default BrandEditModel