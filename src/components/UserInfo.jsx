import React from 'react';
import '../styles/Profile.css';

const UserInfo = ({ user }) => {
  if (!user) {
    return <div className="user-info-loading">User information unavailable</div>;
  }

  return (
    <div className="user-info-container">
      <div className="user-info-header">
        <div className="user-avatar-container">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`${user.name}'s avatar`} 
              className="user-avatar-img"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.name && user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="user-info-details">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-role">{user.bio || 'No bio provided'}</p>
          <p className="user-email">{user.email}</p>
          {user.joinDate && (
            <p className="user-join-date">Member since: {user.joinDate}</p>
          )}
        </div>
      </div>
      
      {user.studyInterests && user.studyInterests.length > 0 && (
        <div className="user-interests-section">
          <h3>Study Interests</h3>
          <div className="user-interests-container">
            {user.studyInterests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {user.groups && user.groups.length > 0 && (
        <div className="user-groups-section">
          <h3>Study Groups</h3>
          <div className="user-groups-count">
            Member of {user.groups.length} group{user.groups.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;