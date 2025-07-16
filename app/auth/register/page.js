'use client'

import { useMyContext } from '@/app/Context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const page = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)

  const router = useRouter()

  const { setIsAuthorized } = useMyContext()

  const handleRegister = async () => {
    if (Loading) {
      return
    }
    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: Email,
          Password: Password,
        }),
      });

      setIsAuthorized(true)
      router.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='border rounded-lg border-solid border-gray-300 bg-white p-2 w-full md:w-[30rem] shadow-xl'>
      <h2 className='text-center font-semibold text-lg md:text-xl text-cyan-700'>
        ADMIN- REGISTER
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
        Do Have Account? <b onClick={() => {
          router.push('/auth/login')
        }} className='cursor-pointer select-none text-cyan-600'>Login</b>
      </div>

      <button onClick={handleRegister} className='my-2 w-full flex justify-center items-center p-2 bg-cyan-600 hover:bg-cyan-800 cursor-pointer font-semibold transition-all duration-500 text-gray-200 rounded'>
        {
          Loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Register"
        }
      </button>



    </div>
  )
}

export default page