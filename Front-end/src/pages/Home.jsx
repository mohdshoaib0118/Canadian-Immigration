// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from 'react'
import BannerCarousel from '../components/BannerCarousel'
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
import Form from '../components/Form'
import ContactImgModel from '../assets/images/ModelImg.jpg'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import FadeInOnScroll from './FadeInOnScroll'
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdEmail } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';
import { IoLocationSharp } from "react-icons/io5";
import { TiSocialFacebook } from 'react-icons/ti';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoTiktok } from 'react-icons/io5';
const Home = () => {
    const headingRef = useRef();
    const subheadingRef = useRef();
    const paragraphRef = useRef();
    const [Hide, setHide] = useState(false)
    const hideController = () => {
        setHide(false)
    }
    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenEmailModal')

        if (!hasSeenModal) {
            const timer = setTimeout(() => {
                setHide(true)
                localStorage.setItem('hasSeenEmailModal', 'true')
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [])

    // Hero animation
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
            {/* Hero Carousel */}
            <BannerCarousel />


            {Hide ? (
                <div
                    className='fixed top-0 left-0 w-full h-screen backdrop-blur-md z-20 flex items-center justify-center md:px-12 px-6'
                    onClick={hideController}
                >
                    <div
                        className="flex md:gap-3 justify-center  w-full md:h-[40rem] max-w-4xl rounded-3xl overflow-hidden bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-full w-1/2 rounded hidden lg:block relative overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#000000] to-transparentz-10 lg:p-9 flex flex-col items-center justify-center">
                                <FadeInOnScroll>
                                    <h5 className='text-white'>Have a question or need more information? We’re here to help! Reach out to us through any of the following ways:</h5>
                                <div className='flex flex-col gap-5  mt-6'>
                                    <div className="flex items-center gap-3">
                                        <MdEmail className='text-white text-[10px] sm:text-[28px]' />
                                        <a href="mailto:Canadiandreamsimmigration@gmail.com" className="text-lg poppins-regular text-white transition-colors">
                                            Canadiandreamsimmigration@gmail.com
                                        </a>
                                    </div>
                                    <div className="flex  text-white">
                                        <IoCall className='text-[10px] sm:text-[28px] mr-2' />
                                        <a href="tel:+14164343155" className="text-[11px] sm:text-base xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                                            +1 (416) 434-3155,
                                        </a>
                                        <a href="tel:+16475109350" className="text-[11px] sm:text-base xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                                            +1 (647) 510-9350,
                                        </a>

                                    </div>
                                    <div>
                                        <h4 className='text-white flex  gap-1 text-base'><IoLocationSharp className='text-2xl' />200-7404 King George Blvd, Unit 246, Surrey, B.C,</h4>
                                    </div>
                                    <div>
                                        <h4 className='text-white flex  text-base gap-1'><IoLocationSharp className='text-2xl' />5-B Conestoga Dr, Brampton, ON L6Z 4N5, Canada,</h4>
                                    </div>
                                    <div>
                                        <h5 className='text-white ml-1'>Connect Us On :</h5>
                                        <div className='flex mt-3'>
                                            <a href="https://www.facebook.com/share/1M6rNDDtyZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className='hover:bg-[#108CEC] p-1 hover:text-white  text-white rounded-full'>
                                                <TiSocialFacebook size={28} className='hover:rotate-360 duration-500 transition' />
                                            </a>
                                            <a href="https://www.instagram.com/canadian.dreams.immigration?igsh=Zm5zcXR0dTNvdTJu" target="_blank" rel="noopener noreferrer" className='hover:bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] p-1.5 rounded-full' >
                                                <AiFillInstagram size={28} className="hover:rotate-360 duration-500 transition text-white" />
                                            </a>
                                            <a href="https://www.tiktok.com/@canadiandreams1?_t=ZS-9002oFxqNSq&_r=1" target="_blank" rel="noopener noreferrer" className='hover:bg-gradient-to-tr from-[#25F4EE] via-[#000000] to-[#FE2C55] p-1 hover:text-white  text-white rounded-full'>
                                                <IoLogoTiktok size={28} className="hover:rotate-360 duration-500 transition" />
                                            </a>
                                            <a href="https://maps.app.goo.gl/6urHVPQhfNLVmSoV6" target="_blank" rel="noopener noreferrer" className='hover:bg-white hover:text-[#006AAB] p-1  text-white rounded-full'>
                                                <IoLocationSharp size={28} className="hover:rotate-360 duration-300 transition" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                </FadeInOnScroll>
                            </div>


                            {/* Image */}
                            <img
                                className="w-full h-full object-cover rounded"
                                src={ContactImgModel}
                                alt="Email Banner"
                            />
                        </div>


                        <div className='px-7 py-4  lg:px-4 md:py-0 w-full lg:w-1/2 relative'>
                            <div className='flex items-center justify-center mt-4 absolute right-6 lg:right-2 lg:-top-2 -top-1'>
                                <RxCross2
                                    className='text-[#006AAB] cursor-pointer'
                                    size={32}
                                    onClick={hideController}
                                />
                            </div>
                            <div className='mt-8'>
                                <Form onSuccess={() => setHide(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}



            {/* Sections with Fade-in Scroll Animations */}
            <FadeInOnScroll>
                <CanadianDreams />
                </FadeInOnScroll>
            <FadeInOnScroll><WhyUs /></FadeInOnScroll>
            <FadeInOnScroll><ImmiGrationNeeds /></FadeInOnScroll>

            {/* News Cards */}
            <div className='grid lg:grid-cols-3 xl:gap-20 lg:gap-8 md:gap-12 gap-6 lg:py-8 lg:px-8 md:px-32 xl:px-19 py-12 container mx-auto px-5 mb-2'>
                <div className='bg-[#F4FBFF] lg:py-12 xl:px-14 px-7 md:py-14 py-7 rounded-2xl relative slide-up stagger-1 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4 lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>01</h1>
                    <h1 className='md:text-2xl text-xl leading-6 mb-3'>Express Entry Draw #342 – Latest Results</h1>
                    <p className='mb-2 mt-4 lg:mt-0'>
                        In the recent draw for the Provincial Nominee Program (PNP), 825 candidates received invitations to apply for permanent residency, with a minimum CRS score of 764.
                    </p>
                    <Link to='/blog' className='text-[#006AAB] text-md lg:absolute mt-4 lg:mt-0 bottom-4 flex items-center gap-1 hover:text-[#004d7a] transition-colors hover:underline'>
                        Read More <GoArrowUpRight />
                    </Link>
                </div>

                <div className='bg-[#F4FBFF] md:py-12 py-7 xl:px-14 px-7 rounded-2xl relative slide-up stagger-2 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4 lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>02</h1>
                    <h1 className='md:text-2xl text-xl leading-6 mb-3'>B.C. PNP Update – Key Changes for 2025</h1>
                    <p className='mb-2 mt-4 lg:mt-0'>
                        British Columbia will accept only 1,100 new PNP applications this year, prioritizing high-demand roles like healthcare professionals.
                    </p>
                    <Link to='/blog' className='text-[#006AAB] text-md lg:absolute mt-4 lg:mt-0 bottom-4 flex items-center gap-1 hover:text-[#004d7a] transition-colors hover:underline'>
                        Read More <GoArrowUpRight />
                    </Link>
                </div>

                <div className='bg-[#F4FBFF] md:py-12 py-7 xl:px-14 px-7 rounded-2xl relative slide-up stagger-3 hover-lift'>
                    <h1 className='absolute lg:-top-2 -top-4 bg-[#006AAB] md:px-5 px-4 py-2 md:py-4 lg:-right-2 -right-1 text-white rounded-xl md:text-xl'>03</h1>
                    <h1 className='md:text-2xl text-xl leading-6 mb-2'>Join Our 500K+ Strong Community</h1>
                    <p className='mb-2 mt-4 lg:mt-0'>
                        Connect with over half a million people pursuing their Canadian dreams in our active social media groups. Get guidance, tips, and support every step of the way.
                    </p>
                    <Link to='/contact-us' className='text-[#006AAB] text-md lg:absolute mt-4 lg:mt-0 bottom-4 flex items-center gap-1 hover:text-[#004d7a] transition-colors hover:underline'>
                        Read More <GoArrowUpRight />
                    </Link>
                </div>
            </div>


            <FadeInOnScroll><WhoWeAre /></FadeInOnScroll>
            <FadeInOnScroll>
                <div className='p-3 mb-3 container mx-auto'>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-tight text-center mb-3">
                        <span>Your Canadian Dream, </span>Supported Every Step of the Way
                    </h1>
                    <h6 className='text-center w-auto lg:w-[60rem] leading-6 md:text-xl text-base mx-auto px-5'>
                        Moving to Canada is an exciting journey, but it can feel overwhelming. We're here to guide you at every step, providing clear advice and reliable support so you can navigate the immigration process with confidence. Let’s work together to make your Canadian dream a reality.
                    </h6>
                </div>
            </FadeInOnScroll>

            {/* Student Visa Cards */}
            <div className='grid lg:grid-cols-3 gap-6 lg:px-8 xl:px-20 md:px-32 pt-4 xl:pb-20 pb-18 lg:py-8 container mx-auto px-5'>

                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl lg:p-8 lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-1 hover-lift'>
                    <div className='flex gap-2 lg:flex-col'>
                        <img className='md:w-9 w-6 object-cover mb-3 group-hover:brightness-0 group-hover:invert' src={Aeroplane} alt="Student Visa" />
                        <h5 className='md:text-3xl text-2xl md:mb-3'>Student Visa</h5>
                    </div>
                    <h4 className='md:text-lg mb-6'>
                        Start your studies in Canada stress-free. We help international students secure the right study permits so your educational journey begins smoothly and confidently.
                    </h4>
                    <span className='flex items-center gap-2 hover:underline lg:absolute bottom-6'>
                        Read More <GoArrowUpRight />
                    </span>
                </Link>

                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl lg:p-8 lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-2 hover-lift'>
                    <div className='flex gap-2 lg:flex-col'>
                        <PiNotebook className='text-[#006AAB] mb-2 text-3xl md:text-5xl group-hover:brightness-0 group-hover:invert' />
                        <h5 className='md:text-3xl text-2xl mb-3'>Express Entry</h5>
                    </div>
                    <h4 className='md:text-lg mb-6'>
                        The Express Entry system is Canada’s main pathway for skilled professionals. We help you build a strong profile and guide you through every step, so your application stands out.
                    </h4>
                    <span className='flex items-center gap-2 hover:underline lg:absolute bottom-6'>
                        Read More <GoArrowUpRight />
                    </span>
                </Link>

                <Link to='/our-services' className='border-1 border-[#006AAB] rounded-2xl lg:p-8 lg:py-12 p-6 bg-[#F4FBFF] relative hover:bg-[#006AAB] hover:text-white group transition duration-400 cursor-pointer block scale-in stagger-3 hover-lift'>
                    <div className='flex gap-2 lg:flex-col'>
                        <img className='md:w-9 w-6 object-cover mb-3 group-hover:brightness-0 group-hover:invert' src={HandShake} alt="Family Sponsorship" />
                        <h5 className='md:text-3xl text-2xl mb-3'>Family Sponsorship</h5>
                    </div>
                    <h4 className='md:text-lg mb-6'>
                        Reunite with your loved ones in Canada. We guide you through the Family Sponsorship program so your relatives can live, study, and work in Canada smoothly.
                    </h4>
                    <span className='flex items-center gap-2 hover:underline lg:absolute bottom-6'>
                        Read More <GoArrowUpRight />
                    </span>
                </Link>

            </div>

            {/* Employer Section */}
            <div className='bg-[#006AAB]'>
                <div className='grid lg:grid-cols-2 px-5 lg:px-8 xl:px-20 md:px-32 xl:py-16 py-12 lg:gap-16 gap-12 container mx-auto'>

                    {/* Employer Section */}
                    <div className='bg-white lg:px-12 py-10 px-5 relative pb-28 slide-in-left hover-lift rounded-xl lg:rounded-none'>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-tight lg:mb-5 md:mb-3 mb-2">
                            <span>I'm an</span> Employer
                        </h1>
                        <span className='lg:text-3xl md:text-2xl text-xl lg:mb-5 md:mb-3 mb-2 block'>
                            Your Bridge to Global Talent
                        </span>
                        <p className='lg:text-xl md:text-lg lg:mb-5 md:mb-3'>
                            Found the perfect candidate overseas? We make the process seamless. Partner with us for complete immigration support, so you can focus on running your business while we handle the paperwork and complexities.
                        </p>
                        <Link to="/employer" className="flex items-center justify-center w-fit group absolute bottom-12">
                            <button
                                id="buttonStyle"
                                className="py-2 px-4 pr-8 rounded-l-full rounded-r-4xl text-white lg:mt-3 sm:text-xl mt-5 group-hover:bg-[#1085ce] transition-all duration-100"
                            >
                                Discover More
                            </button>
                            <div className="bg-[#006AAB] absolute lg:mt-3 mt-5 border-2 border-white rounded-full -right-5 group-hover:-right-7 group-hover:bg-[#1085ce] transition-all duration-100">
                                <IoIosArrowRoundForward size={42} className="text-white transition-all duration-100 group-hover:-rotate-32" />
                            </div>
                        </Link>
                    </div>

                    {/* Aspirant Section */}
                    <div className='bg-white lg:px-12 py-10 relative px-5 pb-28 slide-in-right hover-lift rounded-xl lg:rounded-none'>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-tight lg:mb-5 md:mb-3 mb-2">
                            <span>I AM AN</span> Aspirant
                        </h1>
                        <span className='lg:text-3xl md:text-2xl text-xl lg:mb-5 md:mb-3 mb-2 block'>
                            Your Canadian Dream Starts Here                        </span>
                        <p className='lg:text-xl md:text-lg lg:mb-5 md:mb-3'>
                            Starting a new life in Canada can feel overwhelming. We guide you through every step of the immigration process with clear, personalized advice, helping you confidently navigate your journey and reach your Canadian dream faster.
                        </p>
                        <Link to="/contact-us" className="flex items-center justify-center w-fit group absolute bottom-12">
                            <button
                                id="buttonStyle"
                                className="py-2 px-4 pr-8 rounded-l-full rounded-r-4xl text-white lg:mt-3 sm:text-xl mt-5 group-hover:bg-[#1085ce] transition-all duration-100"
                            >
                                Start Your Journey
                            </button>
                            <div className="bg-[#006AAB] absolute lg:mt-3 mt-5 border-2 border-white rounded-full -right-5 group-hover:-right-7 group-hover:bg-[#1085ce] transition-all duration-100">
                                <IoIosArrowRoundForward size={42} className="text-white transition-all duration-100 group-hover:-rotate-32" />
                            </div>
                        </Link>
                    </div>

                </div>
            </div>


            {/* Remaining Sections */}
            <FadeInOnScroll>
                <WhyChooseUs />
            </FadeInOnScroll>
            <FadeInOnScroll>
                <Testimonial />
            </FadeInOnScroll>
            <FadeInOnScroll>
                <LatestNews />
            </FadeInOnScroll>
            <FadeInOnScroll>
                <Faq />
            </FadeInOnScroll>
        </div >
    )
}

export default Home
