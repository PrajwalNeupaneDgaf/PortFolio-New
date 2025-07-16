import React from 'react'
import HeroSection from './Components/HeroSection'
import AboutSection from './Components/AboutSection'
import ProjectsSection from './Components/ProjectsSection'
import ContactSection from './Components/ContactSection'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ProjectsSection/>
      <ContactSection/>
    </div>
  )
}

export default page