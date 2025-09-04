import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Form, Button, Collapse, Popover, OverlayTrigger, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { storeDetails, storeList } from '../../../../redux/actions';
import EditStoreForm from '../editStoreModel/EditStoreForm';

const StoreList = ({ showBtn }) => {
    const dispatch = useDispatch()

    const store = useSelector(state => state)
    const storeListData = store.StoreList

    console.log(store, "store")
    console.log(storeListData.loading, "storeListData")

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    //model edit
    const [parentEditStore, setParentEditStore] = useState('');

    const openModalEditStore = (fill, storeId) => {
        setParentEditStore(fill);
        dispatch(storeDetails({ storeId: storeId }))
    };

    const childEmptyEditStore = (empty) => {
        setParentEditStore(empty);
    };

    //component btn
    const btnTransfer = () => {
        showBtn();
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
            <Card >
                <Card.Body>
                    <Container>
                        <Row className="mb-2 d-flex align-items-center">
                            <Col xl={6}>
                                <h2>Store Mangement</h2>
                            </Col>
                            <Col xl={6}>
                                <div className="text-lg-end mt-xl-0 mt-2">
                                    <Button
                                        variant="white"
                                        className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                        onClick={btnTransfer}
                                    >
                                        <div className="d-flex align-items-center">
                                            <h3>
                                                <i class="bi bi-plus me-1 text-dark" />
                                            </h3>
                                            <div>Add Store</div>
                                        </div>
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Row className='border mt-3 '>
                            <Col lg={12}>
                                <Col lg={6} className='mx-auto position-relative'>
                                    {storeListData.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute  '>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden text-center">Loading...</span>
                                        </Spinner>
                                    </Col>}
                                    {storeListData.storeList.map((item, index) => (
                                        <Row key={index}>
                                            <Col lg={12} className=' border my-4'>
                                                <Row className='border bg-light'>
                                                    <Col lg={12}><h3>The Wash House</h3></Col>
                                                </Row>
                                                <Row className='mt-3'>
                                                    <Col lg={12} className='mt-2 border-bottom '>

                                                        <Row className='border-bottom'>
                                                            <Col lg={4}>Address:</Col>
                                                            <Col lg={8}>{item.address1}</Col>
                                                        </Row>
                                                        <Row className='my-2 border-bottom'>
                                                            <Col lg={4}>City/State :</Col>
                                                            <Col lg={8}>{item.city},{item.state}</Col>
                                                        </Row>
                                                        <Row className='border-bottom'>
                                                            <Col lg={4}>Email:</Col>
                                                            <Col lg={8}>{item.email}</Col>
                                                        </Row>
                                                        <Row className='my-2 border-bottom'>
                                                            <Col lg={4}>Phone :</Col>
                                                            <Col lg={8}>{item.phone}</Col>
                                                        </Row>
                                                        <Row className='border-bottom'>
                                                            <Col lg={4}>Tax Id :</Col>
                                                            <Col lg={8}>{item.store_tax_no}</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='my-3'>
                                                    <Col className='d-flex justify-content-center'>
                                                        <button className='btn-success border-0 px-2 py-1'>Login</button>
                                                        <button className='ms-3 btn-warning border-0 px-2 py-1' onClick={() => openModalEditStore('lg', item.store_id)}>Edit</button>
                                                        <button className='ms-3 btn-danger border-0 px-2 py-1'>Delete</button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ))}

                                </Col>

                            </Col>
                        </Row>
                    </Container>

                </Card.Body>
            </Card>
            <Row>
                <Col><EditStoreForm parentEditStore={parentEditStore} childEmptyEditStore={childEmptyEditStore} /></Col>
            </Row>
        </>
    )
}

export default StoreList