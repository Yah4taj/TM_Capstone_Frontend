import React, { useState } from 'react';
import '../../styles/Forms.css';

const JoinGroupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    bio: '',
    avatar: null,
    studyInterests: []
  });
  
  const [interestInput, setInterestInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    if (interestInput.trim() !== '') {
      setFormData({
        ...formData,
        studyInterests: [...formData.studyInterests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    const updatedInterests = [...formData.studyInterests];
    updatedInterests.splice(index, 1);
    setFormData({
      ...formData,
      studyInterests: updatedInterests
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Please enter your career title or role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleKeyDown = (e) => {
    // Add interest on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <form className="join-group-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="bio">Career Title or Role</label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="e.g. Software Engineer, Biology Student"
          className={errors.bio ? 'input-error' : ''}
        />
        {errors.bio && <span className="error-message">{errors.bio}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="avatar">Profile Picture</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <div className="avatar-preview">
            <img src={previewUrl} alt="Avatar preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Study Interests</label>
        <div className="interests-input-container">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an interest and press Enter"
          />
          <button 
            type="button" 
            onClick={addInterest}
            className="add-interest-btn"
          >
            Add
          </button>
        </div>
        
        {formData.studyInterests.length > 0 && (
          <div className="interests-list">
            {formData.studyInterests.map((interest, index) => (
              <div key={index} className="interest-tag">
                <span>{interest}</span>
                <button 
                  type="button" 
                  onClick={() => removeInterest(index)}
                  className="remove-interest-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Join Group
        </button>
      </div>
    </form>
  );
};

export default JoinGroupForm;