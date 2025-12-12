import React, { useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import Loading from './../../components/Loading';
import { BookOpen, ContactRound, MapPin, NotebookText, Star, UserCheck, X } from 'lucide-react';
import { Link } from 'react-router';
import { Modal } from 'antd';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null)
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()
    const { data: tutor, isLoading, refetch } = useQuery({
        queryKey: ['tutors-applications', user.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/applied-tuition/student?studentEmail=${user.email}`)
            return res.data
        },
        enabled: !!user.email
    })

    const handleModal = (tuition) => {
        setSelectedTutor(tuition);
        setIsModalOpen(true)
    }

    const handleReject = (tuition) => {
        // console.log(tuition._id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instanceSecure.patch(`/applied-tuition/student/${tuition._id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Rejected!",
                                text: "Tutor has been rejected.",
                                icon: "success"
                            });
                            refetch()
                        }
                    }).catch(() => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Something went wrong !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        })
    }

    const handleAccept = async (tuition) => {
        console.log(tuition);
        const paymentInfo = {
            id:tuition._id,
            rate: tuition.rate,
            studentEmail: tuition.studentEmail,
            tuitionId: tuition.tuitionId,
            name: tuition.name,
            tutorEmail: tuition.email,
        }
        const res = await instanceSecure.post(`/create-checkout-session`, paymentInfo)
        window.location.assign(res.data.url)
    }

    if (isLoading) return <Loading />
    // console.log(tutor);
    // console.log(selectedTutor);

    return (
        <div className='bg-gray-50'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>Applied Tutors <span className='text-indigo-500'>({tutor.length})</span></h1>
                <p className='text-lg leading-relaxed'>Track the status of your tuitions.</p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tutor Name</th>
                                <th>Tutor Email</th>
                                <th>Tutor location</th>
                                <th>Tutor Experience</th>
                                <th>Subject(s)</th>
                                <th>Fee</th>
                                <th>Applied At</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tutor.map((tuition, i) =>
                                    <tr key={tuition._id}>
                                        <th>{i + 1}</th>
                                        <td>{tuition.name}</td>
                                        <td>{tuition.email}</td>
                                        <td className='font-medium'>{tuition.location}</td>
                                        <td className='font-medium'>{tuition.experience}</td>
                                        <td className='font-medium'>{
                                            Array.isArray(tuition.subjects)
                                                ? tuition.subjects.join(', ')
                                                : String(tuition.subjects || "").split(',').join(', ')
                                        }</td>
                                        <td className='font-medium'>{tuition.rate}</td>
                                        <td className=''>{new Date(tuition.appliedAt).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</td>
                                        <td className={`${tuition.status === 'Pending' ? 'text-red-600' : 'text-green-600'} font-medium`}>{tuition.status}</td>
                                        <td className='grid grid-cols-2 gap-5 lg:gap-2'>
                                            <button disabled={tuition.status === 'Paid'} onClick={() => handleAccept(tuition)} title='Accept' className='btn btn-sm btn-square'><UserCheck className='size-4 text-indigo-500' /></button>
                                            <button disabled={tuition.status !== 'Pending'} onClick={() => handleReject(tuition)} title='Reject' className='btn btn-sm btn-square'><X className='size-4 text-red-500' /></button>
                                            <button onClick={() => handleModal(tuition)} title='Tutor Profile' className='btn btn-sm btn-square'><ContactRound className='size-4 text-red-500' /></button>
                                            <Link to={`/tuitions/${tuition.tuitionId}`} title='View Tuition Post' className='btn btn-sm btn-square'><NotebookText className='size-4 text-green-500' /></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        selectedTutor &&
                        <Modal
                            title="Tutor Details"
                            closable={{ 'aria-label': 'Custom Close Button' }}
                            open={isModalOpen}
                            onOk={() => setIsModalOpen(false)}
                            onCancel={() => setIsModalOpen(false)}
                        >
                            <div key={selectedTutor._id} className="group bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl duration-300 transition-all hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                                <div className="mb-4">
                                    <div className='flex items-center justify-center'>
                                        <div className="relative inline-block mb-4 text-center">
                                            <img
                                                src={selectedTutor.avatar || 'https://img.icons8.com/3d-fluent/100/user-2.png'}
                                                alt={selectedTutor.name}
                                                className="size-24 rounded-full mx-auto border-4 border-white shadow-xl ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all"
                                            />
                                            <div className="absolute bottom-0 right-0 size-6 bg-green-500 border-4 border-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors font-medium">{selectedTutor.name}</h3>
                                    <h3 className="text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors duration-300">{selectedTutor.email}</h3>
                                    <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm duration-300">{selectedTutor.about}</h3>
                                    <div className="flex items-center justify-center gap-1 mb-3">
                                        <Star className="size-5 text-yellow-400 fill-current" />
                                        <span className="text-gray-900">{selectedTutor.rating || 0}</span>
                                        <span className="text-sm text-gray-500">({selectedTutor.reviews || 'None'})</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen className="size-4 text-blue-500 shrink-0" />
                                        <span>{Array.isArray(selectedTutor.subjects)
                                            ? selectedTutor.subjects.join(', ')
                                            : String(selectedTutor.subjects || "").split(',').join(', ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="size-4 text-red-500 shrink-0" />
                                        <span>{selectedTutor.location}</span>
                                    </div>
                                </div>
                                <div className='my-4'>
                                    <p className='font-medium text-lg'>Education</p>
                                    <p className='text-gray-900 mt-2 group-hover:text-blue-600 transition-colors text-sm duration-300 whitespace-pre-line'>{selectedTutor.education}</p>
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                                    <div>
                                        <div className="text-xs text-gray-500">Fee / Month</div>
                                        <div className="text-blue-600">৳ {selectedTutor.rate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Experience</div>
                                        <div className="text-indigo-800">{selectedTutor.experience}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Students</div>
                                        <div className="text-gray-900">{selectedTutor.students || '0'}</div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        </div>
    );
};

export default AppliedTutors;