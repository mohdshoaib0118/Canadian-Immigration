import React, { useState } from 'react';
import './Tab.css';

const Tab = ({ connectTab }) => {
    const [activeTab, setActiveTab] = useState('paid-transactions');

    const handleClick = (tab, item) => {
        if (tab === activeTab) {
            return;
        }
        setActiveTab(tab);
        connectTab(item);
    };

    return (
        <div>
            <div className="navbar text-dark ">
                <div
                    className={`nav-item ${activeTab === 'paid-transactions' ? 'active' : ''}`}
                    onClick={() => handleClick('paid-transactions', 0)}>
                 Paid Transactions
                </div>
                <div
                    className={`nav-item ${activeTab === 'unpaid-transactions' ? 'active' : ''}`}
                    onClick={() => handleClick('unpaid-transactions', 1)}>
                    Unpaid Transactions
                </div>
            </div>
        </div>
    );
};
export default Tab;