import { useEffect, useState } from "react";
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../helpers/PageTitle";
import { Loading } from "../../../helpers/loader/Loading";
import { getComissionDataAction } from "../../../redux/actions";
import Pagination from "../../../helpers/Pagination";
import ComissionModal from "./ComissionModal/ComissionModal";

const Comission = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const ComissionData = store?.getComissionDataReducer?.comissionData?.commisions || [];
    const TotalRecords = store?.getComissionDataReducer?.comissionData?.totalRecords || ComissionData?.length || 0;
    const ComissionLoading = store?.getComissionDataReducer?.loading;

    const [search, setSearch] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [comissionModal, setComissionModal] = useState({
        type: "",
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getComissionDataAction({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleComissionModal = (type, data = null) => {
        setComissionModal({ type, data, isVisible: true });
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Platform charges", path: "/bmg/platform-charges", active: true },
                ]}
                title="Platform Charges"
            />

            <Row>
                <Col xs={12}>
                    <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}
                    >
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="px-3 py-1 bg-dark text-light rounded">
                                    Total Charges: {TotalRecords || 0}
                                </span>
                                <div className="d-flex">
                                    {/* <input
                                        type="text"
                                        className="form-control w-auto me-2"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <i
                                            className="mdi mdi-backspace-outline text-danger fs-3 me-2"
                                            onClick={() => setSearch("")}
                                            style={{ cursor: "pointer" }}
                                        ></i>
                                    )} */}
                                    <Button variant="success" style={{
                                        outline: 'none',
                                        boxShadow: 'none',
                                    }} onClick={() => handleComissionModal("Add")}>
                                        <i className="mdi mdi-plus-circle"></i> Add
                                    </Button>
                                    <Button variant="danger" className="ms-2" style={{
                                        outline: 'none',
                                        boxShadow: 'none',
                                    }} onClick={() => handleComissionModal("Edit", ComissionData)}>
                                        <i className="mdi mdi-square-edit-outline"></i> Edit
                                    </Button>
                                </div>
                            </div>

                            {ComissionLoading ? (
                                <Loading />
                            ) : ComissionData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table bordered hover className="bg-white text-center">
                                        <thead>
                                            <tr className="text-nowrap text-secondary">
                                                <th><i className="mdi mdi-merge"></i></th>
                                                <th>Min Amount</th>
                                                <th>Max Amount</th>
                                                <th>Percentage</th>
                                                <th>Status</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ComissionData.map((data, index) => (
                                                <tr key={data._id || index} className="fw-bold">
                                                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                                                    <td>{data?.minAmount ? `$${data?.minAmount}` : "N/A"}</td>
                                                    <td>
                                                        {data?.maxAmount ? `$${data?.maxAmount}` : "N/A"}
                                                    </td>
                                                    <td>
                                                        {data?.percentage ? `${data?.percentage}%` : "N/A"}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge ${data?.isActive ? "bg-success" : "bg-danger"
                                                                } px-2 py-1`}
                                                        >
                                                            {data?.isActive ? "✅ Active" : "❌ Inactive"}
                                                        </span>
                                                    </td>

                                                    {/* <td>
                                                        <i
                                                            className="mdi mdi-square-edit-outline fs-4 text-primary"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleComissionModal("Edit", data)}
                                                        ></i>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <code className="fs-5 text-muted">No Charges found. Add some to display.</code>
                                </div>
                            )}

                            {/* <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalPages={totalPages}
                setPageIndex={setPageIndex}
                onChangePageSize={setPageSize}
              /> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ComissionModal
                show={comissionModal.isVisible}
                hide={() => setComissionModal({ ...comissionModal, isVisible: false })}
                comissionData={comissionModal}
            />
        </>
    );
};

export default Comission;
