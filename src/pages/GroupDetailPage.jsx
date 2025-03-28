import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoinGroupForm from '../components/JoinGroupForm';
import '../../styles/Groups.css';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isMember, setIsMember] = useState(false);
  
  useEffect(() => {
    // Fetch group details
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/studygroup/${groupId}`);
        console.log(response.data);
        
        setGroup(response.data);
        // Check if user is a member (would be from your API)
        setIsMember(false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching group details:', error);
        setError('Failed to load group details. Please try again.');
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  const handleJoinClick = () => {
    setShowJoinForm(true);
  };

  const handleJoinSubmit = async (userData) => {
    try {
      const response = await axios.get('');
      console.log(response.data);
      
      // Mock successful join
      console.log('Joining group with data:', userData);
      setIsMember(true);
      setShowJoinForm(false);
      
      // Show success message or update UI
      alert('Successfully joined the group!');
    } catch (error) {
      console.error('Error joining group:', error);
      alert('Failed to join the group. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading group details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!group) {
    return <div className="not-found">Group not found</div>;
  }

  return (
    <div className="group-detail-page">
      <div className="back-button-container">
        <button onClick={() => navigate('/groups')} className="back-button">
          ← Back to Groups
        </button>
      </div>
  
      <div className="group-header">
        <h1>{group.name}</h1>
        <span className="category-badge">{group.subject}</span>
      </div>
  
      <div className="group-content">
        <div className="group-info-section">
          <div className="group-description-card">
            <h2>About This Group</h2>
            <p>{group.description}</p>
            
            <div className="group-details">
              <div className="detail-row">
                <span className="detail-label">Meeting Date:</span>
                <span className="detail-value"> {group.meetingSchedule?.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Meeting Time:</span>
                <span className="detail-value"> {group.meetingSchedule?.time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value"> {group.meetingSchedule?.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Members:</span>
                <span className="detail-value"> {group.members?.length || 0}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created:</span>
                <span className="detail-value"> {group.createdAt ? new Date(group.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
  
          {!isMember && !showJoinForm && (
            <div className="join-section">
              <button onClick={handleJoinClick} className="join-button">
                Join This Group
              </button>
            </div>
          )}
  
          {showJoinForm && (
            <div className="join-form-container">
              <h2>Join {group.name}</h2>
              <JoinGroupForm onSubmit={handleJoinSubmit} />
            </div>
          )}
  
          {isMember && (
            <div className="member-badge">
              <span>✓ You are a member of this group</span>
            </div>
          )}
        </div>
  
        <div className="group-sidebar">
          <div className="members-section">
            <h2>Group Members</h2>
            <ul className="members-list">
              {group && group.members ? (
                group.members.map((member, index) => (
                  <li key={member._id || member.id || `member-${index}`} className="member-item">
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                  </li>
                ))
              ) : (
                <li key="no-members">No members found</li>
              )}
            </ul>
          </div>
  
          <div className="resources-section">
            <h2>Study Resources</h2>
            <ul className="resources-list">
              {group && group.resources ? (
                group.resources.map((resource, index) => (
                  <li key={resource._id || resource.id || `resource-${index}`} className="resource-item">
                    <a href={resource.fileUrl} className="resource-link">
                      {resource.title} {resource.type && `(${resource.type})`}
                    </a>
                  </li>
                ))
              ) : (
                <li key="no-resources">No resources available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;