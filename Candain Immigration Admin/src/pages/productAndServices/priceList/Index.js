import React, { useState } from 'react'
import { Row, Col, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CreateForm from './createNewPriceList/CreateNewForm'
import PriceTable from './priceListTabe/PriceListTable'
import { Link } from 'react-router-dom';


const Index = () => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
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
                            </form>
                        </div>
                        <h4 className="page-title">{!componentShow ? "Prices List" : "Create new price list"}</h4>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    {!componentShow ? <PriceTable TableShowBtn={TableShowBtn} /> : <CreateForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index