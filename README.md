 ## Lead Management System (LMS)

A streamlined application for sales teams to manage leads, track calls, and update student statuses with an intuitive interface that supports the complete lead conversion workflow.

## Features

### Dashboard View
- Clean interface displaying assigned leads with search/filter capabilities by call status, lead status, and follow-up date
- Statistics overview showing total leads, today's follow-ups, connected calls, and conversion rate

### Call Management
- Simple call disposition form to update status (Connected/Not Connected)
- Lead progress tracking (Interested/Not Interested/Admission Taken)
- Required remarks field for documenting each interaction
- View and edit call history with detailed information

### Follow-up Scheduling
- Calendar integration for scheduling callbacks with date selection
- Follow-up date validation (must be in the future)
- Automatic follow-up requirement for interested leads
- View and edit follow-up details
- Status tracking (Pending/Completed/Missed)

### Lead Details
- Comprehensive lead information display
- Call history tracking with timestamps and disposition details
- Notes section for additional information
- Edit lead status and information

### Notification System
- Automatic reminders for upcoming follow-ups
- Notification dropdown with unread count
- Mark notifications as read functionality

### User Experience
- Form validation to ensure data integrity
- Responsive design for all screen sizes
- Intuitive UI with clear visual indicators for lead and call status
- Dark mode support for all components

## Technical Implementation

### Frontend
- Built with React and TypeScript
- UI components from Shadcn UI library
- State management using React hooks
- Form validation for data integrity
- Toast notifications for alerts

### Backend API
## Overview

This is the backend API for the Lead Management System, built with Node.js, Express, and PostgreSQL. It provides endpoints for managing leads, users, and administrative functions.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Lead Management**: CRUD operations for leads with filtering and search capabilities
- **Call Disposition**: Record call outcomes and lead progress
- **Follow-up Scheduling**: Schedule and track follow-up calls
- **Admin Dashboard**: Performance metrics and team management

## API Endpoints

### Authentication

- `POST /api/users/login` - User login

### Leads

- `GET /api/leads` - Get all leads (with filtering)
- `GET /api/leads/today-followups` - Get today's follow-ups
- `GET /api/leads/stats` - Get lead statistics
- `GET /api/leads/:id` - Get a single lead by ID
- `POST /api/leads` - Create a new lead

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users` - Register a new user (admin only)
- `GET /api/users` - Get all users (admin only)

### Admin

- `GET /api/admin/dashboard-stats` - Get dashboard statistics

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)

## Database Models

### User

- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `role` - User role (user/admin)
- `createdAt` - Account creation date

### Lead

- `name` - Lead's full name
- `phone` - Lead's phone number
- `email` - Lead's email
- `source` - Lead source (Website, Referral, etc.)
- `callStatus` - Call status (Connected, Not Connected, Pending)
- `leadStatus` - Lead status (New, Interested, Not Interested, Admission Taken)
- `followUpDate` - Scheduled follow-up date
- `lastContactedDate` - Last contacted date
- `remarks` - Additional notes

### CallHistory

- `leadId` - Reference to Lead
- `userId` - Reference to User
- `date` - Call date
- `status` - Call status (Connected, Not Connected)
- `remarks` - Call notes

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format:

```json
{
  "message": "Error message here"
}
```

## License

This project is licensed under the MIT License.

- RESTful API endpoints for CRUD operations
- MongoDB database for data storage
- Authentication and authorization system
- Real-time notifications for upcoming follow-ups

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173`

## Usage

1. **Adding Leads**: Click the "Add New Lead" button to create a new lead with contact information and source
2. **Managing Calls**: Click the phone icon to record call dispositions and schedule follow-ups
3. **Viewing Details**: Click the eye icon to see comprehensive lead information and call history
4. **Scheduling Follow-ups**: Use the calendar icon to set follow-up dates directly from the lead table
5. **Filtering Leads**: Use the filter options to find specific leads by status or search term
6. **Tracking Follow-ups**: Navigate to the Follow-ups page to see all scheduled follow-ups and their status
7. **Call History**: Visit the Calls page to view and edit all call records
8. **Notifications**: Check the bell icon for upcoming follow-up reminders

