import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router';

const TutorDetails = () => {
    const { id } = useParams()
    return (
        <div className='bg-gray-50'>
            <div className='max-w-6xl mx-auto px-4 md:px-10 py-20'>
                <Link to="/tutors" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
                    <ArrowLeft className="size-4" />
                    Back to Tutors page
                </Link>
            </div>
        </div>
    );
};

export default TutorDetails;