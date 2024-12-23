import React, { useState } from 'react';
import './Home.css';
import { FaUserCircle, FaUsers, FaSearch, FaUserPlus, FaUser } from 'react-icons/fa'; // FaUserPlus for "Add User"
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the logout icon
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import Users from './Users';
import { useEffect } from 'react';
import Profile from './Profile';
import CreateGroup from './CreateGroup';
import { useLocation } from 'react-router-dom';

const Home = () => {
    let nav = useNavigate();

    const location = useLocation();
    
    useEffect(() => {
        getChatValeUsers(); // Fetch the chat users when the location changes
    }, [location]);
    

  //new group(add user) ->users list->(ek box mai dikhte rhenge jo select krenge ) after selecting some ->  (button ) create group -> group name->ok->new group created 
    // Sample data for chat users
    // useEffect(()=>{
    //    async function fun(){
        
    //     const result = await axios({
    //         url:'http://localhost:3000/getchatUser',
    //         method:'get'
    //     })
    //    console.log("all chat vale users");
       
    //     console.log(result.data.data);
    //     if(result){
    //         setUsers(result.data.data)
    //     }
        

    //     }
    //     // fun();

    // },[])

    const [users,setUsers] = useState([]);

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
    const uniqueFilteredUsers = [
        ...new Map(filteredUsers.map(user => [`${user.name}_${user._id}`, user])).values()
    ];

    async function getChatValeUsers(){
        const userid = localStorage.getItem('userId')
        const result = await axios({
          url:'http://localhost:3000/getChatUser/'+userid,
          method:'get',
        })
        if(result.data.success){  
         setUsers(result.data.data);
        }else{
            console.log("error h kuch");
        }
    }

        useEffect(()=>{            
            getChatValeUsers();
            
        },[])
      
    return (
        <div className="home-container">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Icons Section */}
                <div className="icon-section">
                    {/* Profile Icon */}
                    <FaUserCircle className="profile-icon" onClick={(e)=>{
                        e.preventDefault();
                        nav('/Home/profile')
                        }} title="Your Profile" />

                    {/* View All Users Icon */}
                    <FaUsers className="view-all-icon" onClick={(e) => {  e.preventDefault()
                        nav('/Home/getusers')}} title="View All Users" />

                    {/* Add User Icon */}
                    <FaUserPlus className="add-user-icon" onClick={(e)=>nav('/Home/createGroup')} title="Add User" />
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
                {/* nav(`/Home/Chat/${sender_id}/${receiver_id}/${name}`); */}

                    {uniqueFilteredUsers.map(user => (
                        <div key={user._id} className="user-item"  onClick={()=>nav(`/Home/Chat/${localStorage.getItem('userId')}/${user.chat_id}/${user.name}`)}
                        >
                            <FaUser className="user-icon" />
                            <span  >{user.name}</span>
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
