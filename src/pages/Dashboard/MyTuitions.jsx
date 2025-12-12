import React from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import Loading from './../../components/Loading';
import { BookOpen, Clock, DollarSign, Edit, Eye, MapPin, Trash2, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { Modal } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const MyTuitions = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [selectedTuition, setSelectedTuition] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const instanceSecure = useAxiosSecure()
    const { user } = useAuth()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const queryClient = useQueryClient()
    const { data: tuitions, isLoading } = useQuery({
        queryKey: ['my-tuitions', user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/my-tuitions?email=${user?.email}`)
            return res.data
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instanceSecure.delete(`/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            queryClient.invalidateQueries({ queryKey: ['my-tuitions', user?.email] })
                        }
                    })
            }
        });
    }

    const handleModal = (tuition) => {
        // console.log(tuition);
        setSelectedTuition(tuition)
        reset(tuition)
        showModal()
    }

    const handleEdit = (data) => {
        // console.log(data);
        // console.log(selectedTuition._id);
        const newData = {
            title: data.title,
            subject: data.subject,
            level: data.level,
            duration: data.duration,
            location: data.location,
            schedule: data.schedule,
            startDate: data.startDate,
            description: data.description,
        }
        // console.log(newData);

        instanceSecure.patch(`/tuitions/${selectedTuition._id}`, newData)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Tuition Details has been Updated",
                        showConfirmButton: false,
                        timer: 1200
                    });
                    queryClient.invalidateQueries({ queryKey: ['my-tuitions', user?.email] })
                    handleOk()
                    reset()
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong !!",
                    showConfirmButton: false,
                    timer: 1200
                });
            })
    }

    if (isLoading) return <Loading />
    // console.log(tuitions);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>My Tuitions</h1>
                <p className='text-lg leading-relaxed'>View, Edit & Delete your posted tuition(s).</p>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                    {
                        tuitions.map(tuition =>
                            <div key={tuition._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1.5 duration-300 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs ${tuition.status === 'Approved'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-200 text-red-700'
                                                }`}>
                                                {tuition.status}
                                            </span>
                                            <span className="text-xs text-gray-500">{new Date(tuition.posted).toLocaleDateString("en-US", {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}</span>
                                        </div>
                                        <h3 className="text-gray-900 mb-2 font-medium">{tuition.title}</h3>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tuition.description}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen className="size-4 text-blue-500" />
                                        <span>{tuition.subject}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign className="size-4 text-green-500" />
                                        <span>{tuition.budget}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="size-4 text-red-500" />
                                        <span>{tuition.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="size-4 text-orange-500" />
                                        <span>{tuition.duration}</span>
                                    </div>
                                </div>

                                {/* <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-xl">
                                    <Users className="size-5 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        <span className="text-blue-600">{tuition.applications}</span> applications received
                                    </span>
                                </div> */}

                                <div className="flex gap-2">
                                    <Link to={`/tuitions/${tuition._id}`} className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                                        <Eye className="size-4" />
                                        View
                                    </Link>
                                    <button onClick={() => handleModal(tuition)} className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm">
                                        <Edit className="size-4" />
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(tuition._id)} className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm">
                                        <Trash2 className="size-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                selectedTuition &&
                <Modal
                    title="Edit Your Tutition Details"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <form onSubmit={handleSubmit(handleEdit)} className='space-y-6 p-2'>
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 mb-2">Tuition Title *</label>
                            <input
                                type="text"
                                defaultValue={selectedTuition.title}
                                {...register('title', { required: true, minLength: 10 })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g., Mathematics Tutor Needed"
                            />
                            {
                                errors.title?.type === 'minLength' && <p>Title should be 10 characters long or more.</p>
                            }
                        </div>
                        {/* Subject */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                            <select
                                {...register('subject', { required: true })}
                                defaultValue={selectedTuition.subject}
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
                                defaultValue={selectedTuition.level}
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
                                defaultValue={selectedTuition.budget}
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
                                defaultValue={selectedTuition.duration}
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
                                defaultValue={selectedTuition.schedule}
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
                                defaultValue={selectedTuition.startDate}
                                {...register('startDate', { required: true })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g., January 1"
                            />
                        </div>
                        {/* Location */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Location *</label>
                            <input
                                type="text"
                                defaultValue={selectedTuition.location}
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
                                defaultValue={selectedTuition.description}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                                placeholder="Describe your requirements, learning goals, and any specific needs..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 primary-clr text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Edit className="size-5" />
                            Edit Tuition
                        </button>
                    </form>
                </Modal>
            }
        </div>
    );
};

export default MyTuitions;