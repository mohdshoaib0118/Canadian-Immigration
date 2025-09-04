import React, { useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import DeliveryTable from './deliveryRequesTable/DeliveryTable'
import CreateForm from './createDeliveryRequest/CreateForm'
import { Link } from 'react-router-dom';
import HyperDatepicker from '../../../components/Datepicker';
import './Index.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storeList } from '../../../redux/locationStore/actions';


const Index = ({ showBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    /** component connect */

    const [componentDelivery, setComponentDelivery] = useState(false)

    const TableShowBtn = () => {
        setComponentDelivery(!componentDelivery)
    }

    //header
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        console.log(date)
        if (date) {
            setSelectedDate(date);
        }
    };

    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const orderListdata = store.StoreList;

    const btnTransfer = () => {
        showBtn();
    };
    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model
    const getOrderList = () => {
        console.log('first');
        dispatch(
            storeList({
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            })
        );
    };
    useEffect(() => {
        getOrderList();
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="input-group me-2">
                                    <HyperDatepicker
                                        value={selectedDate}
                                        inputClass="form-control-light"
                                        onChange={(date) => {
                                            onDateChange(date);
                                        }}
                                    />
                                </div>
                                <Dropdown
                                    addonType="append"
                                    isOpen={isSortDropdownOpen}
                                    toggle={toggleSortDropDown}
                                    align="end">
                                    <Dropdown.Toggle variant="primary ">
                                        <i className="dripicons-store me-1"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className=' ms-2 px-2 '>
                                        <Container className='p-3 scroll_br'>
                                            <Row >
                                                <Col lg={12}>
                                                    {orderListdata.storeList.map((item) =>
                                                        <>
                                                            <Row>
                                                                <Col className='d-flex border select_hover my-1'>
                                                                    <p className='mb-0 py-1 '>{item.short_name}</p>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link to="#" className="btn btn-primary ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </Link>
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title">{!componentDelivery ? "Delivery Request List" : "Create Delivery Request"}</h4>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    {!componentDelivery ? <DeliveryTable TableShowBtn={TableShowBtn} /> : <CreateForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index