import { useQuery } from '@tanstack/react-query';
import { Book, BookOpenCheck, Clock, DollarSignIcon } from 'lucide-react';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const TutorStats = () => {
    const instanceSecure = useAxiosSecure();
    const { user } = useAuth()
    // Fetch admin statistics
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats', user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/tutor/stats?email=${user.email}`);
            return res.data;
        },
        refetchInterval: 30000,
    });

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await instanceSecure.get(`/tutor-payment?email=${user.email}`);
            return res.data;
        }
    });

    if (statsLoading || isLoading) return <Loading />
    // console.log(stats, transactions);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <div className='grid md:grid-cols-3 gap-6'>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`size-14 bg-linear-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg`}>
                                <DollarSignIcon className="size-7 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            ৳{stats.revenue}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            Total earning
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`size-14 bg-linear-to-br from-green-200 to-green-800 rounded-xl flex items-center justify-center shadow-lg`}>
                                <Book className="size-7 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {stats.onGoingTuitions}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            Your tuitions
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`size-14 bg-linear-to-br from-red-200 to-red-600 rounded-xl flex items-center justify-center shadow-lg`}>
                                <BookOpenCheck className="size-7 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {stats.totalApplications}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            Your applications
                        </div>
                    </div>
                </div>

                <div className='mt-10 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1'>
                    <p className='text-indigo-500 text-xl inline-flex items-center gap-2 font-semibold mb-4'>
                        <Clock className='size-5' />
                        Recent Transactions
                    </p>
                    <div className='mt-2 space-y-4 max-h-[600px] overflow-y-auto'>
                        {transactions?.length === 0 ? (
                            <div className='text-center py-8 text-gray-500'>
                                No transactions yet
                            </div>
                        ) : (
                            transactions?.map(data => (
                                <div
                                    key={data._id}
                                    className='p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors space-y-2 border border-gray-200'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div className='flex-1'>
                                            <p className='font-medium text-gray-700'>
                                                Sender: <span className='text-green-600'>{data.studentEmail}</span>
                                            </p>
                                            <p className='text-gray-500 text-xs mt-1 font-mono'>
                                                {data.transactionId || data.transcationId}
                                            </p>
                                        </div>
                                        <span className='text-lg font-bold text-indigo-400'>
                                            ৳{data.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500'>
                                        <Clock className='size-3 inline mr-1' />
                                        {new Date(data.paidAt).toLocaleString('en-US', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                        })}
                                    </p>
                                    {data.paymentStatus && (
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${data.paymentStatus === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {data.paymentStatus}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorStats;