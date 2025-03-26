import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forms.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    bio: '',
    avatar: null,
    studyInterests: []
  });
  
  const [interestInput, setInterestInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
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
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Please enter your career title or role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setSignupError('');
      
      try {
        // This would be replaced with your actual API call
        // const response = await registerUser(formData);
        
        // Mock successful registration
        console.log('Registering with:', formData);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store token (would come from API)
        localStorage.setItem('token', 'mock-token-12345');
        
        // Redirect to groups page
        navigate('/groups');
      } catch (error) {
        console.error('Registration error:', error);
        setSignupError(error.message || 'Failed to register. Please try again.');
      } finally {
        setIsLoading(false);
      }
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
    <form className="auth-form" onSubmit={handleSubmit}>
      {signupError && (
        <div className="form-error-message">
          {signupError}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={isLoading}
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
          placeholder="Enter your email"
          disabled={isLoading}
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
          placeholder="Create a password"
          disabled={isLoading}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          disabled={isLoading}
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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
          disabled={isLoading}
          className={errors.bio ? 'input-error' : ''}
        />
        {errors.bio && <span className="error-message">{errors.bio}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="avatar">Profile Picture (Optional)</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
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
            disabled={isLoading}
          />
          <button 
            type="button" 
            onClick={addInterest}
            className="add-interest-btn"
            disabled={isLoading}
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
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;