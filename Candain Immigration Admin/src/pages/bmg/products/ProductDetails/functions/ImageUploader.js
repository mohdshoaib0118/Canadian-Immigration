import { useCallback } from 'react';
import { Card, Alert, Col, Row, Button } from 'react-bootstrap';
// import { ImageIcon } from "../../../../assets/images";

const ImageUploader = ({ images, onImageChange, onRemoveImage, onDrop, onDragOver, savedData }) => {
    const handleImageChange = useCallback(
        (e) => {
            const files = Array.from(e.target.files);
            onImageChange(files);
        },
        [onImageChange]
    );

    return (
        <Card className="mt-3 mb-4 border-0">
            <Card.Header as="h5" className="border-0 px-0 fw-semibold" style={{ fontSize: '18px' }}>
                Product Images
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={4} xs={12}>
                        <div
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            className="border rounded p-4 mb-4 text-center cursor-pointer">
                            <label className="cursor-pointer d-flex flex-column align-items-center justify-content-center mb-0">
                                <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                />
                                {/* <img
                  src={ImageIcon}
                  style={{ width: "3rem" }}
                  alt="Upload Icon"
                  className="mb-2"
                /> */}
                                <div className="mt-1 mb-0">Drop your image here, or select</div>
                                <p className="mb-0 fw-semibold">Click to Browse</p>
                            </label>
                        </div>
                    </Col>
                    <Col md={8} xs={12}>
                        <Row>
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <Col sm={4} md={3} lg={2} key={index} className="position-relative mb-3">
                                        <Card className="h-100">
                                            <Card.Img
                                                variant="top"
                                                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                style={{
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-1 rounded-circle"
                                                style={{ width: '24px', height: '24px', padding: '0' }}
                                                onClick={() => onRemoveImage(index)}>
                                                ×
                                            </Button>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col>
                                    <Alert variant="info">No images uploaded yet</Alert>
                                    <p style={{ color: 'red' }}>{images.length <= 0 ? 'Please Add Images' : ''}</p>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Alert variant="info" className="mt-3">
                    <i className="bi bi-info-circle me-2"></i>
                    You can upload up to 10 high-quality images. Please ensure the pictures you add are clear and
                    professional.{' '}
                </Alert>
            </Card.Body>
        </Card>
    );
};

export default ImageUploader;
