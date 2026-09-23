import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock, Building2, Trash2, Edit, X, Loader2 } from 'lucide-react';
import Navbar from "../components/Navbar.jsx";
import JobForm from "../components/JobForm.jsx";
import { getAllJobs, searchJobs, deleteJob, updateJob } from "../services/jobService.js";

const Feed = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [editJobData, setEditJobData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getAllJobs();
      setJobs(data);
      applyFilters(data, locationFilter, typeFilter);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchJobs(query);
      setJobs(data);
      applyFilters(data, locationFilter, typeFilter);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setLocationFilter("");
    setTypeFilter("");
    fetchJobs();
  };

  const applyFilters = (jobData, location, type) => {
    let filtered = jobData;
    if (location) filtered = filtered.filter(j => j.location === location);
    if (type) filtered = filtered.filter(j => j.jobType === type);
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'location') {
      setLocationFilter(value);
      applyFilters(jobs, value, typeFilter);
    } else {
      setTypeFilter(value);
      applyFilters(jobs, locationFilter, value);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteJob(deleteId);
      const updated = jobs.filter(j => j.id !== deleteId);
      setJobs(updated);
      applyFilters(updated, locationFilter, typeFilter);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const result = await updateJob(updatedData);
      const updatedList = jobs.map(j => j.id === result.id ? result : j);
      setJobs(updatedList);
      applyFilters(updatedList, locationFilter, typeFilter);
      setEditJobData(null);
    } catch (err) {
      console.error(err);
    }
  };

  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const uniqueTypes = [...new Set(jobs.map(j => j.jobType).filter(Boolean))];
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
      <Navbar />

      {/* Header & Search */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Explore Opportunities</h1>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Find a role that matches your skills and goals.
            {isDemoMode && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Demo Mode</span>}
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs, skills, companies..."
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button onClick={handleSearch} className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search Jobs
              </button>
              {(query || locationFilter || typeFilter) && (
                <button onClick={handleClear} className="inline-flex justify-center items-center px-4 py-3 border border-slate-300 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm">
                  Clear
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              <select value={locationFilter} onChange={(e) => handleFilterChange('location', e.target.value)} className="block pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg bg-white border">
                <option value="">All Locations</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => handleFilterChange('type', e.target.value)} className="block pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg bg-white border">
                <option value="">All Job Types</option>
                {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-2 text-xl font-medium text-slate-900">No opportunities found</h3>
            <p className="mt-1 text-slate-500">We couldn't find any jobs matching your criteria.</p>
            <button onClick={handleClear} className="mt-6 text-indigo-600 font-medium hover:text-indigo-800">Clear all filters</button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">Showing <span className="text-slate-900 font-bold">{filteredJobs.length}</span> opportunities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditJobData(job)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(job.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <Link to={`/jobs/${job.id}`} className="block group-hover:text-indigo-600 transition-colors">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{job.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-600 font-medium mb-4 line-clamp-1">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> {job.jobType}</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> {job.salary}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {job.experience} Yrs</span>
                  </div>
                  
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-1">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {job.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {tech}
                      </span>
                    ))}
                    {job.technologies?.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
                        +{job.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-50 transition-opacity" onClick={() => setDeleteId(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">Delete this job?</h3>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">Are you sure you want to remove this job posting? This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-slate-200">
                <button type="button" onClick={handleDeleteConfirm} className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button type="button" onClick={() => setDeleteId(null)} className="mt-3 w-full inline-flex justify-center rounded-lg border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Fullscreen) */}
      {editJobData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center z-10 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Edit Job</h2>
            <button onClick={() => setEditJobData(null)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
            <JobForm initialData={editJobData} onSubmit={handleUpdate} onCancel={() => setEditJobData(null)} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Feed;
