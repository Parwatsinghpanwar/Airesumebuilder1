import React, { useState, useEffect } from 'react'
import { dummyResumeData } from '../assets/assets'
import { Link, useParams } from 'react-router-dom'
import {
    ArrowLeftIcon,
    Briefcase,
    ChevronLeftIcon,
    ChevronRight,
    FileText,
    FolderIcon,
    GraduationCapIcon,
    Sparkles,
    UserIcon
} from 'lucide-react'
import Personalfrominfo from '../Componet/Personalfrominfo'
import ResumePreview from '../Componet/ResumePreview'
import TempleteSelector from '../Componet/TempleteSelector'
import ColorPicker from '../Componet/ColorPicker'
import ProfessionalSummaryForm from '../Componet/ProfessionalSummaryForm'
import ExperienceForm from '../Componet/ExperienceForm'
import EducationForm from '../Componet/EducationForm'
import ProjectForm from '../Componet/ProjectForm'
import SkillsForm from '../Componet/SkillsForm'
import CertificationForm from '../Componet/CertificationForm'





const Sections = [
    { id: "personal", name: "Personal Information", icon: UserIcon },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Work Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCapIcon },
    { id: "project", name: "Projects", icon: FolderIcon },
    { id: "skill", name: "Skill", icon: Sparkles },
    { id: "certification", name: "Certifications", icon: Sparkles },
]

const Resumebuilder = () => {
    const { ResumeId } = useParams()

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [resumeData, setResumeData] = useState({
        _id: "",
        title: "",
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skill: [],
        certification: [],
        template: "classic",
        accent_color: "#3b82f6",
        public: false,
    });
    const [removeBackground, setremoveBackground] = useState(false)
    const activeSection = Sections[activeSectionIndex]
    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData);

            if (typeof resumeData.personal_info.image === "object") {
                delete updatedResumeData.personal_info.image;
            }

            const formData = new FormData();
            formData.append("resumeId", ResumeId);
            formData.append("resumeData", JSON.stringify(updatedResumeData));

            removeBackground && formData.append("removeBackground", "yes");
            typeof resumeData.personal_info.image === "object" &&
                formData.append("image", resumeData.personal_info.image);

            const { data } = await api.put("/api/resumes/update", formData, {
                headers: { Authorization: token },
            });

            setResumeData(data.resume);
            toast.success(data.message);
        } catch (error) {
            console.error("Error saving resume:", error);
        }
    };


    useEffect(() => {
        const resume = dummyResumeData.find(r => r._id === ResumeId)
        if (resume) {
            setResumeData(resume)
            document.title = resume.title
        }
    }, [ResumeId])

    return (

        <div>
            <div className='max-w-7xl mx-auto px-4 py-6'>
                <Link to="/App" className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700'>
                    <ArrowLeftIcon className='size-4' /> Back to Dashboard
                </Link>
            </div>

            <div className='max-w-7xl mx-auto px-4 pb-8'>
                <div className='grid lg:grid-cols-12 gap-8'>

                    {/* LEFT */}
                    <div className='relative lg:col-span-5'>
                        <div className='bg-white rounded-lg shadow-sm border p-6 pt-4 relative'>

                            {/* Progress bar */}
                            <hr className='absolute top-0 left-0 h-1 bg-gray-200 w-full' />
                            <hr
                                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300'
                                style={{
                                    width: `${(activeSectionIndex * 100) / (Sections.length - 1)}%`
                                }}
                            />



                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                    <TempleteSelector
                                        selectedTemplate={resumeData.template}
                                        onChange={(template) =>
                                            setResumeData((prev) => ({ ...prev, template }))
                                        } />
                                    <ColorPicker
                                        selectedColor={resumeData.accent_color}
                                        onChange={(accent_color) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                accent_color
                                            }))
                                        }
                                    />


                                </div>
                                <div className='flex justify-end items-center mt-4'>
                                    {activeSectionIndex !== 0 && (
                                        <button
                                            onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                                            className='flex items-center gap-1 p-2 text-sm text-gray-600 hover:bg-gray-100 rounded'
                                        >
                                            <ChevronLeftIcon className='size-4' /> Previous
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            setActiveSectionIndex(i => Math.min(i + 1, Sections.length - 1))
                                        }
                                        disabled={activeSectionIndex === Sections.length - 1}
                                        className={`flex items-center gap-1 p-2 text-sm rounded ${activeSectionIndex === Sections.length - 1
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        Next <ChevronRight className='size-4' />
                                    </button>
                                </div>
                            </div>
                            {/*from content*/}
                            <div className='space-y-6'>
                                {activeSection.id === 'personal' && (
                                    <Personalfrominfo
                                        data={resumeData?.personal_info || {}}
                                        onChange={(data) =>
                                            setResumeData(prev => ({ ...prev, personal_info: data }))
                                        }
                                        removeBackground={removeBackground}
                                        setremoveBackground={setremoveBackground}
                                    />
                                )}
                                {activeSection.id === "summary" && (
                                    <ProfessionalSummaryForm
                                        data={resumeData.professional_summary}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                professional_summary: data,
                                            }))
                                        }
                                        setResumeDate={setResumeData}
                                    />
                                )}
                                {activeSection.id === "experience" && (
                                    <ExperienceForm
                                        data={resumeData.experience}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                experience: data,
                                            }))
                                        }
                                    />
                                )}
                                {activeSection.id === "education" && (
                                    <EducationForm
                                        data={resumeData.education}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                education: data,
                                            }))
                                        }
                                    />
                                )}
                                {activeSection.id === "project" && (
                                    <ProjectForm
                                        data={resumeData.project}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                project: data,
                                            }))
                                        }
                                    />
                                )}
                                {activeSection.id === "skill" && (
                                    <SkillsForm
                                        data={resumeData.skill}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                skill: data,
                                            }))
                                        }
                                    />
                                )}
                                {activeSection.id === "certification" && (
                                    <CertificationForm
                                        data={resumeData.certification}
                                        onChange={(data) =>
                                            setResumeData((prev) => ({
                                                ...prev,
                                                certification: data,
                                            }))
                                        }
                                    />
                                )}
                                

                            </div>

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className='lg:col-span-7 mx-lg:mt-6 '>

                        <div>
                            {/* button section */}

                        </div>
                        <div>
                            {/* Resume Preview Section */}
                            {resumeData && (
                                <ResumePreview
                                    data={resumeData}
                                    template={resumeData.template}
                                    accentColor={resumeData.accentColor}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Resumebuilder
