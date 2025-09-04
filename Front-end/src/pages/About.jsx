import React from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import CanadianDreams from '../components/CanadianDreams'
import WhyUs from '../components/WhyUs'
import MeetTeam from '../components/MeetTeam'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'

const About = () => {
    return (
        <div>
            <Navbar />
            <SectionWithImage />
            <CanadianDreams />
            <WhyUs />
            <MeetTeam />
            <div className='flex flex-col bg-[#F4FBFF]'>
                <div className=''>
                    <Testimonial />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default About