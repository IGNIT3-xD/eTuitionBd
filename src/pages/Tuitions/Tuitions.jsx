import React, { useState, useEffect } from 'react';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './../../components/Loading';
import { Clock, DollarSign, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router';

const Tuitions = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const limit = 8
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [subject, setSubject] = useState('');
    const [region, setRegion] = useState('');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest
    const [showFilters, setShowFilters] = useState(false);
    const instance = useAxios();

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['tuitions', debouncedSearch, subject, region, sortBy, currentPage],
        queryFn: async () => {
            const res = await instance.get('/tuitions/approved', {
                params: {
                    search: debouncedSearch,
                    subject: subject || undefined,
                    region: region || undefined,
                    sortBy: sortBy,
                    skip: currentPage * limit,
                    limit: limit
                }
            });
            return res.data;
        },
    });

    const totalPages = data?.count ? Math.ceil(data.count / limit) : 0;

    // console.log(data);

    // Get unique subjects and regions for filter options
    const uniqueSubjects = data ? [...new Set(data.result.map(t => t.subject))].sort() : [];
    const uniqueRegions = data ? [...new Set(data.result.map(t => t.location))].sort() : [];

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const clearAllFilters = () => {
        setSearch('');
        setSubject('');
        setRegion('');
        setSortBy('newest');
    };

    const activeFiltersCount = [search, subject, region].filter(Boolean).length;

    if (isLoading) return <Loading />;

    return (
        <div className='bg-gray-50'>
            <div className='layout py-20'>
                <div className="my-6">
                    <h1 className="text-gray-900 mb-2 text-2xl md:text-3xl font-medium">Browse Tuitions</h1>
                    <p className="text-gray-600 text-xl">Find the perfect learning opportunity for you</p>
                </div>

                {/* Search Bar */}
                <div className='my-6'>
                    <div className="relative">
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={handleSearch}
                                type="search"
                                value={search}
                                placeholder="Search tuitions..."
                            />
                            {isFetching && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Filter Toggle Button */}
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="font-medium">Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{data?.length || 0} results</span>
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-xl">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Subject Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Subjects</option>
                                        {uniqueSubjects.map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Locations</option>
                                        {uniqueRegions.map(reg => (
                                            <option key={reg} value={reg}>{reg}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters Tags */}
                            {activeFiltersCount > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        {search && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                Search: {search}
                                                <button onClick={() => setSearch('')} className="hover:bg-blue-100 rounded-full p-0.5">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                        {subject && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                Subject: {subject}
                                                <button onClick={() => setSubject('')} className="hover:bg-blue-100 rounded-full p-0.5">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                        {region && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                Region: {region}
                                                <button onClick={() => setRegion('')} className="hover:bg-blue-100 rounded-full p-0.5">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {data?.result?.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                            <path d="m21 21-4.3-4.3" strokeWidth="2"></path>
                        </svg>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No tuitions found</h3>
                        <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {data?.result.map(tuition =>
                            <Link
                                key={tuition._id}
                                to={`/tuitions/${tuition._id}`}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        {tuition.subject}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(tuition.posted).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <h3 className="text-gray-900 mb-2 font-medium">{tuition.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {tuition.description.split(' ').slice(0, 18).join(' ')}...
                                </p>

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
                        )}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-6">
                    {
                        currentPage > 0 && <button className="btn" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                    }
                    {
                        [...Array(totalPages).keys()].map((i) => <button key={i} className={`btn ${i === currentPage && 'btn-primary'}`} onClick={() => setCurrentPage(i)}>{i + 1}</button>)
                    }
                    {
                        currentPage < totalPages - 1 && <button className="btn" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Tuitions;