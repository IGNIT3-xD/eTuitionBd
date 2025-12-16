import React from 'react';
import loading from '../assets/loading.json';
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Lottie className='md:h-[250px] md:w-[250px] lg:h-auto lg:w-auto mx-auto' animationData={loading} loop={true} />
        </div>
    );
};

export default Loading;