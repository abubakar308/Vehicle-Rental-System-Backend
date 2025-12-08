🚗 Vehicle Rental System – Backend

Live URL: https://vehicle-rental-system-lovat.vercel.app/

Repository: https://github.com/abubakar308/Vehicle-Rental-System-Backend

A role-based secure backend system for a vehicle rental platform built with Node.js, Express.js, PostgreSQL, JWT Authentication, and Modular Architecture.

✨ Features
🔐 Authentication & Authorization

User Registration & Login

Password hashing using bcryptjs

JWT-based Authentication

Role-based Access Control (Admin & Customer)

👤 Users Module

Admin:

Get all users

Update any user (role & profile)

Delete user

Customer:

Get own profile

Update own profile

🚗 Vehicles Module

Admin:

Add vehicle

Update vehicle

Delete vehicle

Get all vehicles

Customer:

Get all vehicles

Get single vehicle

📒 Bookings Module

Admin & Customer:

Create booking

Update booking

Get own bookings

Admin only:

Get all bookings

Booking:

Auto calculates total days

Calculates total price

Returns embedded vehicle data

Updates vehicle status after booking

🛠️ Technology Stack
Backend

Node.js

Express.js

TypeScript

JWT

bcryptjs

PostgreSQL

pg driver

Architecture

Fully modular folder structure

Service → Controller → Router pattern

Middleware for Auth & Role Checking

Environment variable based configuration

Vercel Serverless Deployment

📁 Project Structure
src
├── config
├── middleware
├── modules
│   ├── auth
│   ├── users
│   ├── vehicles
│   └── bookings
├── types
│   └── express
app.ts
server.ts

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/abubakar308/Vehicle-Rental-System-Backend.git
cd Vehicle-Rental-System-Backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
CONNECTION_STR=postgresql://your_connection_url
PORT=5000
JWT_SECRET=your-secret-key


(Your provided neonDB URL can be added here)

🏃 Run the project
Development mode
npm run dev

Build TypeScript
npm run build

Run compiled JS
npm start

🚀 Deployment (Vercel)

Install vercel globally

npm i -g vercel


Deploy

vercel --prod

📌 API Summary
Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

Users

GET /api/v1/users (Admin)

GET /api/v1/users/me (Customer/Admin)

PUT /api/v1/users/:userId (Admin or Own)

DELETE /api/v1/users/:userId (Admin)

Vehicles

POST /api/v1/vehicles (Admin)

GET /api/v1/vehicles

GET /api/v1/vehicles/:vehicleId

PUT /api/v1/vehicles/:vehicleId (Admin)

DELETE /api/v1/vehicles/:vehicleId (Admin)

Bookings

POST /api/v1/bookings

GET /api/v1/bookings (Admin sees all, customer sees own)

PUT /api/v1/bookings/:id