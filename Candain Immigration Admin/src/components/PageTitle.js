// @flow
import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

type BreadcrumbItems = {
    label: string,
    path: string,
    active?: boolean,
};

type PageTitleProps = {
    breadCrumbItems: Array<BreadcrumbItems>,
    title: string,
};

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps): React$Element<any> => {
    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item href="/"><span className='custom-color'>BMG</span></Breadcrumb.Item>

                            {props.breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index} >
                                        <span className='custom-color'>{item.label}</span>
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} href={item.path} >
                                        <span className='custom-color'>{item.label}</span>
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h4 className="page-title custom-color">{props.title}</h4>
                </div>
            </Col>
        </Row>
    );
};

export default PageTitle;
