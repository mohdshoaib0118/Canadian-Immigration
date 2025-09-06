import React, { useEffect } from 'react';

const BlogOffcanvas = ({ isOpen, onClose, blog, allBlogs, onBlogSelect }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!blog) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 backdrop-blur-md bg-transparent z-40 transition-all duration-300"
                    onClick={onClose}
                />
            )}
            
            {/* Offcanvas */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-4xl bg-white shadow-xl z-50 transform transition-all duration-500 ease-out ${
                isOpen ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-0'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#006AAB]">
                    <h2 className="text-xl font-semibold text-white">Blog Details</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors p-1"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="h-full overflow-y-auto pb-20">
                    {/* Blog Image */}
                    <div className="w-full h-64 md:h-80">
                        <img 
                            src={blog.image} 
                            alt={blog.heading}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {blog.heading}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-4 border-b border-gray-200">
                            {blog.createdAt && (
                                <span className="flex items-center gap-1">
                                    <strong>Published:</strong> {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            )}
                            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                <span className="flex items-center gap-1">
                                    <strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>

                        {/* Full Content */}
                        <div className="prose max-w-none">
                            <div 
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: blog.paragraph }}
                            />
                        </div>

                        {/* Additional Details */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Blogs */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Related Blogs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {allBlogs?.filter(b => b._id !== blog._id).slice(0, 4).map((relatedBlog) => (
                                    <div 
                                        key={relatedBlog._id}
                                        className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => onBlogSelect(relatedBlog)}
                                    >
                                        <img 
                                            src={relatedBlog.image} 
                                            alt={relatedBlog.heading}
                                            className="w-full h-32 object-cover rounded mb-3"
                                        />
                                        <h4 className="font-medium text-sm mb-2 line-clamp-2">{relatedBlog.heading}</h4>
                                        <p className="text-xs text-gray-600">
                                            {new Date(relatedBlog.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogOffcanvas;