import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createLocationAction, updateLocationAction, resetLocationAction, getAllStatesAction } from '../../../../redux/actions';
import { ButtonLoading } from "../../../../helpers/loader/Loading";

const AddLocationModal = ({ show, hide, locationData }) => {
    console.log({ locationData })
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
            stateName: '',
            // stateCode: '',
            cities: [{ name: '', latitude: '', longitude: '' }]
        }
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'cities'
    });

    const loading = store?.createLocationReducer?.loading || store?.updateLocationReducer?.loading;
    const createStatus = store?.createLocationReducer?.locationData?.status;
    const updateStatus = store?.updateLocationReducer?.locationData?.status;
console.log(store?.createLocationReducer)
    const closeModal = () => hide();

    useEffect(() => {
        if (locationData?.type === 'Edit') {
            setValue('stateName', locationData.data.stateName || '');
            // setValue('stateCode', locationData.data.stateCode || '');
            const mappedCities = locationData.data.cities.map(city => ({
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude
            }));
            replace(mappedCities);
        } else {
            reset({
                stateName: '',
                // stateCode: '',
                cities: [{ name: '', latitude: '', longitude: '' }]
            });
        }
    }, [show, locationData, replace, reset, setValue]);

    const onSubmit = (data) => {
        const payload = {
            name: data.stateName,
            cities: data?.cities
        }
        console.log({ data })
        if (locationData?.type === 'Edit') {
            // dispatch(updateLocationAction(data));
        } else {
            dispatch(createLocationAction(payload));
        }
    };

    useEffect(() => {
        if (!loading && (createStatus === 201 || updateStatus === 200)) {
            dispatch(getAllStatesAction({ search: '', limit: '', page: '' }));
            dispatch(resetLocationAction());
            closeModal();
        }
    }, [createStatus, updateStatus, loading, dispatch]);

    return (
        <Modal show={show} centered size="lg">
            <Modal.Header className="px-2 py-1 text-light" style={{ backgroundColor: '#008003' }}>
                <Modal.Title>
                    {locationData?.type === 'Edit' ? 'Edit Location' : 'Add Location'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>State Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter State Name"
                                {...register('stateName', { required: true })}
                                isInvalid={!!errors?.stateName}
                            />
                        </Col>
                        {/* <Col md={6}>
                            <Form.Label>State Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter State Code"
                                {...register('stateCode', { required: true })}
                                isInvalid={!!errors?.stateCode}
                            />
                        </Col> */}
                    </Row>

                    {fields?.map((item, index) => (
                        <Row key={item.id} className="mb-2 align-items-end">
                            <Col md={4}>
                                <Form.Label>City Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City Name"
                                    {...register(`cities.${index}.name`, { required: true })}
                                    isInvalid={!!errors?.cities?.[index]?.name}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Latitude"
                                    {...register(`cities.${index}.latitude`)}
                                // isInvalid={!!errors?.cities?.[index]?.latitude}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Longitude"
                                    {...register(`cities.${index}.longitude`)}
                                // isInvalid={!!errors?.cities?.[index]?.longitude}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    - Remove
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <div className="text-end me-2">
                        <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => append({ name: '', latitude: '', longitude: '' })}
                        >
                            + Add City
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer className="px-2 py-1">
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#008003', borderColor: '#008003' }}
                        disabled={loading}
                    >
                        {loading ? <ButtonLoading /> : locationData?.type === 'Edit' ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddLocationModal;
