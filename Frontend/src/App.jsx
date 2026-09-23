import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Feed from './pages/Feed.jsx';
import Create from './pages/Create.jsx';
import JobDetails from './pages/JobDetails.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/feed" element={<Feed />} />
        <Route path="/employer/dashboard" element={<Create />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
