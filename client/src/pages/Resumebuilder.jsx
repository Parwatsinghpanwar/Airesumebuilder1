import React, { useState, useEffect } from 'react'
import { dummyResumeData } from '../assets/assets';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';

const Resumebuilder = () => {
    const { ResumeId } = useParams();
    const [resumeData, setResumeData] = useState({
        id: '',
        tile: '',
        personal_info: {},
        perofessional_summary: '',
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: '#3B82F6',
        public: false,
    });
    const looadExistingResume = async () => {
        const resume = dummyResumeData.find(resume => resume.id === ResumeId);
        if (resume) {
            setResumeData(resume);
            document.title = resume.title;
        }
        useEffect(() => {
            looadExistingResume();
        }, []);
    }
    return (
        <div>
       <div className='max-w-7xl max-auto px-4 py-6  '>
        <Link to={'/App'} className='inline-flex gap-2 items-center text-slate-500  hover:text-slate-700 transition-all'> 
        <ArrowLeftIcon className='size-4' />Back to Dashboard
        </Link>
       </div>

        </div>
    )
}

export default Resumebuilder