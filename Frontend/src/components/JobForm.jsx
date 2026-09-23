import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Autocomplete, Chip, Paper, Grid, CircularProgress } from '@mui/material';

const techOptions = [
  "Java", "Spring Boot", "React", "Python", "Django", "FastAPI", "MongoDB", "MySQL", "PostgreSQL",
  "Docker", "Kubernetes", "AWS", "Azure", "Git", "Node.js", "JavaScript", "TypeScript", "Kafka",
  "Machine Learning", "LLM", "TensorFlow", "PyTorch"
];

const JobForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: "", company: "", location: "", jobType: "Full Time",
    salary: "", experience: 0, description: "", technologies: [], profile: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 4, width: '100%', maxWidth: 800, margin: '0 auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: '#1976D2' }}>
        {initialData ? "Edit Job" : "Post a New Job"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        {initialData ? "Update the details of your job posting." : "Create a detailed job posting and connect with qualified candidates."}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Job Title *" name="title" value={form.title} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Company *" name="company" value={form.company} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Location *" name="location" value={form.location} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Job Type *" name="jobType" value={form.jobType} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Salary *" name="salary" value={form.salary} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Years of Experience *" name="experience" type="number" value={form.experience} onChange={handleChange} required InputProps={{ inputProps: { min: 0 } }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Role/Profile" name="profile" value={form.profile} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              freeSolo
              options={techOptions}
              value={form.technologies || []}
              onChange={(event, newValue) => setForm({ ...form, technologies: newValue })}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Technologies *" placeholder="Add skill" required={form.technologies.length === 0} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description *" name="description" multiline rows={4} value={form.description} onChange={handleChange} required />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : (initialData ? "Save Changes" : "Create Job")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default JobForm;
