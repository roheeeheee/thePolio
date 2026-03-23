import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Ensure the API instance points to the correct backend URL and port
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    API.get('/posts')
      .then(res => {
        if (Array.isArray(res.data)) {
            setPosts(res.data);
        } else if (res.data && Array.isArray(res.data.posts)) {
            setPosts(res.data.posts);
        } else {
             console.error("Unexpected API response format:", res.data);
             setError("Received invalid data from the server.");
        }
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        if (err.message === 'Network Error') {
             setError("Unable to connect to the cosmic database. Please ensure your backend server is running on http://localhost:5000.");
        } else {
             setError(`An error occurred: ${err.message}`);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* --- Cosmic Hero Section --- */}
      <section className="form-card hero" style={{ background: 'rgba(25, 25, 35, 0.9)', padding: '40px', borderRadius: '15px', textAlign: 'center', color: 'white', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Exploring the Great Unknown</h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>A journey through the stars, galaxies, and the mysteries of the universe.</p>
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200" 
          alt="Galaxy" 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '15px', marginTop: '20px' }}
        />
      </section>

      {/* --- Info Cards Section --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        <div className="form-card" style={{ background: 'rgba(25, 25, 35, 0.9)', padding: '25px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '10px', fontSize: '1.5rem' }}>Our Mission</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>Inspiring a new generation of stargazers through astrophysics and open exploration.</p>
        </div>
        <div className="form-card" style={{ background: 'rgba(25, 25, 35, 0.9)', padding: '25px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '10px', fontSize: '1.5rem' }}>System Status</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>All systems are nominal. The James Webb Space Telescope data feed is live and syncing.</p>
        </div>
      </div>

      {/* --- Dynamic Posts Section --- */}
      <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
        Latest Transmissions
      </h2>

      {loading ? (
        <div style={{ color: '#60a5fa', textAlign: 'center', padding: '40px', fontSize: '1.2rem' }}>
          Establishing connection... Loading posts...
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff6b6b', textAlign: 'center', padding: '40px', borderRadius: '12px', border: '1px dashed rgba(255,0,0,0.3)' }}>
          {error}
          <br/>
          <small>Check your browser console for more details.</small>
        </div>
      ) : posts.length === 0 ? (
        <div style={{ background: 'rgba(0,0,0,0.5)', color: '#ccc', textAlign: 'center', padding: '40px', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)' }}>
          No transmissions detected in this sector. Be the first to broadcast!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {posts.map(post => (
            <article key={post._id} className="form-card" style={{ background: 'rgba(25, 25, 35, 0.9)', padding: '20px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
              
              {/* If the post has an image, display it (adjust path based on your server setup) */}
              {post.image && (
                <img 
                  src={`http://localhost:5000/uploads/${post.image}`} 
                  alt={post.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
                  onError={(e) => e.target.style.display = 'none'} // Hides broken images safely
                />
              )}
              
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#fff' }}>
                {post.title}
              </h3>
              
              <p style={{ color: '#aaa', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5' }}>
                {post.body && post.body.length > 120 ? `${post.body.substring(0, 120)}...` : post.body}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#888', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <span>By {post.author?.name || 'Unknown Explorer'}</span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;