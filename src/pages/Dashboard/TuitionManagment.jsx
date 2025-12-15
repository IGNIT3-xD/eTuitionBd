import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import { useQuery } from '@tanstack/react-query';
import { Check, Eye, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Modal } from 'antd';
import Swal from 'sweetalert2';

const TuitionManagment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTuition, setSelectedTuition] = useState(null)
    const instanceSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tuitions', user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get('/tuitions')
            return res.data
        }
    })

    const handleModal = (user) => {
        setSelectedTuition(user);
        setIsModalOpen(true)
    }

    const handleApprove = (tuition) => {
        // console.log(tuition);
        const status = { status: "Approved" }
        instanceSecure.patch(`/tuitions/${tuition._id}`, status)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Tuiton has been Approved.",
                        icon: "success"
                    });
                    refetch()
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Something went wrong', 'error');
            })
    }

    const handleReject = (tuition) => {
        const status = { status: "Rejected" }
        instanceSecure.patch(`/tuitions/${tuition._id}`, status)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Tuiton has been Rejected.",
                        icon: "success"
                    });
                    refetch()
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Something went wrong', 'error');
            })
    }

    const handleDelete = (tuition) => {
        // console.log(tuition.postedBy.email);
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
                instanceSecure.delete(`/tuitions/${tuition._id}`)
                    .then((res) => {
                        if (res.data.deletedCount)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Something went wrong', 'error');
                    })
            }
        });
    }

    if (isLoading) return <Loading />
    // console.log(data);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>Tuitions Managment</h1>
                <p className='text-lg leading-relaxed'>Manage tuitions, Approve or Reject tuitions & Delete tuitions.</p>
                <div className="overflow-x-auto my-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Budget</th>
                                <th>Posted at</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((user, i) =>
                                    <tr key={user._id} className="bg-base-200">
                                        <th>{i + 1}</th>
                                        <td>{user.postedBy.name}</td>
                                        <td>{user.postedBy.email}</td>
                                        <td>{user.budget} Tk.</td>
                                        <td>{new Date(user.posted).toLocaleString()}</td>
                                        <td>{user.status}</td>
                                        <td className='space-x-3 *:btn *:btn-xs *:text-white'>
                                            <button onClick={() => handleModal(user)} title='View tuition' className='bg-indigo-400'><Eye className='size-4' /></button>
                                            <button onClick={() => handleApprove(user)} title='Approve tuition' className='bg-green-700'><Check className='size-4' /></button>
                                            <button onClick={() => handleReject(user)} title='Reject tuition' className='bg-red-600'><X className='size-4' /></button>
                                            <button onClick={() => handleDelete(user)} title='Delete tuition' className='bg-red-500'><Trash2 className='size-4' /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Modal
                        title="Tuition Info."
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <div className='space-y-3'>
                            <div className='mx-auto my-4 rounded-full border-2 p-2 border-gray-500/40 w-fit'>
                                <img className='w-18 object-cover rounded-full' src={selectedTuition?.postedBy.avatar} alt="" />
                            </div>
                            <h2 className='font-bold'>Title: <span className='text-black/60'>{selectedTuition?.title}</span></h2>
                            <h2 className='font-bold'>Subject: <span className='text-black/60'>{selectedTuition?.subject}</span></h2>
                            <h2 className='font-bold'>Level: <span className='text-black/60'>{selectedTuition?.level}</span></h2>
                            <h2 className='font-bold'>Posted at: <span className='text-black/60'>{new Date(selectedTuition?.posted).toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}</span></h2>
                            <h2 className='font-bold'>Budget: <span className='text-black/60'>{selectedTuition?.budget}</span></h2>
                            <h2 className='font-bold'>Duration: <span className='text-black/60'>{selectedTuition?.duration}</span></h2>
                            <h2 className='font-bold'>Schedule: <span className='text-black/60'>{selectedTuition?.schedule}</span></h2>
                            <h2 className='font-bold'>Start date: <span className='text-black/60'>{selectedTuition?.startDate}</span></h2>
                            <h2 className='font-bold'>Description: <span className='text-black/60'>{selectedTuition?.description}</span></h2>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default TuitionManagment;