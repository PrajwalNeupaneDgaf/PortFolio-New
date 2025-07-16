import React from 'react'
import Wrapper from './Components/Wrapper'
import Navbar from './Components/Navbar'

const layout = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <div className='pt-24 px-4 '>
        {children}
      </div>
    </Wrapper>
  )
}

export default layout