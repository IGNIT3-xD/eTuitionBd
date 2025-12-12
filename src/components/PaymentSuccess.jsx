import React from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useEffect } from 'react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const instanceSecure = useAxiosSecure()

    useEffect(() => {
        instanceSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
            })
    }, [sessionId, instanceSecure])

    return (
        <div className='py-20 text-center'>
            <h1 className='text-2xl font-bold text-green-600'>Payment Success</h1>
        </div>
    );
};

export default PaymentSuccess;