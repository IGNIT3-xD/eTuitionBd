import React from 'react';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';
import { Link } from 'react-router';
import { BookOpen, MapPin, Star } from 'lucide-react';

const Tutors = () => {
    const instance = useAxios()
    const { data: tutors, isLoading } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const res = await instance.get('/tutors')
            return res.data
        }
    })

    if (isLoading) return <Loading />

    // console.log(tutors);

    return (
        <div className='bg-gray-50'>
            <div className='layout py-20'>
                <div className="my-8">
                    <h1 className="text-gray-900 mb-2 text-2xl md:text-3xl font-medium">Find Your Perfect Tutor</h1>
                    <p className="text-gray-600 text-xl">Browse our community of expert educators</p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        tutors.map(tutor =>
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
                                        <span className="text-gray-900">{tutor.rating || 0}</span>
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
                                    <div>
                                        <div className="text-xs text-gray-500">Experience</div>
                                        <div className="text-indigo-800">{tutor.experience}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Students</div>
                                        <div className="text-gray-900">{tutor.students || 0}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Tutors;