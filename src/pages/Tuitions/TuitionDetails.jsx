import React, { useEffect } from 'react';
import useAxios from './../../hooks/useAxios';
import { Link, useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';
import { ArrowLeft, BookOpen, Calendar, CircleCheckBig, Clock, DollarSign, MapPin, MessageCircle } from 'lucide-react';
import useRole from '../../hooks/useRole';
import { useState } from 'react';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TuitionDetails = () => {
    const [alreadyApplied, setAlradyApplied] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { role, isLoading: roleLoading } = useRole()
    const { id } = useParams()
    const instance = useAxios()
    const { data: tuition, isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await instance.get(`/tuitions/${id}`)
            return res.data
        }
    })

    const handleApply = (data) => {
        // console.log(data);
        // console.log(tuition._id);
        const tutor = {
            name: user.displayName,
            avatar: user.photoURL,
            subjects: data.subjects.split(',').map(s => s.trim()).filter(s => s.length),
            location: data.location,
            experience: data.experience,
            rate: data.rate,
            email: user.email,
            about: data.about,
            education: data.education,
            tuitionId: tuition._id,
            appliedAt: new Date()
        }
        // console.log(tutor);

        instanceSecure.post('/applied-tuition', tutor)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your application has been react to the tuition owner. Please wait.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsModalOpen(false)
                    reset()
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong !!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    useEffect(() => {
        instanceSecure.get(`applied-tuition/check?email=${user?.email}&tuitionId=${tuition?._id}`)
            .then(res => {
                setAlradyApplied(res.data.applied);
            })
    }, [user, tuition?._id, instanceSecure])

    if (isLoading || roleLoading) return <Loading />

    // console.log(tuition);
    // console.log(role);

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

                                <button onClick={() => setIsModalOpen(true)} disabled={alreadyApplied || role !== 'Tutor'} className={`${alreadyApplied || role !== "Tutor" ? 'bg-gray-500 text-white btn w-full rounded-lg' : 'w-full primary-clr text-white rounded-lg hover:bg-blue-700 transition-colors on-hover btn'}`}>
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
            <Modal
                title="Apply for this tuition"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                <form onSubmit={handleSubmit(handleApply)} className='space-y-6 p-2'>
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            readOnly
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            defaultValue={user?.displayName}
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            readOnly
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            defaultValue={user?.email}
                        />
                    </div>
                    {/* Subject */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Subjects *</label>
                        <input type='text' {...register('subjects', { required: true })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Math, Physics, Chemistry" />
                    </div>
                    {/* Rate */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Fee(s) (per month) *</label>
                        <input
                            type="text"
                            {...register('rate', { required: true })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., 2000-3000/month"
                        />
                    </div>
                    {/* Experience */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Experience *</label>
                        <input
                            type="text"
                            {...register('experience', { required: true })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., 3 years"
                        />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Location *</label>
                        <input
                            type="text"
                            {...register('location', { required: true })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Dhaka, Gulshan, Rajshahi"
                        />
                    </div>
                    {/* About */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">About you *</label>
                        <textarea
                            {...register('about', { required: true })}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                            placeholder="Describe yourself..."
                        />
                    </div>
                    {/* Education */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Your education *</label>
                        <textarea
                            {...register('education', { required: true })}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                            placeholder="Describe your education (Bsc in Mathmatics)..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 primary-clr text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <CircleCheckBig className='size-4' />
                        Apply Now
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default TuitionDetails;