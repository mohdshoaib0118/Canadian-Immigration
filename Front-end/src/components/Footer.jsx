import React from 'react'
import FooterImg from '../assets/images/FooterImg.png'
import Logo from '../assets/images/Logo.png'
import { TiSocialFacebook } from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import { TiSocialYoutube } from "react-icons/ti";
import { IoLogoTiktok, IoLocationSharp, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="md:mt-20 w-full h-full text-white relative mt-12 bg-black pb-2">

            {/* Banner */}
            <div className="absolute  md:left-1/2  transform md:-translate-x-1/2 -translate-y-1/2 mx-5 md:mx-0 px-5   sm:ml-14 py-5 md:ml-0  bg-[#006AAB]  sm:px-4 md:px-12 sm:py-6  sm:w-5/6 md:w-5/6 lg:w-3/4  xl:w-2/3 rounded-xl md:py-8 flex  justify-between gap-4 z-10">
                <div>
                    <h4 className="lg:text-2xl sm:text-xl poppins-regular">Let’s Discuss &</h4>
                    <h5 className="lg:text-2xl sm:text-xl font-bold md:leading-tight leading-5 md:mt-1.5 poppins-600">
                        Start Visa Consultations
                    </h5>
                </div>
                <button className="bg-white text-[#006AAB] md:px-10 px-2 lg:text-2xl sm:text-xl rounded-lg whitespace-nowrap text-sm my-2 md:my-0">
                    Let’s Get Started
                </button>
            </div>

            {/* Background Image */}
            <img
                src={FooterImg}
                alt="Footer Background"
                className="w-full h-full object-cover hidden xl:block pb-20 xl:pb-0 footerimg"
            />

            {/* Footer Content */}
            <div className="absolute xl:top-28 lg:top-2 left-0 right-0 md:px-8 xl:px-0 xl:container xl:mx-auto bg-[#000000] xl:bg-transparent pt-14 md:pt-28 lg:pt-28 xl:pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full xl:justify-between  mx-auto xl:gap-4  lg:gap-y-12 md:px-0 py-5 md:py-0 ">

                    {/* Logo & Social */}
                    <div className="flex flex-col md:gap-6 gap-3 xl:w-[22rem] px-5">
                        <Link to={'/'}>
                        <img className="md:w-64 w-44" src={Logo} alt="Logo" />
                        </Link>
                        <h5 className="poppins-regular md:text-lg text-md md:leading-8">
                            Looking for expert immigration and visa consultation?
                        </h5>
                        <div>
                            <h5 className="poppins-regular md:mb-0 text-xl">Follow Us</h5>
                            <div className="flex gap-4 mt-2">
                                <TiSocialFacebook className="bg-white text-black p-1 rounded cursor-pointer hover:drop-shadow-[1px_-8px_6px_#006AAB]" size={32} />
                                <AiFillInstagram className="bg-white text-black p-1 rounded cursor-pointer hover:drop-shadow-[1px_-8px_6px_#006AAB]" size={32} />
                                <TiSocialYoutube className="bg-white text-black p-1 rounded cursor-pointer hover:drop-shadow-[1px_-8px_6px_#006AAB]" size={32} />
                                <IoLogoTiktok className="bg-white text-black p-1 rounded cursor-pointer hover:drop-shadow-[1px_-8px_6px_#006AAB]" size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col md:gap-3 mt-4 md:mt-0 px-5 lg:ml-12 xl:ml-0">
                        <h5 className="poppins-500 text-xl mb-3 mt-5 md:mt-0 lg:mt-0">Quick Links</h5>
                        <Link to="/about-us"><h5 className="poppins-regular md:text-md text-sm mb-3">About Us</h5></Link>
                        <Link to="/our-services"><h5 className="poppins-regular md:text-md text-sm mb-3">Our Services</h5></Link>
                        <Link to="/blog"><h5 className="poppins-regular md:text-md text-sm mb-3">Blog</h5></Link>
                        <Link to="/"><h5 className="poppins-regular md:text-md text-sm mb-3">Home</h5></Link>
                        <Link to="/contact-us"><h5 className="poppins-regular md:text-md text-sm mb-3">Contact Us</h5></Link>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col md:gap-3 mt-3 md:mt-6 lg:mt-0 px-5">
                        <h5 className="poppins-500 text-xl mb-2">Services</h5>
                        <h5 className="poppins-regular md:text-md mb-3">Student Visa</h5>
                        <h5 className="poppins-regular md:text-md text-sm mb-3">Express Entry</h5>
                        <h5 className="poppins-regular md:text-md text-sm mb-3">Family Sponsorship</h5>
                        <h5 className="poppins-regular md:text-md text-sm mb-3">Spouse Visa</h5>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col mt-3  lg:mt-0 px-5">
                        <h5 className="poppins-500 text-xl mb-5 mt-2 xl:mt-0">Contact Us</h5>
                        <h5 className="poppins-regular md:text-md text-sm flex items-start  gap-2">
                            <IoLocationSharp className="xl:text-3xl text-2xl shrink-0" />
                            Dummy address canadian 313 Canada, 33322
                        </h5>
                        <h5 className="poppins-regular md:text-lg text-sm mt-5 flex items-start gap-3">
                            <MdEmail className="xl:text-3xl text-2xl shrink-0" />
                            info@canadian.com
                        </h5>
                        <h5 className="poppins-regular md:text-md text-sm flex mt-5 items-start gap-3">
                            <IoCall className="xl:text-3xl text-2xl shrink-0" />
                            +1 (416) 434-3155
                        </h5>
                    </div>
                </div>
                {/* Bottom Bar - Full Width Border */}
                <div className="border-t border-gray-600  sm:mt-8">
                    <div className="container mx-auto px-4 text-white py-4 flex items-center flex-col gap-4 md:flex-row justify-between">
                        <p className="text-sm">ICWTT © 2024. All Rights Reserved.</p>
                        <div className="flex justify-center gap-4 text-sm">
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <Link to="/terms-and-condition">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
