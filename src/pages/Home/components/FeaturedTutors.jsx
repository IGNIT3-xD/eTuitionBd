import { ArrowRight, Award, BookOpen, MapPin, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import useAxios from './../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './../../../components/Loading';

const FeaturedTutors = () => {
    const instace = useAxios()
    const { data, isLoading } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const res = await instace.get('/tutors')
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(data);

    return (
        <div className='layout py-20'>
            <div className='flex items-center gap-2 rounded-full glass w-fit px-4 py-2 border border-blue-500 bg-blue-200 text-blue-700'>
                <Award className="size-4" />
                <span>Expert Educators</span>
            </div>
            <h2 className="text-gray-900 text-2xl md:text-3xl my-3 font-medium">Featured Tutors</h2>
            <div className='md:flex items-center justify-between'>
                <p className="text-gray-600 text-xl md:text-2xl">Learn from the best educators</p>
                <Link to={'/tutors'} className='hidden md:flex items-center gap-1 text-primary underline hover:text-blue-800'>View All <ArrowRight className='size-4 animate-pulse' /></Link>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                {
                    data.map(tutor =>
                        <Link to={`/tutors/${tutor._id}`} key={tutor._id} className="group bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl duration-300 transition-all hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                            <div className="text-center mb-4">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={tutor.avatar}
                                        alt={tutor.name}
                                        className="size-24 rounded-full mx-auto border-4 border-white shadow-xl ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all"
                                    />
                                    <div className="absolute bottom-0 right-0 size-6 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>
                                <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{tutor.name}</h3>
                                <div className="flex items-center justify-center gap-1 mb-3">
                                    <Star className="size-5 text-yellow-400 fill-current" />
                                    <span className="text-gray-900">{tutor.rating}</span>
                                    <span className="text-sm text-gray-500">({tutor.reviews})</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BookOpen className="size-4 text-blue-500 shrink-0" />
                                    <span className="truncate">{tutor.subjects.join(', ')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="size-4 text-red-500 shrink-0" />
                                    <span>{tutor.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                                <div>
                                    <div className="text-xs text-gray-500">Rate</div>
                                    <div className="text-blue-600">৳ {tutor.rate}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500">Students</div>
                                    <div className="text-gray-900">{tutor.students}</div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default FeaturedTutors;