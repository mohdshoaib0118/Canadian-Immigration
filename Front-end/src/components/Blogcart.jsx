import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
// images
import Lady from '../assets/smallimages/Lady.png'
import Passport from '../assets/smallimages/Passport.png'
import Communication from '../assets/smallimages/Communication.png'
import Img from '../assets/smallimages/Img.png'
import Class from '../assets/smallimages/Class.png'
import Teacher from '../assets/smallimages/Teacher.png'
const Blogcart = () => {
    const Cardata = [
        {
            img: Lady,
            heading: 'Major Restructuring of Australia’s Skilled Visa...',
            parah: 'On 7th December 2024, the Department of Home Affairs introduced the most...'
        },
        {
            img: Passport,
            heading: 'The Most Powerful Passports in 2025 and...',
            parah: 'A passport is more than just a travel document — it represents access...'
        },
        {
            img: Communication,
            heading: 'Visa Processing Times: What to Expect in 2025',
            parah: 'Underfunding and existing backlogs have significantly impacted visa processing...'
        },
        {
            img: Img,
            heading: 'Canada Issues More PR Invitations via PNP Route',
            parah: 'Canada invites more skilled workers for PR in June 23 PNP-specific draw.'
        },
        {
            img: Class,
            heading: 'Easiest Jobs to Qualify for Canada’s Express Entry Draws',
            parah: 'PR through Express Entry is tough without in-demand skills.'
        },
        {
            img: Teacher,
            heading: 'New Pathway for International Teachers to Work in Canada',
            parah: 'Easier immigration path now open for international teachers in Canada.'
        },
    ];
    return (
        <div className='container mx-auto mt-6'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:gap-x-12 gap-x-6 md:px-7 px-4 pb-9'>
                {Cardata.map((items) => {
                    return (
                        <div className='bg-white shadow-md rounded  mt-8 md:mt-14'>
                            <img className='w-full h-64 object-cover' src={items.img} alt="" />
                            <div className='px-4 py-6'>
                                <h3 className='md:text-2xl text-xl mb-4'>{items.heading}</h3>
                                <h4 className='mb-4 md:text-lg text-base'>{items.parah}</h4>
                                <h6 className='poppins-600 text-[#006AAB] flex items-center gap-1' >Read More <GoArrowUpRight /></h6>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='md:mb-44 mb-24 w-full flex items-center justify-center'>
                <button className='lg:py-2 md:py-3 px-4 py-2 lg:px-4 md:px-8 rounded text-white lg:mt-3 sm:text-xl mt-5' id='buttonStyle'>Load More</button>
            </div>
        </div>
    )
}

export default Blogcart