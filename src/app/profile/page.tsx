"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'


export default function ProfilePage() {

    const router = useRouter();

    const [data, setData] = useState("nothing")

    const getUserDetails = async () =>{
        const res = await axios.post("/api/users/me")
        console.log(res.data.data._id);
        setData(res.data.data._id)
        
    }

    const logout = async () =>{
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
            
        }
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ?"No Data Found" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded' onClick={logout}>Logout</button>
      <button className='bg-orange-500 mt-4 hover:bg-orange-700 text-black font-bold px-6 py-2 rounded' onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}

