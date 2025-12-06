import React from 'react';
import Hero from './components/Hero';
import Tuitions from './components/Tuitions';
import FeaturedTutors from './components/FeaturedTutors';
import HowItWorks from './components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Hero />
            <Tuitions />
            <FeaturedTutors />
            <HowItWorks />
        </div>
    );
};

export default Home;