## Workflow

1. **Lead Creation**: Add a new lead with basic information
2. **Follow-up Scheduling**: Schedule follow-ups for interested leads
3. **Follow-up Management**: Track and update follow-ups as they occur
4. **Lead Conversion**: Update lead status to "Admission Taken" when converted

# Detailed Documentation

The Lead Management System (LMS) is designed to help sales teams efficiently manage potential customers (leads), track communications, and convert leads into successful admissions. Think of it as a specialized tool for sales representatives to organize their work and follow up with potential students.

## What is a Lead Management System?

Before diving into the technical details, let's understand what a "lead" is in a sales context:

- **Lead**: A potential customer who has shown interest in your services or products but hasn't yet made a purchase or commitment
- **Lead Management**: The process of tracking and managing interactions with leads to convert them into customers

For example, in an educational institution, a lead might be someone who inquired about a course but hasn't enrolled yet.

## Core Features of the LMS

### 1. Dashboard View

The dashboard is like the homepage for sales representatives after they log in. It shows:

- A list of all the leads assigned to them
- Search and filter options to find specific leads
- Quick buttons to perform common actions

Think of it as your command center for managing leads.

### 2. Call Management

When a sales representative talks to a lead, they need to record what happened during the call:

- **Call Status**: Was the call connected or not?
- **Lead Progress**: Is the lead interested, not interested, or ready to be admitted?
- **Remarks**: Notes about what was discussed
- **Call History**: A record of all past calls with this lead

### 3. Follow-up Scheduling

After talking to a lead, the representative often needs to follow up later:

- They can select a specific date and time for the next call
- Get reminders when it's time to make the follow-up call
- See all upcoming follow-ups in one place

### 4. User Authentication

Not everyone should have access to all leads and features:

- Users need to log in with a password
- Different users have different permissions (regular users vs. administrators)

### 5. Admin Controls

Administrators (like sales managers) have special powers:
- Add or Edit User Details

## How the System is Built: Architecture

The system is built using modern web technologies, organized in layers:

### Frontend (What Users See and Interact With)

- **React**: A popular library for building user interfaces
- **TypeScript**: A version of JavaScript that helps catch errors before they happen
- **Tailwind CSS**: A toolkit for designing nice-looking interfaces
- **Shadcn UI**: Ready-made components that follow good design practices
- **React Router**: Handles navigation between different screens
- **React Hook Form**: Makes it easy to create and validate forms
- **Zod**: Ensures that data is in the correct format

### Backend (The "Brain" Behind the Scenes)

- **Node.js**: A platform for running JavaScript outside of a web browser
- **Express**: A framework that simplifies creating a web server
- **PostgreSQL**: A database system for storing all the information

## How Data is Organized: Database Schema

All information is stored in organized tables:

### Users Table

Stores information about people who can log into the system:
- Their name, email, password (securely stored)
- Their role (admin or regular user)
- When their account was created

### Leads Table

Contains details about potential customers:
- Their name, email, phone number
- Current status (new, interested, not interested, etc.)
- Which sales representative is assigned to them
- What course they're interested in
- Where the lead came from (website, referral, etc.)

### Call History Table

Records every call made to a lead:
- Which lead was called
- Who made the call
- Whether the call was connected
- What was the outcome
- Notes about the conversation
- When the call was made

### Follow-ups Table

Keeps track of scheduled follow-up calls:
- Which lead needs to be called
- Who should make the call
- When the call should happen
- Any notes about what to discuss
- Status of the follow-up (pending, completed, etc.)

## Step-by-Step Workflow: How the System Works

### 1. User Login Process

