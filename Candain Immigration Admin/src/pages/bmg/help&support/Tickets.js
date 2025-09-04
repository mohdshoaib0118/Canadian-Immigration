import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Card,
  Badge,
  Container,
  Row,
  Col,
  ProgressBar,
  Stack,
} from 'react-bootstrap';
import {
  getChatByIdAction,
  updateTicketsAction,
  resetTicketsDataAction
} from '../../../redux/actions';
import { getUserFromSession } from '../../../helpers/api/apiCore';
import { useForm } from 'react-hook-form';
import { ButtonLoading, Loading } from '../../../helpers/loader/Loading';
import { formatDate } from '../../../helpers/Functions';
import { BiArrowBack, BiSend, BiReply, BiX, BiExpand } from 'react-icons/bi';
import { BsPaperclip } from 'react-icons/bs';

const Tickets = () => {
  const { id } = useParams();
  const { state: ticketInfo } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const ticketData = store?.getChatByIdReducer?.supportData?.chat;
  const ticketLoading = store?.getChatByIdReducer?.loading;
  const ticketUpdateStatus = store?.updateTicketReducer?.supportData?.status;
  const ticketUpdateLoading = store?.updateTicketReducer?.loading;
  const user = getUserFromSession();
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);
  const formRef = useRef(null);
  const ticketIndex = ticketData?.length - 1;

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [newMessage, setNewMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [priorityType, setPriorityType] = useState('Medium');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (ticketData?.[ticketIndex]) {
      setPriorityType(ticketData[ticketIndex].priority || 'Medium');
      setStatus(ticketData[ticketIndex].status || 'Pending');
    }
  }, [ticketData, ticketIndex]);

  const handleBack = () => navigate(-1);

  const toggleReply = () => {
    setIsReplying(!isReplying);
    if (!isReplying) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const onSubmitData = (data) => {
    const payload = {
      _id: id,
      issueType: ticketInfo?.issueType || '',
      priority: priorityType || '',
      description: data?.message || '',
      userId: user?.id,
      senderId: user?.id,
      status: status,
    };
    dispatch(updateTicketsAction(payload));
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'secondary';
      case 'resolved': return 'success';
      case 'in progress': return 'warning';
      case 'not feasible': return 'danger';
      default: return 'info';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'dark';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusProgress = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 25;
      case 'in progress': return 50;
      case 'resolved': return 100;
      case 'not feasible': return 100;
      default: return 0;
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getChatByIdAction({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (ticketUpdateStatus === 200) {
      dispatch(resetTicketsDataAction());
      dispatch(getChatByIdAction({ id }));
      reset({ message: '' });
      setNewMessage('');
      setIsReplying(false);
    }
  }, [dispatch, id, ticketUpdateStatus]);

  if (ticketLoading) {
    return <Loading />;
  }

  return (
    <Container fluid className="p-2" style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <Row className="align-items-center mb-2">
        <Col xs="auto">
          <b>
            <BiArrowBack onClick={handleBack}
              className="p-2 rounded-circle"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #dee2e6'
              }} />
          </b>
        </Col>
        <Col>
          <h2 className="mb-0 fw-semibold" style={{ color: '#212529' }}>Ticket Details</h2>
        </Col>
        <Col>
          <h4 className="text-muted">Ticket: {ticketInfo?.ticketId}</h4>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Left Panel - Conversation */}
        <Col lg={7}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-semibold" style={{ color: '#495057' }}>Conversation</h5>
              <Badge
                pill
                bg={getStatusBadgeColor(ticketData?.[ticketIndex]?.status)}
                className="px-3 py-2 text-capitalize"
                style={{ fontSize: '0.75rem' }}
              >
                {ticketData?.[ticketIndex]?.status || 'N/A'}
              </Badge>
            </Card.Header>

            <Card.Body
              className="p-0"
              style={{
                height: '500px',
                overflowY: 'auto',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div ref={messagesStartRef} />

              {ticketData?.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex mb-2 px-3 py-2 ${message?.messagefrom === 'sender' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`p-2 rounded-3 ${message?.messagefrom === 'sender' ? 'bg-success text-white' : 'bg-white'}`}
                    style={{
                      maxWidth: '75%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div className="d-flex align-items-center mb-1">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${message?.messagefrom === 'sender' ? 'bg-white text-dark' : 'bg-secondary text-light'}`}
                        style={{
                          width: '28px',
                          height: '28px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          marginRight: '8px'
                        }}
                      >
                        {message?.userId?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="fw-semibold">{message?.userId?.name}</span>
                        <small className={`ms-2 ${message?.messagefrom === 'sender' ? 'text-white-50' : 'text-muted'}`}>
                          {formatDate(message?.createdAt || ticketInfo?.createdAt)}
                        </small>
                      </div>
                    </div>
                    <p className="mb-1" style={{ lineHeight: '1.4' }}>{message?.description}</p>
                    {message?.status && (
                      <div className="d-flex justify-content-end mt-1">
                        <Badge
                          bg={getStatusBadgeColor(message?.status)}
                          className="text-capitalize"
                          style={{ fontSize: '0.65rem' }}
                        >
                          {message?.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </Card.Body>

            {/* Reply Section */}
            <Card.Footer className="bg-white border-top p-3">
              {isReplying ? (
                <Form ref={formRef} onSubmit={handleSubmit(onSubmitData)}>
                  <Row className="g-2 align-items-end">
                    <Col md={5}>
                      <Form.Group controlId="statusSelect" className="mb-2">
                        <Form.Label className="small fw-semibold text-muted mb-1">Status</Form.Label>
                        <Form.Select
                          {...register('status', { required: true })}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="border-2"
                          style={{ borderWidth: '2px', borderColor: '#e9ecef' }}
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Not Feasible">Not Feasible</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {status && !['Resolved', 'NotFeasible'].includes(status) && (
                      <Col md={5}>
                        <Form.Group controlId="prioritySelect" className="mb-2">
                          <Form.Label className="small fw-semibold text-muted mb-1">Priority</Form.Label>
                          <Form.Select
                            {...register('priorityType')}
                            value={priorityType}
                            onChange={(e) => setPriorityType(e.target.value)}
                            className="border-2"
                            style={{ borderWidth: '2px', borderColor: '#e9ecef' }}
                          >
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}

                    <Col md={2} className="text-end mb-2">
                      <BiX onClick={toggleReply}
                        className="p-1 rounded-circle text-danger"
                        style={{
                          width: '40px',
                          height: '40px',
                          border: '1px solid #dee2e6'
                        }} />
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="messageTextarea" className="mb-2">
                        <Form.Control
                          as="textarea"
                          {...register('message', { required: true })}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message here..."
                          className="border-2"
                          style={{
                            borderWidth: '2px',
                            borderColor: '#e9ecef',
                            fontSize: '0.875rem',
                            minHeight: '80px',
                            resize: 'vertical',
                          }}
                        />

                      </Form.Group>
                    </Col>

                    <Col xs={12} className="d-flex justify-content-end">
                      <Button
                        variant="success"
                        type="submit"
                        className="px-3 py-1 rounded-pill d-flex align-items-center"
                        disabled={ticketUpdateLoading}
                        style={{ fontSize: '0.875rem' }}
                      >
                        {ticketUpdateLoading ? (
                          <div style={{ width: '168px' }}><ButtonLoading /></div>
                        ) : (
                          <>
                            <BiSend className="me-2" size={16} /> Send Message
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="d-grid">
                  <Button
                    variant="outline-success"
                    onClick={toggleReply}
                    className="rounded-pill py-2 d-flex align-items-center justify-content-center"
                    style={{ fontSize: '0.875rem' }}
                  >
                    <BiReply className="me-2" size={16} /> Reply to Ticket
                  </Button>
                </div>
              )}
            </Card.Footer>
          </Card>
        </Col>

        {/* Right Panel - Ticket Details */}
        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom py-3">
              <h5 className="mb-0 fw-semibold" style={{ color: '#495057' }}>Ticket Overview</h5>
            </Card.Header>
            <Card.Body className="p-4">
              {/* Status Progress */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold text-muted">Ticket Status</span>
                  <span className="small fw-semibold">
                    {ticketData?.[ticketIndex]?.status || 'Pending'}
                  </span>
                </div>
                <ProgressBar
                  now={getStatusProgress(ticketData?.[ticketIndex]?.status)}
                  variant={getStatusBadgeColor(ticketData?.[ticketIndex]?.status)}
                  className="mb-3"
                  style={{ height: '6px', borderRadius: '3px' }}
                />
              </div>

              {/* Ticket Properties */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-3 text-muted text-uppercase small">Properties</h6>
                <Card className="border-0 bg-light-subtle">
                  <Card.Body className="p-3">
                    <Stack gap={2}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Module</span>
                        <span className="fw-semibold text-end" style={{ fontSize: '0.875rem' }}>
                          {ticketInfo?.pageName || 'N/A'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Issue Type</span>
                        <Badge
                          bg="info"
                          className="text-uppercase"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {ticketInfo?.issueType || 'N/A'}
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Priority</span>
                        <Badge
                          bg={getPriorityBadgeColor(ticketData?.[ticketIndex]?.priority)}
                          className="text-capitalize"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {ticketData?.[ticketIndex]?.priority || 'N/A'}
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Created</span>
                        <span className="fw-semibold" style={{ fontSize: '0.875rem' }}>
                          {formatDate(ticketInfo?.createdAt)}
                        </span>
                      </div>
                    </Stack>
                  </Card.Body>
                </Card>
              </div>

              {/* Requester Info */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-3 text-muted text-uppercase small">Requester</h6>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center">
                      {ticketInfo?.user?.name?.charAt(0).toUpperCase() ? <div
                        className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white"
                        style={{
                          width: '48px',
                          height: '48px',
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {ticketInfo?.user?.name?.charAt(0).toUpperCase()}
                      </div> : ''}

                      <div className="ms-3">
                        <h6 className="mb-0 fw-semibold" style={{ fontSize: '0.9375rem' }}>
                          {ticketInfo?.user?.name} {ticketInfo?.user?.lastName || ''}
                        </h6>
                        <small className="text-muted" style={{ fontSize: '0.8125rem' }}>
                          {ticketInfo?.user?.email}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              {/* Attachment */}
              <div>
                <h6 className="fw-semibold mb-3 text-muted text-uppercase small">Attachment</h6>
                {ticketInfo?.attachment ? (
                  <Card className="border-0 shadow-sm overflow-hidden">
                    <div
                      style={{
                        height: '180px',
                        backgroundImage: `url(${ticketInfo?.attachment})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}
                    >
                      <div
                        className="w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-pill d-flex align-items-center"
                          href={ticketInfo?.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BiExpand className="me-1" size={14} /> View Full Size
                        </Button>
                      </div>
                    </div>
                    <Card.Footer className="bg-white border-top py-2">
                      <small className="text-muted">Attached image</small>
                    </Card.Footer>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-sm text-center py-4">
                    <BsPaperclip size={24} className="text-muted mb-2" />
                    <p className="mb-0 text-muted small">No attachments</p>
                  </Card>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Tickets;
