import React, { useState, useEffect } from 'react';
import NewEntery from './newEnter/NewEnter';
import EmployeeList from './employeeList/EmployeeList';
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import "./Index.css"
import { storeList } from '../../redux/actions';

const Index = () => {
    const dispatch = useDispatch()
    const storeListData = JSON.parse(localStorage.getItem('storeList'))


    // component show/hide
    const [tableBtn, setTableBtn] = useState(false);

    const showBtn = () => {
        setTableBtn(!tableBtn);
    };

    useEffect(() => {
        dispatch(storeList({
            searchValue: "",
            pageNumber: 1,
            showLimit: 10
        }))
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="input-group">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary">
                                            <i className="dripicons-store me-1"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu-animated p-0">
                                            <Container className='p-3 scroll_br'>
                                                <Row >
                                                    <Col lg={12}>
                                                        {storeListData.map((item) =>
                                                            <>
                                                                <Row>
                                                                    <Col className='d-flex border select_hover my-1'>
                                                                        <p className='mb-0 py-1 '>{item.store_name}</p>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <h4 className="page-title fw-bold">{!tableBtn ? 'Employee List' : 'New Record'}</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>{!tableBtn ? <EmployeeList showBtn={showBtn} /> : <NewEntery showBtn={showBtn} />}</Col>
            </Row>
        </>
    );
};

export default Index;
