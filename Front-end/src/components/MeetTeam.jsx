import React, { useState, useEffect } from 'react'
import { teamAPI } from '../services/api';

const MeetTeam = () => {

    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await teamAPI.getAllTeamMembers();
                setTeam(response.data.response);
            } catch (error) {
                console.error('Error fetching team:', error);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div className='container mx-auto relative pb-20  lg:px-20'>
            <h1 className='md:text-5xl text-3xl text-center mb-8'>Meet Our Team</h1>
            <div className='flex flex-col gap-12 lg:gap-0 lg:flex-row'>
                {team.map((data) => {
                    return (
                        <div className='flex items-center justify-center' key={data.id}>
                            <div className='lg:w-5/6 flex items-center justify-center flex-col bg-white lg:shadow-md shadow-lg rounded mx-10 lg:mx-0'>
                                <img
                                    className='w-full h-full object-cover mb-4'
                                    src={data.image}
                                    alt={data.name}
                                />
                                <h5 className='md:text-2xl text-xl'>{data.name}</h5>
                                <h3 className='md:text-xl text-lg pb-4'>{data.designation}</h3>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default MeetTeam
