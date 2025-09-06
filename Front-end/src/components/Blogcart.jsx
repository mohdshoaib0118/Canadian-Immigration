import React, { useState, useEffect } from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { blogAPI } from '../services/api';
import BlogOffcanvas from './BlogOffcanvas';

const Blogcart = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    console.log(selectedBlog, 'selectedBlog');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await blogAPI.getAllBlogs();
                setAllBlogs(response.data.response || response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const handleReadMore = (blog) => {
        setSelectedBlog(blog);
        setIsOffcanvasOpen(true);
    };

    const closeOffcanvas = () => {
        setIsOffcanvasOpen(false);
        setSelectedBlog(null);
    };

    const visibleBlogs = allBlogs.slice(0, visibleCount);

    if (loading) {
        return (
            <div className='container mx-auto mt-6 flex justify-center items-center min-h-96'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-12 h-12 border-4 border-[#006AAB] border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-gray-600'>Loading blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto mt-6'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:gap-x-12 gap-x-6 md:px-7 px-4 pb-9'>
                {visibleBlogs.map((items) => {
                    return (
                        <div className='bg-white shadow-md rounded mt-8 md:mt-14' key={items.id}>
                            <img className='w-full h-64 object-cover' src={items.image} alt="" />
                            <div className='px-4 py-6'>
                                <h3 className='md:text-2xl text-xl mb-4'>{items.heading}</h3>
                                <h4 className='mb-4 md:text-lg text-base'>{items.parah}</h4>
                                <button
                                    onClick={() => handleReadMore(items)}
                                    className='poppins-600 text-[#006AAB] flex items-center gap-1 hover:text-[#004d7a] transition-colors cursor-pointer'
                                >
                                    Read More <GoArrowUpRight />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {visibleCount < allBlogs.length && (
                <div className='md:mb-44 mb-24 w-full flex items-center justify-center'>
                    <button
                        onClick={loadMore}
                        className='lg:py-2 md:py-3 px-4 py-2 lg:px-4 md:px-8 rounded text-white lg:mt-3 sm:text-xl mt-5'
                        id='buttonStyle'
                    >
                        Load More
                    </button>
                </div>
            )}

            <BlogOffcanvas
                isOpen={isOffcanvasOpen}
                onClose={closeOffcanvas}
                blog={selectedBlog}
                allBlogs={allBlogs}
                onBlogSelect={handleReadMore}
            />
        </div>
    )
}

export default Blogcart
