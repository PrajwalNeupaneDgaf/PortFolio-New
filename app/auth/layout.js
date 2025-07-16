import React from 'react'
import AuthWrapper from './Components/AuthWrapper'

export const metadata = {
  title: "ADMIN-LOGIN",
  description: "Here you can login  ",
}

const layout = ({ children }) => {
  return (
    <AuthWrapper>
      <div className='min-h-[100dvh] w-full flex justify-center items-center p-3'>
        {children}
      </div>
    </AuthWrapper>
  )
}

export default layout