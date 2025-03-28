import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudyGroupCard from '../components/StudyGroupCard';
import '../../styles/Groups.css';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudyGroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    // Fetch study groups from the backend
    const fetchGroups = async () => {
      try {
        
        const response = await axios.get(`${BASE_URL}/api/studygroup`)
        console.log(response.data);
        // Mock data for demonstration
        const mockGroups = [
          {
            id: 1,
            name: 'Computer Science 101',
            description: 'Fundamentals of programming and computer science principles.',
            category: 'Computer Science',
            memberCount: 24,
            meetingTime: 'Tuesdays and Thursdays, 5-7 PM',
            location: 'Online'
          },
          {
            id: 2,
            name: 'Advanced Mathematics',
            description: 'Calculus, linear algebra, and statistics study group.',
            category: 'Mathematics',
            memberCount: 18,
            meetingTime: 'Mondays and Wednesdays, 4-6 PM',
            location: 'Library Room 202'
          },
          {
            id: 3,
            name: 'Biology Research',
            description: 'Discussion group for biology projects and research.',
            category: 'Biology',
            memberCount: 15,
            meetingTime: 'Fridays, 3-5 PM',
            location: 'Science Building, Lab 3'
          },
          {
            id: 4,
            name: 'Web Development',
            description: 'Learn HTML, CSS, JavaScript and modern frameworks.',
            category: 'Computer Science',
            memberCount: 30,
            meetingTime: 'Saturdays, 10 AM - 1 PM',
            location: 'Online'
          },
          {
            id: 5,
            name: 'Physics Study Group',
            description: 'Classical mechanics, electromagnetism, and quantum physics.',
            category: 'Physics',
            memberCount: 12,
            meetingTime: 'Tuesdays, 6-8 PM',
            location: 'Physics Building, Room 105'
          },
          {
            id: 6,
            name: 'Philosophy Discussion',
            description: 'Explore philosophical concepts and theories through texts and discussion.',
            category: 'Philosophy',
            memberCount: 10,
            meetingTime: 'Thursdays, 7-9 PM',
            location: 'Humanities Building, Room 304'
          },
        ];
        
        setGroups(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching study groups:', error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Filter groups based on search term and category
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === '' || group.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = ['', ...new Set(groups.map(group => group.category))];

  if (loading) {
    return <div className="loading">Loading study groups...</div>;
  }

  return (
    <div className="study-groups-page">
      <header className="page-header">
        <h1>Browse Study Groups</h1>
        <p>Find and join study groups that match your interests and academic goals.</p>
      </header>

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select
            id="category-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.filter(cat => cat !== '').map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="groups-grid">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <StudyGroupCard key={group._id} group={group} />
          ))
        ) : (
          <div className="no-results">
            <p>No study groups found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroupsPage;