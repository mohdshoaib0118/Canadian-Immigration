import React, { useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Container, Collapse, Button } from 'react-bootstrap';

import './DriverForm.css'

const DriverForm = ({ isOpen }) => {
    const [dateRange, setDateRange] = useState();

    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row className="p-3">
                                    <Col lg={12}>
                                        <Row className="my-3">
                                            <Col lg={12}>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={6}>
                                                        <Form.Item label="Start Date - End Date" colon={false}></Form.Item>
                                                    </Col>
                                                    <Col lg={6}>

                                                        <DatePicker.RangePicker
                                                            format="MMM Do, YYYY"
                                                            className="w-100 "
                                                            value={dateRange}
                                                            separator={"-"}
                                                            onChange={x => {
                                                                console.log(x);
                                                                setDateRange(x);
                                                            }}
                                                            allowClear={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={12} className='my-3'>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={6}>
                                                        <label for="pet-select">Driver :</label>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <select name="pets" id="pet-select" className=" bg-white out_line border py-1 px-1 w-100">
                                                            <option value="">All Driver</option>
                                                            <option value="dog">matt v</option>
                                                            <option value="cat">nick</option>
                                                            <option value="hamster">QA driver</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12}>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={6}>
                                                        <label>Choose For :</label>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className=" d-flex justify-content-between">
                                                            <input type="radio" name='radio' id="default-checkbox" label="Home" />
                                                            <input type="radio" name='radio' id="default-checkbox" className="mx-3" label="Office" />
                                                            <input type="radio" name='radio' id="default-checkbox" label="Others" />
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col className="text-center  mt-5">
                                                <Button type="submit" className="btn btn-success">
                                                    Save
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>

                </div>
            </Collapse>

        </>)
}

export default DriverForm