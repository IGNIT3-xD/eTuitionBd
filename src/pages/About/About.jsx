import React from 'react';
import { Heart, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className='bg-gray-50 py-16'>
            <div className='primary-clr py-20 text-white'>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-white my-3 text-2xl md:text-3xl font-medium">About e-TuitionBD</h1>
                    <p className="text-xl text-blue-100">
                        Connecting passionate educators with eager learners to create meaningful learning experiences
                    </p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-gray-900 mb-4 text-xl md:text-2xl">Our Story</h2>
                    <p className="text-gray-600 mb-4">
                        e-TuitionBD was founded in 2025 with a simple mission: to make quality education accessible to everyone. We believe that every student deserves the opportunity to learn from experienced educators who are passionate about teaching.
                    </p>
                    <p className="text-gray-600">
                        Today, we've grown into a thriving community of over 1,000 tutors and 10,000 students across the country. Our platform has facilitated millions of learning hours and helped countless students achieve their academic goals.
                    </p>
                </div>
            </div>

            <div className="layout grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                        <Target className="size-6 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2 text-xl md:text-2xl">Our Mission</h3>
                    <p className="text-gray-600">
                        To democratize education by connecting students with qualified tutors, making personalized learning accessible and affordable for all.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                        <Heart className="size-6 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2 text-xl md:text-2xl">Our Values</h3>
                    <p className="text-gray-600">
                        We prioritize quality, accessibility, and student success. Every decision we make is guided by our commitment to education excellence.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                        <Users className="size-6 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2 text-xl md:text-2xl">Our Community</h3>
                    <p className="text-gray-600">
                        A diverse network of educators and learners from all backgrounds, united by a passion for knowledge and growth.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                        <Zap className="size-6 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2 text-xl md:text-2xl">Innovation</h3>
                    <p className="text-gray-600">
                        We continuously improve our platform with cutting-edge technology to enhance the learning experience.
                    </p>
                </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
                <h2 className="text-gray-900 mb-4 text-xl md:text-2xl">Join Our Community</h2>
                <p className="text-gray-600 mb-6">
                    Whether you're a student looking to excel or a tutor wanting to share your knowledge, TutorConnect is the perfect platform for you.
                </p>
                <Link className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started Today
                </Link>
            </div>
        </div>
    );
};

export default About;