import React, { useState } from 'react'

const Form = () => {

    const [formdata, setFormData] = useState({
        firstname: '',
        lastname: '',
        emailid: '',
        phone: '',
        role: '',
        message: ''
    });
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
        if (!formdata.phone.trim()) {
            error.phonenoerror = 'Phone number is required';
        } else if (formdata.phone.trim().length !== 10) {
            error.phonenoerror = "Enter a valid no."
        } else if (!Number(formdata.phone)) {
            error.phonenoerror = 'Enter Correct no.'
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


    const submithandler = (e) => {
        e.preventDefault();
        const validationErrors = errorhandler();
        if (Object.keys(validationErrors).length === 0) {
            // console.log("Form submitted:", formdata);
            setFormData({
                firstname: '',
                lastname: '',
                emailid: '',
                phoneno: '',
                role: '',
                message: ''
            })
            setErrors({ 
                firstnameerror: '',
                lastnameerror: '',
                emailiderror: '',
                phonenoerror: '',
                roleerror: '',
                messageerror: ''
            });
        }
    }
    return (
        <form>
            <div className='grid sm:grid-cols-2 gap-5 mt-4'>
                <div className='flex flex-col'>
                    <label htmlFor="">First Name</label>
                    <input
                        onChange={handleChange}
                        value={formdata.firstname}
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6]'
                    />
                    {errors.firstnameerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.firstnameerror}</h4> : ''}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Last Name</label>
                    <input
                        onChange={handleChange}
                        value={formdata.lastname}
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6]'
                    />
                    {errors.lastnameerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.lastnameerror}</h4> : ''}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Email Id</label>
                    <input
                        onChange={handleChange}
                        value={formdata.emailid}
                        type="email"
                        name="emailid"
                        placeholder="Enter Email Id"
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6]'
                    />
                    {errors.emailiderror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.emailiderror}</h4> : ''}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Phone No.</label>
                    <input
                        onChange={handleChange}
                        value={formdata.phone}
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone No."
                        className='px-3 border-1 py-3 rounded border-[#D4D4D4] focus:outline-none text-[#BDB6B6]'
                    />
                    {errors.phonenoerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.phonenoerror}</h4> : ''}
                </div>
            </div>

            <div className='mt-4'>
                <label htmlFor="" className='-mb-3 block'>I am an</label>
                <select name="role"
                    onChange={handleChange}
                    value={formdata.role}
                    className='focus:outline-none w-full mt-4 py-4 px-2 border-[#D4D4D4] border rounded appearance-none text-[#BDB6B6]'
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

            <div className='mt-4'>
                <label className='mb-1 block' htmlFor="">Message</label>
                <textarea
                    onChange={handleChange}
                    value={formdata.message}
                    name="message"
                    placeholder="Type your message here"
                    className='w-full focus:outline-none border-[#D4D4D4] border py-4 px-2 resize-none rounded h-24 text-[#BDB6B6]'
                >
                </textarea>
                {errors.messageerror ? <h4 className='text-sm flex flex-nowrap items-center text-red-600'><span className='text-red-600'>*</span>{errors.messageerror}</h4> : ''}
            </div>

            <button onClick={submithandler} className='sm:text-2xl text-lg bg-[#006AAB] px-4 py-2 mt-6 sm:mt-9 text-white rounded hover:cursor-pointer' id='buttonStyle'>
                Send Message
            </button>
        </form>
    )
}

export default Form