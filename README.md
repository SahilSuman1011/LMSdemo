# Lead Management System (LMS)

## Overview

The Lead Management System is a comprehensive web application designed for sales teams to efficiently manage leads, track calls, and update student statuses. It provides an intuitive interface that supports the complete lead conversion workflow, from initial contact to successful admission.

![Lead Management System](https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80)

## Features

### Dashboard View
- Clean, intuitive interface displaying assigned leads
- Real-time metrics showing total leads, today's follow-ups, connected calls, and conversion rates
- Tab-based navigation for different lead categories (All Leads, Today's Follow-ups, Interested, Converted)

### Lead Management
- Comprehensive lead table with detailed information
- Advanced search and filtering capabilities by call status, lead status, and follow-up date
- Detailed lead profile view with contact information and interaction history

### Call Management
- Simple call disposition form to update status (Connected/Not Connected)
- Lead progress tracking (Interested/Not Interested/Admission Taken)
- Call remarks and notes system

### Follow-up Scheduling
- Calendar integration for scheduling callbacks
- Date/time selection for follow-ups
- Automated reminder system

### User Authentication
- Secure login system with email and password
- Role-based access control (Admin/User)
- Password recovery functionality

### Admin Controls
- Administrative panel for lead assignment
- Performance tracking and analytics
- User management capabilities

### UI Features
- Fully responsive design for all device sizes
- Light and dark mode support
- Notification system for important updates
- Accessible components following WCAG guidelines

## Technical Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components
- Lucide React for icons
- React Hook Form with Zod for form validation

### Build Tools
- Vite for fast development and building
- TypeScript for type safety

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── home.tsx                # Main dashboard component
│   │   ├── layout/                 # Layout components
│   │   │   ├── AuthLayout.tsx      # Authenticated user layout
│   │   │   ├── Header.tsx          # Application header
│   │   │   └── Sidebar.tsx         # Navigation sidebar
│   │   ├── leads/                  # Lead management components
│   │   │   ├── CallModal.tsx       # Call disposition modal
│   │   │   ├── LeadDashboard.tsx   # Lead dashboard with metrics
│   │   │   ├── LeadDetailsModal.tsx # Detailed lead information
│   │   │   ├── LeadFilters.tsx     # Search and filtering
│   │   │   └── LeadTable.tsx       # Table of leads
│   │   └── ui/                     # UI components (Shadcn)
│   ├── pages/
│   │   ├── admin/                  # Admin pages
│   │   │   └── index.tsx           # Admin dashboard
│   │   ├── landing.tsx             # Landing page
│   │   └── login.tsx               # Authentication page
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── App.tsx                     # Main application component
│   ├── index.css                   # Global styles
│   └── main.tsx                    # Application entry point
└── public/
    └── vite.svg                    # Public assets
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lead-management-system.git
   cd lead-management-system
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Authentication
- Use the login page to access the system
- Default credentials for testing:
  - Email: admin@example.com
  - Password: password123

### Dashboard Navigation
- The sidebar provides access to different sections of the application
- The header contains user information and notifications
- Toggle between light and dark mode using the theme toggle in the header

### Managing Leads
1. View all leads in the main dashboard
2. Use filters to narrow down the lead list
3. Click on a lead to view detailed information
4. Use action buttons to call, schedule follow-ups, or update lead status

### Call Disposition
1. Click the call button on a lead
2. Update call status (Connected/Not Connected)
3. Set lead progress (Interested/Not Interested/Admission Taken)
4. Add remarks and schedule follow-up if needed

### Follow-up Management
1. Navigate to the "Today's Follow-ups" tab to see scheduled follow-ups
2. Use the calendar to schedule new follow-ups
3. Receive notifications for upcoming follow-ups

### Notifications
- The system provides notifications for important events
- View notifications by clicking the bell icon in the header
- Notifications are also displayed as toasts for immediate attention

### Theme Switching
- Toggle between light and dark mode using the theme toggle in the header
- The system respects your system preferences by default
- Your theme preference is saved for future sessions

## Admin Features

### User Management
- Create and manage user accounts
- Assign roles (Admin/User)
- Monitor user activity

### Lead Assignment
- Assign leads to specific sales representatives
- Balance workload across the team

### Performance Analytics
- View conversion rates by user
- Track call statistics
- Monitor follow-up effectiveness

## Customization

The Lead Management System is designed to be customizable to fit your organization's needs:

- Modify the lead statuses in `src/components/leads/LeadTable.tsx`
- Adjust the dashboard metrics in `src/components/leads/LeadDashboard.tsx`
- Customize the sidebar navigation in `src/components/layout/Sidebar.tsx`
- Modify the theme colors in `src/index.css`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
