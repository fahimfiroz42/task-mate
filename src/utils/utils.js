import axios from "axios"

export const saveUser=async(user)=>{
    
    axios.post(`http://localhost:5000/users/${user?.email}`,{name:user?.displayName,
        image:user?.photoURL,
        email:user?.email,
        role:'user'
    
    })
   
}