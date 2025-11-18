# TaskFlow - Task Management System

A comprehensive full-stack task management system built with NestJS, React, and PostgreSQL. This project demonstrates modern web development practices with real-time features, robust authentication, and an intuitive user interface.

## 🎯 Features

### Core Features (Challenge Requirements)

- ✅ **Adding Projects** - Create and manage multiple projects with descriptions and deadlines
- ✅ **Tracking Task/Project Progress** - Real-time progress tracking with visual indicators
- ✅ **Delegating Work to Team Members** - Assign tasks to team members with role-based access control
- ✅ **Setting Deadlines** - Set deadlines for both projects and individual tasks
- ✅ **Tracking Issues** - Report and track issues related to tasks
- ✅ **Adjusting Work Schedules** - Reschedule tasks and projects with automatic notifications
- ✅ **Real-time Notifications** - WebSocket-based notifications when users are assigned tasks

### Additional Features

- 🔐 JWT-based authentication and authorization
- 👥 Role-Based Access Control (RBAC) - Admin, Manager, and Team Member roles
- 📊 Dashboard with project statistics and overview
- 🎨 Modern, responsive UI with dark mode support
- 🔔 Real-time notifications via WebSocket
- 📱 Mobile-friendly design
- ⚡ Fast and efficient API with TypeORM

## 🛠 Tech Stack

**Frontend:**
- React 19
- Next.js 16
- TypeScript
- Tailwind CSS
- Socket.io Client
- React Hook Form
- Zod Validation

**Backend:**
- NestJS 10
- TypeORM
- PostgreSQL
- JWT Authentication
- WebSocket (Socket.io)
- Passport.js
- Class Validator

**Database:**
- PostgreSQL 15+

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+ (or Docker)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/HiwotBelay/taskflow.git
cd taskflow
```

### 2. Database Setup

**Option A: Using Docker (Recommended)**

```bash
docker run --name taskflow-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=taskflow_db \
  -e POSTGRES_USER=taskflow_user \
  -p 5432:5432 -d postgres:15
```

**Option B: Local PostgreSQL**

Create a database named `taskflow_db` and a user `taskflow_user` with password `password`.

### 3. Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=taskflow_db
DATABASE_USER=taskflow_user
DATABASE_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=http://localhost:3000
EOF

npm run start:dev
```

The backend will run on `http://localhost:3001`

### 4. Frontend Setup

```bash
# Open a NEW terminal window
cd frontend
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOF

npm run dev
```

The frontend will run on `http://localhost:3000`

### 5. First Login

1. Register a new account at `http://localhost:3000/register`
2. Or login at `http://localhost:3000/login`
3. Start creating projects and tasks!

## 📁 Project Structure

```
taskflow/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js app directory (pages)
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── ...          # Feature components
│   ├── lib/             # Utilities and API client
│   ├── hooks/           # React hooks
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
│
└── backend/              # NestJS backend application
    ├── src/
    │   ├── modules/     # Feature modules
    │   │   ├── auth/    # Authentication module
    │   │   ├── projects/# Projects module
    │   │   ├── tasks/   # Tasks module
    │   │   ├── issues/  # Issues module
    │   │   ├── team-members/ # Team members module
    │   │   └── notifications/ # Notifications module
    │   ├── database/    # Database configuration
    │   └── main.ts      # Application entry point
    └── package.json     # Backend dependencies
```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password, role?, phone? }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ access_token, user }`

### Projects

- `GET /api/projects` - Get all projects (requires auth)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (Admin/Manager only)
  - Body: `{ name, description?, deadline? }`
- `PATCH /api/projects/:id` - Update project (Admin/Manager/Creator only)
  - Body: `{ name?, description?, deadline?, status? }`
- `DELETE /api/projects/:id` - Delete project (Admin/Manager/Creator only)

### Tasks

- `GET /api/tasks?projectId=:id` - Get all tasks (optionally filtered by project)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task (Admin/Manager only)
  - Body: `{ title, description?, projectId, assignedTo?, priority?, dueDate? }`
- `PATCH /api/tasks/:id` - Update task
  - Body: `{ title?, description?, assignedTo?, priority?, status?, dueDate? }`
  - Team Members can only update status of assigned tasks
- `DELETE /api/tasks/:id` - Delete task (Admin/Manager/Creator only)

### Team Members

- `GET /api/team-members?status=:status` - Get all team members
- `GET /api/team-members/:id` - Get team member by ID
- `POST /api/team-members` - Create team member
- `PATCH /api/team-members/:id/status` - Update team member status
- `DELETE /api/team-members/:id` - Delete team member

### Issues

- `GET /api/issues?taskId=:id` - Get all issues (optionally filtered by task)
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create new issue
  - Body: `{ title, description?, taskId, severity?, assignedTo? }`
- `PATCH /api/issues/:id/resolve` - Resolve issue
  - Body: `{ status }`
- `DELETE /api/issues/:id` - Delete issue

### Notifications

- `GET /api/notifications?unread=true` - Get notifications (optionally filter unread)
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `PATCH /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification

