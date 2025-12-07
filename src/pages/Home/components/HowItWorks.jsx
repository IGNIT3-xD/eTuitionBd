import React from 'react';
import { ArrowRight, GraduationCap, Search, UserCheck } from 'lucide-react';
import { Link } from 'react-router';

const HowItWorks = () => {
    const steps = [
        {
            icon: Search,
            title: 'Search & Discover',
            description: 'Browse through hundreds of qualified tutors and tuition opportunities tailored to your needs and preferences.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: UserCheck,
            title: 'Connect & Match',
            description: 'Reach out to tutors or post your requirements. Get matched with the perfect educator for your learning journey.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: GraduationCap,
            title: 'Learn & Succeed',
            description: 'Start your personalized learning sessions and achieve your academic goals with expert guidance and support.',
            color: 'from-orange-500 to-red-500',
        },
    ];
    return (
        <div className='py-20 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 '>
            <div className='layout'>
                <div className='text-center'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 w-fit bg-white rounded-full shadow-md'>
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-gray-700">Simple 3-Step Process</span>
                    </div>
                    <h2 className="text-gray-900 mb-4 text-2xl md:text-3xl my-4 font-medium">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto  text-xl md:text-2xl">
                        Getting started with TutorConnect is simple. Follow these three easy steps to begin your learning journey.
                    </p>
                </div>
                <div className='grid md:grid-cols-3 gap-6 mt-14'>
                    {
                        steps.map((step, index) =>
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 duration-300 items-stretch h-full">
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center size-20 bg-linear-to-br ${step.color} rounded-2xl mb-6 shadow-lg `}>
                                            <step.icon className="size-10 text-white" />
                                            <div className="absolute -top-2 -right-2 size-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                                <span className="text-sm text-gray-900">{index + 1}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-gray-900 mb-3 text-xl font-medium">{step.title}</h3>
                                        <p className="text-gray-600 mb-4">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='flex items-center justify-center mt-8'>
                    <Link className='btn btn-lg primary-clr text-white inline-flex items-center rounded-lg on-hover'>Get Started Now <ArrowRight className='size-4' /></Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;