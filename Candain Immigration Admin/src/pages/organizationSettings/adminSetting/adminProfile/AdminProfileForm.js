import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Form, Button, Collapse, Popover, OverlayTrigger } from 'react-bootstrap';
import Profile from '../../../../assets/images/organization/profile.jpg';
import './AdminProfileForm.css'
import EditProfileForm from '../model/editProfileModel/EditProfileForm';
import ChangePasswordForm from '../model/changePasswordModel/ChangePasswordForm';
import { useDispatch } from 'react-redux';
import { adminProfile } from '../../../../redux/actions';

const AdminProfileForm = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    //model edit
    const [parentEditProfile, setParentEditProfile] = useState('')

    const openModalEditProfile = (fill) => {
        setParentEditProfile(fill)
    };

    const childEmptyEditProfile = (empty) => {
        setParentEditProfile(empty)
    }

    //model change password
    const [parentChangePasswordModel, setParentChangePasswordModel] = useState('')

    const openModalChangePasswordModel = (fill) => {
        setParentChangePasswordModel(fill)
    };

    const childEmptyChangePasswordModel = (empty) => {
        setParentChangePasswordModel(empty)
    }

    useEffect(() => {
        dispatch(adminProfile())
    }, [])

    return (
        <>
            <Card className='mt-5'>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <h2>Admin Profile</h2>
                            </Col>
                        </Row>
                        <Row className='border mt-3'>
                            <Col lg={12} className='d-flex align-items-center justify-content-center'>
                                <Col lg={6} className='d-flex align-items-center justify-content-center'>
                                    <Row>
                                        <Col lg={12} className='mx-auto mt-2 border shadow p-2'>
                                            <Row className='mx-2'>
                                                <Col>
                                                    <Row>
                                                        <Col >
                                                            <div className='text-center'><img src={Profile} className='img-fluid' alt="" /></div>

                                                            {/* <div className='d-grid my-2'><button className='btn-primary border-0' >Sifabso</button></div> */}
                                                            {['bottom'].map((placement) => (
                                                                <OverlayTrigger
                                                                    trigger="click"
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Popover popper id={`popover-positioned-${placement}`}>
                                                                            <Popover.Body>
                                                                                <p>Change Status</p>
                                                                                <div className='d-flex cursor_btn'>
                                                                                    <i className="uil uil-circle me-2 text-success"></i>
                                                                                    <p className='text-success'> Available</p>
                                                                                </div>
                                                                                <div className='d-flex cursor_btn'>
                                                                                    <i className="uil uil-circle me-2 text-danger"></i>
                                                                                    <p className='text-danger'> Busy</p>
                                                                                </div>
                                                                                <div className='d-flex cursor_btn'>
                                                                                    <i className="uil uil-circle me-2 text-dark"></i>
                                                                                    <p className='text-dark'> Invisible</p>
                                                                                </div>
                                                                                {/* <p>Busy</p>
                                                                                <p>Invisible</p> */}
                                                                            </Popover.Body>
                                                                        </Popover>
                                                                    }>
                                                                    <div className='d-grid mb-2'><button className='btn-primary border-0' >Sifabso</button></div>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className='d-flex'>
                                                            <div>
                                                                <button className='btn btn-primary border-0' onClick={() => openModalEditProfile('lg')}>Edit Profile</button>
                                                                <EditProfileForm parentEditProfile={parentEditProfile} childEmptyEditProfile={childEmptyEditProfile} />
                                                            </div>
                                                            <div className=' d-grid ms-1'>
                                                                <button className='btn btn-primary border-0' onClick={() => openModalChangePasswordModel('lg')}>Change Password</button>
                                                                <ChangePasswordForm parentChangePasswordModel={parentChangePasswordModel} childEmptyChangePasswordModel={childEmptyChangePasswordModel} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col lg={6} className='mt-3'>
                                    <>
                                        <Card>
                                            <Card.Body>
                                                <Form noValidate >
                                                    <Row className="p-3">
                                                        <Col lg={12}>
                                                            <Row className="my-3">
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>Name :</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                Sifabso
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={12} className="mt-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>Mobile :</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                (234) 232-5436
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Email ID :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                abc@gmail.com
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12} className="my-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Username :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                admin
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Location :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                New York New York
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12} className="my-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Last Online :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                1 Minute ago
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
                            </Col>
                        </Row>
                    </Container>

                </Card.Body>
            </Card>
        </>
    )
}

export default AdminProfileForm