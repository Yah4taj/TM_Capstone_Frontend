# The Focus Hub- Study Group Finder💡

A full-stack application that helps users find and join study groups based on their interests and academic goals.

## Description

Study Group Finder is a platform where students can browse available study groups, join groups that match their interests and create a profile to store their groups and resources. Group creators can manage their groups, share resources, and schedule meetings.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm 

## Routes
📬 API Endpoints

User Routes
Method	Endpoint	Description
POST	/api/users	Register a new user
GET	/api/users	Get all users (Admin only)
PATCH	/api/users/:id	Update user profile
DELETE	/api/users/:id	Delete a user (Admin only)
Study Group Routes

Method	Endpoint	Description

POST	/api/groups	Create a study group (Admin only)
GET	/api/groups	Get all study groups
PATCH	/api/groups/:id/join	Join a study group
PATCH	/api/groups/:id/leave	Leave a study group
✨ Future Enhancements
* 📌 User Profiles with avatars and bios
* 🔔 Notifications for group updates
* 🗓️ Study Events & Schedules
* 📹 Video Integration for virtual study sessions




## Usage

1. Browse available study groups
2. View details of a specific group
3. Join a group by filling out the membership form
4. Create your profile to store joined groups and resources
  

## Features

 User authentication and profile management 
- Group membership handling
- Resource sharing within groups
- Meeting scheduling
- Real-time cryptocurrency information display

- ### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm 

## Technologies Used

### Frontend
- React
- React Router
- Fetch API/Axios
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose


## API Documentation

### Study Groups
- `GET /api/studygroup` - Get all study groups
- `GET /api/studygroup/:id` - Get a specific study group
- `POST /api/studygroup` - Create a new study group
- `POST /api/studygroup/:id/join` - Join a study group
- `PUT /api/studygroup/:id` - Update a study group
- `DELETE /api/studygroup/:id` - Delete a study group

### Authentication- Future advancements- functionality for admins
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user


Jira was utilized for project planning and task management

 Future Enhancements
* 📌 User Profiles with avatars and bios
* 🔔 Notifications for group updates
* 🗓️ Study Events & Schedules
* 📹 Video Integration for virtual study sessions
  

## Netlify Link: Building phase-in progress


