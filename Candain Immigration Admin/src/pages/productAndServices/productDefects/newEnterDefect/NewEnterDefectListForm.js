import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { defectCreate, defectList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const NewEnterDefectListForm = ({ TableShowBtn }) => {
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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        dispatch(defectCreate(data))
        setTimeout(() => {

            dispatch(defectList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ));
        },
            1000
        );
         TableShowBtn();
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
                                    <div>Product Category List</div>
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
                                                <Col lg={3}><Form.Label>Defect Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('defect_name', { required: true })}
                                                        //isValid={!errors.brand_name}
                                                        isInvalid={errors.defect_name}
                                                        type="text" placeholder="Fabric, Loose Button etc" />
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
                                                        {...register('defect_remark')}
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
                                        <Button type="submit" className='btn btn-light ms-3'>Reset</Button>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>)
}

export default NewEnterDefectListForm