import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityTable = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('/activities');
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                </tr>
            </thead>
            <tbody>
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.title}</td>
                            <td>{activity.description}</td>
                            <td>{activity.date}</td>
                            <td>{activity.customerName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No activities found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ActivityTable;