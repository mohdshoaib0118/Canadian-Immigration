import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { brandCreate, brandList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from '../../.././../helpers/imageToBase64';


const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandCreateData = store.BrandCreate;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const curdAction = (data) => {
        dispatch(brandCreate(data))
        setTimeout(() => { 

        dispatch(brandList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ))
    },
    1000 );
    TableShowBtn()

    }

    const onSubmit = async (data) => {
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

    const btnChild = () => {
        TableShowBtn()
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h4>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h4>
                                    <div>Brand List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>

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
                        <Row className='p-3 mt-3 border'>
                            <Col lg={12}>
                                <Row className='my-3'>

                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Brand Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('brand_name', { required: true })}
                                                        //isValid={!errors.brand_name}
                                                        isInvalid={errors.brand_name}
                                                        type="text" placeholder="Adidas, Raymond, Vimal etc" />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Image</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('image')}
                                                        //isValid={!errors.brand_name}
                                                        type="file" />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='my-4' >

                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Remarks :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('brand_remark')}
                                                        type="text" />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className='text-center  py-3'>
                                        <Button type="submit" className='btn btn-success'>Save</Button>
                                        <Button className='btn btn-light ms-3'>Reset</Button>

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

export default NewEnteryForm