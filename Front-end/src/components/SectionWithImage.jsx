import React from 'react'
import AboutImg from '../assets/images/AboutUs.png'
import ServicesImg from '../assets/images/StudyApplication.png'
import Micgirl from '../assets/smallimages/MicGirl.png'
import { useLocation } from 'react-router-dom'
const SectionWithImage = () => {
    const location = useLocation();
    const currentpath = location.pathname;

    const ImageRoutes = {
        '/about-us': {
            image: AboutImg,
            heading: 'About Us'
        },
        '/our-services': {
            image: ServicesImg,
            heading: 'Study Application'
        },
        '/blog': {
            image: AboutImg,
            heading: 'Blog'
        },
        '/contact-us': {
            image: Micgirl,
            heading: 'Contact Us'
        },
        '/employer': {
            image: AboutImg,
            heading: 'Employer'
        },
        '/privacy-policy': {
            image: Micgirl,
            heading: 'Privacy Policy'
        },
        '/terms-and-condition': {
            image: Micgirl,
            heading: 'Terms and Condition'
        }

    };
    const {image,heading} = ImageRoutes[currentpath];

    return (
        <div className='relative w-full h-full'>
            <img className='w-full  h-[10rem] md:h-auto' src={image} alt="Image" />
            <div className='absolute top-0 left-0 bg-linear-to-r/srgb from-[#000000DE] to w-full h-full '>
                <h1 className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-6xl md:text-5xl text-3xl'>{heading}</h1>
            </div>
        </div>
    )
}

export default SectionWithImage