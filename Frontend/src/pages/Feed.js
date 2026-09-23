import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState();

  //
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPost(response.data);
    };
    const fetchInitialPosts = async () => {
        const response = await axios.get(`http://localhost:8080/allPosts`);
        console.log(response);
        setPost(response.data);
    }
    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);
console.log(post);
  return (
    <Grid container spacing={3} sx={{ padding: "2% 5%" }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button variant="outlined" color="primary">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          </Button>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search jobs..."
            sx={{ width: { xs: "70%", md: "50%" } }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Card sx={{ padding: "5%", height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: '#1976d2', mb: 1 }}>
                  {p.profile}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 2, flexGrow: 1 }} variant="body2">
                  {p.desc}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Experience: {p.exp} years
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {p.techs.map((s, i) => (
                    <Typography key={i} variant="caption" sx={{ backgroundColor: '#e0f7fa', color: '#006064', padding: '4px 8px', borderRadius: '12px' }}>
                      {s}
                    </Typography>
                  ))}
                </Box>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Feed;
