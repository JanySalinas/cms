import React, { useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import ActivityTable from '../components/ActivityTable';
import UserList from '../components/UserList';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('customers');

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="tabs">
                <button onClick={() => setActiveTab('customers')}>Customers</button>
                <button onClick={() => setActiveTab('activities')}>Activities</button>
                <button onClick={() => setActiveTab('users')}>Users</button>
            </div>
            <div className="tab-content">
                {activeTab === 'customers' && <CustomerTable />}
                {activeTab === 'activities' && <ActivityTable />}
                {activeTab === 'users' && <UserList />}
            </div>
        </div>
    );
};

export default Dashboard;