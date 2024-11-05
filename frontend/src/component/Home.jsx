import React, { useState } from 'react';
import './Home.css';
import { FaUserCircle, FaUsers, FaSearch, FaUserPlus, FaUser } from 'react-icons/fa'; // FaUserPlus for "Add User"
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the logout icon
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import Users from './Users';

const Home = () => {
    let nav = useNavigate();
    function fun() {
        nav('/')
        // alert('on cllick pr fun call hua')
    }
    // Sample data for chat users
    const [users] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mark Brown' },
        { id: 4, name: 'Lisa Ray' }
    ]);

    // State for search input
    let [searchTerm, setSearchTerm] = useState('');
    // let [user,setuser]= useState([])

    function logout() {
        localStorage.removeItem("token")

        alert('you are logged out')
        nav('/Login')


    }

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset search term to show all users


    return (
        <div className="home-container">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Icons Section */}
                <div className="icon-section">
                    {/* Profile Icon */}
                    <FaUserCircle className="profile-icon" title="Your Profile" />

                    {/* View All Users Icon */}
                    <FaUsers className="view-all-icon" onClick={() => { nav('/Home/getusers')}} title="View All Users" />

                    {/* Add User Icon */}
                    <FaUserPlus className="add-user-icon" title="Add User" />
                    <button className="logout-btn" onClick={logout}>
                        <FaSignOutAlt />
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
                </div>

                {/* User List */}
                <div className="user-list">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="user-item">
                            <FaUser className="user-icon" />
                            <span >{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Dashboard */}
            <div className="right-dashboard">
                {/* <h1>Dashboard</h1>
                <p>Welcome to the chat dashboard!</p> */}
                {/* <div>{user}</div> */}
                {/* <Users/> */}






                {/* <div>{user.map((u,i)=>
            <h4 key={i}>{u.name}</h4>
            )}</div> */}




                <Outlet />
            </div>
        </div>
    );
};

export default Home;
