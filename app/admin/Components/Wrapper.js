'use client'
import { useMyContext } from '@/app/Context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Wrapper = ({ children }) => {
    const { IsAuthorized, IsVerified } = useMyContext()

    const [Loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [IsAuthorized])

    const fetchData = async () => {
        try {
            if (!IsAuthorized) {
                router.push('/auth/login')
            }
            else if (IsAuthorized && !IsVerified) {
                router.push('/auth/verify')
            }

        }
        catch (e) {
            console.log('error')
        } finally {
            setLoading(false)
        }
    }

    if (Loading) return <>Loading.....</>
    return (
        <div>{children}</div>
    )
}

export default Wrapper