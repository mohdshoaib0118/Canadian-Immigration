import React, { useState, useEffect, useRef } from 'react'
import { contactAPI } from '../services/api'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useGSAP } from '@gsap/react'
import { fadeInUp, staggerAnimation, buttonHover } from '../utils/animations'

const Form = () => {
    const formRef = useRef(null);
    const fieldsRef = useRef([]);
    const submitBtnRef = useRef(null);

    const [formdata, setFormData] = useState({
        firstname: '',
        lastname: '',
        emailid: '',
        phone: '',
        role: 'Employer',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [errors, setErrors] = useState(
        {
            firstnameerror: '',
            lastnameerror: '',
            emailiderror: '',
            phonenoerror: '',
            roleerror: '',
            messageerror: ''
        }
    );

    const errorhandler = () => {
        const error = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formdata.firstname.trim()) {
            error.firstnameerror = 'First name is required';
        } else if (Number(formdata.firstname)) {
            error.firstnameerror = "Name can't be a number"
        }
        if (!formdata.lastname.trim()) {
            error.lastnameerror = 'Last name is required';
        }
        if (!formdata.emailid.trim()) {
            error.emailiderror = 'Email is required';
        } else if (!emailRegex.test(formdata.emailid)) {
            error.emailiderror = "Enter a valid email"
        }
        if (!formdata.phone) {
            error.phonenoerror = 'Phone number is required';
        } else if (!isValidPhoneNumber(formdata.phone)) {
            error.phonenoerror = 'Please enter a valid phone number for the selected country';
        }
        if (!formdata.role.trim()) {
            error.roleerror = 'Role is required';
        }
        if (!formdata.message.trim()) {
            error.messageerror = 'Message is required';
        } else if (Number(formdata.message)) {
            error.messageerror = "Enter a valid message"
        }

        setErrors(error);
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formdata, [name]: value })

    }


    useGSAP(() => {
        if (fieldsRef.current.length > 0) {
            staggerAnimation(fieldsRef.current, 'up');
        }
        if (submitBtnRef.current) {
            buttonHover(submitBtnRef.current);
        }
    }, []);

    const submithandler = async (e) => {
        e.preventDefault();
        const validationErrors = errorhandler();
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmitMessage('');
            
            try {
                const response = await contactAPI.sendMail({
                    firstName: formdata.firstname,
                    lastName: formdata.lastname,
                    email: formdata.emailid,
                    phoneNumber: formdata.phone,
                    role: formdata.role,
                    message: formdata.message
                });
                
                setSubmitMessage('Message sent successfully!');
                setFormData({
                    firstname: '',
                    lastname: '',
                    emailid: '',
                    phone: '',
                    role: 'Employer',
                    message: ''
                });
                setErrors({ 
                    firstnameerror: '',
                    lastnameerror: '',
                    emailiderror: '',
                    phonenoerror: '',
                    roleerror: '',
                    messageerror: ''
                });
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setSubmitMessage('');
                }, 5000);
            } catch (error) {
                console.error('Error sending message:', error);
                const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
                setSubmitMessage(errorMessage);
                
                // Clear error message after 5 seconds
                setTimeout(() => {
                    setSubmitMessage('');
                }, 5000);
            } finally {
                setIsSubmitting(false);
            }
        }
    }
    return (
        <form ref={formRef}>
            <div className='grid sm:grid-cols-2 gap-5 mt-4'>
                <div className='flex flex-col' ref={el => fieldsRef.current[0] = el}>
                    <label htmlFor="">First Name <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        value={formdata.firstname}
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6] transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                    />
                    {errors.firstnameerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.firstnameerror}</h4> : ''}
                </div>
                <div className='flex flex-col' ref={el => fieldsRef.current[1] = el}>
                    <label htmlFor="">Last Name <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        value={formdata.lastname}
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6] transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                    />
                    {errors.lastnameerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.lastnameerror}</h4> : ''}
                </div>
                <div className='flex flex-col' ref={el => fieldsRef.current[2] = el}>
                    <label htmlFor="">Email Id <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        value={formdata.emailid}
                        type="email"
                        name="emailid"
                        placeholder="Enter Email Id"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6] transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                    />
                    {errors.emailiderror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.emailiderror}</h4> : ''}
                </div>
                <div className='flex flex-col' ref={el => fieldsRef.current[3] = el}>
                    <label htmlFor="">Phone No. <span className='text-red-600'>*</span></label>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={formdata.phone}
                        onChange={(value) => setFormData({...formdata, phone: value})}
                        defaultCountry="CA"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                    />
                    {errors.phonenoerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.phonenoerror}</h4> : ''}
                </div>
            </div>

            <div className='mt-4' ref={el => fieldsRef.current[4] = el}>
                <label htmlFor="" className='-mb-3 block'>I am an <span className='text-red-600'>*</span></label>
                <select name="role"
                    onChange={handleChange}
                    value={formdata.role}
                    className='focus:outline-none w-full mt-4 py-4 px-2 border-[#D4D4D4] border rounded appearance-none text-[#BDB6B6] transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                    style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.5rem"
                    }}>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Other">Other</option>
                </select>
                {errors.roleerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.roleerror}</h4> : ''}
            </div>

            <div className='mt-4' ref={el => fieldsRef.current[5] = el}>
                <label className='mb-1 block' htmlFor="">Message <span className='text-red-600'>*</span></label>
                <textarea
                    onChange={handleChange}
                    value={formdata.message}
                    name="message"
                    placeholder="Type your message here"
                    className='w-full focus:outline-none border-[#D4D4D4] border py-4 px-2 resize-none rounded h-24 text-[#BDB6B6] transition-all duration-300 focus:border-[#006AAB] focus:shadow-lg'
                >
                </textarea>
                {errors.messageerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.messageerror}</h4> : ''}
            </div>

            {submitMessage && (
                <div className={`mt-4 p-3 rounded ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                </div>
            )}
            
            <button 
                ref={submitBtnRef}
                onClick={submithandler} 
                disabled={isSubmitting}
                className={`sm:text-2xl text-lg px-4 py-2 mt-6 sm:mt-9 text-white rounded transition-all duration-300 transform ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006AAB] hover:bg-[#1085ce] hover:shadow-lg active:scale-95'
                }`} 
                id='buttonStyle'
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}

export default Form