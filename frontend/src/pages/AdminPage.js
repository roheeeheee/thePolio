import { useState, useEffect } from 'react';
import API from '../api/axios';
import './AdminPage.css'; 

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');

  useEffect(() => {
    API.get('/admin/users').then(r => setUsers(r.data)).catch(err => console.error("Failed to load users", err));
    API.get('/admin/posts').then(r => setPosts(r.data)).catch(err => console.error("Failed to load posts", err));
  }, []);

  const toggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/status`);
      setUsers(users.map(u => u._id === id ? data.user : u));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const removePost = async (id) => {
    try {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
    } catch (err) {
      console.error("Failed to remove post", err);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="cosmo-admin-container">
        <div className="admin-header-section">
          <h2 className="admin-title">COMMAND CENTER</h2>
          <p className="admin-subtitle">SYSTEM OVERVIEW & MANAGEMENT</p>
        </div>

        <div className="admin-tabs">
          <button 
            onClick={() => setTab('users')} 
            className={`tab-button ${tab === 'users' ? 'active-tab' : ''}`}
          >
            PERSONNEL ({users.length})
          </button>
          <button 
            onClick={() => setTab('posts')} 
            className={`tab-button ${tab === 'posts' ? 'active-tab' : ''}`}
          >
            TRANSMISSIONS ({posts.length})
          </button>
        </div>

        <div className="admin-content-panel">
          {tab === 'users' && (
            <div className="table-wrapper">
              <table className="cosmo-table">
                <thead>
                  <tr>
                    <th>IDENTIFIER</th>
                    <th>COMMLINK (EMAIL)</th>
                    <th>STATUS</th>
                    <th>OVERRIDE</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr><td colSpan="4" className="empty-state">No personnel found...</td></tr>
                  )}
                  {users.map(u => (
                    <tr key={u._id}>
                      <td className="highlight-text">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`status-badge ${u.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                          {u.status || 'unknown'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleStatus(u._id)}
                          className={`action-btn ${u.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                        >
                          {u.status === 'active' ? 'DEACTIVATE' : 'ACTIVATE'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'posts' && (
            <div className="table-wrapper">
              <table className="cosmo-table">
                <thead>
                  <tr>
                    <th>TRANSMISSION LOG</th>
                    <th>AUTHOR</th>
                    <th>STATE</th>
                    <th>OVERRIDE</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 && (
                    <tr><td colSpan="4" className="empty-state">No transmissions found...</td></tr>
                  )}
                  {posts.map(p => (
                    <tr key={p._id}>
                      <td className="highlight-text">{p.title}</td>
                      <td>{p.author?.name || 'Unknown'}</td>
                      <td>
                        <span className={`status-badge ${p.status === 'published' ? 'badge-active' : 'badge-removed'}`}>
                          {p.status || 'unknown'}
                        </span>
                      </td>
                      <td>
                        {p.status === 'published' ? (
                          <button className="action-btn btn-danger" onClick={() => removePost(p._id)}>
                            PURGE
                          </button>
                        ) : (
                          <span className="dim-text">REMOVED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;