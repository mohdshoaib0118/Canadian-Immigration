import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data';
import Table from '../../../../components/Table';
import { Link } from 'react-router-dom';
import EditForm from '../model/editRecord/EditForm';
import AddItemForm from '../model/addItem/AddItemForm';


const ActionColumn = ({ row }) => {
    const [parentEdit, setParentEdit] = useState('')

    const openModalWithScrolls = (fill) => {
        setParentEdit(fill)
    };

    const childEmptyEdit = (empty) => {
        setParentEdit(empty)
    }
    return (
        <>
            <Link to="#" className="action-icon">

                <i className="mdi mdi-square-edit-outline" onClick={() => openModalWithScrolls('lg')} ></i>

            </Link>
            <Link to="#" className="action-icon">
                <i className="mdi mdi-delete"></i>
            </Link>
            <div>
                <EditForm parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} />
            </div>
        </>
    );
};
const PriceTable = ({ TableShowBtn }) => {
    const btnTransfer = () => {
        TableShowBtn();
    };

    const [parentAddItemForm, setParentAddItemForm] = useState('')

    const openModalAddItemForm = (fill) => {
        setParentAddItemForm(fill)
    };

    const childEmptyAddItemForm = (empty) => {
        setParentAddItemForm(empty)
    }


    const columns = [
        {
            Header: 'Sr.No.',
            accessor: 'order_id',
            sort: true,
            Cell: '1',
        },
        {
            Header: 'Price List	',
            accessor: 'order_date',
            sort: false,
            Cell: 'The Wash House Pricelist	',
        },
        {
            Header: 'Service Name	',
            accessor: 'payment_status',
            sort: false,
            Cell: 'BLANKETS',
        },
        {
            Header: 'Category Name',
            sort: false,
            Cell: 'Regular',
        },
        {
            Header: 'Product List',
            sort: false,
            Cell: 'WASH, DRY AND FOLD',
        },
        {
            Header: 'Price',
            accessor: 'order_status',
            sort: false,
            Cell: '12.00',
        },
        {
            Header: 'Min Price',
            // accessor: 'action',
            sort: false,
            Cell: '0.00',
        },
        {
            Header: 'Currency',
            // accessor: 'action',
            sort: false,
            Cell: '$',
        },
        {
            Header: 'Unit',
            // accessor: 'action',
            sort: false,
            Cell: 'sqft',
        },
        {
            Header: 'Short Code	',
            // accessor: 'action',
            sort: false,
            Cell: 'BR-L-1',
        },
        {
            Header: 'Image',
            // accessor: 'action',
            sort: false,
            Cell: '0.00',
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    const [orderList, setOrderList] = useState(orders);

    const changeOrderStatusGroup = (OrderStatusGroup) => {
        let updatedData = orders;
        //  filter
        updatedData =
            OrderStatusGroup === 'All'
                ? orders
                : [...orders].filter((o) => o.payment_status?.includes(OrderStatusGroup));
        setOrderList(updatedData);
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2 d-flex align-items-center">
                                <Col xl={8}>
                                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <label htmlFor="status-select" className="me-2">
                                                    Search :
                                                </label>
                                                <div>
                                                    <input
                                                        type="text "
                                                        className="border_none border p-1"
                                                        placeholder="100 words.."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 mt-2">
                                        <Button
                                            variant="white"
                                            className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                            onClick={() => openModalAddItemForm('lg')}
                                        >
                                            <div className="d-flex align-items-center">
                                                <h3>
                                                    <i class="bi bi-plus me-1 text-dark" />
                                                </h3>
                                                <div>Add Item</div>
                                            </div>
                                        </Button>
                                        <AddItemForm parentAddItemForm={parentAddItemForm} childEmptyAddItemForm={childEmptyAddItemForm} />
                                        <Button
                                            variant="white"
                                            className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                            onClick={btnTransfer}
                                        >
                                            <div className="d-flex align-items-center">
                                                <h3>
                                                    <i class="bi bi-plus me-1 text-dark" />
                                                </h3>
                                                <div>Create new price list</div>
                                            </div>
                                        </Button>

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Table
                                        columns={columns}
                                        data={orderList}
                                        pageSize={10}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={true}
                                        pagination={true}
                                        isSelectable={true}
                                        // isSearchable={true}
                                        theadClass="table-light"
                                        searchBoxClass="mb-2"
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>)
}

export default PriceTable