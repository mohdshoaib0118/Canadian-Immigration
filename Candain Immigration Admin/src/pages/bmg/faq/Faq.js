import { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../../helpers/PageTitle';
import { Loading } from '../../../helpers/loader/Loading';
import { getFaqActions } from '../../../redux/actions';
import Pagination from '../../../helpers/Pagination';
import FaqModal from './FaqModal/FaqModal';

const Faq = () => {
    const dispatch = useDispatch();
    const { faqDataReducer } = useSelector((state) => state);

    const FaqData = faqDataReducer?.faqData?.faqs || [];
    const TotalRecords = faqDataReducer?.faqData?.totalRecords || 0;
    const FaqLoading = faqDataReducer?.loading;

    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const [faqModal, setFaqModal] = useState({
        type: '',
        data: null,
        isVisible: false,
    });

    useEffect(() => {
        setTotalPages(Math.ceil(TotalRecords / pageSize));
    }, [TotalRecords, pageSize]);

    useEffect(() => {
        dispatch(getFaqActions({ search, limit: pageSize, page: pageIndex }));
    }, [dispatch, search, pageIndex, pageSize]);

    const handleFaqModal = (type, data = null) => {
        setFaqModal({ type, data, isVisible: true });
    };

    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Faq', path: '/bmg/faq', active: true }]} title="FAQ Management" />

            <Row>
                <Col xs={12}>
                    <Card
                        style={{
                            boxShadow:
                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                        }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="px-3 py-1 bg-dark text-light rounded">
                                    Total FAQs: {TotalRecords || 0}
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
                                            onClick={() => setSearch('')}
                                            style={{ cursor: 'pointer' }}></i>
                                    )} */}
                                    <Button variant="success" onClick={() => handleFaqModal('Add')}>
                                        <i className="mdi mdi-plus-circle"></i> Add
                                    </Button>
                                </div>
                            </div>

                            {FaqLoading ? (
                                <Loading />
                            ) : FaqData.length > 0 ? (
                                <div className="table-responsive">
                                    <Table bordered hover className="bg-white text-center">
                                        <thead className="text-start">
                                            <tr className="text-nowrap text-secondary">
                                                <th>
                                                    <i className="mdi mdi-merge"></i>
                                                </th>
                                                <th>Question</th>
                                                <th>Answer</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-stat">
                                            {FaqData.map((data, index) => (
                                                <tr key={data._id || index}>
                                                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>{data?.question}</Tooltip>
                                                        }>
                                                        <td>{data?.question.slice(0, 30) + '...' || 'N/A'}</td>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: data?.answer || 'N/A',
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        }>
                                                        <td>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: data?.answer?.slice(0, 30) + '...' || 'N/A',
                                                                }}
                                                            />
                                                        </td>
                                                    </OverlayTrigger>

                                                    <td>
                                                        <span
                                                            className={`badge ${data?.status ? 'bg-success' : 'bg-danger'
                                                                } px-2 py-1`}>
                                                            {data?.status ? '✅ Active' : '❌ Inactive'}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <i
                                                            className="mdi mdi-square-edit-outline fs-4 text-primary"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleFaqModal('Edit', data)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <code className="fs-5 text-muted">No FAQs found. Add some to display.</code>
                                </div>
                            )}
                            {TotalRecords > 20 && (
                                <Pagination
                                    pageIndex={pageIndex}
                                    pageSize={pageSize}
                                    totalPages={totalPages}
                                    setPageIndex={setPageIndex}
                                    onChangePageSize={setPageSize}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FaqModal
                show={faqModal.isVisible}
                hide={() => setFaqModal({ ...faqModal, isVisible: false })}
                faqData={faqModal}
            />
        </>
    );
};

export default Faq;
