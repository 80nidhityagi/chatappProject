import React, { useState } from 'react';
import './Home.css'; // Add styles in a CSS file for layout and design
import { FaUser, FaUsers, FaSearch, FaPlus, FaEye } from 'react-icons/fa'; // Add FaEye icon for "View All Users"

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
                <div className="sidebar-header">
                    <h2>Chats</h2>
                    <button className="add-group-btn">
                        <FaPlus /> Add Group
                    </button>
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
                    <FaEye className="view-all-icon" onClick={handleViewAllUsers} title="View All Users" />
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
