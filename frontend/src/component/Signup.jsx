import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from 'axios'
export default function Signup() {
    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: ""

        },
        validationSchema: Yup.object({
            name: Yup.string().max(20,"name must be less then or equal to 20 character").required("name is required"),
            email: Yup.string().email("email must be valid").required("email is required field")
            ,
            password: Yup.string().max(8, "password must be maximum 8 character").min(6, "minumum 6 characters").required("password is required field")
        })
        , onSubmit: async(values) => {  
            console.log(values);
              
        let result = await axios({
            method:'post',
            url:'http://localhost:3000/signup',
            data:values
         })
   console.log(result);
   
        }
    })
    return (
        <>
            <center>
                <form onSubmit={formik.handleSubmit} >

                    <br /><br /><br /><br />
                    <input type="text" name="name" id="" placeholder="Enter your name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} /><br /><br />
                    {formik.touched.name && formik.errors.name && <p style={{ color: "red" }}>{formik.errors.name}</p>}
                    <input type="text" name="email" id="" placeholder="Enter your email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br /><br />
                    {formik.touched.email && formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
                    <input type="text" name="password" id="" placeholder="Enter your password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/><br /><br />
                    { formik.touched.password && formik.errors.password && <p style={{color:"red"}}>{formik.errors.password}</p>}
                    <button type="submit">Signup</button>
                </form>
            </center>
        </>
    )
}