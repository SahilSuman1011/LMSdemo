# Lead Management System API

## Overview

This is the backend API for the Lead Management System, built with Node.js, Express, and MongoDB. It provides endpoints for managing leads, users, and administrative functions.

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
- MongoDB (local or Atlas)

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
- `MONGO_URI` - MongoDB connection string
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
