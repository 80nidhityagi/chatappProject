// import { useState } from "react"
// import { useEffect } from "react"
// import axios from "axios"
// export default function Users(){
//     const [user,setUsers] = useState([])
//     const userData = localStorage.getItem('token')
//     useEffect(()=>{
//         async function fetchdata() {
//           // const config = {
//           //   headers: {
//           //     Authorization: `Bearer ${userData.data.token}`,
//           //   },
//           // };
//          const users = await axios(
//            {
//              method:'get',
//              url:'http://localhost:3000/allusers'
//            }  
//          ) 
//          let newUser = users.data.data 
//          setUsers(newUser)  
//          return;
//         } 
//       fetchdata()   
//         },[])
//        async function conversation(id){
//           const config = {
//             headers: {
//               Authorization: `Bearer ${userData}`,
//             },
//           };
//           const result = await axios({
//             url:`http://localhost:3000/chat/${id}`,
//             method:'post',
//             config
//           })

//         }
//     return(
//         <>
//          <div className="scrollable-users">
//           {user.map((u, index) => (
//             <div key={index} className="user-item" onClick={()=>{conversation(u._id)}}>
//               {u.name } 
//             </div>
//           ))}
//         </div>
//         </>
//     )
// }
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Users() {
  const nav = useNavigate();
  let [user, setuser] = useState([]);

 async function getUserChat(id,name){

  //jo kisi user ke naam pr click krke ye getuserchat function chala hai chat page kholne se phele hum ye chat model mai jake save krenge ki kisse bat krne ke liye click kiya hai jisse jo home page pr search bar se niche show ho ske (serch bar se niche vo users aayenge jinse hum jayada tr baat krte hai) 

  let obj = {sender:localStorage.getItem('userId'),receiver:id}

 let res =  await axios({
    url:'http://localhost:3000/saveSimpleChat',
    method:'post',
    data:obj

  })
const sender_id = obj.sender;
// const receiver_id = obj.receiver;

    // nav(`/Home/Chat/${sender_id}/${res.data.data}/${name}`);
    nav('/Home')

  }
  useEffect(()=>{ async function fun(){

      const data = await axios({
        url:'http://localhost:3000/allUsers',
        method:'get'
      })
  
    

    if(data){
      
      console.log(data,'result');
      console.log(data.data.users);
      
      
      setuser(data.data.users);
    }
    else{
      alert('data not comes')
    }
  }
    fun();
  },[])

  return (
    <>

<table style={{ width: '20%' }}>
      <thead>
        <tr>
          {/* <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Name</th> */}
        </tr>
      </thead>
      <tbody>
        {user.map((user, index) => (
          <tr key={index} style={{ backgroundColor: 'silver' }}>
            <td  onClick={()=>getUserChat(user._id,user.name)} style={{ border: '1px solid #ddd', padding: '8px', color: 'black',cursor: 'pointer' }}>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>



    </>
  )
}
export default Users;