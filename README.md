# Lead Management System (LMS)

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
- Today and tomorrow follow-up alerts
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

### Backend (Planned)
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
2. **Initial Call**: Make the first call and record the disposition
3. **Follow-up Scheduling**: Schedule follow-ups for interested leads
4. **Follow-up Management**: Track and update follow-ups as they occur
5. **Lead Conversion**: Update lead status to "Admission Taken" when converted

