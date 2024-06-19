"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage(){

  const router = useRouter();

  const [user, setUser] = useState({
    email:"",
    password:"",
  })

  const [buttonDissabled, setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)

  const onLogin = async () =>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)

      console.log("Login success",response.data);
      router.push("/profile")
      


    } catch (error: any) {
       console.log("Login failed");
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex flex-col w-[500px] h-auto bg-gray-300 p-12 rounded-2xl'>
      <h1 className='text-center text-3xl font-bold mb-5'>{loading ? "processing" : "Login"}</h1>
      <hr />
  
      <label className='font-semibold text-xl mb-1 mt-2' htmlFor="email">Email</label>
      <input type="email" placeholder=' Enter Email' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black' />


      <label className='font-semibold text-xl mb-1 mt-2' htmlFor="password">Password</label>
      <input type="password" placeholder='Enter Password' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black' />
      <button onClick={onLogin} className='mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg'>{buttonDissabled ? "Fill the Form" : "Login"}</button>
      <p className='mt-4'>Don't have an Account ? <Link className='text-blue-600' href={"/signup"}>Sign Up</Link></p>
      </div>
    </div>
  )
}


