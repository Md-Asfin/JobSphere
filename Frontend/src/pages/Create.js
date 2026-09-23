import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const initial = { title: "", experience: 0, technologies: [], description: "", company: "Default Company", location: "Remote", jobType: "Full Time", salary: "Not Specified" };

const Create = () => {
    const skillSet = [
        { name: "Javascript" },
        { name: "Java" },
        { name: "Python" },
        { name: "Django" },
        { name: "Rust" }
      ];
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      navigate('/employee/feed');
  };

  const { title, experience, description } = form;

  const handleChange = (e) => {
    setForm({...form , technologies : [...form.technologies, e.target.value]});
  }

  return (
    <Paper sx={{ padding:"2%"}} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", width: { xs: "90%", md: "60%" }, margin: "0 auto" }}>
          <TextField
            type="string"
            sx={{ margin: "2% auto" }}
            fullWidth
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            label="Job Title (e.g., Software Engineer)"
            variant="outlined"
            value={title}
          />
          <TextField
            min="0"
            type="number"
            sx={{ margin: "2% auto" }}
            fullWidth
            required
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            label="Years of Experience Required"
            variant="outlined"
            value={experience}
          />
           <TextField
            type="string"
            sx={{ margin: "2% auto" }}
            fullWidth
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            label="Job Description"
            variant="outlined"
            value={description}
          />
          <Box sx={{ margin: "2% auto", width: "100%" }}>
            <Typography variant="h6" gutterBottom>Required Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {skillSet.map(({ name }, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      onChange={handleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Button
            sx={{ margin: "4% auto", padding: '10px 40px' }}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Create Job Post
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
