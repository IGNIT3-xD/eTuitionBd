import React from 'react';
import useAxios from './../../hooks/useAxios';
import { Link, useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';
import { ArrowLeft, BookOpen, Calendar, Clock, DollarSign, MapPin, MessageCircle } from 'lucide-react';

const TuitionDetails = () => {
    const { id } = useParams()
    const instance = useAxios()
    const { data: tuition, isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await instance.get(`/tuitions/${id}`)
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(tuition);

    return (
        <div className='bg-gray-50'>
            <div className='max-w-6xl mx-auto py-20 px-4 md:px-10'>
                <Link to="/tuitions" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
                    <ArrowLeft className="size-4" />
                    Back to Tuitions
                </Link>

                <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-8">
                        <div className="flex items-start justify-between mb-4">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                {tuition.subject}
                            </span>
                            <span className="text-sm text-blue-100">{new Date(tuition.posted).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}</span>
                        </div>
                        <h1 className="text-white mb-4 text-xl md:text-2xl">{tuition.title}</h1>
                        <div className="flex flex-wrap gap-4 text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="size-5" />
                                <span>{tuition.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="size-5" />
                                <span>{tuition.budget}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="size-5" />
                                <span>{tuition.duration}</span>
                            </div>
                        </div>
                    </div>

                    <div className='p-8 grid lg:grid-cols-3 gap-8'>
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-gray-900 mb-4 font-medium text-xl md:text-2xl">Description</h2>
                                <div className="text-gray-600 whitespace-pre-line">
                                    {tuition.description}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-gray-900 mb-4 text-lg font-medium">Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                            <BookOpen className="size-4" />
                                            Level
                                        </div>
                                        <div className="text-gray-900">{tuition.level}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                            <Calendar className="size-4" />
                                            Start Date
                                        </div>
                                        <div className="text-gray-900">{tuition.startDate}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                            <Clock className="size-4" />
                                            Schedule
                                        </div>
                                        <div className="text-gray-900">{tuition.schedule}</div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-gray-900 mb-4 text-lg">Posted By</h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={tuition.postedBy.avatar}
                                            alt={tuition.postedBy.name}
                                            className="size-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-gray-900 text-lg font-medium">{tuition.postedBy.name}</div>
                                            <div className="text-xs text-gray-500">{tuition.postedBy.memberSince}</div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full primary-clr text-white rounded-lg hover:bg-blue-700 transition-colors on-hover btn">
                                    Apply for This Tuition
                                </button>
                                <button className="mt-4 hover:text-blue-700 w-full btn border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    <MessageCircle /> Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetails;