import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Grid, TextField, Typography, Button, Container, Chip,
  CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Tooltip, Avatar, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import { getAllJobs, searchJobs, deleteJob, updateJob } from "../services/jobService";

const Feed = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  // Dialogs
  const [editJobData, setEditJobData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllJobs();
      setJobs(data);
      applyFilters(data, locationFilter, typeFilter);
    } catch (err) {
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchJobs(query);
      setJobs(data);
      applyFilters(data, locationFilter, typeFilter);
    } catch (err) {
      setError("Search failed.");
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

  // Extract unique locations and types for filters
  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const uniqueTypes = [...new Set(jobs.map(j => j.jobType).filter(Boolean))];

  const handleDeleteConfirm = async () => {
    try {
      await deleteJob(deleteId);
      setToast({ open: true, message: "Job deleted successfully", severity: "success" });
      const updated = jobs.filter(j => j.id !== deleteId);
      setJobs(updated);
      applyFilters(updated, locationFilter, typeFilter);
    } catch (err) {
      setToast({ open: true, message: "Error deleting job", severity: "error" });
    } finally {
      setDeleteId(null);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const result = await updateJob(updatedData);
      setToast({ open: true, message: "Job updated successfully", severity: "success" });
      const updatedList = jobs.map(j => j.id === result.id ? result : j);
      setJobs(updatedList);
      applyFilters(updatedList, locationFilter, typeFilter);
      setEditJobData(null);
    } catch (err) {
      setToast({ open: true, message: "Error updating job", severity: "error" });
    }
  };

  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', pb: 8 }}>
      <Navbar />

      {/* Header & Search */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e0e0e0', pt: 6, pb: 4, mb: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center', color: '#1976d2' }}>
            Find your next opportunity
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
            Search jobs by title, skill, company or location {isDemoMode && <Chip size="small" label="Demo Mode" color="warning" sx={{ml:1}} />}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ px: 4 }}>
              Search
            </Button>
            {(query || locationFilter || typeFilter) && (
              <Button variant="outlined" color="error" onClick={handleClear} startIcon={<ClearIcon />}>
                Clear
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Location</InputLabel>
              <Select value={locationFilter} label="Location" onChange={(e) => handleFilterChange('location', e.target.value)}>
                <MenuItem value=""><em>All Locations</em></MenuItem>
                {uniqueLocations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Job Type</InputLabel>
              <Select value={typeFilter} label="Job Type" onChange={(e) => handleFilterChange('type', e.target.value)}>
                <MenuItem value=""><em>All Types</em></MenuItem>
                {uniqueTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Box>

      {/* Job List */}
      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>
        ) : error ? (
          <Typography color="error" align="center" variant="h6" sx={{ mt: 8 }}>{error}</Typography>
        ) : filteredJobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 1, color: 'text.secondary' }}>No jobs found</Typography>
            <Typography variant="body1" sx={{ color: 'text.disabled' }}>Try a different keyword or clear your search.</Typography>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold', color: 'text.secondary' }}>
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </Typography>
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 1, '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}><BusinessIcon /></Avatar>
                        <Box>
                          <Tooltip title="Edit Job">
                            <IconButton size="small" onClick={() => setEditJobData(job)}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Job">
                            <IconButton size="small" color="error" onClick={() => setDeleteId(job.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, lineHeight: 1.2 }}>{job.title}</Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center' }}>
                        {job.company}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: '#555' }}><LocationOnIcon fontSize="small" sx={{ mr: 0.5 }}/>{job.location}</Typography>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: '#555' }}><WorkOutlineIcon fontSize="small" sx={{ mr: 0.5 }}/>{job.jobType}</Typography>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: '#555' }}><AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }}/>{job.salary}</Typography>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 2, color: '#444', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {job.description}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mb: 2, fontWeight: 'bold' }}>Exp: {job.experience} years</Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {job.technologies?.map((tech, i) => (
                          <Chip key={i} label={tech} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 500 }} />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete this job?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this job posting? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editJobData} onClose={() => setEditJobData(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ bgcolor: '#f4f6f8', p: 0 }}>
          {editJobData && (
            <Box sx={{ p: 4 }}>
              <JobForm initialData={editJobData} onSubmit={handleUpdate} onCancel={() => setEditJobData(null)} />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Feed;
