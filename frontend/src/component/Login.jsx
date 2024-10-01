  import { Link } from "react-router-dom"
  import {useFormik}  from 'formik'
 
  export default function Login(){

// console.log(formik.values);
// console.log(formik.touched);

  return(
        <>
        <center>
       <form >
            <br /><br /><br /><br />
        <input type="text" name="email"  id="" placeholder="Enter your email" /><br /><br />
        <input type="text" name="password"  id="" placeholder="Enter your password" /><br /><br />
        <button type="submit">Login</button>
        <p>create new account <Link to={'/signup'} >Signup</Link></p>
        </form>
        </center>
        </>
    )
}