import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Study Group</h1>
          <p>Connect with like-minded students, exchange knowledge, and achieve learning goals together.</p>
          <Link to="/groups" className="cta-button">Browse Study Groups</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Join Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Find Subject-Specific Groups</h3>
            <p>Connect with students studying the same subjects as you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Collaborative Learning</h3>
            <p>Share ideas and solve problems together with peers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Resource Sharing</h3>
            <p>Exchange study materials and helpful resources.</p>
          </div>
        </div>
      </section>

      <section className="popular-groups">
        <h2>Popular Study Groups</h2>
        <div className="group-preview-grid">
          <div className="group-preview-card">
            <h3>Computer Science 101</h3>
            <p>Fundamentals of programming and computer science principles.</p>
            <Link to="/groups/1" className="view-group-link">View Group</Link>
          </div>
          <div className="group-preview-card">
            <h3>Advanced Mathematics</h3>
            <p>Calculus, linear algebra, and statistics study group.</p>
            <Link to="/groups/2" className="view-group-link">View Group</Link>
          </div>
          <div className="group-preview-card">
            <h3>Biology Research</h3>
            <p>Discussion group for biology projects and research.</p>
            <Link to="/groups/3" className="view-group-link">View Group</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;