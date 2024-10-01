import { useState } from 'react'
import './App.css'
import Signup from './component/Signup'
import Login from './component/Login'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
     <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
