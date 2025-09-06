import React from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import CanadianDreams from '../components/CanadianDreams'
import WhyUs from '../components/WhyUs'
import MeetTeam from '../components/MeetTeam'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
import FadeInOnScroll from './FadeInOnScroll'

const About = () => {
    return (
        <div>
            <Navbar />
            <FadeInOnScroll>
                <SectionWithImage />
            </FadeInOnScroll>

            <FadeInOnScroll>
                <CanadianDreams />
            </FadeInOnScroll>

            <FadeInOnScroll>
                <WhyUs />
            </FadeInOnScroll>

            <FadeInOnScroll>
                <MeetTeam />
            </FadeInOnScroll>

            <div className="flex flex-col bg-[#F4FBFF]">
                <FadeInOnScroll>
                    <Testimonial />
                </FadeInOnScroll>
                <FadeInOnScroll>
                    <Footer />
                </FadeInOnScroll>
            </div>
        </div>
    )
}

export default About
