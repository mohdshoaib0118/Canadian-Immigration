import React, { useState, useEffect } from 'react'
import Lady from '../assets/smallimages/Lady.png'
import Passport from '../assets/smallimages/Passport.png'
import Communication from '../assets/smallimages/Communication.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoArrowUpRight } from "react-icons/go";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { newsAPI } from '../services/api';

const LatestNews = () => {

  const [news, setNews] = useState([]);

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute md:-left-10 left-32 md:mt-5 mt-4 top-full md:top-1/2 -translate-y-1/2 bg-[#006AAB] p-2 rounded-full text-white cursor-pointer z-10"
    >
      <FaArrowLeft />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute md:-right-10 right-32 mt-4 top-full md:top-1/2 -translate-y-1/2 bg-[#006AAB] p-2 rounded-full text-white cursor-pointer z-10"
    >
      <FaArrowRight />
    </div>
  );
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsAPI.getAllLatestNews();
        setNews(response.data.response);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className='bg-[#F4FBFF] pb-14 mb-12 md:py-14'>
      <div className='container mx-auto'>
        <h5 className='md:text-5xl text-3xl mx-auto w-full text-center md:mb-8 pt-8 py-4 md:pt-0  md:py-0'>Latest News</h5>
        {/* Cart Main Div */}
        <div className='sm:w-3/4 lg:w-4/5 xl:px-4 sm:mx-auto xl:w-full'>
          <Slider {...settings}>
            {news.map((items) => {
              return (
                <div className='bg-white shadow md:w-1/3' key={items.id}>
                  <img
                    className='w-full md:h-64 h-54'
                    src={items.image}
                    alt=""
                  />
                  <div className='px-4 py-6'>
                    <h3 className='md:text-2xl text-xl mb-2 md:mb-4'>{items.heading}</h3>
                    <h4 className='mb-4 md:text-lg'>
                      {items.paragraph}
                    </h4>
                    <h6 className='poppins-600 text-[#006AAB] flex items-center gap-1'>
                      Read More <GoArrowUpRight />
                    </h6>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>


  )
}

export default LatestNews
