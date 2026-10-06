import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, Building2, ArrowLeft, ExternalLink, BookmarkPlus } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import { getAllJobs } from '../services/jobService.js';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobs = await getAllJobs();
        const foundJob = jobs.find(j => j.id === id);
        if (foundJob) setJob(foundJob);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h2>
          <p className="text-slate-500 mb-6">The job you are looking for does not exist or has been removed.</p>
          <Link to="/employee/feed" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{job.title}</h1>
                  <p className="text-lg text-indigo-600 font-medium">{job.company}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-y-4 gap-x-6 text-sm text-slate-600 font-medium border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-slate-400"/> {job.location}</div>
                <div className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-400"/> {job.jobType}</div>
                <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-slate-400"/> {job.salary}</div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400"/> {job.experience} Yrs Exp.</div>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Job Description</h2>
              <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
              
              {job.profile && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Role / Profile</h3>
                  <p className="text-slate-600">{job.profile}</p>
                </div>
              )}
            </div>

            {/* Technologies Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Required Technologies</h2>
              <div className="flex flex-wrap gap-2.5">
                {job.technologies?.map((tech, idx) => (
                  <span key={idx} className="inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm shadow-indigo-200 transition-colors flex items-center justify-center gap-2 mb-4"
                onClick={() => alert(isDemoMode ? "Application feature coming soon (Demo Mode)" : "Application Submitted!")}
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </button>
              
              <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <BookmarkPlus className="w-4 h-4 text-slate-400" /> Save Job
              </button>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Job Summary</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-500">Published</span>
                    <span className="font-medium text-slate-900">Today</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-900">{job.experience} Years</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-slate-500">Job ID</span>
                    <span className="font-medium text-slate-400 text-xs mt-0.5">{job.id}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default JobDetails;
