import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { defectUpdate, defectList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
const EditModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {
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

    const onSubmit = async (data) => {
        data.defect_id = rowData.id;
        await dispatch(defectUpdate(data));
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
        toggle();

    };


    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);


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

    useEffect(() => {

        reset({
            defect_name: rowData.defect_name,
            defect_remark: rowData.defect_remark
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
                                        >
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">

                                                        <Col lg={12} className="mt-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Defect Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('defect_name', { required: true })}
                                                                            //isValid={!errors.brand_name}
                                                                            isInvalid={errors.defect_name}
                                                                            type="text"
                                                                            placeholder='Stains'
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
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Remarks :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('defect_remark')}

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

export default EditModel