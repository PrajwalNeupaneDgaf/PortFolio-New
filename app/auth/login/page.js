'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async () => {

    if (Loading) {
      return
    }
    setLoading(true)

    try {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: Email,
            Password: Password,
          }),
        });

        if(res.status!==200){
          return
        }

        setIsAuthorized(true)
        router.push('/admin')
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className='border rounded-lg border-solid border-gray-300 bg-white p-2 w-full md:w-[30rem] shadow-xl'>
      <h2 className='text-center font-semibold text-lg md:text-xl text-cyan-700'>
        ADMIN- LOGIN
      </h2>

      <div className='flex flex-col gap-1 my-2'>
        <label htmlFor='email' className='font-semibold text-gray-900 select-none'>
          EMAIL:
        </label>
        <input value={Email} onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder='Email:something.xyz.com' type='email' id='email' className='outline-none border border-solid border-gray-600 rounded p-1 px-2 ' />
      </div>
      <div className='flex flex-col gap-1 my-2'>
        <label htmlFor='psd' className='font-semibold text-gray-900 select-none'>
          PASSWORD:
        </label>
        <input value={Password} onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder='Password:8 char' type='password' id='psd' className='outline-none border border-solid border-gray-600 rounded p-1 px-2 ' />
      </div>

      <div className='my-2 text-gray-800 '>
        Don"t Have Account? <b onClick={() => {
          router.push('/auth/register')
        }} className='cursor-pointer select-none text-cyan-600'>Register</b>
      </div>

      <button onClick={handleLogin} className='my-2 flex justify-center items-center w-full p-2 bg-cyan-600 hover:bg-cyan-800 cursor-pointer font-semibold transition-all duration-500 text-gray-200 rounded'>
        {
          Loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Login"
        }
      </button>

      <h2 className='select-none text-center font-semibold text-cyan-700 cursor-pointer'>
        Forget Password?
      </h2>

    </div>
  )
}

export default page