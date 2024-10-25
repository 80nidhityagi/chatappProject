import React, { useState } from 'react';
import './Home.css';
import { FaUserCircle, FaUsers, FaSearch, FaUserPlus, FaUser } from 'react-icons/fa'; // FaUserPlus for "Add User"
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the logout icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Home = () => {
    let nav = useNavigate();
    // Sample data for chat users
    const [users] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mark Brown' },
        { id: 4, name: 'Lisa Ray' }
    ]);

    // State for search input
    let [searchTerm, setSearchTerm] = useState('');
    let [user,setuser]= useState([])

    function logout(){
        if(localStorage.getItem('token'!=null)){
            localStorage.clear();

        }
        alert('you are logged out')
        nav('/Login')
    
        
    }

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset search term to show all users
    const handleViewAllUsers = async() => {
        console.log("inside handleview");
        
        let result = await axios({
            url:'http://localhost:3000/allUsers',
            method:'get'

        })
        user = result.data.users;
        // alert(user)
        console.log((user));
        
        setuser(user); // Reset search input
    };

    return (
        <div className="home-container">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Icons Section */}
                <div className="icon-section">
                    {/* Profile Icon */}
                    <FaUserCircle className="profile-icon" title="Your Profile" />

                    {/* View All Users Icon */}
                    <FaUsers className="view-all-icon" onClick={handleViewAllUsers} title="View All Users" />
                     
                    {/* Add User Icon */}
                    <FaUserPlus className="add-user-icon" title="Add User" />
                    <button  className="logout-btn" onClick={logout}>
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
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Dashboard */}
            <div className="right-dashboard">
                <h1>Dashboard</h1>
                <p>Welcome to the chat dashboard!</p>
               {/* <div>{user}</div> */}






               {/* <div>{user.map((u,i)=>
            <h4 key={i}>{u.name}</h4>
            )}</div> */}



<table style={{ width: '20%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {/* <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Name</th> */}
        </tr>
      </thead>
      <tbody>
        {user.map((user, index) => (
          <tr key={index} style={{ backgroundColor: 'silver' }}>
            <td style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>









            </div>
        </div>
    );
};

export default Home;
