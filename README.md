# LeadSync - Lead Management System (LMS)

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
- `PUT /api/leads/:id` - Update lead information
- `POST /api/leads/:id/call` - Record a call disposition
- `DELETE /api/leads/:id` - Delete a lead (admin only)

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users` - Register a new user (admin only)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `POST /api/users/assign-leads` - Assign leads to user (admin only)

### Admin

- `GET /api/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/admin/team-performance` - Get team performance
- `GET /api/admin/unassigned-leads` - Get unassigned leads
- `GET /api/admin/lead-sources` - Get lead source distribution
- `GET /api/admin/conversion-by-source` - Get conversion by source
- `GET /api/admin/monthly-trends` - Get monthly lead and conversion trends

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
- `assignedTo` - Reference to User
- `createdAt` - Lead creation date
- `updatedAt` - Last update date

### CallHistory

- `leadId` - Reference to Lead
- `userId` - Reference to User
- `date` - Call date
- `status` - Call status (Connected, Not Connected)
- `disposition` - Call disposition (Interested, Not Interested, Admission Taken)
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

