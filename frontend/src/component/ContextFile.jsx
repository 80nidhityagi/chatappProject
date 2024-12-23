//  import { useState } from "react";
//  import { createContext } from "react";
//  export const context = createContext();
//  export function ContextFile(){
//     const [users,setUsers] = useState([]);

//      async function getChatValeUsers(){
//         const userid = localStorage.getItem('userId')
//         const result = await axios({
//           url:'http://localhost:3000/getChatUser/'+userid,
//           method:'get',
//         })
//         if(result.data.success){  
//          setUsers(result.data.data);
//         }else{
//             console.log("error h kuch");
//         }
//     }
//     return (
//         <context.Provider value={{ users, getChatValeUsers }}>
//             {/* {children} */}
//         </context.Provider>
//     );

// }