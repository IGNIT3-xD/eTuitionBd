import React from 'react';
import useAuth from './../../hooks/useAuth';
import { Camera, Mail, Save, UserIcon } from 'lucide-react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const Settings = () => {
    const { user, updateUser } = useAuth()
    const instanceSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const { data: userDetails } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })

    // console.log(userDetails);

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSave = (data) => {
        // console.log(data);
        const updatedUser = { displayName: data.name }
        updateUser(updatedUser)
            .then(() => {
                const newInfo = { name: data.name }
                instanceSecure.patch(`/users/${userDetails?._id}`, newInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            queryClient.invalidateQueries({ queryKey: [user?.email] })
                            toast.success("User info. updated successfully !!")
                        }
                    })
            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div className='bg-gray-50 min-h-[100vh-401px]'>
            <div className='max-w-6xl mx-auto px-4 md:px-8 py-20'>
                <h3 className='text-2xl md:text-3xl my-4 font-medium'>Account Settings</h3>
                <h2 className='text-xl leading-relaxed'>Manage your account preferences</h2>

                <div className='grid md:grid-cols-3 gap-6 mt-10'>
                    {/* Sidebar - Profile Card */}
                    <div className='md:col-span-1'>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={user.photoURL ? user?.photoURL : 'https://img.icons8.com/3d-fluent/100/user-2.png'}
                                        alt={user?.displayName}
                                        className="size-32 rounded-full mx-auto border-4 border-white shadow-xl ring-4 ring-blue-100"
                                    />
                                    <button className="absolute bottom-0 right-0 size-10 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
                                        <Camera className="size-5" />
                                    </button>
                                </div>
                                <h3 className="text-gray-900 mb-1 font-medium text-lg">{user?.displayName}</h3>
                                <p className="text-sm text-gray-500 mb-3">{user?.email}</p>
                                <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm border border-blue-100">
                                    <span className="size-2 bg-blue-600 rounded-full"></span>
                                    <span className="capitalize">{userDetails?.role}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="text-gray-900">{new Date(userDetails?.createdAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Form */}
                    <div className='md:col-span-2 bg-white rounded-2xl shadow-lg p-6'>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-12 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <UserIcon className="size-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 text-lg font-medium">Profile Information</h2>
                                    <p className="text-gray-500">Update your personal details</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                        <input
                                            {...register('name', { minLength: 2, required: true })}
                                            type="text"
                                            defaultValue={user?.displayName}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    {
                                        errors.name?.type === 'minLength' && <p className='text-red-600'>Name must be 2 characters long.</p>
                                    }
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full cursor-pointer py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                <Save className="size-5" />
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;