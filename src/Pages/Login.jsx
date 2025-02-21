import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import login from '../assets/4957136_4957136.jpg'
import { AuthContext } from "../AuthPovider/AuthPovider";

import useTitle from "../Hooks/useTitle";


const Login = () => {
  useTitle('Login')
 
  const navigate =useNavigate()
  const [email, setEmail] = useState('')
  
    const {loginUser,googleLogin,setUser}=useContext(AuthContext)
    const [showPassword,setShowPassword]=useState(false)
    const handleGoogleLogin=(e)=>{
      e.preventDefault()
       googleLogin()
       .then(result=>{
        setUser(result.user)
        Swal.fire({
            title: `Welcome ${result.user.email}`,
            text: 'login success',
            icon: 'success',
            confirmButtonText: 'ok'
          })
          navigate('/')
    })
       .catch(error=>Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'ok'
      }))

      


 }
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email,password)
    .then(result=>{setUser(result.user)
        Swal.fire({
            title: `Welcome ${result.user.email}`,
            text: 'login success',
            icon: 'success',
            confirmButtonText: 'ok'
          })
          navigate('/')
    })

    
    .catch(error=>Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'ok'
      }))
    
  }

 
  const handleGithubLogin=()=>{

  }

  



    return (
        <div className="">
       
            <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse  ">
  <div data-aos="fade-left" className=" text-center lg:text-left">
      
      <div  className="">
      <img src={login} alt="" />
      </div>
    </div>
   
    <div data-aos="fade-right" className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl p-5 ">
        <div>
            <h1 className="text-2xl font-bold text-center ">Welcome Back</h1>
        </div>
      <form className="card-body " onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input  name="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email" className="input input-bordered"  />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type={showPassword?"text":"password"} placeholder="Enter password" className="input input-bordered"  />
          
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {showPassword?<FaEye/>:<FaEyeSlash/>}
          </button>
          

             
          <label className="label">
            <button     className="label-text-alt link link-hover">Forgot password?</button>
          </label>
        </div>
        <div className="form-control mt-6 text-center space-y-3">
          <button className="btn bg-primary text-white text-lg">Login</button>
          
        </div>
        <div className="flex flex-col text-center gap-3">
        <p className="text-sm mt-2  text-gray-500 font-semibold ">Don't have an account?<Link to={"/register"} className="text-primary">Register</Link></p>
          <h1 className="text-sm font-semibold text-gray-400">Or</h1>
          <button type="button" onClick={handleGoogleLogin} className="btn text-lg  bg-transparent border-primary  "><FaGoogle/>Continue with Google</button>
          <button type="button" onClick={handleGithubLogin} className="btn  text-lg bg-transparent border-primary"><FaGithub/>Continue with Github</button>
        </div>
      </form>
    </div>
  </div>
</div>

</div>
    );
};

export default Login;