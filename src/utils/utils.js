import axios from "axios"

export const saveUser=async(user)=>{
    
    axios.post(`https://task-mate-server-alpha.vercel.app/users/${user?.email}`,{name:user?.displayName,
        image:user?.photoURL,
        email:user?.email,
        role:'user'
    
    })
   
}