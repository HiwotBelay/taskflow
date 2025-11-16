# TaskFlow - Task Management System

A comprehensive full-stack task management system built with NestJS, React, and PostgreSQL. This project demonstrates modern web development practices with real-time features, robust authentication, and an intuitive user interface.

## 🎯 Features

### Core Features

- ✅ **Adding Projects** - Create and manage multiple projects with descriptions and deadlines
- ✅ **Tracking Task/Project Progress** - Real-time progress tracking with visual indicators
- ✅ **Delegating Work to Team Members** - Assign tasks to team members with role-based access
- ✅ **Setting Deadlines** - Set deadlines for both projects and individual tasks
- ✅ **Tracking Issues** - Report and track issues related to tasks
- ✅ **Adjusting Work Schedules** - Reschedule tasks and projects with automatic notifications
- ✅ **Real-time Notifications** - WebSocket-based notifications for task assignments and schedule changes

### Additional Features

- 🔐 JWT-based authentication and authorization
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

- NestJS
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
git clone <repository-url>
cd Vintage
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

# Create .env file with the following variables:
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=taskflow_db
# DATABASE_USER=taskflow_user
# DATABASE_PASSWORD=password
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# JWT_EXPIRES_IN=7d
# PORT=3001
# FRONTEND_URL=http://localhost:3000

npm run start:dev
```

The backend will run on `http://localhost:3001`

### 4. Frontend Setup

```bash
# Open a NEW terminal window
cd frontend
npm install

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

npm run dev
```

The frontend will run on `http://localhost:3000`

### 5. First Login

1. Register a new account at `http://localhost:3000/register`
2. Or login at `http://localhost:3000/login`
3. Start creating projects and tasks!

## 📁 Project Structure

```
Vintage/
├── frontend/         # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utilities and API client
│   ├── hooks/        # React hooks
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
└── backend/          # NestJS backend application
    ├── src/
    │   ├── modules/  # Feature modules (auth, projects, tasks, etc.)
    │   ├── database/ # Database configuration
    │   └── main.ts   # Entry point
    └── package.json  # Backend dependencies
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
- `POST /api/projects` - Create new project
  - Body: `{ name, description?, deadline? }`
- `PATCH /api/projects/:id` - Update project (supports schedule adjustment)
  - Body: `{ name?, description?, deadline?, status? }`
- `DELETE /api/projects/:id` - Delete project

### Tasks

- `GET /api/tasks?projectId=:id` - Get all tasks (optionally filtered by project)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
  - Body: `{ title, description?, projectId, assignedTo?, priority?, dueDate? }`
- `PATCH /api/tasks/:id` - Update task (supports schedule adjustment)
  - Body: `{ title?, description?, assignedTo?, priority?, status?, dueDate? }`
- `DELETE /api/tasks/:id` - Delete task

### Team Members

- `GET /api/team-members?status=:status` - Get all team members
- `GET /api/team-members/:id` - Get team member by ID
- `POST /api/team-members` - Create team member
  - Body: `{ name, email, password, role, phone?, status? }`
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

## 📸 Screenshots

_Add screenshots of your application here to showcase the UI and features._

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

The project uses ESLint and Prettier for code formatting. Run:

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
npm run lint
```

## 🚢 Deployment

This guide covers deploying the full-stack application to production.

### Architecture Overview

- **Frontend**: Deploy to Vercel (Next.js)
- **Backend**: Deploy to Railway, Render, or Fly.io (NestJS)
- **Database**: Use managed PostgreSQL (Supabase, Neon, Railway, or Render)

### Step 1: Deploy Database (PostgreSQL)

Choose one of these managed PostgreSQL services:

#### Option A: Supabase (Recommended - Free tier available)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (it looks like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)

#### Option B: Neon (Recommended - Free tier available)

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from the dashboard

#### Option C: Railway

1. Go to [railway.app](https://railway.app) and create an account
2. Create a new project → Add PostgreSQL
3. Copy the connection string from the Variables tab

### Step 2: Deploy Backend

#### Using Railway (Recommended)

1. **Create Railway Account**

   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder as the root directory

3. **Set Environment Variables**
   In Railway dashboard, add these variables:

   ```env
   DATABASE_HOST=your-db-host
   DATABASE_PORT=5432
   DATABASE_NAME=your-db-name
   DATABASE_USER=your-db-user
   DATABASE_PASSWORD=your-db-password
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   JWT_EXPIRES_IN=7d
   PORT=3001
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Railway will automatically detect it's a Node.js project
   - It will run `npm install` and `npm run build`
   - Add a start command: `npm run start:prod`
   - Railway will provide a URL like: `https://your-backend.up.railway.app`

#### Using Render

1. Go to [render.com](https://render.com) and create an account
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
5. Add all environment variables (same as Railway)
6. Deploy

### Step 3: Deploy Frontend (Vercel)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `.next` (auto-detected)

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:

   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```

   (Replace with your actual backend URL)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like: `https://your-app.vercel.app`

### Step 4: Update CORS Settings

After deploying, update your backend's `FRONTEND_URL` environment variable to your Vercel URL:

```env
FRONTEND_URL=https://your-app.vercel.app
```

Also update `backend/src/main.ts` CORS settings if needed to include your production URL.

### Step 5: Run Database Migrations

After deployment, run migrations to create tables:

```bash
# Option 1: SSH into your backend server and run:
cd backend
npm run migration:run

# Option 2: Use Railway/Render console
# Or add a migration script to run on deploy
```

### Environment Variables Summary

#### Backend (Railway/Render)

```env
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
```

#### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Testing Production Deployment

1. Visit your Vercel URL
2. Register a new account
3. Test all features:
   - Create projects
   - Create tasks
   - Assign tasks
   - Test notifications
   - Test role-based permissions

### Troubleshooting

**Backend won't connect to database:**

- Check database connection string
- Ensure database allows connections from your backend host
- Verify all database credentials are correct

**CORS errors:**

- Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that CORS settings in `main.ts` include your production URL

**WebSocket not working:**

- Ensure WebSocket connections are allowed on your backend host
- Check that `FRONTEND_URL` is set correctly for WebSocket CORS

### Free Tier Services Summary

- **Vercel**: Free for personal projects
- **Railway**: $5/month free credit (usually enough for small projects)
- **Render**: Free tier available (with limitations)
- **Supabase**: Free tier with 500MB database
- **Neon**: Free tier with 3GB database

### Alternative: Local Development Setup

If the company wants to run it locally instead of deploying:

1. They need PostgreSQL installed or Docker
2. Follow the "Quick Start" section above
3. All instructions work the same way

## 🤝 Contributing

This is a challenge project, but contributions and improvements are welcome!

## 📄 License

MIT

## 👤 Author

**Hiwot**

- Built for Vintage Technologies Internship Challenge

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Next.js team for the amazing React framework
- All open-source contributors whose packages made this possible
