import React, { useRef } from 'react'
import CanadianDreamImg from '../assets/images/Canadian Dreams.png'
import AboutCanadianImg from '../assets/images/AboutCanadian.png'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const CanadianDreams = () => {
    const Location = useLocation();
    const currentpath = Location.pathname;
    const ImageRoutes = {
        '/': {
            image: CanadianDreamImg,
            heading: 'About Us'
        },
        '/about-us': {
            image: AboutCanadianImg,
        },

    };
    const { image } = ImageRoutes[currentpath];
    const AboutImg = useRef(null);
    const CanadianText = useRef(null);
    // useGSAP(() => {
    //     gsap.from(AboutImg.current, {
    //         delay: 0.5,
    //         y: '-100%',
    //         duration: 0.8,
    //         ease: 'bounce.out',
    //         scrollTrigger:{
    //             scroller: 'body',
    //             trigger: AboutImg.current,
    //             // markers: true,
    //             start: 'top 40%',
    //             end: 'top 20%',
    //             // scrub: 1
    //         }

    //     });

    //     gsap.from(CanadianText.current.children, {
    //         delay: 1,
    //         x: '-100%',
    //         duration: 0.7,
    //         scrollTrigger: {
    //             trigger: CanadianText.current,
    //             scroller: 'body',
    //             // markers:true,
    //             start: 'top 90%',
    //             end: 'bottom 80%',
    //             scrub: 1
    //         },
    //     });

    // })




    return (
        <div className='grid lg:grid-cols-2 gap-3 md:gap-0 lg:py-20 py-8  px-5 md:px-10 lg:px-0 container mx-auto '>
            <div className='xl:pl-20 xl:pr-12 lg:ml-8 xl:ml-0 overflow-hidden' >
                <img className='md:rounded-3xl rounded-xl w-full h-full object-cover' ref={AboutImg} src={image} alt="BuildingImg" />
            </div>
            <div className='lg:ml-8 xl:ml-0 overflow-hidden' ref={CanadianText}>
                <h6 className='text-[#006AAB] md:text-lg mt-6 lg:mt-0 flex items-center text-base'><TfiLayoutLineSolid size={28} />About Us</h6>
                <h1 className='lg:text-5xl text-3xl md:text-4xl lg:mt-1.5 sm:mt-2'>Canadian Dreams</h1>
                <h1 className="lg:text-5xl text-3xl md:text-4xl font-bold lg:w-3/4 lg:leading-tight lg:mt-1.5">
                    Immigration <span>& Worldwide Services Ltd.</span>
                </h1>
                <p className='xl:w-5/6 lg:mb-6  mt-3 text-base sm:text-xl xl:mr-12 mr-8'>is a federally incorporated and CICC-licensed Canadian immigration consultancy firm headquartered in Brampton, Ontario. Founded with the vision of delivering ethical, transparent, and result-oriented immigration services, we take pride in being a trusted partner for individuals, families, and businesses navigating Canada’s complex immigration landscape.</p>
                <button id='buttonStyle' className='lg:py-2 md:py-3 px-4 py-2 lg:px-4 md:px-8 rounded text-white lg:mt-3 sm:text-xl mt-5'>Contact Us</button>
            </div>
        </div>
    )
}

export default CanadianDreams
