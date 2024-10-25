  import { Link, useNavigate } from "react-router-dom"
  import {useFormik}  from 'formik'
  import * as Yup from 'yup'
  import { toast } from "react-toastify"
  import { ToastContainer } from "react-toastify"
  import axios from "axios"
  import { useEffect } from "react"
  import Home from "./Home"
  export default function Login(){
    const nav = useNavigate();

    useEffect(()=>{
      async function fd(){
        
        if(localStorage.getItem('token')!=null){
        console.log(localStorage.getItem('token'));
        let result = await axios({
          url:'http://localhost:3000/profile',
          method:'get',
          headers: {
            'Authorization': localStorage.getItem('token'),  // Attach the token here
        },
          

        })
        console.log(result,'result');
        if(result.data.user!=null){
          nav('/Home')
        }
        else{
          nav('/Login')
        }
       
      }

      }
      fd();

    },[])
    
    const formik = useFormik({
      initialValues: {
        email: "",
        password: ""
        
      },
      validationSchema: Yup.object({
          email: Yup.string().email("email must be valid").required("email is required field")
          ,
          password: Yup.string().max(8, "password must be maximum 8 character").min(6, "minumum 6 characters").required("password is required field")
      })
      , onSubmit: async(values) =>{

      let result = await axios({
          method:'post',
          url:'http://localhost:3000/login',
          data:values
          });
          
          
          if(result.data.succes === false){
            alert('username or password is not correct')
          }
          
            
            else{
         
              // alert('login successfully')
            let  loaclstoragetoken = localStorage.getItem('token')
              if(loaclstoragetoken == null){
                
                localStorage.setItem('token',result.data.token)
              }
              nav('/Home')
            }
      }

      })
// console.log(formik.values);
// console.log(formik.touched);

  return(
        <>
        <center>
       <form onSubmit={formik.handleSubmit}>
            <br /><br /><br /><br />
        <input type="text" name="email"  id="" placeholder="Enter your email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br /><br />
        {formik.touched.email && formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>} <br /><br />
        <input type="text" name="password"  id="" placeholder="Enter your password"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/><br /><br />
        { formik.touched.password && formik.errors.password && <p style={{color:"red"}}>{formik.errors.password}</p>}<br /><br />
        <button type="submit">Login</button>
        <ToastContainer />
        <p>create new account <Link to={'/signup'} >Signup</Link></p>
        </form>
        </center>
        </>
    )
}
  