import React, { useState } from 'react';
import './Tab.css';

const Tab = ({ connectTab }) => {
    const [activeTab, setActiveTab] = useState('Categories');

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
                    className={`nav-item ${activeTab === 'Categories' ? 'active' : ''}`}
                    onClick={() => handleClick('Categories', 0)}>
                 Categories
                </div>
                <div
                    className={`nav-item ${activeTab === 'Sub-Categories' ? 'active' : ''}`}
                    onClick={() => handleClick('Sub-Categories', 1)}>
                    Sub Categories
                </div>
            </div>
        </div>
    );
};
export default Tab;