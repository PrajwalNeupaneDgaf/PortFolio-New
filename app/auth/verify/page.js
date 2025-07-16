'use client'
import { useMyContext } from '@/app/Context/AppContext'
import { sendStatusCode } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const page = () => {

  const router = useRouter()

  const [Code, setCode] = useState('')

  const {IsAuthorized,setIsVerified} = useMyContext()
  useEffect(()=>{
    if(!IsAuthorized){
      router.push('/auth/login')
    }
  },[IsAuthorized])

  const [Loading, setLoading] = useState(false)

  const VerifyMe = async()=>{
    if(!Code || Loading || Code.length<4){
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/verify/${Code}`)
      if(res.status !==200){
        throw new Error('Sorry Some Error')
        return
      }

      const data = await res.json()

      console.log(data)

      setIsVerified(true)

    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='p-2 w-full md:w-[29rem] rounded bg-white shadow-2xl'>
      <h2 className='text-center font-semibold text-lg md:text-xl text-cyan-700'>
        PLEASE VERIFY
      </h2>
      <input value={Code} onChange={(e)=>{
        setCode(e.target.value)
      }} type='text' max={6} placeholder='ENTER YOUR CODE' className='w-full my-2  outline-none border border-solid border-gray-600 rounded p-1 px-2'/>
      <button onClick={VerifyMe} className='my-2 flex justify-center items-center w-full p-2 bg-cyan-600 hover:bg-cyan-800 cursor-pointer font-semibold transition-all duration-500 text-gray-200 rounded'>
        {
          Loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Verify"
        }
      </button>

      <h2 className='select-none text-center font-semibold text-cyan-700 cursor-pointer'>
        Resend Code?
      </h2>
    </div>
  )
}

export default page