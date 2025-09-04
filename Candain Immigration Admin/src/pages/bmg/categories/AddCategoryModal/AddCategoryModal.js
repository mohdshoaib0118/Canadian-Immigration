import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const MandatoryFieldAstrick = () => <span style={{ color: 'red' }}>*</span>;

const AddCategoryModal = ({
    show,
    handleClose,
    allSubCategories = [],
    onSubmit,
    newSubCategory,
    setNewSubCategory,
    addedCategories,
    setAddedCategories,
    modalCheck,
    setModalCheck,
    selectedCategories,
    setSelectedCategories,
    selectedSubCategories,
    setSelectedSubCategories,
}) => {
    const store = useSelector((state) => state);
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryError, setSubCategoryError] = useState('');

    const [confirmName, setConfirmName] = useState('');
    // const handleCategorySubmit = (payload) => {
    //     // payload = { categoryName: 'test1', subCategories: [...] }
    //     setAddedCategories((prev) => [...prev, payload.categoryName]);
    // };

    const handleAddSubCategory = () => {
        if (newSubCategory.trim() !== '') {
            setAddedCategories((prev) => [...prev, newSubCategory]);
            const newOption = { label: newSubCategory, value: newSubCategory, new: true };
            setSelectedSubCategories((prev) => [...prev, newOption]);
            setNewSubCategory('');
        }
    };
    const [categoryConfirmationMatch, setCategoryConfirmationMatch] = useState('');
    const [categoryNameError, setCategoryNameError] = useState('');
    useEffect(() => {
        if (categoryName.trim() !== '') {
            setCategoryNameError('');
        }
    }, [categoryName]);

    useEffect(() => {
        if (categoryName == confirmName) {
            setCategoryConfirmationMatch('');
        }
    }, [categoryName, confirmName]);
    useEffect(() => {
        if (selectedSubCategories?.length > 0) {
            setSubCategoryError('');
        }
    }, [selectedSubCategories]);
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const trimmedCategory = categoryName.trim();
        const trimmedConfirm = confirmName.trim();

        if (!trimmedCategory) {
            setCategoryNameError('Please enter a valid category name.');
            return;
        }

        if (trimmedCategory !== trimmedConfirm) {
            setCategoryConfirmationMatch('Category names do not match!');
            return;
        }

        if (selectedSubCategories.length === 0 && modalCheck === 'Sub-category') {
            setSubCategoryError('Please select at least one subcategory.');
            return;
        }

        const payload = {
            categoryName: trimmedCategory,
            subCategories: selectedSubCategories.map((item) => item.value),
        };

        onSubmit?.(payload);
        setCategoryName('');
        setConfirmName('');
        setSubCategoryError('');
    };

    const subCategoryOptions =
        store?.subCategoryDataReducer?.categoryData?.subCategories?.map((item) => ({
            label: item?.subCategoryName,
            value: item?._id,
        })) || [];

    const categoryOptions =
        store?.categoryDataReducer?.categoryData?.groupedCategories?.map((item) => ({
            label: item?.categoryName,
            value: item?._id,
        })) || [];

    const selectOptions = modalCheck === 'Sub-category' ? subCategoryOptions : categoryOptions;

    // return());
    useEffect(() => {
        if (!show) {
            setModalCheck('');
            setSelectedSubCategories([]);
            setSubCategoryError('');
            setCategoryName('');
            setConfirmName('');
            setSelectedCategories([]);
            setNewSubCategory('');
            setCategoryConfirmationMatch('');
        }
    }, [show]);

    const NoDropdownIndicator = () => null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add {modalCheck == 'Sub-category' && 'Sub-'}Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleFormSubmit}>
                <Modal.Body>
                    {!modalCheck ? (
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Category Name <MandatoryFieldAstrick />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                                placeholder="Enter Category Name"
                            />
                            {categoryNameError && <p className="text-danger mt-1">{categoryNameError}</p>}
                        </Form.Group>
                    ) : (
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Assign Category <MandatoryFieldAstrick />
                            </Form.Label>

                            <Select
                                required
                                value={selectedCategories}
                                options={selectOptions}
                                onChange={setSelectedCategories}
                                classNamePrefix="react-select"
                            />
                        </Form.Group>
                    )}
                    {!modalCheck && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Confirm Category Name <MandatoryFieldAstrick />
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Confirm Category Name"
                                    value={confirmName}
                                    onChange={(e) => setConfirmName(e.target.value)}
                                    required
                                />
                                {categoryConfirmationMatch && (
                                    <p className="text-danger">{categoryConfirmationMatch}</p>
                                )}
                            </Form.Group>
                        </>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Selected Subcategories
                            {modalCheck == 'Sub-category' ? <MandatoryFieldAstrick /> : <MandatoryFieldAstrick />}
                        </Form.Label>
                        {!modalCheck ? (
                            <>
                                <Select
                                    required={modalCheck == 'Sub-category' ? true : false}
                                    isMulti
                                    value={selectedSubCategories}
                                    options={subCategoryOptions}
                                    onChange={(selected) => {
                                        setSelectedSubCategories(selected);
                                        setSubCategoryError(''); // clear error on change
                                    }}
                                    classNamePrefix="react-select"
                                />
                            </>
                        ) : (
                            <>
                                <Select
                                    isMulti
                                    value={selectedSubCategories}
                                    options={!modalCheck ? subCategoryOptions : []}
                                    onChange={(selected) => {
                                        setSelectedSubCategories(selected);
                                        setSubCategoryError(''); // clear error on change
                                    }}
                                    menuIsOpen={!modalCheck}
                                    isClearable
                                    classNamePrefix="react-select"
                                    components={{ DropdownIndicator: !modalCheck ? undefined : NoDropdownIndicator }}
                                />
                                {subCategoryError && <p className="text-danger mt-1">{subCategoryError}</p>}
                            </>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Add new subcategory"
                            value={newSubCategory}
                            onChange={(e) => setNewSubCategory(e.target.value)}
                        />
                        <Button type="button" onClick={handleAddSubCategory} className="ms-2">
                            Add
                        </Button>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button> */}
                    <Button
                        onClick={() => {
                            if (selectedSubCategories.length > 0) {
                                handleFormSubmit();
                            } else {
                                setSubCategoryError('This field is required');
                            }
                        }}
                        variant="primary"
                        type="submit">
                        Save {modalCheck == 'Sub-category' ? 'Sub-category' : 'Category'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;
