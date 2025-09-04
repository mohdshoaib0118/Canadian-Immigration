import React, { useRef } from 'react'
import WhoWeImg from '../assets/images/WhoWeImg.png'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
    const WhoWeAreImg = useRef();
    const WhoWeText = useRef();
    // useGSAP(() => {
    //     gsap.from(WhoWeAreImg.current, {
    //         delay: 0.5,
    //         y: '-100%',
    //         duration: 0.8,
    //         scrollTrigger:{
    //             scroller: 'body',
    //             trigger: WhoWeAreImg.current,
    //             // markers: true,
    //             start: 'top 40%',
    //             end: 'top 20%',
    //             // scrub: 1
    //         }
           
    //     });

    //     gsap.from(WhoWeText.current.children, {
    //         delay: 1,
    //         x: '-100%',
    //         duration: 0.7,
    //         scrollTrigger: {
    //             trigger: WhoWeText.current,
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
            <div className='grid lg:grid-cols-2 lg:py-18 lg:mb-12 mb-8 py-8 px-5 md:px-10 lg:px-0 container mx-auto'>
            <div className='xl:ml-20 lg:ml-8 xl:mr-12  rounded-xl overflow-hidden'>
                <div className='w-full h-full bg-cover'>
                    <img className=' w-full bg-cover h-full lg:rounded-3xl ' ref={WhoWeAreImg} src={WhoWeImg} alt="Smile" />
                </div>
            </div>
            <div className='lg:ml-10 xl:ml-0 overflow-hidden' ref={WhoWeText}>
                <h6 className='text-[#006AAB] text-lg lg:mt-0 mt-6 flex items-center'><TfiLayoutLineSolid size={28}/>Who we are</h6>
                <span className='lg:text-5xl md:text-4xl text-3xl block md:mt-4 lg:mt-0'>Best Immigration</span>
                <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold lg:w-2/3 leading-tight lg:mt-1.5">
                    and Visa Consultation.
                </h1>
                <p className='lg:w-5/6 mb-6 mt-3 md:text-lg lg:mr-12'>Looking for expert immigration and visa consultation? We provide professional guidance on visas, permanent residency, work permits, and study permits to help you achieve your dream of moving abroad. Let’s make your journey smooth and stress-free!</p>
                <h5 className='poppins-regular flex items-center md:text-lg lg:mb-6 mb-4'>
                    <IoMdCheckmarkCircleOutline size={25} color='#006AAB' className='mr-2' />
                    Expert guidance on visas & PR
                </h5>
                <h5 className='poppins-regular flex items-center md:text-lg lg:mb-6 mb-4'>
                    <IoMdCheckmarkCircleOutline size={25} color='#006AAB' className='mr-2' />
                    Work & study permit assistance 
                </h5>
                <h5 className='poppins-regular flex items-center md:text-lg lg:mb-6 mb-4'>
                    <IoMdCheckmarkCircleOutline size={25} color='#006AAB' className='mr-2' />
                    Hassle-free application process
                </h5>
                <h5 className='poppins-regular flex items-center md:text-lg lg:mb-6 mb-4'>
                    <IoMdCheckmarkCircleOutline size={25} color='#006AAB' className='mr-2' />
                    Personalized immigration solutions
                </h5>

                <button id='buttonStyle' className='py-2 px-4 md:text-xl md:px-8 md:py-3 rounded text-white mt-3'>Read More</button>
            </div>
        </div>
        </div>
    )
}

export default WhoWeAre
