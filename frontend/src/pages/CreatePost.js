import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);
    
    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    }
  };

  return (
    <div className="create-post-wrapper">
      <div className="cosmo-form-container">
        <div className="form-header-section">
          <h2 className="form-title">NEW TRANSMISSION</h2>
          <p className="form-subtitle">COMPOSE AND BROADCAST TO THE NETWORK</p>
        </div>

        {error && <div className="cosmo-alert error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="cosmo-form">
          <div className="input-group">
            <label>TRANSMISSION TITLE</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter subject designation..." 
              required 
              className="cosmo-input"
            />
          </div>

          <div className="input-group">
            <label>MESSAGE PAYLOAD</label>
            <textarea 
              value={body} 
              onChange={e => setBody(e.target.value)}
              placeholder="Initialize text sequence..." 
              rows={12} 
              required 
              className="cosmo-textarea"
            />
          </div>

          {user?.role === 'admin' && (
            <div className="input-group file-upload-group">
              <label>ATTACH VISUAL DATA (ADMIN ONLY)</label>
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setImage(e.target.files[0])} 
                  className="cosmo-file-input"
                />
              </div>
            </div>
          )}

          <button type="submit" className="cosmo-submit-btn">
            BROADCAST TRANSMISSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;