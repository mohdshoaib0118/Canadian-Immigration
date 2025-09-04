import React, { useState } from 'react';
import './Tab.css';

const Tab = ({ connectTab }) => {
    const [activeTab, setActiveTab] = useState('Buyers');

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
                    className={`nav-item ${activeTab === 'Buyers' ? 'active' : ''}`}
                    onClick={() => handleClick('Buyers', 0)}>
                    Buyer's
                </div>
                <div
                    className={`nav-item ${activeTab === 'Sellers' ? 'active' : ''}`}
                    onClick={() => handleClick('Sellers', 1)}>
                    Seller's
                </div>
            </div>
        </div>
    );
};
export default Tab;