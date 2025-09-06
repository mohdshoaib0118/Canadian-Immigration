import React from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import FadeInOnScroll from './FadeInOnScroll'

const Employer = () => {
  return (
    <div>
      <Navbar />
      <FadeInOnScroll>
        <SectionWithImage />
      </FadeInOnScroll>

    </div>
  )
}

export default Employer
