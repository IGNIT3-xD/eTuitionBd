import React from 'react';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const Tuitions = () => {
    const instance = useAxios()
    const { data, isLoading } = useQuery({
        queryKey: ['tuitinos'],
        queryFn: async () => {
            const res = await instance.get('/tuitions/approved')
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(data);

    return (
        <div className='bg-gray-50'>
            <div className='layout py-20'>
                <div className="my-8">
                    <h1 className="text-gray-900 mb-2 text-2xl md:text-3xl font-medium">Browse Tuitions</h1>
                    <p className="text-gray-600 text-xl">Find the perfect learning opportunity for you</p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        data.map(tuition =>
                            <Link
                                key={tuition._id}
                                to={`/tuitions/${tuition._id}`}
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
                                    <span className="text-sm text-blue-600">View Details →</span>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Tuitions;