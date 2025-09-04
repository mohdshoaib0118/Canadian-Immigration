import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAllCategoryActions } from '../../../../redux/actions';
import { editBidHandlerAction, postbidHandlerActions } from '../../../../redux/bidHandler/action';
import { ButtonLoading } from '../../../../helpers/loader/Loading';

const BidHandlerModal = ({
    show,
    handleClose,
    categories = [],
    updateBidHandlerloading,
    addBidHandlerloading,
    editData = null,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();
    const onSubmit = (data) => {
        const { categories, ...restData } = data;

        if (editData) {
            dispatch(
                editBidHandlerAction({ ...restData, id: editData?._id, categoryIds: categories.map((e) => e._id) })
            );
        } else {
            dispatch(postbidHandlerActions({ ...restData, categoryIds: categories.map((e) => e._id) }));
        }
        // Handle submit logic here
        // handleClose();
    };
    const store = useSelector((state) => state);
    const getCategoriesReducer = store?.categoryAllDataReducer;
    const getCategoriesList = getCategoriesReducer?.categoryData?.categories;
    const dispatch = useDispatch();
    useEffect(() => {
        if (show) {
            dispatch(getAllCategoryActions({}));

            if (editData) {
                setValue('categories', editData?.categoryIds);
                setValue('minPrice', editData?.minPrice);
                setValue('maxPrice', editData?.maxPrice);
                setValue('bidAmount', editData?.bidAmount);
            } else {
                // ✅ Clear the form when not editing
                reset({
                    categories: [],
                    minPrice: '',
                    maxPrice: '',
                    bidAmount: '',
                });
            }
        }
    }, [show, editData]);
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editData ? 'Edit' : 'Add'} Bid Handler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Category Dropdown (Multi Select) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Controller
                            name="categories"
                            control={control}
                            rules={{ required: 'Please select at least one category' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={getCategoriesList}
                                    getOptionLabel={(e) => e.name}
                                    getOptionValue={(e) => e.name}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.categories && <small className="text-danger">{errors.categories.message}</small>}
                    </Form.Group>
                    {/* Min Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Min Price</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('minPrice', {
                                required: 'Min price is required',
                                min: { value: 0, message: 'Price must be positive' },
                                valueAsNumber: true,
                            })}
                        />

                        {errors.minPrice && <small className="text-danger">{errors.minPrice.message}</small>}
                    </Form.Group>
                    {/* Max Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Max Price</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('maxPrice', {
                                required: 'Max price is required',
                                min: { value: 0, message: 'Price must be positive' },
                                valueAsNumber: true,
                            })}
                        />

                        {errors.maxPrice && <small className="text-danger">{errors.maxPrice.message}</small>}
                    </Form.Group>
                    {/* bidAmount */}
                    <Form.Group className="mb-3">
                        <Form.Label>Bid Amount</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('bidAmount', {
                                required: 'Bid Amount is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Min 1%' },
                                max: { value: 100, message: 'Max 100%' },
                            })}
                        />
                        {errors.bidAmount && <small className="text-danger">{errors.bidAmount.message}</small>}
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button
                            disabled={addBidHandlerloading || updateBidHandlerloading}
                            type="submit"
                            variant="primary">
                            {addBidHandlerloading || updateBidHandlerloading ? <ButtonLoading /> : 'Save'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BidHandlerModal;
