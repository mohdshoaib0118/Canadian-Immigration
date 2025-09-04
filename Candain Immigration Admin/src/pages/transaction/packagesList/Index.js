import React, { useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PackageTable from './packagesListTable/PackageTable'
import AssignForm from './assignPackageForm/AssignForm'
import HyperDatepicker from '../../../components/Datepicker';
import './Index.css'

const Index = () => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        console.log(date)
        if (date) {
            setSelectedDate(date);
        }
    };

    const StoreData = [
        {
            name: 'a'
        }, {
            name: 'b'
        }, {
            name: 'c'
        }, {
            name: 'd'
        }, {
            name: 'e'
        }, {
            name: 'f'
        }, {
            name: 'g'
        }, {
            name: 'h'
        }, {
            name: 'i'
        }, {
            name: 'j'
        }
    ]
    return (<>
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
                                                {StoreData.map((item) =>
                                                    <>
                                                        <Row>
                                                            <Col className='d-flex border select_hover my-1'>
                                                                <p className='mb-0 py-1 '>{item.name}</p>
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
                        {/* <form className="d-flex">
                            <div className="input-group">
                                <Dropdown
                                    addonType="append"
                                    isOpen={isSortDropdownOpen}
                                    toggle={toggleSortDropDown}
                                    align="end">
                                    <Dropdown.Toggle variant="primary ">
                                        <i className="dripicons-store me-1"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className=' ms-2 px-2 bg-light'>
                                        <Dropdown.Item className='bg-light px-0 text-center'>
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Store </Tooltip>}>
                                                <button className='border p-1 px-2 bt_color_hover bg-white'>
                                                    <i className="dripicons-store "></i>
                                                </button>
                                            </OverlayTrigger>{' '}

                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Store </Tooltip>}>
                                                <button className='border p-1 px-2 ms-3 bt_color_hover bg-white text-dark'>
                                                    <i className="dripicons-store "></i>
                                                </button>
                                            </OverlayTrigger>{' '}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link to="#" className="btn btn-primary ms-2">
                                    <i className="dripicons-calendar"></i>
                                </Link>
                            </div>
                            <Link to="#" className="btn btn-primary ms-2">
                                <i className="mdi mdi-autorenew"></i>
                            </Link>
                            <Link to="#" className="btn btn-primary ms-1">
                                <i className="mdi mdi-filter-variant"></i>
                            </Link>
                        </form> */}
                    </div>
                    <h4 className="page-title">{!componentShow ? "Package List" : "Assign Package"}</h4>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                {!componentShow ? <PackageTable TableShowBtn={TableShowBtn} /> : <AssignForm TableShowBtn={TableShowBtn} />}
            </Col>
        </Row>
    </>
    )
}

export default Index