import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SectionWithImage from '../components/SectionWithImage';
import Testimonial from '../components/Testimonial';
import { GoArrowUpRight } from "react-icons/go";
import StudySectionImg from '../assets/images/StudySectinImg.png';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiMenu4Line } from "react-icons/ri";
import Footer from '../components/Footer';

const OurServices = () => {
  const [togglePannel, setTogglePannel] = useState(false);
  const hideShowHandler = (event) => {
    event.stopPropagation(); // Prevents the parent onClick from firing
    setTogglePannel(prev => !prev);
  };


  return (
    <div>
      <Navbar />
      {/* Links SideBar In Mobile View*/}
      <div className={`w-5/6  h-screen fixed top-0 left-0 bg-white shadow-xl overflow-y-auto py-10 px-3 z-20 transform transition-transform duration-300 ease-in-out ${togglePannel ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
        <div className='lg:flex flex-col'>
          <div id="temporary-residence" className='bg-[#006AAB]  text-white px-4 py-5'>
            <h1 className='text-2xl'>Temporary Residence</h1>
            <h3 className='flex items-center justify-between text-md mt-6'>Study Application <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Visitor Visa <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Super Visa <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Spouse Open Work Permit Application <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Post Graduate Work Permit <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Closed Work Permit Application <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Bridge Open Work Permit <GoArrowUpRight size={26} /></h3>
          </div>


          <div id="permanent-resident" className='bg-[#006AAB]  text-white px-5 py-5'>
            <h1 className='text-2xl'>Permanent Resident</h1>
            <h3 className='flex items-center justify-between text-md mt-6'>Complete Handling <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Select Eye Service <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>EE Profile Set Up <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Hold My Hand Service <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Provincial Nominee Program <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Spousal Sponsorship Inland <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Dependant Child Sponsorship <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Parents and Grand Parents <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Elite <GoArrowUpRight size={26} /></h3>
          </div>

          <div id="citizenship" className='bg-[#006AAB] text-white px-5 py-5'>
            <h1 className='text-2xl'>Citizenship</h1>
            <h3 className='flex items-center justify-between text-md mt-6'>Citizenship Application <GoArrowUpRight size={26} /></h3>
          </div>

          <div id="other-services" className='bg-[#006AAB]  text-white px-5 py-5'>
            <h1 className='text-2xl'>Other Services</h1>
            <h3 className='flex items-center justify-between text-md mt-4'>LMIA Applications<GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'> NOC Code Service<GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Document Review Services <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>PR Card Renewal <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>GCMS Notes Review Service<GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Additional Document Request <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>TRP <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Humanitarian & Compassionate Grounds <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Procedural Fairness Letter <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Inadmissibility Hearings <GoArrowUpRight size={26} /></h3>
            <h3 className='flex items-center justify-between text-md mt-4'>Detention Hearing <GoArrowUpRight size={26} /></h3>
          </div>

        </div>
      </div>
      <SectionWithImage />
      <div className='container mx-auto px-4 md:px-0 relative'>
        <div className='flex justify-between gap-16 md:px-8 xl:px-24 py-10 md:mt-10'>
          <div className='lg:flex flex-col gap-17 w-1/3 hidden'>
            <div id="temporary-residence" className='bg-[#006AAB]  text-white px-10 py-10'>
              <h1 className='text-xl'>Temporary Residence</h1>
              <h3 className='flex items-center justify-between text-sm mt-12'>Study Application <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Visitor Visa <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Super Visa <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Spouse Open Work Permit Application <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Post Graduate Work Permit <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Closed Work Permit Application <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-8'>Bridge Open Work Permit <GoArrowUpRight size={26} /></h3>
            </div>


            <div id="permanent-resident" className='bg-[#006AAB]  text-white px-10 py-10'>
              <h1 className='text-xl'>Permanent Resident</h1>
              <h3 className='flex items-center justify-between text-sm mt-12'>Complete Handling <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Select Eye Service <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>EE Profile Set Up <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Hold My Hand Service <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Provincial Nominee Program <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Spousal Sponsorship Inland <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Dependant Child Sponsorship <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Parents and Grand Parents <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Elite <GoArrowUpRight size={26} /></h3>
            </div>

            <div id="citizenship" className='bg-[#006AAB]  h-[200px] text-white px-10 py-10'>
              <h1 className='text-xl'>Citizenship</h1>
              <h3 className='flex items-center justify-between text-sm mt-12'>Citizenship Application <GoArrowUpRight size={26} /></h3>
            </div>

            <div id="other-services" className='bg-[#006AAB]  text-white px-10 py-10'>
              <h1 className='text-xl'>Other Services</h1>
              <h3 className='flex items-center justify-between text-sm mt-12'>LMIA Applications<GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'> NOC Code Service<GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Document Review Services <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>PR Card Renewal <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>GCMS Notes Review Service<GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Additional Document Request <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>TRP <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Humanitarian & Compassionate Grounds <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Procedural Fairness Letter <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Inadmissibility Hearings <GoArrowUpRight size={26} /></h3>
              <h3 className='flex items-center justify-between text-sm mt-6'>Detention Hearing <GoArrowUpRight size={26} /></h3>
            </div>

          </div>




          <div className='lg:w-2/3 flex flex-col gap-y-10 relative ' onClick={() => { setTogglePannel(false) }}>
          {/* Mobile View Burger */}
            <div>
              <div className='absolute -top-8  right-0'>
                <RiMenu4Line className='text-3xl text-[#006AAB] lg:hidden' onClick={hideShowHandler} />
              </div>
              <img className='w-full' src={StudySectionImg} alt="" />
            </div>

            <div>
              <h1 className='md:text-3xl text-2xl border-b md:pb-6 pb-3 border-[#00000040] -mt-2'>Study Application: Your Ticket to Canadian Learning</h1>
              <div className='md:mt-8 mt-4 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>Study Smarter with Ask Kubeir</h4>
                <h4 className='md:text-xl text-lg'>Making It Happen</h4>
                <h4 className='md:text-xl text-base'>Dreaming of studying in Canada? Our Study Application service offers expert support to secure your student visa and kick off your academic journey with ease.</h4>
              </div>

              <div className='mt-12 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>Eligibility & Education in Canada</h4>
                <h4 className='md:text-xl text-lg'>Making It Happen</h4>
                <div className="flex items-start gap-2">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Eligibility: Acceptance by a Designated Learning Institution (DLI), proof of funds (tuition + CAD 20,635/year), no criminal record, intent to leave post-study (unless transitioning to PR). Must pass medical checks if required.
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Education in Canada: Offers world-class universities and colleges (e.g., U of T, UBC), affordable tuition (CAD 15,000-35,000/year avg.), and post-grad work options (PGWP up to 3 years).
                  </h4>
                </div>

              </div>

              <div className='mt-12 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>What You'r Getting</h4>
                <h4 className='md:text-xl text-lg'>Your Steady Companion</h4>
                <div className="flex items-start gap-2">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    IRCC Representation We act as your official liaison with Immigration, Refugees and Citizenship Canada.
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Doc Prep Detailed guidance and a full review of your application documents.
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Application Oversight We manage submissions, deadlines, and IRCC follow-ups
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    SOP Crafting We help shape your Statement of Purpose to shine.
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Admission Assist Optional support for college/university applications.<br />
                    Note: Work Permits and Visit Visas are separate services and fees.
                  </h4>
                </div>

              </div>


              <div className='mt-12 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>How We Roll</h4>
                <h4 className='md:text-xl text-lg'>Support That Says</h4>
                <div className="flex items-start gap-2">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Full Process: We're with you from start to decision outcome.
                  </h4>
                </div>
                <div className="flex items-start gap-2 mt-6">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Study Focus: Covers your student visa-extras like work permits are add-ons.
                  </h4>
                </div>
              </div>

              <div className='mt-12 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>What It Costs</h4>
                <h4 className='md:text-xl text-lg'>Pricing That Fits</h4>
                <div className="flex items-start gap-2">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    Based Fee: USD 1,200<br />
                    Note: Prices are a starting point-may adjust with case complexity.<br />
                    Condition: Additional fee applicable for previously refused applicants
                  </h4>
                </div>
              </div>

              <div className='mt-12 flex flex-col gap-3'>
                <h4 className='Roboto-500 md:text-2xl text-xl'>Why This Works?</h4>
                <h4 className='md:text-xl text-lg'>Insight. Help. Success</h4>
                <div className="flex items-start gap-2">
                  <IoMdCheckmarkCircleOutline className="text-xl mt-1 shrink-0 text-[#006AAB]" />
                  <h4 className="md:text-xl text-base leading-snug">
                    We pave the ways so you can focus on your Canadian education. Ready to start?
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className='md:mt-20'>
        <div className='lg:-mt-8 pt-12 lg:pt-0 mb-20 md:mb-0'>
          <Testimonial />
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default OurServices