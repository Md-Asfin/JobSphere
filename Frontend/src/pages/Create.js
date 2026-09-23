import React, { useState } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import Navbar from '../components/Navbar';
import JobForm from '../components/JobForm';
import { createJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const handleCreate = async (jobData) => {
    try {
      await createJob(jobData);
      setToast({ open: true, message: "Job posted successfully!", severity: "success" });
      setTimeout(() => navigate('/employee/feed'), 1500);
    } catch (error) {
      setToast({ open: true, message: "Error creating job. Please try again.", severity: "error" });
    }
  };

  const handleCancel = () => {
    navigate('/employee/feed');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <JobForm onSubmit={handleCreate} onCancel={handleCancel} />
      </Container>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Create;
