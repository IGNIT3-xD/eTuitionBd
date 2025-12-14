import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { Eye, ShieldUser, SquareUserRound, Trash2 } from 'lucide-react';
import { Modal } from 'antd';
import Swal from 'sweetalert2';

const UserManagment = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState('')
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    const instanceSecure = useAxiosSecure()
    const { user } = useAuth()
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
                                            <button title='Update profile' className='bg-green-700'><SquareUserRound className='size-4' /></button>
                                            <button title='Delete user' className='bg-red-500'><Trash2 className='size-4' /></button>
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
                </div>
            </div>
        </div>
    );
};

export default UserManagment;