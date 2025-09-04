import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';
import {
    getbidHandlerActions,
    postbidHandlerActionsReset,
    deleteBidHandlerAction,
    deleteBidHandlerActionReset,
    editBidHandlerActionReset,
} from '../../../redux/bidHandler/action';
import { Button, Card, Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BidHandlerModal from './AddBidHandlerModal/AddBidHandlerModal';
import { BsPencil } from 'react-icons/bs';
import ToastContainer from '../../../helpers/toast/ToastContainer';
import PageTitle from '../../../helpers/PageTitle';

const BidPercentage = () => {
    const dispatch = useDispatch();
    const [apiCall, setApiCall] = useState(false);
    useEffect(() => {
        dispatch(getbidHandlerActions());
    }, [apiCall]);
    const navigate = useNavigate();
    const store = useSelector((state) => state);
    const getBidHandlerListReducer = store?.getBidHandlerReducer;
    const getBidHandlerList = getBidHandlerListReducer?.data?.data;
    const addBidHandlerReducer = store?.postBidHandlerReducer;
    const addBidHandlerSuccess = addBidHandlerReducer?.data;
    const updateBidHandlerReducer = store?.editBidHandlerReducer;
    const updateBidHandlerSuccess = updateBidHandlerReducer?.data;
    const [addBidHandlerModal, setAddBidHandlerModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const addBidHandler = () => {
        setAddBidHandlerModal(true);
    };

    useEffect(() => {
        const status = addBidHandlerSuccess?.status;
        const message = addBidHandlerSuccess?.message;
        const isSuccess = addBidHandlerSuccess?.success;
        if (status !== undefined) {
            if (isSuccess) {
                ToastContainer(message || 'Successfully added!', 'success');
                setAddBidHandlerModal(false);
                setApiCall((prev) => !prev);
            } else {
                ToastContainer(message || addBidHandlerSuccess?.error || 'Something went wrong!', 'danger');
            }

            dispatch(postbidHandlerActionsReset());
        }
    }, [addBidHandlerReducer]);

    useEffect(() => {
        const status = updateBidHandlerSuccess?.status;
        const message = updateBidHandlerSuccess?.message;
        const isSuccess = updateBidHandlerSuccess?.success;
        if (status !== undefined) {
            if (isSuccess) {
                ToastContainer(message || 'Successfully updated!', 'success');
                setAddBidHandlerModal(false);
                setEditData(null);
                setApiCall((prev) => !prev);
            } else {
                ToastContainer(message || updateBidHandlerSuccess || 'Something went wrong!', 'danger');
            }

            dispatch(editBidHandlerActionReset());
        }
    }, [updateBidHandlerReducer]);

    return (
        <>
            <BidHandlerModal
                show={addBidHandlerModal}
                categories={[{ name: 'a' }, { name: 'b' }]}
                handleClose={() => {
                    setAddBidHandlerModal(false);
                    setEditData(null);
                }}
                updateBidHandlerloading={updateBidHandlerReducer?.loading}
                addBidHandlerloading={addBidHandlerReducer?.loading}
                editData={editData}
            />
            <Row>
                <PageTitle
                    breadCrumbItems={[{ label: 'Bid Handler', path: '/bmg/bidHandler', active: true }]}
                    title="Bid Handler Management"
                />

                {/* <Col lg={6} className="d-flex justify-content-start">
                    <div className="navbar text-dark ">
                        <div className={`nav-item`}>Bid Handler</div>{' '}
                    </div>
                </Col> */}
                <div>
                    <Col xs={12}>
                        <Card
                            style={{
                                boxShadow:
                                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                            }}>
                            <Card.Body className="text-center">
                                <div className="col d-flex justify-content-end">
                                    <Button className="bg-success border-0" onClick={addBidHandler}>
                                        Add Bid Handler
                                    </Button>
                                </div>
                                {getBidHandlerList && getBidHandlerList.length > 0 ? (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table bg-white">
                                                <thead className="text-start">
                                                    <tr className="">
                                                        <th scope="col">
                                                            <i className="mdi mdi-merge"></i>
                                                        </th>
                                                        <th scope="col">Categories</th>
                                                        <th scope="col">Min Price</th>
                                                        <th scope="col">Max Price</th>
                                                        <th scope="col">Bid Amount</th>
                                                        <th scope="col">Verified</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-start">
                                                    {getBidHandlerList?.map((data, index) => (
                                                        <tr
                                                            // onClick={() => navigate(`order-history/${data?._id}`)}
                                                            key={index}
                                                            className="text-dark text-start fw-bold text-nowrap">
                                                            <th scope="row">{index + 1}</th>
                                                            <td className="fw-bold">
                                                                {data?.categoryIds?.length > 0 ? (
                                                                    data?.categoryIds?.slice(0, 4)?.map((ele, ind) => {
                                                                        return (
                                                                            <span key={ind}>
                                                                                {ele?.name}
                                                                                {ind === 3 ||
                                                                                ind ===
                                                                                    data.categoryIds.slice(0, 4)
                                                                                        .length -
                                                                                        1
                                                                                    ? '...'
                                                                                    : ', '}
                                                                            </span>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <span className="d-flex justify-content-center">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </td>

                                                            <td className="fw-bold">
                                                                {data?.minPrice == 0 || data?.minPrice != undefined ? (
                                                                    <span>{data?.minPrice} </span>
                                                                ) : (
                                                                    <span className="d-flex justify-content-center">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="fw-bold">
                                                                {data?.maxPrice ? (
                                                                    <span>{data?.maxPrice} </span>
                                                                ) : (
                                                                    <span className="d-flex justify-content-center">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="fw-bold">
                                                                {data?.bidAmount ? (
                                                                    <span>{`${data?.bidAmount || ''}`} </span>
                                                                ) : (
                                                                    <span className="d-flex justify-content-center">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </td>

                                                            <td className="fw-bold">
                                                                {data?.status ? (
                                                                    <span
                                                                        className={`badge ${
                                                                            data?.status ? 'bg-success' : 'bg-danger'
                                                                        } px-2 py-1`}>
                                                                        {data?.status ? '✅ Acive' : '❌ In-Active'}
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge bg-secondary px-2 py-1">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="fw-bold">
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={<Tooltip>Edit</Tooltip>}>
                                                                    <span>
                                                                        <BsPencil
                                                                            onClick={() => {
                                                                                setAddBidHandlerModal(true);
                                                                                setEditData(data);
                                                                            }}
                                                                            size={20}
                                                                            cursor={'pointer'}
                                                                        />
                                                                    </span>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="text-center d-flex align-items-center justify-content-center"
                                        style={{ height: '30vh' }}>
                                        <code className="fs-4">No Buyer's found.</code>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </Row>
        </>
    );
};

export default BidPercentage;
