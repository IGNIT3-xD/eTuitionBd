import React from 'react';
import { Award, Clock, DollarSign, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';

const WhyChooseUs = () => {
    const features = [
        {
            icon: Shield,
            title: 'Verified Tutors',
            description: 'All tutors are thoroughly vetted and background-checked for your safety and peace of mind.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Book sessions at times that work for you. Learn at your own pace and convenience.',
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: Users,
            title: 'Personalized Learning',
            description: 'Get one-on-one attention tailored to your unique learning style and goals.',
            color: 'from-pink-500 to-pink-600',
        },
        {
            icon: Award,
            title: 'Expert Educators',
            description: 'Learn from qualified professionals with years of teaching experience and proven results.',
            color: 'from-orange-500 to-orange-600',
        },
        {
            icon: DollarSign,
            title: 'Affordable Rates',
            description: 'Quality education at competitive prices. Find tutors that fit your budget.',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: Zap,
            title: 'Quick Matching',
            description: 'Get connected with the right tutor within 24 hours. Start learning immediately.',
            color: 'from-yellow-500 to-yellow-600',
        },
    ];

    return (
        <div className='py-20 bg-linear-to-br from-gray-900 via-blue-900 to-indigo-900'>
            <div className='layout'>
                <div className='text-center text-white'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full shadow-md'>
                        <Award className="size-4" />
                        <span>Why Students Choose Us</span>
                    </div>
                    <h2 className="mb-4 text-2xl md:text-3xl my-4 font-medium">Why Choose E-TuitionBD</h2>
                    <p className="text-blue-200 max-w-2xl mx-auto text-xl md:text-2xl">
                        We're committed to providing the best learning experience with features designed for your success.
                    </p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-14'>
                    {
                        features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all border border-white/10 hover:border-white/30 hover:-translate-y-2 duration-300"
                            >
                                <div className={`inline-flex items-center justify-center size-14 bg-linear-to-br ${feature.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="size-7 text-white" />
                                </div>
                                <h3 className="text-white mb-2">{feature.title}</h3>
                                <p className="text-blue-200">{feature.description}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 shadow-2xl border border-white/20'>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div>
                            <h3 className="text-white mb-3 text-2xl md:text-3xl">Ready to Start Learning?</h3>
                            <p className="text-blue-100 text-lg mb-6">
                                Join thousands of students achieving their goals with personalized tutoring
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all hover:shadow-xl inline-flex items-center gap-2 group" >
                                    Get Started Free
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <Link className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all" >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl text-white mb-2">98%</div>
                                <div className="text-sm text-blue-200">Satisfaction Rate</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl text-white mb-2">24/7</div>
                                <div className="text-sm text-blue-200">Support Available</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl text-white mb-2">50+</div>
                                <div className="text-sm text-blue-200">Subjects Covered</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl text-white mb-2">5★</div>
                                <div className="text-sm text-blue-200">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;