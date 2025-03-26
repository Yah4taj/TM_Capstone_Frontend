import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Groups.css';

const StudyGroupCard = ({ group }) => {
  return (
    <div className="study-group-card">
      <div className="card-header">
        <h2 className="group-name">{group.name}</h2>
        <span className="category-badge">{group.category}</span>
      </div>
      
      <div className="card-body">
        <p className="group-description">{group.description}</p>
        
        <div className="group-details">
          <div className="detail-item">
            <span className="detail-label">Members:</span>
            <span className="detail-value">{group.memberCount}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Meeting Time:</span>
            <span className="detail-value">{group.meetingTime}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{group.location}</span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <Link to={`/groups/${group._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default StudyGroupCard;