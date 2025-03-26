import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoinGroupForm from '../components/JoinGroupForm';
import '../../styles/Groups.css';

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
        // This would be replaced with your actual API call
        // const response = await getGroupById(groupId);
        
        // Mock data for demonstration
        const mockGroup = {
          id: parseInt(groupId),
          name: groupId === '1' ? 'Computer Science 101' : 
                groupId === '2' ? 'Advanced Mathematics' : 
                groupId === '3' ? 'Biology Research' : 
                groupId === '4' ? 'Web Development' : 
                groupId === '5' ? 'Physics Study Group' : 'Philosophy Discussion',
          description: groupId === '1' ? 'Fundamentals of programming and computer science principles.' : 
                      groupId === '2' ? 'Calculus, linear algebra, and statistics study group.' : 
                      groupId === '3' ? 'Discussion group for biology projects and research.' :
                      groupId === '4' ? 'Learn HTML, CSS, JavaScript and modern frameworks.' :
                      groupId === '5' ? 'Classical mechanics, electromagnetism, and quantum physics.' :
                      'Explore philosophical concepts and theories through texts and discussion.',
          category: groupId === '1' ? 'Computer Science' : 
                   groupId === '2' ? 'Mathematics' : 
                   groupId === '3' ? 'Biology' :
                   groupId === '4' ? 'Computer Science' :
                   groupId === '5' ? 'Physics' : 'Philosophy',
          memberCount: groupId === '1' ? 24 : 
                      groupId === '2' ? 18 : 
                      groupId === '3' ? 15 :
                      groupId === '4' ? 30 :
                      groupId === '5' ? 12 : 10,
          meetingTime: groupId === '1' ? 'Tuesdays and Thursdays, 5-7 PM' : 
                       groupId === '2' ? 'Mondays and Wednesdays, 4-6 PM' : 
                       groupId === '3' ? 'Fridays, 3-5 PM' :
                       groupId === '4' ? 'Saturdays, 10 AM - 1 PM' :
                       groupId === '5' ? 'Tuesdays, 6-8 PM' : 'Thursdays, 7-9 PM',
          location: groupId === '1' ? 'Online' : 
                   groupId === '2' ? 'Library Room 202' : 
                   groupId === '3' ? 'Science Building, Lab 3' :
                   groupId === '4' ? 'Online' :
                   groupId === '5' ? 'Physics Building, Room 105' : 'Humanities Building, Room 304',
          createdDate: '2024-01-15',
          members: [
            {
              id: 1,
              name: 'John Doe',
              role: 'Group Leader',
              joinDate: '2024-01-15'
            },
            {
              id: 2,
              name: 'Jane Smith',
              role: 'Member',
              joinDate: '2024-01-18'
            },
            {
              id: 3,
              name: 'Alex Johnson',
              role: 'Member',
              joinDate: '2024-01-20'
            }
          ],
          resources: [
            {
              id: 1,
              title: 'Study Guide',
              type: 'PDF',
              link: '#'
            },
            {
              id: 2,
              title: 'Practice Problems',
              type: 'PDF',
              link: '#'
            },
            {
              id: 3,
              title: 'Lecture Notes',
              type: 'Document',
              link: '#'
            }
          ]
        };
        
        setGroup(mockGroup);
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
      // This would be replaced with your actual API call
      // await joinGroup(groupId, userData);
      
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
        <span className="category-badge">{group.category}</span>
      </div>

      <div className="group-content">
        <div className="group-info-section">
          <div className="group-description-card">
            <h2>About This Group</h2>
            <p>{group.description}</p>
            
            <div className="group-details">
              <div className="detail-row">
                <span className="detail-label">Meeting Time:</span>
                <span className="detail-value">{group.meetingTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{group.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Members:</span>
                <span className="detail-value">{group.memberCount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created:</span>
                <span className="detail-value">{group.createdDate}</span>
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
              {group.members.map(member => (
                <li key={member.id} className="member-item">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="resources-section">
            <h2>Study Resources</h2>
            <ul className="resources-list">
              {group.resources.map(resource => (
                <li key={resource.id} className="resource-item">
                  <a href={resource.link} className="resource-link">
                    {resource.title} ({resource.type})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;