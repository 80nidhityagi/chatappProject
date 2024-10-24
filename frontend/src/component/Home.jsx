import React, { useState } from 'react';
import './Home.css';
import { FaUserCircle, FaUsers, FaSearch, FaUser } from 'react-icons/fa'; // FaUsers for "View All Users"

const Home = () => {
    // Sample data for chat users
    const [users] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mark Brown' },
        { id: 4, name: 'Lisa Ray' }
    ]);

    // State for search input
    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset search term to show all users
    const handleViewAllUsers = () => {
        setSearchTerm(''); // Reset search input
    };

    return (
        <div className="home-container">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Profile Icon */}
                <div className="icon-section">
                    {/* Profile DP */}
                    <FaUserCircle className="profile-icon" title="Your Profile" />
                    
                    {/* Icon to View All Users */}
                    <FaUsers className="view-all-icon" onClick={handleViewAllUsers} title="View All Users" />
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* User List */}
                <div className="user-list">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="user-item">
                            <FaUser className="user-icon" />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Dashboard */}
            <div className="right-dashboard">
                <h1>Dashboard</h1>
                <p>Welcome to the chat dashboard!</p>
            </div>
        </div>
    );
};

export default Home;
