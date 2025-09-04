import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import Footer from '../components/Footer'
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { BsStopwatchFill } from "react-icons/bs";
import ContactImg from '../assets/images/ContactImg.png'
import Form from '../components/Form';

const Contact = () => {


  return (
    <div>
      <Navbar />
      <SectionWithImage />
      <div className='container mx-auto lg:pt-20 pt-10 md:pb-16 pb-12'>
        <h1 className='lg:text-5xl md:text-5xl text-3xl md:mt-1.5 mt-2 text-center'>Get in Touch with us</h1>
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 xl:gap-12 gap-6 lg:py-10 py-5 xl:px-16 md:px-7 px-5'>
          <div className='rounded-2xl p-5 py-8 border-1 min-h-[8rem] border-[#006AAB] flex items-center gap-2 justify-center flex-col hover:bg-[#006AAB] hover:text-white group transition duration-300 ease-in-out cursor-pointer'>
            <h1 className='md:text-5xl text-4xl text-[#006AAB]'><IoLocationSharp className='group-hover:text-white' /></h1>
            <h3 className='text-2xl'>Location</h3>
            <h4 className='text-center text-lg'>Dummy addres canadian 313 canada, 33322</h4>
          </div>
          <div className='rounded-2xl p-5 py-8 border-1 min-h-[8rem] border-[#006AAB] flex items-center gap-2 justify-center flex-col hover:bg-[#006AAB] hover:text-white group transition duration-300 ease-in-out cursor-pointer'>
            <h1 className='md:text-5xl text-4xl text-[#006AAB]'><IoCall className='group-hover:text-white' /></h1>
            <h3 className='text-2xl'>Call Us</h3>
            <h4 className='text-center text-lg'>+1 (416) 434-3155</h4>
          </div>
          <div className='rounded-2xl p-5 py-8 border-1 min-h-[8rem] border-[#006AAB] flex items-center gap-2 justify-center flex-col hover:bg-[#006AAB] hover:text-white group transition duration-300 ease-in-out cursor-pointer'>
            <h1 className='md:text-5xl text-4xl text-[#006AAB]'><MdEmail className='group-hover:text-white' /></h1>
            <h3 className='text-2xl'>Email</h3>
            <h4 className='text-center text-lg'>info@canadian.com</h4>
          </div>
          <div className='rounded-2xl p-5 py-8 border-1 min-h-[8rem] border-[#006AAB] flex items-center gap-2 justify-center flex-col hover:bg-[#006AAB] hover:text-white group transition duration-300 ease-in-out cursor-pointer'>
            <h1 className='md:text-5xl text-4xl text-[#006AAB]'><BsStopwatchFill className='group-hover:text-white' /></h1>
            <h3 className='text-2xl text-center'>Opening Hours</h3>
            <h4 className='text-center text-lg'>09.00 AM to 05.00 PM
              Sunday Fixed Off</h4>
          </div>
        </div>
      </div>
      <div className='bg-[#F4FBFF] mb-10'>
        <div className='container mx-auto xl:px-16'>
          <div className='grid md:grid-cols-2 gap-8 xl:gap-12 px-5 xl:px-20 lg:py-14 py-10'>
            <div>
              <img className="w-full h-full bg-cover" src={ContactImg} alt="" />
            </div>
            <div className='p-6 bg-white xl:w-5/6 xl:ml-14 shadow-md rounded-lg py-8'>
              <h5 className='lg:text-5xl md:text-5xl text-3xl'>Lets Get In Touch</h5>
              <div>
                {/* form */}
                <Form/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[30rem] mb-40'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54872.06042465498!2d76.72951415659598!3d30.732347721658364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fec458cf22f0f%3A0x2b8fd78f23b41579!2sHotel%20City%20Palace!5e0!3m2!1sen!2sin!4v1755032416210!5m2!1sen!2sin" width="600" height="700" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        className='w-full h-full'></iframe>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact