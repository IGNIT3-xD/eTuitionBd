import React from 'react';
import { BookOpen, CircleCheckBig, CircleDollarSign, Clock, UsersRound, TrendingUp, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Loading from './../../components/Loading';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminStats = () => {
    const instanceSecure = useAxiosSecure();

    // Fetch admin statistics
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await instanceSecure.get('/admin/stats');
            return res.data;
        },
        refetchInterval: 30000,
    });

    // Fetch recent transactions
    const { data: transactions, isLoading: transactionsLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await instanceSecure.get('/recent-payment');
            return res.data;
        }
    });

    if (statsLoading || transactionsLoading) return <Loading />;

    const statsCards = [
        {
            label: 'Active Tuitions',
            value: stats?.activeTuitions || 0,
            icon: BookOpen,
            gradient: 'from-indigo-400 to-indigo-700',
        },
        {
            label: 'Tutors',
            value: stats?.totalTutors || 0,
            icon: UsersRound,
            gradient: 'from-indigo-200 to-indigo-500',
        },
        {
            label: 'Approve Tutors',
            value: stats?.approveTutors || 0,
            icon: CircleCheckBig,
            gradient: 'from-green-300 to-green-700',
        },
        {
            label: 'Revenue',
            value: stats?.revenue || 0,
            icon: CircleDollarSign,
            gradient: 'from-red-200 to-red-700',
            prefix: '৳',
        }
    ];

    // Prepare chart data
    const overviewData = [
        { name: 'Active Tuitions', value: stats?.activeTuitions || 0, color: '#6366f1' },
        { name: 'Total Tutors', value: stats?.totalTutors || 0, color: '#818cf8' },
        { name: 'Approved Tutors', value: stats?.approveTutors || 0, color: '#22c55e' }
    ];

    // Revenue breakdown (you can customize this based on your actual data)
    const revenueBreakdown = [
        { name: 'Total Revenue', amount: stats?.revenue || 0 },
        { name: 'Avg per Tuition', amount: stats?.activeTuitions ? Math.round((stats?.revenue || 0) / stats?.activeTuitions) : 0 }
    ];

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                {/* Stats Cards */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {statsCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`size-14 bg-linear-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <Icon className="size-7 text-white" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {card.prefix}{card.value.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {card.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts and Transactions */}
                <div className='grid md:grid-cols-2 gap-6 mt-10'>
                    {/* Recent Transactions */}
                    <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1'>
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

                    {/* Charts Column */}
                    <div className='space-y-6'>
                        {/* Platform Overview Pie Chart */}
                        <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1'>
                            <p className='text-indigo-500 text-xl inline-flex items-center gap-2 font-semibold mb-4'>
                                <Activity className='size-5' />
                                Platform Overview
                            </p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={overviewData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {overviewData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Revenue Chart */}
                        <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1'>
                            <p className='text-green-500 text-xl inline-flex items-center gap-2 font-semibold mb-4'>
                                <TrendingUp className='size-5' />
                                Revenue Analysis
                            </p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={revenueBreakdown}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => `৳${value.toLocaleString()}`}
                                    />
                                    <Bar dataKey="amount" fill="#22c55e" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;