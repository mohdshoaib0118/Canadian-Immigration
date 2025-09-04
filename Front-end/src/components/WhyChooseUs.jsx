import React, { useRef } from 'react'
import CanadaPassportImg from '../assets/images/CanadaPassportImg.png'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);
const WhyChooseUs = () => {
    const WhyChooseImg = useRef();
    const whyChooseText = useRef();
    // useGSAP(() => {
    //         gsap.from(WhyChooseImg.current, {
    //             delay: 0.5,
    //             y: '-100%',
    //             duration: 0.8,
    //             ease: 'bounce.out',
    //             scrollTrigger:{
    //                 scroller: 'body',
    //                 trigger: WhyChooseImg.current,
    //                 // markers: true,
    //                 start: 'top -2%',
    //                 end: 'bottom 80%',
    //                 // scrub: 1
    //             }
               
    //         });
    
    //         gsap.from(whyChooseText.current.children, {
    //             delay: 1,
    //             x: '-100%',
    //             duration: 0.7,
    //             scrollTrigger: {
    //                 trigger: whyChooseText.current,
    //                 scroller: 'body',
    //                 // markers:true,
    //                 start: 'top 90%',
    //                 end: 'bottom 40%',
    //                 scrub: 1
    //             },
    //         });
    
    //     })
    return (
        <div className='bg-[#F4FBFF] my-10'>
            <div className='flex flex-col-reverse lg:grid lg:grid-cols-2  xl:py-20  py-10 md:px-8 container mx-auto md:mt-20'>
                <div className='xl:pl-20 xl:pr-12  px-5 lg:px-0 overflow-hidden' >
                    <div className='overflow-hidden' ref={whyChooseText}>
                        <h6 className='text-[#006AAB] text-lg mb-2 mt-6 flex items-center'><TfiLayoutLineSolid size={28} />Why Choose Us</h6>
                    <h4 className='lg:text-5xl md:text-4xl text-3xl'>Fast & reliable visa and</h4>
                    <h5 className="lg:text-5xl md:text-4xl text-3xl font-bold  lg:leading-tight lg:mt-1.5">
                        immigration services.
                    </h5>

                    <p className=' mb-3 mt-3 md:text-lg xl:w-[34rem]'>Get expert support for all your visa and immigration needs. We deliver fast, reliable, and hassle-free services to help you move forward with confidence.
                    </p>

                    <h5 className='poppins-regular flex items-center mb-5 md:text-lg'>
                        <span className='text-xl  md:text-3xl'>
                            <IoMdCheckmarkCircleOutline color='#006AAB' className='mr-2' />
                        </span>
                        Global Connection
                    </h5>
                    <h5 className='poppins-regular flex items-center mb-5 md:text-lg'>
                        <span className='text-xl md:text-3xl'>
                            <IoMdCheckmarkCircleOutline color='#006AAB' className='mr-2' />
                        </span>
                        Expertise visa Processign
                    </h5>
                    <h5 className='poppins-regular flex items-center mb-5 md:text-lg'>
                       <span className='text-xl md:text-3xl'>
                            <IoMdCheckmarkCircleOutline color='#006AAB' className='mr-2' />
                        </span>
                        Fastest Working Process
                    </h5>
                    <h5 className='poppins-regular flex items-center mb-5 md:text-lg'>
                       <span className='text-xl md:text-3xl'>
                            <IoMdCheckmarkCircleOutline color='#006AAB' className='mr-2' />
                        </span>
                        High Approval Rates and Proven Track Record
                    </h5>
                    <h5 className='poppins-regular flex items-center mb-5 md:text-lg'>
                       <span className='text-xl md:text-3xl'>
                            <IoMdCheckmarkCircleOutline color='#006AAB' className='mr-2' />
                        </span>
                        Expert Support Panel
                    </h5>
                    <button id='buttonStyle' className='py-2 px-4 md:text-xl md:px-8 md:py-3 rounded text-white mt-3'>Read More</button>
                    </div>
                </div>
                <div className='overflow-hidden xl:pl-8 xl:pr-14 px-5 lg:ml-12 lg:px-0' >
                    <img className='rounded-3xl w-full h-full bg-cover' ref={WhyChooseImg} src={CanadaPassportImg} alt="WhyusImg" />
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs
