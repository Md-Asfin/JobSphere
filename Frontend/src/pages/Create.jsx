import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import JobForm from '../components/JobForm.jsx';
import { createJob } from '../services/jobService.js';

const Create = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreate = async (jobData) => {
    try {
      await createJob(jobData);
      setShowSuccess(true);
      setTimeout(() => navigate('/employee/feed'), 2000);
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
          <a href="/" className="hover:text-indigo-600 flex items-center"><Home className="w-4 h-4 mr-1"/> Home</a>
          <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
          <span className="text-slate-900">Post a Job</span>
        </nav>

        {showSuccess && (
          <div className="max-w-4xl mx-auto mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
            <CheckCircle2 className="w-6 h-6" /> 
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Your job has been published successfully. Redirecting...</p>
            </div>
          </div>
        )}

        <JobForm onSubmit={handleCreate} onCancel={() => navigate('/employee/feed')} />
      </main>
    </div>
  );
};

export default Create;
