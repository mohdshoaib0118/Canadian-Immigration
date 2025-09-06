import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { faqAPI } from '../services/api';

const Faq = () => {

  const [hide, setHide] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const toggleHide = (id) => {
    setHide(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await faqAPI.getFAQs();
        setFaqs(response.data.response);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  return (
    <div className='container mx-auto md:px-20 py-8 px-5'>
      <h5 className='md:text-4xl text-2xl text-center w-full mb-8'>Frequently Asked Questions</h5>
      <div>
        {faqs.map((data) => (
          <div
            key={data.id}
            className='border border-slate-200 md:mb-8 mb-6 rounded-xl overflow-hidden'
          >
            <div
              className={`flex justify-between items-center px-2 py-3 md:px-6 md:pt-6 transition-all duration-500 ease-in-out ${hide === data.id ? 'border-b bg-[#F4FBFF]' : ''
                } md:pb-3 border-slate-200`}
            >
              <h4 className='md:text-xl text-base leading-6'>
                {data.question || data.Question}
              </h4>
              <span onClick={() => toggleHide(data.id)} className='cursor-pointer'>
                <IoIosArrowDown
                  className={`transform transition-transform duration-300 text-[#006AAB] ${hide === data.id ? 'rotate-180' : ''
                    }`}
                  size={24}
                />
              </span>
            </div>
            <div
              className={`px-6 md:pt-3 overflow-hidden transition-all duration-500 ease-in-out ${hide === data.id
                ? 'max-h-40 opacity-100 pb-5'
                : 'max-h-0 opacity-0'
                }`}
            >
              <h4 className='md:text-lg text-sm pt-4'>
                <div dangerouslySetInnerHTML={{ __html: data.answer }} />
              </h4>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Faq;
