import React, { useRef } from 'react'
import WhyusImg from '../assets/images/WhyusImg.png'
import AboutWhyUs from '../assets/images/AboutWhyus.png'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
    const Location = useLocation();
    const currentpath = Location.pathname;
    const ImageRoutes = {
        '/': {
            image: WhyusImg,
        },
        '/about-us': {
            image: AboutWhyUs,
        },

    };
    const { image } = ImageRoutes[currentpath]
    const WhyUsText = useRef();
    const WhyUsImg = useRef();
    // useGSAP(() => {
    //     gsap.from(WhyUsImg.current, {
    //         delay: 0.5,
    //         y: '-100%',
    //         duration: 0.8,
    //         scrollTrigger:{
    //             scroller: 'body',
    //             trigger: WhyUsImg.current,
    //             // markers: true,
    //             start: 'top 40%',
    //             end: 'top 20%',
    //             // scrub: 1
    //         }

    //     });

    //     gsap.from(WhyUsText.current.children, {
    //         delay: 1,
    //         x: '-100%',
    //         duration: 0.7,
    //         scrollTrigger: {
    //             trigger: WhyUsText.current,
    //             scroller: 'body',
    //             // markers:true,
    //             start: 'top 90%',
    //             end: 'bottom 80%',
    //             scrub: 1
    //         },
    //     });

    // })
    return (
        <div className='bg-[#F4FBFF]'>
            <div className='grid lg:grid-cols-2 lg:py-16 py-8 lg:mb-16 mb-8 container mx-auto px-5 md:px-10 lg:px-0'>

                <div className='xl:ml-12 lg:pl-8 xl:mr-12  order-2 lg:order-1 mt-6 lg:mt-0'>
                    <div className='overflow-hidden' ref={WhyUsText}>
                        <h1 className='lg:text-5xl md:text-4xl text-3xl lg:mt-1.5'>Why Us?</h1>

                        <p className=' mb-3 mt-4 md:text-xl text-base'>At Canadian Dreams Immigration, we don’t offer one-size-fits-all solutions. We invest time in understanding your personal or corporate objectives and customize our services accordingly—whether you're an international student, skilled worker, temporary foreign worker, business owner, or family sponsor.
                        </p>

                        <p className='md:mb-6 md:text-xl text-lg md:mt-6'>
                            What sets us apart is our unwavering commitment to:
                        </p>
                        <h5 className='poppins-regular flex items-center mb-4 md:text-lg text-base mt-4'>
                            <IoMdCheckmarkCircleOutline size={30} color='#006AAB' className='mr-2' />
                            Integrity and Accountability in Process Handling
                        </h5>
                        <h5 className='poppins-regular flex items-center mb-4 md:text-lg text-base'>
                            <IoMdCheckmarkCircleOutline size={30} color='#006AAB' className='mr-2' />
                            Timely and Transparent Communication
                        </h5>
                        <h5 className='poppins-regular flex items-center mb-4 md:text-lg text-base'>
                            <IoMdCheckmarkCircleOutline size={30} color='#006AAB' className='mr-2' />
                            End-to-End Support from Consultation to Final Decision
                        </h5>
                        <h5 className='poppins-regular flex items-center mb-4 md:text-lg text-base'>
                            <IoMdCheckmarkCircleOutline size={30} color='#006AAB' className='mr-2' />
                            High Approval Rates and Proven Track Record
                        </h5>
                        <p className='md:text-lg text-base'>We are proud to have successfully assisted hundreds of clients from around the globe in achieving their Canadian dream</p>
                    </div>
                </div>
                <div className='overflow-hidden  xl:mr-20 lg:ml-10 xl:ml-0 lg:pr-8 order-1 lg:order-2' >
                    <img className='md:rounded-3xl rounded-xl  w-full h-full object-cover' ref={WhyUsImg} src={image} alt="WhyusImg" />
                </div>
            </div>
        </div>
    )
}

export default WhyUs
