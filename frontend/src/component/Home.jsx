import { CircularProgress, Container, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { PiSignOutLight } from "react-icons/pi";
import { FaUser, FaUserPlus, FaUserCircle } from 'react-icons/fa'; // Importing icons
export default function Home(){
  const nav  = useNavigate();
    const token = localStorage.getItem('token')
    return(
        <>
          {/* <CircularProgress style={{ margin: '40vh 50vw' ,}}  /> */}
    <div className="container">
      <div className="left-section">
      <nav className="navbar">
          <div className="navbar-left">
          <FaUserCircle className="profile-icon" /> {/* Profile Icon */}

          </div>
          <div className="navbar-right">
          <FaUser className="icon" onClick={()=>nav('/users')} />  {/* Users Icon */}
          <FaUserPlus className="icon" /> {/* Add User Icon */}
          <PiSignOutLight color='white' size={26} cursor='pointer'fontWeight={400} onClick={()=>{
            localStorage.removeItem("token")
            nav('/')
          }}
          />

          </div>
        </nav>
          {/* Search Field */}
          <div className="search-container">
          <input type="text" placeholder="Search users..." className="search-input" />
        </div>
        {/* Scrollable Users Section */}
        {/* <div className="scrollable-users">
          {user.map((u, index) => (
            <div key={index} className="user-item">
              {u.name}
            </div>
          ))}
        </div> */}
      {/* </div> if i open this div this gives error not open this div*/}
      </div>
      <div className="right-section">
        <p>Right Section</p>
      </div>
    </div>

        </>
    )
}