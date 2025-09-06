import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import HeaderImg from '../assets/images/Headerimg.png'
import CiccLogo from '../assets/images/Cicclogo.png'
import CanadianDreams from '../components/CanadianDreams'
import WhyUs from '../components/WhyUs'
import ImmiGrationNeeds from '../components/ImmiGrationNeeds'
import { GoArrowUpRight } from "react-icons/go";
import WhoWeAre from '../components/WhoWeAre'
import Aeroplane from '../assets/smallimages/Aeroplane.png'
import { PiNotebook } from "react-icons/pi";
import HandShake from '../assets/smallimages/Handshake.png'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonial from '../components/Testimonial'
import LatestNews from '../components/LatestNews'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';



const Home = () => {

    const headingRef = useRef();
    const subheadingRef = useRef();
    const paragraphRef = useRef();
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(headingRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .from(subheadingRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            .from(paragraphRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
    }, []);
    return (
        <div>
            {/* Navbar */}
            <Navbar />
            <header>
                <div>
                    <div className='w-full relative headreimg'>
                        {/* Transparent Gradient div */}
                        <div className='xl:h-[47rem] h-[22rem] w-full'>
                            <div className='absolute top-0 left-0 bg-linear-to-r/srgb from-[#000000DE] to w-full h-full'>
                            </div>
                            <img className='bg-cover w-full h-full shrink-0' src={HeaderImg} alt="" />
                        </div>
                        <div className='container mx-auto absolute top-0 left-0 right-0'>
                            <img className='xl:w-64 lg:w-50 w-42 absolute right-3  top-3' src={CiccLogo} alt="CICC IMAGE" />
                            <div className='absolute xl:top-[16rem] top-[6rem] text-[#FFFFFF] px-5 md:pl-10 lg:ml-5 lg:pl-0'>
                                <h1 className='xl:text-[5rem] text-4xl md:text-6xl  md:mb-0 leading-14' ref={headingRef}>CICC REGISTERED</h1>
                                <h2 className='lg:text-2xl lg:w-2/3 lg:leading-8 xl:text-3xl md:text-xl text-base tracking-wider xl:w-3/4 xl:leading-12 leading-6 md:leading-5 md:mb-3 pb-2 xl:mt-6 md:mt-6 lg:mt-4' ref={subheadingRef}>All your immigration needs, expertly managed under one roof.</h2>
                                <p className='text-base md:text-xl lg:leading-8 md:leading-8 xl:leading-8 md:w-3/5' ref={paragraphRef}>Thinking of moving to Canada? Enjoy better careers, top education, and a great quality of life in a welcoming country!</p>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <CanadianDreams />

            <WhyUs />

            <ImmiGrationNeeds />

            <div className='grid lg:grid-cols-3 xl:gap-20 lg:gap-8 md:gap-12 gap-6 lg:py-8 lg:px-8 md:px-32 xl:px-19 mb-10 py-12 container mx-auto  px-5'>
                <div className='bg-[#F4FBFF] lg:py-12 xl:px-14 px-7 md:py-14 py-7 rounded-2xl relative slide-up stagger-1 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4  lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>01</h1>
                    <h1 className='md:text-2xl text-xl  leading-6 mb-3'>EXPRESS ENTRY DRAW #342</h1>
                    <p className='mb-2'>In the latest Provincial Nominee Program (PNP) specific draw, 825 candidates were invited with a minimum CRS score of 764.</p>
                    <Link to='/blog' className='text-[#006AAB] text-md absolute bottom-1.5 flex items-center gap-1 hover:text-[#004d7a] transition-colors'>Read More <GoArrowUpRight /></Link>
                </div>
                <div className='bg-[#F4FBFF] md:py-12 py-7 xl:px-14 px-7 rounded-2xl relative slide-up stagger-2 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4  lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>02</h1>
                    <h1 className='md:text-2xl text-xl  leading-6 mb-3'>B.C. PNP NOTICE #April 14, 2025</h1>
                    <p className='mb-2'>British Columbia will accept only 1,100 new PNP applications this year, with a strict focus on high-demand roles like doctors,</p>
                    <Link to='/blog' className='text-[#006AAB] text-md absolute bottom-1.5 flex items-center gap-1 hover:text-[#004d7a] transition-colors'>Read More <GoArrowUpRight /></Link>
                </div>
                <div className='bg-[#F4FBFF] md:py-12 py-7 xl:px-14 px-7 rounded-2xl relative slide-up stagger-3 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4 lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>03</h1>
                    <h1 className='md:text-2xl text-xl  leading-6 mb-2'>Join 500K + Strong Community!!!</h1>
                    <p className='mb-2'>A strong community of over half a million aspiring immigrants across various social media groups…..</p>
                    <Link to='/contact-us' className='text-[#006AAB] text-md absolute bottom-1.5 flex items-center gap-1 hover:text-[#004d7a] transition-colors'>Read More <GoArrowUpRight /></Link>
                </div>

            </div>

            <WhoWeAre />

            <ImmiGrationNeeds />

            {/* Student Visa cards */}
            <div className='grid lg:grid-cols-3 gap-6 lg:px-8 xl:px-20 md:px-32 pt-4 xl:pb-20 pb-18   lg:py-8 container mx-auto px-5'>
                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl  lg:p-8  lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-1 hover-lift'>
                    <div className='flex gap-2 md:flex-col'>
                        <img className='md:w-9 w-6 object-cover mb-3 group-hover:brightness-0 group-hover:invert' src={Aeroplane} alt="" />
                        <h5 className='md:text-3xl text-2xl md:mb-3 '>Student Visa</h5>
                    </div>
                    <h4 className='md:text-lg  mb-6'>Planning to study in Canada? We assist international students in obtaining the right study permits...</h4>
                    <span className='flex items-center gap-2'>Read More <GoArrowUpRight /></span>
                </Link>
                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl  lg:p-8 lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-2 hover-lift'>
                    <div className='flex gap-2 md:flex-col'>
                        <PiNotebook className='text-[#006AAB] mb-2 text-3xl md:text-5xl group-hover:brightness-0 group-hover:invert' />
                        <h5 className='md:text-3xl text-2xl mb-3'>Express Entry</h5>
                    </div>
                    <h4 className='md:text-lg mb-6'>The application process for skilled immigrants seeking permanent residency in Canada...</h4>
                    <span className='flex items-center gap-2'>Read More <GoArrowUpRight /></span>
                </Link>
                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl  lg:p-8 lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-3 hover-lift'>
                    <div className='flex gap-2 md:flex-col'>
                        <img className='md:w-9 w-6 object-cover mb-3 group-hover:brightness-0 group-hover:invert' src={HandShake} alt="" />
                        <h5 className='tmd:text-3xl text-2xl mb-3'>Family Sponsorship</h5>
                    </div>
                    <h4 className='md:text-lg mb-6'>Your relatives can live, study, and work in Canada once they become permanent residents.</h4>
                    <span className='flex items-center gap-2 '>Read More <GoArrowUpRight /></span>
                </Link>
            </div>

            {/* I AM AN EMPLOYER carts */}
            <div className='bg-[#006AAB]'>
                <div className='grid lg:grid-cols-2 px-5 lg:px-8 xl:px-20 md:px-32 xl:py-16 py-12 gap-16 container mx-auto'>
                    <div className='bg-white lg:px-12 py-10 px-5  relative pb-28 slide-in-left hover-lift'>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-tight lg:mb-5 md:mb-3 mb-2">
                            <span>I AM AN</span> EMPLOYER
                        </h1>
                        <span className='lg:text-3xl md:text-2xl text-xl lg:mb-5 md:mb-3 mb-2 block'>Global Talent, Canadian Ease.</span>
                        <p className='lg:text-xl md:text-lg lg:mb-5 md:mb-3'>Partner with Ask Kubeir Immigration Services to simplify Canadian Immigration for your global workforce with expert, end to end support.</p>
                        <Link to='/employer'>
                            <button id='buttonStyle' className='py-2 px-4 rounded text-white  lg:text-xl absolute bottom-12 '>Discover More</button>
                        </Link>
                    </div>
                    <div className='bg-white lg:px-12 py-10 relative px-5  pb-28 slide-in-right hover-lift'>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl  font-bold leading-tight lg:mb-5 md:mb-3 mb-2">
                            <span>I AM AN</span> ASPIRANT
                        </h1>
                        <span className='lg:text-3xl md:text-2xl text-xl lg:mb-5 md:mb-3 mb-2 block'>Canada on your Mind?</span>
                        <p className='lg:text-xl md:text-lg lg:mb-5 md:mb-3'>Ask Kubeir offers sharp, custom-fit advice to zip through immigration routes and plant your roots here.With proven expertise, we’ll pave your way to Canada—one breezy step at a time.</p>
                        <Link to='/contact-us'>
                            <button id='buttonStyle' className='py-2 px-4 rounded text-white  lg:text-xl absolute bottom-12'>Start Your Journey</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Why Choose us section */}
            <WhyChooseUs />

            <Testimonial />

            <LatestNews />

            <Faq />

            <Footer />
        </div>

    )
}

export default Home
