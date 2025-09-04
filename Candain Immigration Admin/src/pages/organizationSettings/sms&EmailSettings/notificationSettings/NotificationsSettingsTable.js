import React, { useEffect } from 'react'
import { Row, Col, Form, Card, Table, Pagination, Spinner } from 'react-bootstrap';
import { FormInput } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { smsAndEmail } from '../../../../redux/actions';
import "./NotificationsSettingsTable.css"
import Loader from "../../../../components/MainLoader"

const NotificationsSettingsTable = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const notificationData = store.SmsAndEmail;
    const notificationCategoryDataList = store.SmsAndEmail;

    useEffect(() => {
        dispatch(smsAndEmail({ type: "NOTIFICATION" }))
    }, [])
    return (
        <>
            <div className='mt-4'>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className='border p-2 bg-primary text-white'>
                                    <Col>Notifications Settings</Col>
                                </Row>
                                <Row className='d-flex align-items-center my-4'>
                                    <Col lg={2}>
                                        <p className='mb-0 text-danger'>Sender Id :</p>
                                    </Col>
                                    <Col lg={2}>
                                        <Form.Control
                                            value='SIFBSO'
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <Row className="position-relative">
                                {notificationCategoryDataList?.loading && <Loader />}


                                    <Col>
                                        <Table className="mb-0 " size="sm">
                                            <thead>
                                                <tr className='bg-light '>
                                                    <th><input type="checkbox" /></th>
                                                    <th className="text-truncate">Sr.No.</th>
                                                    <th className="text-truncate">Comment</th>
                                                    <th className="text-truncate">SMS Templates</th>
                                                    <th className="text-truncate">SMS Enable Disable	</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {notificationData?.smsAndEmail?.data?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td><input type="checkbox" /></td>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.notification_templates}</td>
                                                            <td>{item.notification_template_US}</td>
                                                            <td><button className='btn bg-white text-success border-0'>{item.status}</button></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                        <Row className='mt-3'>
                                            <Col>
                                                <Row>
                                                    <Col className="d-flex align-items-center mt-2 mb-2">
                                                        <div>
                                                            <p className='mb-0 me-2' >Display</p>
                                                        </div>
                                                        <FormInput name="select" type="select" className="form-select form-select-sm" key="select">
                                                            <option>10</option>
                                                            <option>25</option>
                                                            <option>50</option>
                                                            <option>100</option>
                                                        </FormInput>
                                                        <div>
                                                            <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <p className='mb-0 ms-2 me-2' >Go to page:
                                                            </p>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                className='input_Style px-1 py-1'
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <Pagination>
                                                    <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                                    <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                                    <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                                    <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                                    <Pagination className='pagination_style'>...</Pagination>
                                                    <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>

                                                    <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                                </Pagination>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default NotificationsSettingsTable