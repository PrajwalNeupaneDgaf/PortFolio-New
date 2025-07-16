'use client'

import { useMyContext } from '@/app/Context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AuthWrapper = ({ children }) => {
    const { IsAuthorized,IsVerified } = useMyContext()

    const [Loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        try {
            if (IsAuthorized && IsVerified) {
                router.push('/')
            }else if(!IsVerified && IsAuthorized){
                router.push('/auth/verify')
            }        
        }
        catch(e){
            console.log('error')
        }finally{
            setLoading(false)
        }
    }, [IsAuthorized])

    if (Loading) return <>Loading.....</>
    return (
        <div>{children}</div>
    )
}

export default AuthWrapper