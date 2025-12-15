import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { Camera, Eye, Mail, Save, ShieldUser, SquareUserRound, Trash2, UserIcon } from 'lucide-react';
import { Modal } from 'antd';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserManagment = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState('')
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const instanceSecure = useAxiosSecure()
    const { user, updateUser } = useAuth()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get('/users')
            return res.data
        }
    })

    const handleModal = (user) => {
        setSelectedUser(user)
        setIsViewModalOpen(true)
    }
    // console.log(selectedUser);

    const handleRoleModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setIsRoleModalOpen(true)
    }

    const handleUpdatRole = () => {
        instanceSecure.patch(`/users/role/${selectedUser._id}`, {
            role: newRole
        })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated',
                        text: "Successfully update the role",
                    });
                    refetch()
                }
            })
        setIsRoleModalOpen(false);
        setSelectedUser(null);
    }

    const handleUpdateProfileModal = (user) => {
        setSelectedUser(user)
        setIsUpdateProfileOpen(true)
    }

    const handleSave = async (data) => {
        try {
            let imageUrl = selectedUser.image;

            if (data.image && data.image.length > 0) {
                const formData = new FormData();
                formData.append('image', data.image[0]);

                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formData);
                imageUrl = imgRes.data.data.url;
            }

            const payload = {
                name: data.name,
                email: data.email,
                image: imageUrl
            };

            const updatedData = {
                displayName: data.name,
                photoURL: imageUrl,
                email: data.email
            }
            updateUser(updatedData)

            const res = await instanceSecure.patch(`/users/${selectedUser._id}`, payload);

            if (res.data.modifiedCount) {
                Swal.fire('Success', 'Profile updated successfully', 'success');
                refetch()
                setIsUpdateProfileOpen(false);
            }
        }
        catch {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    if (isLoading) return <Loading />
    // console.log(data);
    // console.log(newRole);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>All Users <span className='text-indigo-500'>({data.length})</span></h1>
                <p className='text-lg leading-relaxed'>Manage users. View user profiles, Update role, Update profile & Delete users.</p>
                <div className="overflow-x-auto my-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((user, i) =>
                                    <tr key={user._id} className="bg-base-200">
                                        <th>{i + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className={`${user.role === 'Admin' && 'text-green-700'} ${user.role === 'Tutor' && 'text-indigo-500'} ${user.role === 'Student' && 'text-amber-500'}`}>{user.role}</td>
                                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                                        <td className='space-x-3 *:btn *:btn-xs *:text-white'>
                                            <button onClick={() => handleModal(user)} title='View profile' className='bg-gray-500'><Eye className='size-4' /></button>
                                            <button onClick={() => handleRoleModal(user)} title='Update role' className='bg-indigo-400'><ShieldUser className='size-4' /></button>
                                            <button onClick={() => handleUpdateProfileModal(user)} title='Update profile' className='bg-green-700'><SquareUserRound className='size-4' /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        selectedUser &&
                        <Modal
                            title="User Info."
                            closable={{ 'aria-label': 'Custom Close Button' }}
                            open={isViewModalOpen}
                            onOk={() => setIsViewModalOpen(false)}
                            onCancel={() => setIsViewModalOpen(false)}
                        >
                            <div>
                                <div className='flex items-center justify-center my-5 w-30 h-30 border-4 border-gray-500/40 mx-auto rounded-full'>
                                    <img className='rounded-full object-cover' src={selectedUser.image} alt="" />
                                </div>
                                <h2 className='font-bold'>Name: <span className='text-black/60'>{selectedUser.name}</span></h2>
                                <h2 className='font-bold'>Email: <span className='text-black/60'>{selectedUser.email}</span></h2>
                                <h2 className='font-bold'>Role: <span className='text-black/60'>{selectedUser.role}</span></h2>
                                <h2 className='font-bold'>Account created: <span className='text-black/60'>{new Date(selectedUser.createdAt).toLocaleString('en-US', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</span></h2>
                            </div>
                        </Modal>
                    }
                    {
                        selectedUser &&
                        <Modal
                            title="Update User Role"
                            open={isRoleModalOpen}
                            onCancel={() => setIsRoleModalOpen(false)}
                            onOk={handleUpdatRole}
                            okText="Update Role"
                        >
                            <p className="mb-2">
                                Update role for <b>{selectedUser?.name}</b>
                            </p>

                            <select
                                className="select select-bordered w-full"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                            </select>
                        </Modal>
                    }
                    {
                        selectedUser &&
                        <Modal
                            title="Update Profile"
                            open={isUpdateProfileOpen}
                            onCancel={() => setIsUpdateProfileOpen(false)}
                            okButtonProps={{
                                htmlType: 'submit',
                                form: 'update-profile-form',
                            }}
                            okText="Update Profile"
                        >
                            <p className="my-2">
                                Update profile for <b>{selectedUser?.name}</b>
                            </p>

                            <form id="update-profile-form" onSubmit={handleSubmit(handleSave)} className="space-y-5">
                                <div className="space-y-5 mt-4">
                                    <div className='text-center'>
                                        <div className="mb-3 inline-block">
                                            {selectedUser?.image && (
                                                <img
                                                    src={selectedUser.image || 'https://img.icons8.com/3d-fluent/100/user-2.png'}
                                                    alt="Profile"
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-500/40"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                            <input
                                                {...register('name', { minLength: 2, required: true })}
                                                type="text"
                                                defaultValue={selectedUser.name}
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
                                                {...register('email', { required: true })}
                                                defaultValue={selectedUser?.email}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            Change Profile Image
                                        </label>
                                        <div className="relative">
                                            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                {...register('image')}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    }

                </div>
            </div>
        </div>
    );
};

export default UserManagment;