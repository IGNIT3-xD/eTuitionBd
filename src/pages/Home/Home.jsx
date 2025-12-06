import React from 'react';
import Hero from './components/Hero';
import Tuitions from './components/Tuitions';
import FeaturedTutors from './components/FeaturedTutors';

const Home = () => {
    return (
        <div>
            <Hero />
            <Tuitions />
            <FeaturedTutors />
        </div>
    );
};

export default Home;