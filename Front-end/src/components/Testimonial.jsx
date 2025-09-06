import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import Review from '../assets/smallimages/Review.png'
import Review2 from '../assets/smallimages/Review2.png'
import Review3 from '../assets/smallimages/Review3.png'
import IconImg from '../assets/smallimages/Reviewicon.png'
import GoogleImg from '../assets/smallimages/Google.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonial = () => {

    const PrevArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute left-36 mt-4 md:-left-10 top-full md:top-1/2 -translate-y-1/2 bg-[#006AAB] p-2 rounded-full text-white cursor-pointer z-10"
        >
            <FaArrowLeft />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute md:-right-10 right-36  top-full md:top-1/2 md:-translate-y-1/2 bg-[#006AAB] p-2 rounded-full text-white cursor-pointer z-10"
        >
            <FaArrowRight />
        </div>
    );



    const CardData = [
        {
            img: IconImg,
            parah: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ... Read More",
            stars: Array(5).fill(<FaStar />),
            personimg: Review,
            GoogleImg: GoogleImg,
        },
        {
            img: IconImg,
            parah: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ... Read More",
            stars: Array(5).fill(<FaStar />),
            personimg: Review2,
            GoogleImg: GoogleImg
        },
        {
            img: IconImg,
            parah: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ... Read More",
            stars: Array(5).fill(<FaStar />),
            personimg: Review3,
            GoogleImg: GoogleImg
        },
        {
            img: IconImg,
            parah: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ... Read More",
            stars: Array(5).fill(<FaStar />),
            personimg: Review3,
            GoogleImg: GoogleImg
        }
    ]
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1028, // tablets and below
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (

        <div className='xl:py-20 lg:py-10  w-full mb-16 md:mb-0'>
            <h5 className='md:text-5xl text-3xl mx-auto w-full text-center md:mb-8'>Testimonial</h5>
            <div className='container h-full  sm:mx-auto pb-10   md:p-0'>
                <div className='sm:w-3/4 lg:w-4/5   sm:mx-auto xl:w-full'>
                    <div className='w-full'>
                        {/* <Slider {...settings}>
                            {CardData.map((data, idx) => {
                                return <div key={idx} className='p-8 shadow-lg rounded-2xl'>
                                    <img className='mb-4' src={data.img} alt="" />
                                    <h4 className='text-lg mb-2'>{data.parah}</h4>
                                    <div className='flex text-yellow-500 mb-4'>{data.stars}</div>
                                    <div className='flex items-center justify-between border-t-2 border-[#F0E4E4] pt-3'>
                                        <div className='flex items-center gap-2'>
                                            <img src={data.personimg} alt="" className='w-12 object-cover rounded-full' />
                                            <span>John Strong <br /> Happy Customer</span>
                                            <h4></h4>
                                        </div>
                                        <div>
                                            <img src={data.GoogleImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                            })}
                        </Slider> */}
                        {/* <!-- Elfsight Google Reviews | Untitled Google Reviews --> */}
                        <script src="https://elfsightcdn.com/platform.js" async></script> <div class="elfsight-app-3bc327ab-f385-42e4-a6e3-b73e7e9fb17c" data-elfsight-app-lazy></div>

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Testimonial



