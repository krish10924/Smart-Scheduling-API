# Smart Scheduling API

A full-stack application that provides intelligent task scheduling based on dependencies, due dates, and estimated hours. The system uses a topological sorting algorithm to determine the optimal order for completing tasks while respecting dependencies and deadlines.

## 🚀 Features

- **Intelligent Task Scheduling**: Automatically determines the optimal order for task completion
- **Dependency Management**: Handles complex task dependencies with cycle detection
- **Due Date Optimization**: Prioritizes tasks based on deadlines
- **Interactive Web Interface**: User-friendly React frontend for task management
- **RESTful API**: Clean API endpoints for scheduling operations
- **Real-time Validation**: Prevents circular dependencies and validates task data
- **Task Management**: Add, update, and delete tasks with confirmation dialogs
- **Dynamic Dependency Updates**: Modify task dependencies in real-time
- **Persistent Storage**: Tasks are automatically saved to localStorage

## 🏗️ Architecture

The project consists of two main components:

### Backend (Flask API)

- **Framework**: Flask with CORS support
- **Algorithm**: Topological sorting with priority-based queue
- **Port**: 5000 (configurable via environment variable)

### Frontend (React Application)

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks with localStorage persistence
- **HTTP Client**: Axios for API communication

## 📋 Task Model

Each task contains the following properties:

```typescript
interface Task {
  title: string; // Unique task identifier
  estimatedHours: number; // Time estimation in hours
  dueDate: string; // Due date in YYYY-MM-DD format
  dependencies: string[]; // Array of task titles this task depends on
}
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.7+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd smart-scheduler-api/backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask server:

```bash
python server.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd smart-scheduler-api/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📡 API Endpoints

### POST `/api/v1/projects/<project_id>/schedule`

Schedules tasks for a specific project.

**Request Body:**

```json
{
  "tasks": [
    {
      "title": "Design Database Schema",
      "estimatedHours": 8,
      "dueDate": "2024-01-15",
      "dependencies": []
    },
    {
      "title": "Implement User Authentication",
      "estimatedHours": 12,
      "dueDate": "2024-01-20",
      "dependencies": ["Design Database Schema"]
    }
  ]
}
```

**Response:**

```json
{
  "projectId": "123",
  "recommendedOrder": [
    "Design Database Schema",
    "Implement User Authentication"
  ]
}
```

## 🧠 Scheduling Algorithm

The scheduling algorithm uses a modified topological sort with the following logic:

1. **Dependency Graph Construction**: Builds a directed graph from task dependencies
2. **Cycle Detection**: Identifies circular dependencies and returns an error
3. **Priority Queue**: Tasks are sorted by due date (earliest first) and then by estimated hours
4. **Topological Sort**: Processes tasks in dependency order while maintaining priority

### Algorithm Complexity

- **Time Complexity**: O(V + E) where V is the number of tasks and E is the number of dependencies
- **Space Complexity**: O(V + E) for the graph representation

## 🎯 Usage Examples

### Adding Tasks

1. Open the web interface
2. Fill in task details:
   - **Title**: Unique task name
   - **Estimated Hours**: Time required to complete
   - **Due Date**: When the task should be finished
   - **Dependencies**: Comma-separated list of prerequisite tasks
3. Click "Add Task" to add to your task list

### Managing Tasks

- **Delete Tasks**: Click the delete button next to any task (with confirmation dialog)
- **Update Dependencies**: Use the dependency checkboxes to add/remove task dependencies
- **Persistent Storage**: All changes are automatically saved to localStorage

### Generating Schedule

1. Add all your tasks with their dependencies
2. Click "Generate Schedule" to get the recommended order
3. Follow the recommended order to complete tasks efficiently

### Example Task Dependencies

```
Task A: "Setup Development Environment" (no dependencies)
Task B: "Design Database Schema" (depends on: Task A)
Task C: "Implement API Endpoints" (depends on: Task B)
Task D: "Write Unit Tests" (depends on: Task C)
```

## 🚀 Deployment

### Live Application

- **Frontend**: [https://smart-scheduling-api.vercel.app/](https://smart-scheduling-api.vercel.app/)
- **Backend API**: [https://smart-scheduling-api-2.onrender.com](https://smart-scheduling-api-2.onrender.com)

### Backend Deployment

The Flask application is configured to run on any port specified by the `PORT` environment variable (defaults to 5000).

### Frontend Deployment

Build the production version:

```bash
npm run build
```

The built files will be in the `build/` directory, ready for deployment to any static hosting service.

## 🧪 Testing

### Backend Testing

Test the API endpoints using tools like Postman or curl:

**Local Testing:**

```bash
curl -X POST http://localhost:5000/api/v1/projects/123/schedule \
  -H "Content-Type: application/json" \
  -d '{"tasks": [{"title": "Task 1", "estimatedHours": 5, "dueDate": "2024-01-15", "dependencies": []}]}'
```

**Live API Testing:**

```bash
curl -X POST https://smart-scheduling-api-2.onrender.com/api/v1/projects/123/schedule \
  -H "Content-Type: application/json" \
  -d '{"tasks": [{"title": "Task 1", "estimatedHours": 5, "dueDate": "2024-01-15", "dependencies": []}]}'
```

### API Configuration

The frontend is configured to connect to the deployed API at [https://smart-scheduling-api-2.onrender.com](https://smart-scheduling-api-2.onrender.com). To use a local backend, update the API URL in the frontend code.

## 📝 Dependencies

### Backend Dependencies

- Flask 2.2.5
- Flask-CORS 4.0.1
- Flask-SQLAlchemy 3.1.1
- requests 2.32.3
- SQLAlchemy 2.0.31

### Frontend Dependencies

- React 18.2.0
- TypeScript 4.9.5
- Tailwind CSS 3.4.18
- Axios 1.12.2

## 📄 License

This project is part of the Appsian Coding Assignment.

## 🐛 Known Issues

- Circular dependencies are detected but not handled gracefully in the UI
- Task deletion doesn't automatically update dependent tasks' dependency lists
