import { useState } from 'react'
import './App.css'
import Signup from './component/Signup'
import Login from './component/Login'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './component/Home'
import Other from './component/Other'
import Users from './component/Users'
import { useParams } from 'react-router-dom';

function App() {
  // const { user } = useParams();
  // console.log(user,'user');
  

  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
     <Route path="/signup" element={<Signup/>}></Route>
     <Route path='/Home' element={<Home/>}>
     <Route path='/Home/getusers' element={<Users/>}></Route>
     <Route path='/Home/Other/:user' element={<Other/>}></Route>
     </Route>
     <Route path='/Login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
