import React from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import Loading from './../../components/Loading';

const PaymentHistory = () => {
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/payment?email=${user.email}`)
            return res.data
        },
        enabled: !!user.email
    })

    if (isLoading) return <Loading />
    // console.log(data);

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)]'>
            <div className='layout py-5'>
                <h1 className='text-2xl md:text-3xl my-3 font-medium'>Payment History <span className='text-indigo-500'>({data.length})</span></h1>
                <p className='text-lg leading-relaxed'>Check details about your payment history.</p>
                <div className="overflow-x-auto my-10">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tutor Email</th>
                                <th>My Email</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Paid at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, i) =>
                                    <tr key={data._id}>
                                        <th>{i + 1}</th>
                                        <td className='font-medium'>{data.tutorEmail}</td>
                                        <td>{data.studentEmail}</td>
                                        <td className='font-medium'>{data.amount}</td>
                                        <td className='font-medium text-green-600'>{data.paymentStatus.charAt(0).toUpperCase() + data.paymentStatus.slice(1)}</td>
                                        <td>{new Date(data.paidAt).toLocaleString()}</td>
                                    </tr>
                                )
                            }
                        </tbody >
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;