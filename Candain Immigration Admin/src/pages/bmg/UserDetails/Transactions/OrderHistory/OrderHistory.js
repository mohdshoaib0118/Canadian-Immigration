import React from 'react';

const OrderHistory = () => {
    return (
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="border-start border-2 ps-3">
                        <div class="mb-4 position-relative">
                            <span class="position-absolute top-0 start-0 translate-middle p-2 bg-primary border border-light rounded-circle"></span>
                            <h5 class="fw-bold mb-1">School</h5>
                            <p class="mb-0 text-muted">Started primary education</p>
                        </div>

                        <div class="mb-4 position-relative">
                            <span class="position-absolute top-0 start-0 translate-middle p-2 bg-primary border border-light rounded-circle"></span>
                            <h5 class="fw-bold mb-1">College</h5>
                            <p class="mb-0 text-muted">Completed higher studies</p>
                        </div>

                        <div class="mb-4 position-relative">
                            <span class="position-absolute top-0 start-0 translate-middle p-2 bg-primary border border-light rounded-circle"></span>
                            <h5 class="fw-bold mb-1">University</h5>
                            <p class="mb-0 text-muted">Graduated with degree</p>
                        </div>

                        <div class="position-relative">
                            <span class="position-absolute top-0 start-0 translate-middle p-2 bg-primary border border-light rounded-circle"></span>
                            <h5 class="fw-bold mb-1">Job</h5>
                            <p class="mb-0 text-muted">Started career journey</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