1. A user navigates to the login page
2. They enter their email and password
3. The system checks if these credentials are correct:
   - The frontend sends the login information to the backend
   - The backend verifies the credentials with Supabase
   - If correct, a special token (like a digital ID card) is created
4. Based on their role, they see either:
   - A regular dashboard
   - An admin dashboard 

### 2. Managing Leads 

1. The dashboard shows all leads assigned to the representative
2. They can:
   - Sort and filter leads to find specific ones
   - Click on a lead to see detailed information
   - Click a "Call" button to record a new call

### 3. Call Process

1. When a representative makes a call, they follow this process:
   - Select a lead from their list
   - Click the "Call" button - call functionality needs to be implemented properly
   - After the call, update the status:
     * Was the call connected? (Yes/No)
     * If connected, how did it go? (Interested/Not Interested/Admission Taken)
     * Add notes about what was discussed
   - Schedule a follow-up if needed

2. Example scenario:
   - Sarah calls John about a Web Development course
   - John answers and is interested but wants to think about it
   - Sarah marks the call as "Connected" and "Interested"
   - She adds notes: "John liked the curriculum but wants to check the schedule"
   - She schedules a follow-up for next Tuesday

### 4. Follow-up Management

1. When it's time for a scheduled follow-up:
   - The representative receives a notification
   - They can see all the previous call history
   - They make the call and update the status again

2. Example continued:
   - Next Tuesday, Sarah gets a reminder to call John
   - She reviews her previous notes before calling
   - She calls John and he decides to enroll
   - She updates the lead status to "Admission Taken"

### 5. Admin Functions

1. Assigning leads:
   - The admin sees all unassigned leads
   - They can select leads and assign them to specific representatives

2. Analytics tracking:
   - Admins can see metrics like:
     * How many calls each representative makes
     * Conversion rates (how many leads become customers)
     * Average follow-up time
   - They can use this data to coach their team

## Technical Implementation: How Data Flows Through the System

### 1. Authentication Flow

When a user logs in:
1. The login form collects email and password
2. If valid, a JWT token (a secure digital ID) is created
3. This token is stored locally on the user's browser


### 2. Data Flow for Managing Leads

When a user interacts with leads:
1. UI components (buttons, forms) trigger functions when clicked
2. These functions make API calls to the backend
3. The backend processes the request and interacts with the database
4. The database returns the requested information (although DB is not connected properly)
5. The UI updates to show the new information

### 3. Form Handling

When a user fills out a form (like call disposition):
1. React Hook Form manages what happens as the user types
2. Zod validation ensures the data is correct
3. Error messages appear if something is wrong
4. When submitted, the validated data is sent to the backend
5. The backend updates the database with the new information ( this needs to be implemented properly since db is not implemented properly right now)

## Visual Workflow Diagram

The system follows a logical flow of operations, from a user logging in to completing actions like making calls, scheduling follow-ups, and converting leads. This workflow ensures that all actions are tracked and the sales process is streamlined.

## Getting Started with the System

### For New Users
1. Log in to access your dashboard
2. Familiarize yourself with the lead list and filters
3. Practice recording a call:
   - Select a lead
   - Click "Call"
   - Update the status
   - Add remarks
   - Schedule a follow-up
4. Check your follow-up schedule regularly

### For Administrators

1. After logging in, you'll see the admin dashboard
2. Review performance metrics regularly
3. Create new user accounts as needed

## Technical Requirements

To run the system, you need:
- A modern web browser
- Internet connection
- Login credentials

For developers wanting to modify or extend the system:
- Node.js (v14 or higher)
- npm or yarn package manager
- PostgreSQL database
- Development knowledge of React and Node.js

## Conclusion

The Lead Management System is designed to make the sales process more efficient and organized. By providing a clear way to track leads, calls, and follow-ups, it helps sales teams convert more leads into customers.

Whether you're a sales representative using the system daily or an administrator managing your team, the LMS provides the tools you need to succeed in your role.   

