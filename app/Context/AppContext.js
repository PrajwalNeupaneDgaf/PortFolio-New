'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import LoadingComponent from "./"
const newContext = createContext()

const AppContext = ({ children }) => {
  const [IsAuthorized, setIsAuthorized] = useState(false)
  const [IsVerified, setIsVerified] = useState(false)
  const [Projects, setProjects] = useState([])

  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/me', {
        method: "GET",
        credentials: "include"
      })

      const resdata = await fetch('/api/projects');
      const json = await resdata.json();
      setProjects(json.data || []);

      console.log(json)
      const data = await res.json()

      if (res.status == 500) {
        throw new Error('You are Not Authorized')
      }

      setIsAuthorized(true)

      setIsVerified(data?.data?.IsVerified)
    } catch (error) {
      setIsAuthorized(false)
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  if (Loading) return <LoadingComponent/>
  return (
    <newContext.Provider value={{ IsAuthorized, setIsAuthorized, IsVerified, setIsVerified,Projects }}>
      {children}
    </newContext.Provider>
  )
}

export default AppContext

export const useMyContext = () => {
  return useContext(newContext)
}
