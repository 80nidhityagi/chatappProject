// Import useParams from react-router-dom
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
// import { decode } from 'jwt-decode';

function Other() {
  // Access the user parameter from the URL
  const { user } = useParams();
   const userData = localStorage.getItem('token')

  console.log(user);
  useEffect(()=>{
    
   async function fun(){
    alert('ok')
    
    const config = {
                  headers: {
                    Authorization: `Bearer ${userData}`,
                  },
                };
     console.log("*****************");
     console.log("*****************");
     console.log("*****************");
     console.log("*****************");
     console.log(config,'config h bhai');
     
     
    
    // let obj = {sender:jwt_decode(localStorage.getItem('token')),receiver:user}
    const result = await axios({
        url:'http://localhost:3000/chat',
        method:'post',
        data:{sender:user,receiver:localStorage.getItem('token')}
    })

    }
    fun();
  },[])
  

  return (
    <div>
      <h1>Welcome, {user}!</h1>
    </div>
  );
}

export default Other;
