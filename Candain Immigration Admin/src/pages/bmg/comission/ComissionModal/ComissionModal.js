import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComissionDataAction,
    updateComissionDataAction,
    resetComissionDataAction,
    getComissionDataAction
} from '../../../../redux/actions';
import { ButtonLoading } from "../../../../helpers/loader/Loading";

const CommissionModal = ({ show, hide, comissionData }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            commissions: [{ minAmount: '', maxAmount: '', percentage: '', isActive: 'true', _id: null }]
        }
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'commissions'
    });

    const loading = store?.createComissionDataReducer?.loading || store?.updateComissionDataReducer?.loading;
    const createStatus = store?.createComissionDataReducer?.comissionData?.status;
    const updateStatus = store?.updateComissionDataReducer?.comissionData?.status;

    const closeModal = () => hide();

    useEffect(() => {
        if (comissionData?.type === 'Edit' && Array.isArray(comissionData?.data)) {
            const mapped = comissionData.data.map((item) => ({
                minAmount: item.minAmount,
                maxAmount: item.maxAmount,
                percentage: item.percentage,
                isActive: item.isActive?.toString() || 'true',
                _id: item._id
            }));
            replace(mapped);
        } else {
            reset({
                commissions: [{ minAmount: '', maxAmount: '', percentage: '', isActive: 'true', _id: null }]
            });
        }
    }, [show, comissionData, replace, reset]);

    const onSubmit = (data) => {
        // const payload = data.commissions.map((item) => ({
        //     ...item,
        //     minAmount: parseFloat(item.minAmount),
        //     maxAmount: parseFloat(item.maxAmount),
        //     percentage: parseFloat(item.percentage),
        //     isActive: item.isActive === 'true',
        // }));

        const commissions = data.commissions.map((item) => {
            const base = {
                minAmount: parseFloat(item.minAmount),
                maxAmount: parseFloat(item.maxAmount),
                percentage: parseFloat(item.percentage),

            };

            if (comissionData?.type === 'Edit' && item._id) {
                return { ...base, id: item._id, isActive: item.isActive === 'true' };
            }

            return base;
        });

        if (comissionData?.type === 'Edit') {
            dispatch(updateComissionDataAction(commissions));
        } else {
            dispatch(createComissionDataAction({ commissions }));
        }
    };

    useEffect(() => {
        if (!loading && (createStatus === 200 || updateStatus === 200)) {
            dispatch(getComissionDataAction({ search: '', limit: '', page: '' }));
            dispatch(resetComissionDataAction());
            closeModal();
        }
    }, [createStatus, updateStatus, loading, dispatch]);

    return (
        <Modal show={show} centered size="lg"
        // onHide={closeModal}
        >
            <Modal.Header className="px-2 py-1 text-light" style={{ backgroundColor: '#008003' }}>
                <Modal.Title>
                    {comissionData?.type === 'Edit' ? 'Edit Platform Charges' : 'Add Platform Charges'}
                </Modal.Title>
                {/* <i
                    className="mdi mdi-close fs-3"
                    onClick={closeModal}
                    style={{ cursor: 'pointer' }}
                /> */}
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    {fields.map((item, index) => (
                        <Row key={item.id} className="mb-2 align-items-end">
                            <Col md={3}>
                                <Form.Label>Min Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Min"
                                    {...register(`commissions.${index}.minAmount`, { required: true })}
                                    isInvalid={!!errors?.commissions?.[index]?.minAmount}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Max Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Max"
                                    {...register(`commissions.${index}.maxAmount`, { required: true })}
                                    isInvalid={!!errors?.commissions?.[index]?.maxAmount}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Label>%</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    max="100"
                                    placeholder="%"
                                    {...register(`commissions.${index}.percentage`, { required: true })}
                                    isInvalid={!!errors?.commissions?.[index]?.percentage}
                                />
                            </Col>

                            {comissionData?.type === 'Edit' && (
                                <Col>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        {...register(`commissions.${index}.isActive`)}
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </Form.Select>
                                </Col>
                            )}
                            {comissionData?.type === 'Add' &&
                                <Col md={2}>
                                    <Button
                                        variant="outline-danger" size="sm"
                                        className="mt-2"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                    >
                                        - Remove
                                    </Button>
                                </Col>
                            }
                        </Row>
                    ))}
                    {comissionData?.type === 'Add' &&
                        <div className="text-end me-2">
                            <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => append({ minAmount: '', maxAmount: '', percentage: '', isActive: 'true', _id: null })}
                            >
                                + Add More
                            </Button>
                        </div>
                    }
                </Modal.Body>

                <Modal.Footer className="px-2 py-1">
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#008003', borderColor: '#008003' }}
                        disabled={loading}
                    >
                        {loading ? <ButtonLoading /> : comissionData?.type === 'Edit' ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal >
    );
};

export default CommissionModal;
