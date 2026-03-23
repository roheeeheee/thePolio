import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' or 'error'

  const handleProfile = async (e) => {
    e.preventDefault(); 
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsgType('success');
      setMsg('IDENTIFICATION RECORDS UPDATED.');
    } catch (err) { 
      setMsgType('error');
      setMsg(err.response?.data?.message || 'Update failed'); 
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault(); 
    setMsg('');
    try {
      await API.put('/auth/change-password', { 
        currentPassword: curPw,
        newPassword: newPw 
      });
      setMsgType('success');
      setMsg('SECURITY CLEARANCE CODE UPDATED.');
      setCurPw(''); 
      setNewPw('');
    } catch (err) { 
      setMsgType('error');
      setMsg(err.response?.data?.message || 'Security update failed'); 
    }
  };

  const picSrc = user?.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : '/default-avatar.png'; // Make sure this fallback exists in your public folder

  return (
    <div className="profile-page-wrapper">
      <div className="cosmo-profile-container">
        
        <div className="profile-header-section">
          <div className="avatar-wrapper">
            <img src={picSrc} alt="Profile" className="profile-pic-preview" />
          </div>
          <h2 className="profile-title">PERSONNEL DOSSIER</h2>
          <p className="profile-subtitle">ID: {user?.email}</p>
        </div>

        {msg && (
          <div className={`cosmo-alert ${msgType === 'success' ? 'success-msg' : 'error-msg'}`}>
            {msg}
          </div>
        )}

        <div className="profile-forms-grid">
          {/* Form 1: Profile Info */}
          <form onSubmit={handleProfile} className="cosmo-form profile-form-box">
            <h3 className="form-section-title">UPDATE MANIFEST</h3>
            
            <div className="input-group">
              <label>DESIGNATION (NAME)</label>
              <input 
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="Enter display name..." 
                className="cosmo-input"
              />
            </div>

            <div className="input-group">
              <label>PERSONNEL BIO</label>
              <textarea 
                value={bio} 
                onChange={e => setBio(e.target.value)}
                placeholder="Enter background data..." 
                rows={4} 
                className="cosmo-textarea"
              />
            </div>

            <div className="input-group file-upload-group">
              <label>UPDATE VISUAL IDENTIFIER</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setPic(e.target.files[0])} 
                className="cosmo-file-input"
              />
            </div>

            <button type="submit" className="cosmo-submit-btn">
              COMMIT CHANGES
            </button>
          </form>

          {/* Form 2: Password Change */}
          <form onSubmit={handlePassword} className="cosmo-form profile-form-box">
            <h3 className="form-section-title">SECURITY PROTOCOLS</h3>
            
            <div className="input-group">
              <label>CURRENT CLEARANCE CODE</label>
              <input 
                type="password" 
                placeholder="Current password"
                value={curPw} 
                onChange={e => setCurPw(e.target.value)} 
                required 
                className="cosmo-input"
              />
            </div>

            <div className="input-group">
              <label>NEW CLEARANCE CODE</label>
              <input 
                type="password" 
                placeholder="New password (min 6 chars)"
                value={newPw} 
                onChange={e => setNewPw(e.target.value)} 
                required
                minLength={6} 
                className="cosmo-input"
              />
            </div>

            <button type="submit" className="cosmo-submit-btn alert-btn">
              OVERRIDE CODE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;