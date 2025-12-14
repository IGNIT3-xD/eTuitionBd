import React from 'react';
import Loading from './../../components/Loading';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useAuth from './../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Clock, DollarSign, MapPin } from 'lucide-react';

const OnGoingTuitions = () => {
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()

    const { data: ongoingTuitions, isLoading } = useQuery({
        queryKey: ['ongoing-tuitions', user?.email],
        queryFn: async () => {
            // FIX: Use parenthesis ( not backtick `
            const res = await instanceSecure.get(`/ongoing-tuitions?email=${user.email}`)
            return res.data
        },
        enabled: !!user?.email
    })
    const { data: details, isLoading: detailsLoading } = useQuery({
        queryKey: ['tuitions-details', ongoingTuitions?.map(t => t.tuitionId)],
        queryFn: async () => {
            const res = ongoingTuitions.map(item =>
                instanceSecure.get(`/tuitions/${item.tuitionId}`)
                    .then(res => res.data)
            )
            const results = await Promise.all(res)
            return results
        },
        enabled: !!ongoingTuitions && ongoingTuitions.length > 0
    })

    if (isLoading || detailsLoading) return <Loading />
    // console.log(ongoingTuitions);
    // console.log(details);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>On-going Tuitions <span className='text-indigo-500'>({ongoingTuitions.length})</span></h1>
                <p className='text-lg leading-relaxed'>Track your on-going tuitions.</p>
                <div className='grod md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                    {
                        details.map(tuition =>
                            <div
                                key={tuition._id}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        {tuition.subject}
                                    </span>
                                    <span className="text-xs text-gray-500">{new Date(tuition.posted).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</span>
                                </div>

                                <h3 className="text-gray-900 mb-2 font-medium">{tuition.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{tuition.description.split(' ').slice(0, 18).join(' ')}...</p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="size-4 shrink-0 text-green-500" />
                                        <span>{tuition.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign className="size-4 shrink-0 text-red-600" />
                                        <span>{tuition.budget}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="size-4 shrink-0 text-blue-500" />
                                        <span>{tuition.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">{tuition.level}</span>
                                    <Link to={`/tuitions/${tuition._id}`} className="text-sm text-blue-600 hover:underline">View Details →</Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OnGoingTuitions;