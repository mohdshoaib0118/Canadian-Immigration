import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { faqAPI } from '../services/api';

const Faq = () => {
  const [hide, setHide] = useState(null);
  const [faqs, setFaqs] = useState([]);
  console.log(faqs, 'faqs');

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

  const QuestionsData = [
    {
      id: 0,
      Question: 'What services do you offer?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    },
    {
      id: 1,
      Question: 'How do I know which visa is right for me?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    },
    {
      id: 2,
      Question: 'Do you guarantee visa approval?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    },
    {
      id: 3,
      Question: 'How long does the immigration process take?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    },
    {
      id: 4,
      Question: 'What documents are required for the application?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    },
    {
      id: 5,
      Question: 'Can you help with job search or accommodation abroad?',
      answer: 'We provide a range of immigration services including visa consultation, permanent residency assistance, student visa support, work permits, and family sponsorship applications.'
    }
  ];

  const toggleHide = (id) => {
    setHide(prev => (prev === id ? null : id));
  };

  return (
    <div className='container mx-auto md:px-20 py-8 px-5'>
      <h5 className='md:text-4xl text-2xl text-center w-full mb-8'>Frequently Asked Questions</h5>
      <div>
        {(faqs.length > 0 ? faqs : QuestionsData).map((data) => (
          <div key={data.id} className='border border-slate-200 md:mb-8 mb-6 rounded-xl overflow-hidden'>
            <div className={`flex justify-between items-center px-2 py-3 md:px-6 md:pt-6 transition-all duration-500 ease-in-out ${hide === data.id ? 'border-b bg-[#F4FBFF]' : ''} md:pb-3 border-slate-200`}>
              <h4 className='md:text-xl text-base leading-6 '>{data.question || data.Question}</h4>
              <span onClick={() => toggleHide(data.id)} className='cursor-pointer'>
                <IoIosArrowDown className={`transform transition-transform duration-300 text-[#006AAB] ${hide === data.id ? 'rotate-180' : ''
                  }`} size={24} />
              </span>
            </div>
            <div
              className={`px-6  md:pt-3 overflow-hidden transition-all duration-500 ease-in-out ${hide === data.id ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'
                }`}
            >
              <h4 className='md:text-lg text-sm pt-4'>
                <div dangerouslySetInnerHTML={{__html: data.answer}} />
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
