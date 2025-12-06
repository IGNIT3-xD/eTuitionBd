import React from 'react';
import { ArrowRight, BookOpen, Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router';
import CountUp from 'react-countup';

const Hero = () => {
    return (
        <div className='relative primary-clr text-white'>
            {/* Floating Elements */}
            <div className="absolute top-20 right-20 animate-bounce">
                <Sparkles className="size-8 text-yellow-300 opacity-60" />
            </div>
            <div className="absolute bottom-32 left-20 animate-bounce delay-100" style={{ animationDelay: '1s' }}>
                <Sparkles className="size-6 text-pink-300 opacity-60" />
            </div>

            <div className='max-w-7xl mx-auto flex flex-col justify-center py-30 px-4 md:px-10 xl:px-3'>
                <div className='max-w-3xl'>
                    <div className='rounded-full px-4 py-2 flex items-center gap-2 glass w-fit text-sm border-white/20'>
                        <TrendingUp className='size-4' />
                        <span>Trusted by 10,000+ students worldwide</span>
                    </div>
                    <h3 className='text-xl md:text-3xl my-4 font-medium'>Find Your Perfect Tutor Today</h3>
                    <h2 className='text-xl leading-relaxed text-blue-100'>Connect with qualified tutors and unlock your academic potential. Join thousands of students achieving their learning goals with personalized education.</h2>
                </div>
                <div className='my-6 md:my-8 flex items-center flex-wrap gap-4'>
                    <Link className='btn btn-lg font-normal text-primary rounded-xl shadow-lg on-hover'>Browse Tuitions <ArrowRight className='size-5 animate-pulse' /></Link>
                    <Link className='btn btn-lg font-normal bg-blue-500/20 backdrop-blur-sm border-2 border-white/30 on-hover text-white rounded-xl shadow-lg'>Find Tutors <BookOpen className='size-5 animate-pulse ml-1' /></Link>
                </div>
                <div className='grid md:grid-cols-3 gap-6 max-w-3xl my-6 md:my-8'>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all hover:scale-105 duration-300">
                        <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg">
                            <BookOpen className="size-6" />
                        </div>
                        <div>
                            <div className="text-3xl"><CountUp end={500} />+</div>
                            <div className="text-sm text-blue-100">Active Tuitions</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all hover:scale-105 duration-300">
                        <div className="bg-linear-to-br from-green-400 to-emerald-500 p-3 rounded-xl shadow-lg">
                            <Users className="size-6" />
                        </div>
                        <div>
                            <div className="text-3xl"><CountUp end={1000} />+</div>
                            <div className="text-sm text-blue-100">Expert Tutors</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all hover:scale-105 duration-300">
                        <div className="bg-linear-to-br from-pink-400 to-purple-500 p-3 rounded-xl shadow-lg">
                            <Search className="size-6" />
                        </div>
                        <div>
                            <div className="text-3xl"><CountUp end={10000} />+</div>
                            <div className="text-sm text-blue-100">Success Stories</div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-0.5 bg-blue-100 opacity-50'></div>
            </div>
        </div>
    );
};

export default Hero;