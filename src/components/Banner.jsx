import { useContext } from "react";
import { AuthContext } from "../AuthPovider/AuthPovider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/utils";


const Banner = () => {
    const navigate=useNavigate()
    const {loginUser,googleLogin,setUser}=useContext(AuthContext)
      const handleGoogleLogin=(e)=>{
          e.preventDefault()
           googleLogin()
           .then(result=>{
            saveUser(result?.user)
            setUser(result.user)

            Swal.fire({
                title: `Welcome ${result.user.email}`,
                text: 'login success',
                icon: 'success',
                confirmButtonText: 'ok'
              })
              navigate('/add-task')
        })
           .catch(error=>Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'ok'
          }))
    
          
    
    
     }
    return (
        <div
        className="hero min-h-[calc(100vh-65px)] "
        style={{
          backgroundImage: "url(https://i.ibb.co.com/9HjBPD0z/34544.jpg)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Welcome to TaskMate</h1>
            <p className="mb-5">
              TaskMate is a task management app that helps you stay organized and
              focused on your goals.
            </p>
            <button onClick={handleGoogleLogin}  className="btn bg-blue-500 text-xl font-semibold text-white">Login</button>
          </div>
        </div>
      </div>
    );
};

export default Banner;