import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Profile.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Fetch user data and groups
    const fetchUserData = async () => {
      try {
        'http://localhost:4000/api/user'
        const userData = await getUserProfile();
        const userGroups = await userGroups();
        
        // Mock data for demonstration
        const mockUserData = {
          id: 1,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'user',
          bio: 'Computer Science Student',
          avatar: null,
          studyInterests: ['Programming', 'Data Science', 'Web Development'],
          joinDate: '2024-01-10'
        };
        
        const mockUserGroups = [
          {
            id: 1,
            name: 'Computer Science 101',
            role: 'Member',
            joinDate: '2024-01-15'
          },
          {
            id: 4,
            name: 'Web Development',
            role: 'Member',
            joinDate: '2024-02-05'
          }
        ];
        
        setUserData(mockUserData);
        setUserGroups(mockUserGroups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <div className="loading">Loading profile data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData) {
    return <div className="not-found">User profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {userData.avatar ? (
            <img src={userData.avatar} alt={`${userData.name}'s avatar`} />
          ) : (
            <div className="avatar-placeholder">
              {userData.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p className="user-bio">{userData.bio}</p>
          <p className="user-email">{userData.email}</p>
          <p className="join-date">Member since: {userData.joinDate}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => switchTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => switchTab('groups')}
        >
          My Groups
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-details">
            <div className="interests-section">
              <h2>Study Interests</h2>
              <div className="interests-container">
                {userData.studyInterests.map((interest, index) => (
                  <span key={index} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="edit-profile-btn">
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="user-groups">
            <h2>My Study Groups</h2>
            
            {userGroups.length > 0 ? (
              <div className="groups-list">
                {userGroups.map(group => (
                  <div key={group.id} className="user-group-card">
                    <h3>{group.name}</h3>
                    <div className="group-role">{group.role}</div>
                    <div className="join-date">Joined: {group.joinDate}</div>
                    <Link to={`/groups/${group.id}`} className="view-group-btn">
                      View Group
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-groups">
                <p>You haven't joined any study groups yet.</p>
                <Link to="/groups" className="browse-groups-btn">
                  Browse Study Groups
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;