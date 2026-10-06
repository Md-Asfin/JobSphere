import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

const TECH_OPTIONS = [
  "Java", "Spring Boot", "React", "JavaScript", "TypeScript", "Node.js", 
  "Python", "Django", "FastAPI", "MongoDB", "MySQL", "PostgreSQL", 
  "Docker", "Kubernetes", "AWS", "Azure", "Git", "Kafka", 
  "TensorFlow", "PyTorch", "Machine Learning", "LLM"
];

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship", "Remote", "Hybrid"];

const JobForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: "", company: "", location: "", jobType: "Full Time",
    salary: "", experience: 0, description: "", technologies: [], profile: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleTech = (tech) => {
    if (form.technologies.includes(tech)) {
      setForm({ ...form, technologies: form.technologies.filter(t => t !== tech) });
    } else {
      setForm({ ...form, technologies: [...form.technologies, tech] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title || !form.company || !form.location || !form.description) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError("Failed to save job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
        <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Job" : "Post a New Job"}</h2>
        <p className="text-slate-500 mt-1">
          {initialData ? "Update the details of your job posting." : "Find the right talent with a clear, detailed job listing."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Section 1: Basics */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-6">1. Job Basics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required placeholder="e.g. Senior Java Developer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company *</label>
              <input type="text" name="company" value={form.company} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required placeholder="Company Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role / Profile</label>
              <input type="text" name="profile" value={form.profile} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Backend Developer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Type *</label>
              <select name="jobType" value={form.jobType} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Section 2: Compensation & Details */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-6">2. Location & Compensation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required placeholder="e.g. Hyderabad or Remote" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Salary Range *</label>
              <input type="text" name="salary" value={form.salary} onChange={handleChange} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required placeholder="e.g. 10-15 LPA" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Years of Exp. *</label>
              <input type="number" name="experience" value={form.experience} onChange={handleChange} min="0" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
          </div>
        </section>

        {/* Section 3: Description */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-6">3. Description & Responsibilities</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Detailed Job Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required placeholder="Describe the role, responsibilities, and qualifications..."></textarea>
          </div>
        </section>

        {/* Section 4: Skills */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-6">4. Required Technologies</h3>
          <p className="text-sm text-slate-500 mb-4">Select the key technologies required for this position.</p>
          <div className="flex flex-wrap gap-2">
            {TECH_OPTIONS.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  form.technologies.includes(tech)
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {initialData ? "Save Changes" : "Publish Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
