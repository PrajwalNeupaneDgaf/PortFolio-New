import React from 'react'
import Navbar from './Components/Navbar'

const layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div className='pt-24'>
          {children}
        </div>
    </div>
  )
}

export default layout
