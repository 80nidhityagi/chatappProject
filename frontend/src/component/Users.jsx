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


  //  async const result = ()=>await axios({
  //     url: 'http://localhost:3000/allUsers',
  //     method: 'get',

  //   })
  //   if (result) {
  //     setuser(result);
  //   }
  //   else {
  //     alert('some issue');
  //   }
  // }
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
            <td  onClick={()=>{nav('/home/Other/'+user.name)}} style={{ border: '1px solid #ddd', padding: '8px', color: 'black',cursor: 'pointer' }}>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>



    </>
  )
}
export default Users;