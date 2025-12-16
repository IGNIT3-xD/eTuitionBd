import React from 'react';
import useAxios from './../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query'
import Loading from './../../../components/Loading';
import { ArrowRight, Clock, DollarSign, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router';

const Tuitions = () => {
    const instance = useAxios()
    const { data, isLoading } = useQuery({
        queryKey: ['tuitions'],
        queryFn: async () => {
            const res = await instance.get('/tuitions/approved?limit=4')
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(data);

    return (
        <div className='py-20 bg-linear-to-br from-gray-100 to-blue-100'>
            <div className='layout'>
                <div className='flex items-center gap-2 rounded-full glass w-fit px-4 py-2 border border-blue-500 bg-blue-200 text-blue-700'>
                    <Zap className="size-4" />
                    <span>New Opportunities</span>
                </div>
                <h2 className="text-gray-900 text-2xl md:text-3xl my-3 font-medium">Latest Tuitions</h2>
                <div className='md:flex items-center justify-between'>
                    <p className="text-gray-600 text-xl md:text-2xl">Discover the newest learning opportunities</p>
                    <Link to={'/tuitions'} className='hidden md:flex items-center gap-1 text-primary underline hover:text-blue-800'>View All <ArrowRight className='size-4 animate-pulse' /></Link>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                    {
                        data?.result.map(tuition =>
                            <Link to={`/tuitions/${tuition._id}`} key={tuition._id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                                {tuition.urgent && (
                                    <div className="absolute top-0 right-0 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-bl-xl text-xs flex items-center gap-1">
                                        <Zap className="size-3" />
                                        Urgent
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-4">
                                    <span className="px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm border border-blue-100">
                                        {tuition.subject}
                                    </span>
                                    <span className="text-xs text-gray-500">{new Date(tuition.posted).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</span>
                                </div>

                                <h3 className="text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{tuition.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tuition.description}</p>

                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="size-4 text-blue-500" />
                                        <span>{tuition.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign className="size-4 text-green-500" />
                                        <span>{tuition.budget}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="size-4 text-orange-500" />
                                        <span>{tuition.duration}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <span className="text-sm text-blue-600 group-hover:text-blue-700 flex items-center gap-2">
                                        View Details
                                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <Link to={'/tuitions'} className='md:hidden my-4 flex items-center justify-center gap-1 text-primary hover:text-blue-800'>View All <ArrowRight className='size-4 animate-pulse' /></Link>
            </div>
        </div>
    );
};

export default Tuitions;