
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import registericon from "../assets/20824344_6343825.jpg"
 
import {  FaGoogle } from "react-icons/fa";

import { AuthContext } from "../AuthPovider/AuthPovider";



const Register = () => {

  const navigate=useNavigate()
    const {registerUser,updateUser,googleLogin,signOutUser}=useContext(AuthContext)
    const [showPassword,setShowPassword]=useState(false)

   
   
    const handleGoogleLogin=(e)=>{
      e.preventDefault()
       googleLogin()
       .then(result=>{
        Swal.fire({
            title: `Welcome ${result.user.email}`,
            text: 'login success',
            icon: 'success',
            confirmButtonText: 'ok'
          })
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
        const username = form.username.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        if(!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)){
            Swal.fire({
                title: 'Password not strong enough',
                text: 'Password must be at least 6 characters long and contain at least one uppercase letter and one lowercase letter.',
                icon: 'error',
                confirmButtonText: 'ok'
              })
            return
        }




        registerUser(email,password)
      
       
        .then(result=>{Swal.fire({
          title: 'Registation Successfully',
          text: `Welcome ${result.user.email}
          Please login to continue`,
          icon: 'success',
          confirmButtonText: 'ok'
        }
      
      
      )
      updateUser(username,photo)
      signOutUser()
      navigate('/login')
      
      })
        .catch(error=>Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'ok'
        }))
        event.target.reset();


        
    }

    return (
        <div className="">
         
            <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row ">
  <div data-aos='fade-right' className="text-center lg:text-left w-full h-auto">
      
  <img src={registericon} alt="" className="w-full" />
    </div>
    
   
    <div data-aos='fade-left' className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-5 ">
        <div>
            <h1 className="text-2xl font-bold text-center">Create an account</h1>
        </div>
      <form className="card-body " onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name="username" type="text" placeholder="Your name" className="input input-bordered" required />

          <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input name="photo" type="text" placeholder="Your photo " className="input input-bordered" required />
        </div>


        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type={showPassword?"text":"password"} placeholder="password" className="input input-bordered" required />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-2/4 ">
          {showPassword?<FaEye/>:<FaEyeSlash/>}
          </button>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-primary text-lg">Register</button>
          <p className="text-sm mt-2 text-gray-500 font-semibold text-center ">Already have an account?
            <Link to={"/login"} className="text-primary pl-2 ">Login</Link></p>
            <div className="space-y-3 text-center mt-3">
            <h1 className="text-sm font-semibold text-gray-400">Or</h1>
            <button type="button" onClick={handleGoogleLogin} className="btn w-full text-lg  bg-transparent border-primary  "><FaGoogle/>Continue with Google</button>
            </div>
          <div>
            
          </div>
        </div>
      </form>
    </div>
  </div>
</div>


        </div>
    );
};

export default Register;