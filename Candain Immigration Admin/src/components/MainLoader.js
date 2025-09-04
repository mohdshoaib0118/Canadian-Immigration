import React from 'react'
import { Col, Spinner, Row } from 'react-bootstrap';

const MainLoader = () => {
    return (
        <>
            <Row>
                <Col lg={12} className='d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden text-center">Loading...</span>
                    </Spinner>
                </Col>
            </Row>
        </>
    )
}

export default MainLoader
