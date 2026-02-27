# PrimeTrade Assignment – Backend Developer (Intern)

A full-stack task management system with authentication, role-based access control, and Docker deployment.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Role-Based Access Control (USER / ADMIN)

### Frontend
- React (Vite)
- Fetch API
- Basic Dark UI

### DevOps
- Docker
- Docker Compose

## Postman Collection

Import the file located at:

postman/collections/primetrade.postman_collection.json

---

## 📦 Features

### Authentication
- Register user
- Login user (JWT-based)
- Password hashing (bcrypt)
- Protected routes

### Tasks
- Create task
- Get tasks
- Update task
- Delete task

### Role-Based Access
- USER → Can manage own tasks only
- ADMIN → Can view all users' tasks

## Role Management

Users are created with the default role `USER`.

To assign admin privileges, update the user’s role in the database to `ADMIN`.

This can be done using:
- Prisma Studio (development)
- Direct database update
- Future: Dedicated admin role management API
---

## 🐳 Docker Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd primetrade-assignment
2️⃣ Run with Docker
docker compose up --build
3️⃣ Services
Service	URL
Frontend	http://localhost:5173

Backend	http://localhost:5000

Prisma Studio	http://localhost:5555

PostgreSQL	localhost:5432
🔐 Environment Variables

Backend .env:

DATABASE_URL=postgresql://postgres:postgres@db:5432/primetrade
JWT_SECRET=supersecret
PORT=5000
📬 API Endpoints
Auth

POST /api/v1/auth/register

{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

POST /api/v1/auth/login

{
  "email": "john@example.com",
  "password": "123456"
}
Tasks (JWT Required)

GET /api/v1/tasks

POST /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

👑 Admin Access

Admin users can:

View all tasks

See task owner details (name, email)

To promote a user to admin:

Open Prisma Studio

Change role from USER → ADMIN

📊 Scalability Note

This application follows modular architecture separating controllers, services, and middleware.

For scaling:

Stateless JWT allows horizontal scaling.

PostgreSQL can be scaled using read replicas.

Redis can be introduced for caching frequently accessed data.

Docker enables container orchestration in Kubernetes.

Load balancing (NGINX) can distribute traffic across multiple backend instances.

This structure allows easy transition to microservices if needed.

🧪 Development Mode (Without Docker)

Backend:

cd backend
npm install
npm run dev

Frontend:

cd frontend
npm install
npm run dev
📌 Author

Omprakash Gadge


---

# 📬 2️⃣ Postman Collection

Open Postman → Create Collection → Add these requests:

---

### 1. Register

POST  
`http://localhost:5000/api/v1/auth/register`

Body (JSON):

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
2. Login

POST
http://localhost:5000/api/v1/auth/login

3. Get Tasks

GET
http://localhost:5000/api/v1/tasks

Header:

Authorization: Bearer <your-token>
4. Create Task

POST
http://localhost:5000/api/v1/tasks

5. Update Task

PUT
http://localhost:5000/api/v1/tasks/:id

6. Delete Task

DELETE
http://localhost:5000/api/v1/tasks/:id
