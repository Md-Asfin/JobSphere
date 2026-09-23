import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import Navbar from '../components/Navbar';

const features = [
  { icon: <SearchIcon fontSize="large" color="primary" />, title: "Search Smarter", desc: "Find jobs by skills, company and location instantly." },
  { icon: <AddBoxIcon fontSize="large" color="primary" />, title: "Easy Job Posting", desc: "Employers can create and manage job listings quickly." },
  { icon: <CodeIcon fontSize="large" color="primary" />, title: "Technology Focused", desc: "Discover top-tier jobs based on your specific technical skills." },
  { icon: <SpeedIcon fontSize="large" color="primary" />, title: "Simple & Fast", desc: "Experience a clean, fast, and modern job discovery platform." }
];

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: { xs: 8, md: 12 }, px: 2, background: 'linear-gradient(135deg, #1976d2 0%, #004ba0 100%)', color: 'white' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Find the right opportunity.<br />Build your future.
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.9 }}>
            Discover jobs that match your skills, experience, and career goals seamlessly on JobSphere.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to="/employee/feed" variant="contained" size="large" sx={{ bgcolor: 'white', color: '#1976d2', '&:hover': { bgcolor: '#e0e0e0' }, px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}>
              Find Jobs
            </Button>
            <Button component={Link} to="/employer/dashboard" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: '#e0e0e0', bgcolor: 'rgba(255,255,255,0.1)' }, px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}>
              Post a Job
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6, color: '#333' }}>
          Why JobSphere?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 2, borderRadius: 3, '&:hover': { transform: 'translateY(-5px)', transition: 'all 0.3s ease', boxShadow: 4 } }}>
                <CardContent sx={{ py: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer CTA */}
      <Box sx={{ bgcolor: '#fff', py: 8, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Ready for your next opportunity?</Typography>
        <Button component={Link} to="/employee/feed" variant="contained" color="primary" size="large" sx={{ borderRadius: 3, px: 5, py: 1.5 }}>
          Explore Jobs
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: 'center', bgcolor: '#f1f1f1', color: '#666' }}>
        <Typography variant="body2">© {new Date().getFullYear()} JobSphere. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
