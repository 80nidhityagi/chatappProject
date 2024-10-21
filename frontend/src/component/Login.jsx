  import { Link } from "react-router-dom"
  // import {useFormik}  from 'formik'
  import { useState } from "react";
 import axios from "axios"
  export default function Login(){
    let [email,setemail] = useState([]);
    let [password,setpassword] = useState([]);
async function fun(){
  let values = {
    email:email,
    password:password
  }
console.log(values);
  let result = await axios({  
    method:'post',
    url:'http://localhost:3000/login',
    data:values
  })
  console.log(result);
    }

// console.log(formik.values);
// console.log(formik.touched);

  return(
        <>
        <center>
       {/* <form onSubmit={fun} > */}
         <br /><br /><br /><br />
        <input type="text" name="email"  onChange={(e)=>{setemail(e.target.value)}} id="" placeholder="Enter your email" /><br /><br />
        <input type="text" name="password"  id="" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} /><br /><br />
        <button onClick={fun}>Login</button>
        <p>create new account <Link to={'/signup'} >Signup</Link></p>
        <h1><Link to={'/signup'}>click</Link></h1>
        {/* </form> */}
        </center>
        </>
    )
}