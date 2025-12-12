import React, { useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import Loading from './../../components/Loading';
import { BookOpen, CircleCheckBig, DollarSign, Edit, MapPin, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';

const MyApplication = () => {
    const [selectedTuition, setSelectedTuition] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const instanceSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ['my-applications', user.email],
        queryFn: async () => {
            const res = instanceSecure.get(`/applied-tuition?email=${user.email}`)
            return (await res).data
        },
        enabled: !!user.email
    })
    const { register, handleSubmit, reset } = useForm()

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
                instanceSecure.delete(`/applied-tuition/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            queryClient.invalidateQueries({ queryKey: ['my-applications', user.email] })
                        }
                    })
            }
        });

    }

    const handleModal = (tuition) => {
        // console.log(tuition);
        setSelectedTuition(tuition)
        reset()
        setIsModalOpen(true)
    }

    const handleUpdate = (data) => {
        // console.log(data);
        instanceSecure.patch(`/applied-tuition/${selectedTuition._id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully update your info !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    queryClient.invalidateQueries({ queryKey: ['my-applications', user.email] })
                    setIsModalOpen(false)
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong !!",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    if (isLoading) return <Loading />
    // console.log(data);

    return (
        <div className='bg-gray-50'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>My Applications ({data.length})</h1>
                <p className='text-lg leading-relaxed'>Track the status of your tuition applications</p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>location</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((tuition, i) =>
                                    <tr key={tuition._id}>
                                        <th>{i + 1}</th>
                                        <td>{tuition.name}</td>
                                        <td>{tuition.email}</td>
                                        <td className='font-medium'>{tuition.location}</td>
                                        <td className='font-medium'>{tuition.rate}</td>
                                        <td className={`${tuition.status === 'Pending' ? 'text-red-600' : 'text-green-600'} font-medium`}>{tuition.status}</td>
                                        <td className='space-x-2'>
                                            <button disabled={tuition.status !== 'Pending'} onClick={() => handleModal(tuition)} title='Edit' className='btn btn-sm btn-square'><Edit className='size-4 text-indigo-500' /></button>
                                            <button onClick={() => handleDelete(tuition._id)} title='Delete' className='btn btn-sm btn-square'><Trash2 className='size-4 text-red-700' /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                selectedTuition &&
                <Modal
                    title="Edit Your Details"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <form onSubmit={handleSubmit(handleUpdate)} className='space-y-6 p-2'>
                        {/* Subject */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Subjects *</label>
                            <input type='text' defaultValue={selectedTuition.subjects} {...register('subjects', { required: true })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g., Math, Physics, Chemistry" />
                        </div>
                        {/* Rate */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Fee(s) (per month) *</label>
                            <input
                                type="text"
                                defaultValue={selectedTuition.rate}
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
                                defaultValue={selectedTuition.experience}
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
                                defaultValue={selectedTuition.location}
                                {...register('location', { required: true })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g., Dhaka, Gulshan, Rajshahi"
                            />
                        </div>
                        {/* About */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">About you *</label>
                            <textarea
                                defaultValue={selectedTuition.about}
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
                                defaultValue={selectedTuition.education}
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
                            Update Now
                        </button>
                    </form>
                </Modal>
            }
        </div>
    );
};

export default MyApplication;