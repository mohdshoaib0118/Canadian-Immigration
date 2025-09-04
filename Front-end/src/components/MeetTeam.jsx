import React from 'react'
import Image1 from '../assets/images/KanishkaSharma.png'
import Image2 from '../assets/images/RashmeenKaur.png'
import Image3 from '../assets/images/HarpreestBegga.png'
const MeetTeam = () => {
    const TeamData = [
        {
            teamimg: Image1,
            teamname: 'Kanika sharma',
            teamrole: '(Director)'
        },
        {
            teamimg: Image2,
            teamname: 'Rashmeen Kaur',
            teamrole: '(Director )'
        },
        {
            teamimg: Image3,
            teamname: 'Harpreet bagga',
            teamrole: '(Director )'
        }
    ];
    return (
        <div className='container mx-auto relative pb-20  lg:px-20'>
            <h1 className='md:text-5xl text-3xl text-center mb-8'>Meet Our Team</h1>
                <div className='flex flex-col gap-12 lg:gap-0 lg:flex-row'>
                    {TeamData.map((data) => {
                    return (
                        <div className='flex items-center justify-center'>
                            <div className='lg:w-5/6  flex items-center justify-center flex-col bg-white  lg:shadow-md shadow-lg rounded mx-10 lg:mx-0'>
                                <img className='w-full h-full object-cover mb-4' src={data.teamimg} alt="" />
                                <h5 className='md:text-2xl text-xl '>{data.teamname}</h5>
                                <h3 className='md:text-xl text-lg pb-4'>{data.teamrole}</h3>
                            </div>
                        </div>
                    )
                })}
                </div>
        </div>
    )
}

export default MeetTeam