import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
export default function Users(){
    const [user,setUsers] = useState([])
    const userData = localStorage.getItem('token')
    useEffect(()=>{
        async function fetchdata() {
          // const config = {
          //   headers: {
          //     Authorization: `Bearer ${userData.data.token}`,
          //   },
          // };
         const users = await axios(
           {
             method:'get',
             url:'http://localhost:3000/allusers'
           }  
         ) 
         let newUser = users.data.data 
         setUsers(newUser)  
         return;
        } 
      fetchdata()   
        },[])
       async function conversation(id){
          const config = {
            headers: {
              Authorization: `Bearer ${userData}`,
            },
          };
          const result = await axios({
            url:`http://localhost:3000/chat/${id}`,
            method:'post',
            config
          })
        
        }
    return(
        <>
         <div className="scrollable-users">
          {user.map((u, index) => (
            <div key={index} className="user-item" onClick={()=>{conversation(u._id)}}>
              {u.name } 
            </div>
          ))}
        </div>
        </>
    )
}