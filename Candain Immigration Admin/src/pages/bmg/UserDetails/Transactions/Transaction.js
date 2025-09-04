import React, { useState } from 'react';
import BidHistory from './BidHistory/BidHistory';
import OrderHistory from './OrderHistory/OrderHistory';

const Transaction = () => {
    const [activeTab, setActiveTab] = useState('order');

    const tabContainerStyle = {
        display: 'flex',
        borderBottom: '2px solid #ccc',
        marginBottom: '20px',
    };

    const tabStyle = {
        padding: '12px 20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#6c757d',
        borderBottom: '2px solid transparent',
        transition: 'all 0.3s ease',
    };

    const activeTabStyle = {
        ...tabStyle,
        color: '#000000',
        borderBottom: '2px solid #000',
    };

    return (
        <div>
            {/* Tabs Header */}
            <div style={tabContainerStyle}>
                <div style={activeTab === 'order' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('order')}>
                    Order History
                </div>
                <div style={activeTab === 'bid' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('bid')}>
                    Bid History
                </div>
            </div>

            {/* Tabs Content */}
            <div>
                {activeTab === 'order' && <OrderHistory />}
                {activeTab === 'bid' && <BidHistory />}
            </div>
        </div>
    );
};

export default Transaction;
