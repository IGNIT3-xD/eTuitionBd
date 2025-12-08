import { ArrowLeft, Award, BookOpen, MapPin, MessageCircle, Star, Users } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';

const TutorDetails = () => {
    const { id } = useParams()
    const instance = useAxios()
    const { data: tutor, isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await instance.get(`/tutors/${id}`)
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(tutor);

    return (
        <div className='bg-gray-50'>
            <div className='max-w-6xl mx-auto px-4 md:px-10 py-20'>
                <Link to="/tutors" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
                    <ArrowLeft className="size-4" />
                    Back to Tutors page
                </Link>
                <div className='grid lg:grid-cols-3 gap-8'>
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="text-center mb-6">
                                <img
                                    src={tutor.avatar}
                                    alt={tutor.name}
                                    className="size-32 rounded-full mx-auto mb-4 border-4 border-blue-100"
                                />
                                <h2 className="text-gray-900 mb-2 font-medium text-lg">{tutor.name}</h2>
                                <h2 className="text-gray-900 mb-2">{tutor.email}</h2>
                                <div className="flex items-center justify-center gap-1 mb-3">
                                    <Star className="size-5 text-yellow-400 fill-current" />
                                    <span className="text-gray-900">{tutor.rating}</span>
                                    <span className="text-gray-500">({tutor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                                    <MapPin className="size-4" />
                                    <span className="text-sm">{tutor.location}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Award className="size-4" />
                                        <span className="text-sm">Experience</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">{tutor.experience}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="size-4" />
                                        <span className="text-sm">Students</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">{tutor.students}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-center mb-4">
                                    <div className="text-gray-500 text-sm mb-1">Monthly Fee</div>
                                    <div className="text-3xl text-blue-600">{tutor.rate}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full btn primary-clr on-hover text-white rounded-lg">
                                    Book Session
                                </button>
                                <button className="w-full btn on-hover border-2 border-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2">
                                    <MessageCircle className="size-4" />
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* About */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-gray-900 mb-4 text-lg font-medium">About</h2>
                            <p className="text-gray-600 whitespace-pre-line">{tutor.about}</p>
                        </div>

                        {/* Subjects */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="size-5 text-blue-600" />
                                <h2 className="text-gray-900 font-medium text-lg">Subjects</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tutor.subjects.map((subject, index) => (
                                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-gray-900 mb-4 font-medium text-lg">Education</h2>
                            <p className='text-gray-600 whitespace-pre-line'>{tutor.education}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;