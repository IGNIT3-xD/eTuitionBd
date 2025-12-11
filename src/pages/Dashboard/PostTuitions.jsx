import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useAuth from './../../hooks/useAuth';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';

const PostTuitions = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()
    const [memberSince, setMemberSince] = useState(null)
    const navigate = useNavigate()

    instanceSecure.get(`/users/${user?.email}`)
        .then(res => setMemberSince(res.data.createdAt))
        .catch(err => console.log(err))

    const handlePost = (data) => {
        // console.log(data);
        const tuition = {
            title: data.title,
            subject: data.subject,
            level: data.level,
            budget: data.budget,
            duration: data.duration,
            location: data.location,
            schedule: data.schedule,
            startDate: data.startDate,
            description: data.description,
            posted: new Date(),
            status:'Pending',
            postedBy: {
                name: user.displayName,
                email:user.email,
                avatar: user.photoURL,
                memberSince: new Date(memberSince).toLocaleDateString("en-Us", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })
            }
        }
        // console.log(tuition);

        instanceSecure.post('/tuitions', tuition)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thank you for your post. Wait for the admin approval",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/my-tuitions')
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something wrong !!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>Post a Tuition</h1>
                <p className='text-lg leading-relaxed'>Post a tuition with details and find quality tutors.</p>

                <div className='bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto my-10'>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-12 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <Plus className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-gray-900 font-medium">Post a New Tuition</h2>
                            <p className="text-sm text-gray-500">Fill in the details to find the perfect tutor</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handlePost)} className='space-y-6'>
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 mb-2">Tuition Title *</label>
                            <input
                                type="text"
                                {...register('title', { required: true, minLength: 10 })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g., Mathematics Tutor Needed"
                            />
                            {
                                errors.title?.type === 'minLength' && <p>Title should be 10 characters long or more.</p>
                            }
                        </div>
                        <div className='grid md:grid-cols-2 gap-6'>
                            {/* Subject */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                                <select
                                    {...register('subject', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select subject</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Biology">Biology</option>
                                    <option value="English">English</option>
                                    <option value="Computer Science">ICT</option>
                                    <option value="History">History</option>
                                    <option value="Bangla">Bangla</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            {/* Level */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Level *</label>
                                <select
                                    {...register('level', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select level</option>
                                    <option value="Elementary School">Elementary School</option>
                                    <option value="Middle School">Middle School</option>
                                    <option value="High School">High School</option>
                                    <option value="College">College</option>
                                    <option value="Graduate">Admission</option>
                                </select>
                            </div>
                            {/* Budget */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Budget (per month) *</label>
                                <input
                                    type="text"
                                    {...register('budget', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g., 2000-3000/month"
                                />
                            </div>
                            {/* Duration */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Duration *</label>
                                <input
                                    type="text"
                                    {...register('duration', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g., 3 months"
                                />
                            </div>
                            {/* Schedule */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Schedule *</label>
                                <input
                                    type="text"
                                    {...register('schedule', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Twice a week"
                                />
                            </div>
                            {/* Date */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Start date *</label>
                                <input
                                    type="date"
                                    {...register('startDate', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g., January 1"
                                />
                            </div>
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
                        {/* Desc */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Description *</label>
                            <textarea
                                {...register('description', { required: true })}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                                placeholder="Describe your requirements, learning goals, and any specific needs..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 primary-clr text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Plus className="size-5" />
                            Post Tuition
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostTuitions;