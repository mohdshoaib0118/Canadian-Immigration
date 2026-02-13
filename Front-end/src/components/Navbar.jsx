import React, { useEffect, useRef, useState } from 'react';
import Logo from '../assets/images/Logo.png';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCall, IoLocationSharp, IoLogoTiktok } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { TiSocialFacebook } from 'react-icons/ti';
import { AiFillInstagram, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiLogoWhatsapp } from "react-icons/bi";

const Navbar = ({ services, subServices }) => {
    const [hide, setHide] = useState(true);
    const [showSubheadings, setShowSubheadings] = useState(false);
    const [activeServiceIndex, setActiveServiceIndex] = useState(null);
    const [CanadianPathWaySubHeadings, setCanadianPathWaySubHeadings] = useState(false)
    const navItemsRef = useRef();
    const dropdownRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const toggleButton = () => setHide((prev) => !prev);
    const toggleButtonForSubofCanadianPath = () => setCanadianPathWaySubHeadings((prev) => !prev);
    const dropdownRefCanadinaPAth = useRef(null);
    // For CanadianPathWays SUbheadings
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRefCanadinaPAth.current &&
                !dropdownRefCanadinaPAth.current.contains(event.target)
            ) {
                setCanadianPathWaySubHeadings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSubheadings(false);
                setActiveServiceIndex(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleServiceClick = (service, index) => {
        setActiveServiceIndex(null);
    };

    const handleSubServiceClick = (subCategory, service) => {
        const fullSubService = subServices.find(
            (s) => s.name.trim().toLowerCase() === subCategory.name.trim().toLowerCase()
        );
        if (!fullSubService?._id) return;
        setShowSubheadings(false);
        setActiveServiceIndex(null);
        navigate(`/services/${fullSubService._id}`);
    };
    const toggleButtonIfMobile = () => {
        if (window.innerWidth < 1024) toggleButton();
    };

    const handleBookConsultation = async () => {
        try {
            setLoading(true); // start loader

            const response = await fetch('http://34.227.221.169/api/calendly/create-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventTypeUri: 'https://api.calendly.com/event_types/ecbed2b2-bddf-4cd3-b6f6-962ef18a0281'
                })
            });

            // Try parsing JSON safely
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                alert('Unexpected server response. Please try again later.');
                return;
            }

            // Check HTTP status
            if (!response.ok) {
                alert(data?.message || 'Failed to create consultation link. Please try again.');
                return;
            }

            // Check booking_url exists
            if (data?.data?.booking_url) {
                window.open(data.data.booking_url, '_blank');
            } else {
                alert('Could not retrieve the booking link. Please try again.');
            }

        } catch (networkError) {
            alert('Network error. Please check your internet connection and try again.');
        } finally {
            setLoading(false); // stop loader
        }
    };




    return (
        <div>
            {/* Top Bar */}
            {/* Moblile Bottom Blue Section */}
            <div className="flex items-center justify-between   bg-[#006AAB] py-3.5 text-white lg:hidden ">
                <div className='lg:container mx-auto px-4'>
                    <div className="flex items-center xl:gap-3 gap-1.5">
                        <IoCall className='text-[16px] sm:text-[28px]' />
                        <a href="tel:+14164343155" className="text-[11px] sm:text-base xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (416) 434-3155,
                        </a>
                        <a href="tel:+16475109350" className="text-[11px] sm:text-base xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (647) 510-9350,
                        </a>
                        <a href="tel:+16043607128" className="text-[11px] sm:text-base xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (604) 360-7128
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-[#006AAB] hidden lg:block py-4 px-4">
                <div className="container mx-auto flex justify-between items-center text-white">
                    <div className="flex items-center  xl:gap-20 lg:gap-10">
                        <div className="flex items-center gap-3">
                            <MdEmail size={28} />
                            <a href="mailto:Canadiandreamsimmigration@gmail.com" className="text-lg poppins-regular hover:text-blue-100 transition-colors">
                                Canadiandreamsimmigration@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center xl:gap-3 gap-1.5">
                        <IoCall size={28} />
                        <a href="tel:+14164343155" className="xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (416) 434-3155,
                        </a>
                        <a href="tel:+16475109350" className="xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (647) 510-9350,
                        </a>
                        <a href="tel:+16043607128" className="xl:text-lg lg:text-sm poppins-regular hover:text-blue-100 transition-colors">
                            +1 (604) 360-7128
                        </a>
                    </div>
                    <div className="flex items-center gap-4 ">
                        <a href="https://www.facebook.com/share/1M6rNDDtyZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className='hover:bg-[#108CEC] p-1 hover:text-white  text-white rounded-full'>
                            <TiSocialFacebook size={28}  className='hover:rotate-360 duration-500 transition'/>
                        </a>
                        <a href="https://www.instagram.com/canadian.dreams.immigration?igsh=Zm5zcXR0dTNvdTJu" target="_blank" rel="noopener noreferrer" className='hover:bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] p-1.5 rounded-full' >
                            <AiFillInstagram size={28} className="hover:rotate-360 duration-500 transition" />
                        </a>
                        <a href="https://www.tiktok.com/@canadiandreams1?_t=ZS-9002oFxqNSq&_r=1" target="_blank" rel="noopener noreferrer" className='hover:bg-gradient-to-tr from-[#25F4EE] via-[#000000] to-[#FE2C55] p-1 hover:text-white  text-white rounded-full'>
                            <IoLogoTiktok size={28} className="hover:rotate-360 duration-500 transition" />
                        </a>
                        <a href="https://maps.app.goo.gl/6urHVPQhfNLVmSoV6" target="_blank" rel="noopener noreferrer" className='hover:bg-white hover:text-[#006AAB] p-1  text-white rounded-full'>
                            <IoLocationSharp size={28} className="hover:rotate-360 duration-300 transition" />
                        </a>
                    </div>
                </div>
            </div>
            {/* WhatsAppIcon */}
            <a
                href="https://wa.me/14164343155?text=Hello ! How can we help you today. Please leave us a detailed message and one of our team members will get back to you. Thanks"
                target="_blank"
                rel="noopener noreferrer"
                className='fixed right-3 md:right-4 lg:right-12 bottom-36 z-[1000]'
            >
                <BiLogoWhatsapp className='md:text-5xl text-4xl bg-[#42C152] rounded-full p-1 text-white animate-bounce hover:text-rotate-360 transition duration-300' />
            </a>
            {/* Navbar */}
            <nav>
                <div className="lg:flex justify-between xl:px-0 xl:gap-5 items-center py-4 lg:container mx-auto relative navbar">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img className="md:w-56 w-46 md:ml-5 xl:ml-0" src={Logo} alt="COMPANY LOGO" />
                        </Link>
                        <div className="flex items-center gap-1 md:gap-3 lg:hidden">
                            <a
                                href="https://www.facebook.com/share/1M6rNDDtyZ/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-[#108CEC] md:p-1.5 p-1   text-white rounded-full'
                            >
                                <TiSocialFacebook className=" text-[20px] md:text-[28px]" />
                            </a>
                            <a
                                href="https://www.instagram.com/canadian.dreams.immigration?igsh=Zm5zcXR0dTNvdTJu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] text-white md:p-1.5 p-1 rounded-full'
                            >
                                <AiFillInstagram className="text-[20px] md:text-[28px]" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@canadiandreams1?_t=ZS-9002oFxqNSq&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-gradient-to-tr from-[#25F4EE] via-[#000000] to-[#FE2C55] md:p-1.5 p-1   text-white rounded-full'
                            >
                                <IoLogoTiktok className=" text-[20px] md:text-[28px]" />
                            </a>
                            <a
                                href="https://maps.app.goo.gl/6urHVPQhfNLVmSoV6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-[#006AAB] text-white md:p-1.5 p-1  rounded-full'
                            >
                                <IoLocationSharp className=" text-[20px] md:text-[28px]" />
                            </a>
                        </div>

                        {hide ? (
                            <RxHamburgerMenu onClick={toggleButton} size={32} className="text-[#006AAB] lg:hidden md:mr-6" />
                        ) : (
                            <RxCross1 onClick={toggleButton} size={32} className="text-[#006AAB] lg:hidden md:mr-6" />
                        )}
                    </div>

                    <div
                        ref={navItemsRef}
                        className={`overflow-hidden md:overflow-auto transition-all duration-500 ease-in-out ${hide ? 'max-h-0 lg:max-h-[500px]' : 'max-h-[1000px] py-6'
                            } flex flex-col lg:mr-4 xl:mr-0 lg:flex-row lg:items-center gap-2 poppins-regular text-[15px] xl:text-lg xl:gap-5 md:static absolute right-0 bg-white lg:bg-transparent z-10 w-full md:w-auto px-5 md:px-0 navbaritems centerClas`}
                    >
                        <NavLink onClick={toggleButtonIfMobile} to="/" className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>
                            Home
                        </NavLink>
                        <NavLink onClick={toggleButtonIfMobile} to="/about-us" className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>
                            About Us
                        </NavLink>

                        {/* Our Services Dropdown */}
                        <div className="w-fit" ref={dropdownRef}>
                            <div
                                className="flex items-center justify-between cursor-pointer py-2 px-2 lg:px-0"

                            >
                                <NavLink onClick={toggleButtonIfMobile} to={'/our-services'} className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>Our Services</NavLink>
                                <IoIosArrowDown className={`ml-2 mt-1 transform transition-transform duration-200 ${showSubheadings ? 'rotate-180' : ''}`} onClick={() => setShowSubheadings(prev => !prev)} />
                            </div>

                            {showSubheadings && (
                                <div
                                    className="flex flex-col lg:absolute lg:top-14 bg-white mt-5 lg:shadow-lg lg:rounded p-2 z-20 w-full lg:w-auto"
                                    style={{ border: "1px solid #ddd" }}
                                >
                                    {services.map((service, index) => (
                                        <div key={service._id || index} className="flex flex-col">
                                            <div
                                                className="flex items-center justify-between text-gray-700 hover:text-[#006AAB] py-1 px-2 cursor-pointer"
                                                onClick={() =>
                                                    setActiveServiceIndex(prev => (prev === index ? null : index))
                                                }
                                            >
                                                {service.name}
                                                {service.subCategories?.length > 0 && <IoIosArrowDown className={`ml-2 transform transition-transform duration-200 ${activeServiceIndex === index ? 'rotate-180' : ''}`} />}
                                            </div>
                                            {activeServiceIndex === index && service.subCategories?.length > 0 && (
                                                <div className="ml-4 flex flex-col bg-gray-50 rounded p-2">
                                                    {service.subCategories.map((sub, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => handleSubServiceClick(sub, service)}
                                                            className="text-sm text-gray-700 hover:text-[#006AAB] py-1 px-2 cursor-pointer"
                                                        >
                                                            {sub.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div ref={dropdownRefCanadinaPAth}>
                            <div className="flex items-center justify-center">
                                <NavLink
                                    to="/canadian-pathways"
                                    className={({ isActive }) =>
                                        `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'
                                        }`
                                    }
                                    onClick={() => {
                                        setCanadianPathWaySubHeadings(false);
                                        toggleButtonIfMobile();
                                    }}
                                >
                                    Canadian Pathways
                                </NavLink>
                                <IoIosArrowDown
                                    onClick={toggleButtonForSubofCanadianPath}
                                    className={`ml-2 mt-1 transform transition-transform duration-200 cursor-pointer ${CanadianPathWaySubHeadings ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>

                            {CanadianPathWaySubHeadings && (
                                <div className="flex flex-col absolute mt-4  bg-white z-[9999] border border-gray-300 px-4 py-2.5 rounded ">
                                    <Link
                                        to="/canadian-pathways-federal"
                                        className="text-gray-700 hover:text-[#006AAB]"
                                        onClick={() => {
                                            setCanadianPathWaySubHeadings(false);
                                            toggleButtonIfMobile()
                                        }}
                                    >
                                        Federal
                                    </Link>
                                    <Link
                                        to="/canadian-pathways-provincial"
                                        className="text-gray-700 hover:text-[#006AAB]"
                                        onClick={() => {
                                            setCanadianPathWaySubHeadings(false);
                                            toggleButtonIfMobile()
                                        }}
                                    >
                                        Provincial
                                    </Link>
                                </div>
                            )}
                        </div>
                        <NavLink onClick={toggleButtonIfMobile} to="/blog" className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>
                            Blog
                        </NavLink>
                        <NavLink onClick={toggleButtonIfMobile} to="/employer" className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>
                            Employer
                        </NavLink>
                        <NavLink onClick={toggleButtonIfMobile} to="/contact-us" className={({ isActive }) => `hover:text-[#006AAB] ${isActive ? 'text-[#006AAB] font-semibold' : 'text-black'}`}>
                            Contact Us
                        </NavLink>

                        <div>
                            <button
                                onClick={handleBookConsultation}
                                disabled={loading}
                                className={`${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#F22941] hover:bg-[#da2f42] cursor-pointer'
                                    }   text-white px-2 py-1.5 rounded xl:text-xl  xl:py-2 xl:px-4 whitespace-nowrap flex items-center justify-center gap-2`}
                                style={{ minWidth: '160px' }} // fixed width
                            >
                                {loading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                                ) : (
                                    'Book a consultation'
                                )}
                            </button>
                        </div>

                    </div>

                </div>
            </nav>

        </div>
    );
};

export default Navbar;
