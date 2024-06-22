import React from 'react';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
    // return <h1>Dashboard</h1>
    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;
    
    if (!user) {
        return <div>Unauthorized</div>;
    }
        console.log('User:', user);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <div>
                <h2>Common Section</h2>
                <p>All users can see this section.</p>
            </div>
            {user.role =='admin' && (
                <div>
                    <h2>Admin Section</h2>
                    <p>Manage Exams, Results, and Students.</p>
                </div>
            )}
            {user.role =='user' && (
                <div>
                    <h2>Student Section</h2>
                    <p>View Exams and Results.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;