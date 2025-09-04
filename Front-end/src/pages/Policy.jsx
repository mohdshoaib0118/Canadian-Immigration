import React from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import Footer from '../components/Footer'

const Policy = () => {
  return (
    <div>
      <Navbar />
      <SectionWithImage />
      <div className='lg:container lg:mx-auto lg:py-20 py-10 px-5 sm:px-20 lg:px-40'>
        <div className='flex flex-col gap-12'>
          <div>
            <h1 className='md:text-3xl text-2xl'>Introduction</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>At Canadian Dreams Immigration, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and immigration services.</h4>
            <h4 className='text-base md:text-lg mt-4 text-[#2D2B2B]'>By using our website or engaging with our services, you agree to the terms of this policy</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Information We Collect</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We may collect the following types of information</h4>
            <h4 className='text-base md:text-lg mt-4 text-[#2D2B2B] leading-6'>Personal Information: Full name, date of birth, passport details, address, phone number, email, educational and employment history, and other immigration-related data.</h4>
            <h4 className='text-base md:text-lg mt-4 text-[#2D2B2B]'>Documents: Identification documents, academic records, work experience letters, test scores (IELTS, TOEFL, etc.), and other supporting documents</h4>
            <h4 className='text-base md:text-lg mt-4 text-[#2D2B2B]'>Website Usage Data: IP address, browser type, pages visited, and usage patterns collected through cookies and analytics tools.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>How We Use Your Information</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We use your information to:</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Provide immigration consultation and processing services</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Complete and submit applications to immigration authorities</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Communicate with you regarding your case or service</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Improve our services and website performance</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Comply with legal obligations</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Sharing of Information</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We do not sell or rent your personal information. We may share it with:</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Government immigration departments and consulates</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Authorized legal representatives or consultants assisting in your case</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Third-party service providers who help us operate our services (e.g., cloud storage, CRM tools)</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Law enforcement, if required by applicable law</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Data Security</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>We take data protection seriously. Your information is stored securely with safeguards against unauthorized access, loss, or misuse. Only authorized personnel have access to your personal data.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Data Retention</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We retain your information only as long as necessary to provide our services and comply with legal or regulatory requirements.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Cookies & Tracking</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>Our website uses cookies to enhance your experience. You may choose to disable cookies through your browser settings, though some features may not function properly.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Third-Party Links</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>Our website may contain links to other websites. We are not responsible for the privacy practices or content of third-party sites.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Updates to This Policy</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We may update this policy from time to time. We recommend checking this page periodically to stay informed of any changes.</h4>
          </div>
          <div>
            <h1 className='md:text-3xl text-2xl'>Contact Us</h1>
            <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>If you have any questions or concerns about this Privacy Policy, please contact us at:</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Email: info@canadian.com</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Phone: +1 (416) 434-3155</h4>
            <h4 className='text-base md:text-lg mt-2 text-[#2D2B2B]'>Address: Dummy addres canadian 313 canada, 33322</h4>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <Footer/>
      </div>
    </div>
  )
}

export default Policy