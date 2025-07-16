'use client'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useMyContext } from '@/app/Context/AppContext'
import Link from 'next/link'
import { AiOutlineDatabase, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import DialogComp from '@/app/Components/DialogComp'

const Navbar = () => {
    const {setIsAuthorized , setIsVerified} = useMyContext()

    const [isLoggingOut, setisLoggingOut] = useState
    (false)

    const HandleLogout = ()=>{
         Cookies.remove('token', { path: '/' })
        
        setIsAuthorized(false)
        setIsVerified(false)
    }
    return (
        <div className='flex fixed top-0 left-0 mt-1 right-0 py-4 mx-2 rounded bg-white justify-between items-center px-3 shadow-2xl'>
            <div className='text-xl font-semibold bg-gradient-to-l from-gray-500 to-cyan-700 bg-clip-text text-transparent'>
                ADMIN
            </div>

            <div className='flex justify-center items-center gap-2'>
                <Link className='text-cyan-700 font-semibold p-1 md:p-3 hover:shadow-2xl rounded-full flex justify-center items-center gap-1 hover:bg-[#8080801e]' href={'/admin/'}>
                    <AiOutlineDatabase/> <span className='hidden md:block'>Home</span>
                </Link>
                <Link className='text-cyan-700 font-semibold p-1 md:p-3 hover:shadow-2xl rounded-full flex justify-center items-center gap-1 hover:bg-[#8080801e]' href={'/admin/new'}>
                    <AiOutlinePlus/> <span className='hidden md:block'>Add</span>
                </Link>
                <Link className='text-cyan-700 font-semibold p-1 md:p-3 hover:shadow-2xl rounded-full flex justify-center items-center gap-1 hover:bg-[#8080801e]' href={'/admin/all-user'}>
                    <AiOutlineUser/> <span className='hidden md:block'>Admins</span>
                </Link>
                <button onClick={()=>{
                    setisLoggingOut(true)
                }} className='py-2 px-3 md:px-6 rounded bg-green-500 font-semibold text-white cursor-pointer'>
                    Logout
                </button>
            </div>
            {
                !!isLoggingOut &&
                <DialogComp 
                onCancel={()=>{
                    setisLoggingOut(false)
                }}
                onConfirm={HandleLogout}
                description='This will Logout you From This Session'
                title='Do You Want to Logout?'
                />
            }
        </div>
    )
}

export default Navbar