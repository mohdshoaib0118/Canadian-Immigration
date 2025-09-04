import React from 'react'
import Navbar from '../components/Navbar'
import SectionWithImage from '../components/SectionWithImage'
import Footer from '../components/Footer'

const TermsAndCondition = () => {
    return (
        <div>
            <Navbar />
            <SectionWithImage />
            <div className='lg:container lg:mx-auto lg:py-20 py-10 px-5 sm:px-20 lg:px-40'>
                <div className='flex flex-col gap-12'>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Terms and Conditions</h1>
                        <h4 className='text-lg md:text-xl mt-3 mb-3 text-[#2D2B2B] leading-6'>Effective Date: [Insert Date]</h4>
                        <h4 className='text-base md:text-lg text-[#2D2B2B]'>Please read these Terms and Conditions ("Terms") carefully before using the services offered by [Your Company Name] ("we", "our", or "us"). By accessing our website or using our immigration services, you agree to be bound by these Terms.</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl '>Services Provided</h1>
                        <h4 className='text-base md:text-xl mt-3 text-[#2D2B2B]'>Canadian Immigration offers immigration-related consulting, documentation assistance, and application support for individuals seeking to study, work, visit, or settle abroad.</h4>
                        <h4 className='text-base md:text-lg mt-4 text-[#2D2B2B] leading-6'>Our services are limited to advisory and application support. We do not guarantee visa approval, as final decisions are made solely by immigration authorities..</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Eligibility</h1>
                        <h4 className='text-lg md:text-xl mt-3 text-[#2D2B2B]'>By using our services, you confirm that:</h4>
                        <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
                            <li className='text-lg mt-2 text-[#2D2B2B]'>You are at least 18 years of age or have legal parental/guardian consent.</li>
                            <li className='text-lg mt-2 text-[#2D2B2B]'>All information provided to us is accurate, truthful, and complete.</li>
                            <li className='text-lg mt-2 text-[#2D2B2B]'>You are legally authorized to apply for immigration services.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Client Responsibilities</h1>
                        <h4 className='text-lg mt-3 text-[#2D2B2B]'>Clients must:</h4>
                        <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Provide all required documents and information in a timely and accurate manner.</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Inform us immediately of any changes in personal circumstances (e.g., address, marital status, visa status).</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Make full payment for services as per the agreed terms.</li>
                        </ul>
                        <h4 className='text-lg  text-[#2D2B2B] mt-4'>We are not responsible for delays or denials caused by incomplete, incorrect, or false information provided by the client.</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Fees and Refund Policy</h1>
                        <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>All service fees are discussed and agreed upon before work begins. Fees once paid are non-refundable, unless explicitly stated in a written agreement.
                            Government fees, courier charges, and other third-party costs are not included in our service fees unless specified.</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Confidentiality</h1>
                        <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B]'>We maintain strict confidentiality of all client data and documents. However, we may disclose information if legally required by law enforcement or immigration authorities.</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Intellectual Property</h1>
                        <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>All content on our website, including text, images, and logos, is the intellectual property of [Your Company Name]. You may not reproduce, copy, or distribute any content without written permission.</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Limitation of Liability</h1>
                        <h4 className='text-lg mt-3 text-[#2D2B2B]'>Canadian Immigration will not be held liable for:</h4>
                        <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Rejection, delay, or denial of visa applications by immigration authorities.</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Losses resulting from client-provided incorrect information.</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>Technical issues, delays, or service interruptions beyond our control.</li>
                        </ul>
                        <h4 className='text-lg  text-[#2D2B2B] mt-4'>
                            Our liability is strictly limited to the amount paid for our professional service fee.
                        </h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Termination of Services</h1>
                        <h4 className='text-lg mt-3 text-[#2D2B2B]'>We reserve the right to terminate services if:</h4>
                        <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
                            <li className='text-lg text-[#2D2B2B] mt-2'>You violate these Terms.</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>You engage in illegal or fraudulent activity.</li>
                            <li className='text-lg text-[#2D2B2B] mt-2'>You fail to make agreed payments.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Governing Law</h1>
                        <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>These Terms shall be governed and interpreted in accordance with the laws of [Your State/Country]. Any disputes shall be subject to the exclusive jurisdiction of the courts located in [Your Location].</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Changes to Terms</h1>
                        <h4 className='text-base md:text-lg mt-3 text-[#2D2B2B] leading-6'>We may update these Terms at any time without prior notice. Continued use of our services after changes implies acceptance of the updated Terms..</h4>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl'>Contact Us</h1>
                        <h4 className='text-base md:text-lg  mt-3 text-[#2D2B2B]'>If you have any questions or concerns about this Privacy Policy, please contact us at:</h4>
                        <h4 className='text-base md:text-lg  mt-2 text-[#2D2B2B]'>Email: info@canadian.com</h4>
                        <h4 className='text-base md:text-lg  mt-2 text-[#2D2B2B]'>Phone: +1 (416) 434-3155</h4>
                        <h4 className='text-base md:text-lg  mt-2 text-[#2D2B2B]'>Address: Dummy addres canadian 313 canada, 33322</h4>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default TermsAndCondition