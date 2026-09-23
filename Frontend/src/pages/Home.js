import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css"

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography sx={{ margin: "5%", fontWeight: 'bold', color: '#1976d2' }} variant="h2" align="center">
        JobSphere
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
        Get Hired or Hire people for free!
      </Typography>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <Button variant="contained" size="large" sx={{ padding: '10px 30px' }}>
          <Link to="/employer/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
            Hire talent
          </Link>
        </Button>
        <Button variant="outlined" size="large" sx={{ padding: '10px 30px' }}>
          <Link to="/employee/feed" style={{ textDecoration: 'none' }}>
            Get Job Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