**Note:** All endpoints except `/api/auth/*` require JWT authentication via `Authorization: Bearer <token>` header.

## 🔐 Role-Based Access Control

The system implements three user roles with different permissions:

### Admin
- Full CRUD access to all resources
- Can create, update, and delete projects and tasks
- Can assign tasks to any team member

### Manager
- Full CRUD access to all resources
- Can create, update, and delete projects and tasks
- Can assign tasks to any team member

### Team Member
- **View-only** access to projects and tasks
- Can only **update status** of tasks assigned to them
- Cannot create, delete, or reassign tasks
- Cannot modify project details

## ⚙️ Environment Variables

### Backend (.env)

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=taskflow_db
DATABASE_USER=taskflow_user
DATABASE_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001

# Frontend URL (for CORS and WebSocket)
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🚢 Deployment

### Production Deployment

The application is deployed using:

- **Frontend**: [Vercel](https://vercel.com) - Next.js hosting
- **Backend**: [Render](https://render.com) - Node.js hosting
- **Database**: [Neon](https://neon.tech) - Managed PostgreSQL

### Live URLs

- **Frontend**: [Your Vercel URL]
- **Backend API**: [Your Render URL]/api

### Deployment Steps

1. **Database Setup (Neon)**
   - Create account at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy connection credentials

2. **Backend Deployment (Render)**
   - Create account at [render.com](https://render.com)
   - Connect GitHub repository
   - Set root directory to `backend`
   - Configure build command: `npm install && npm run build`
   - Configure start command: `npm run start:prod`
   - Add environment variables (database credentials, JWT secret, etc.)

3. **Frontend Deployment (Vercel)**
   - Create account at [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Set root directory to `frontend`
   - Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL

4. **Update CORS**
   - Update `FRONTEND_URL` in backend environment variables to your Vercel URL

## 🎨 Features in Detail

### Adjusting Work Schedules

The system provides comprehensive schedule adjustment capabilities:

1. **Task Schedule Adjustment:**
   - Edit any task to change its due date
   - Automatic notifications sent to assigned team members
   - Visual indicators show schedule changes

2. **Project Schedule Adjustment:**
   - Update project deadlines
   - All team members with tasks in the project are notified
   - Progress tracking automatically updates

3. **Real-time Notifications:**
   - WebSocket-based notifications for instant updates
   - Notification types: `task-assigned`, `schedule-updated`
   - Users receive notifications when schedules are adjusted

### Progress Tracking

- Automatic progress calculation based on completed tasks
- Visual progress indicators on project cards
- Real-time updates when task status changes

### Notifications System

- Real-time WebSocket notifications
- Notification types:
  - Task assignments
  - Schedule updates
  - Issue assignments
- Mark as read/unread functionality
- Notification history

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

## 📝 Development

### Running Migrations

```bash
cd backend
npm run migration:generate -- -n MigrationName
npm run migration:run
```

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
```

## 📸 Screenshots

_Add screenshots of your application here to showcase the UI and features._

## 🤝 Contributing

This is a challenge project, but contributions and improvements are welcome!

## 📄 License

MIT

## 👤 Author

**Hiwot Belay**

- Built for Vintage Technologies Internship Challenge

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Next.js team for the amazing React framework
- All open-source contributors whose packages made this possible
