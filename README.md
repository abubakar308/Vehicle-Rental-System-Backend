# 🚗 Vehicle Rental System – Backend

### Live URL: https://vehicle-rental-system-lovat.vercel.app/


* A role-based secure backend system for a vehicle rental platform built with Node.js, Express.js, PostgreSQL, JWT Authentication, and Modular Architecture.


## Architecture

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

## ✨ Features
 ### 🔐 Authentication & Authorization

* User Registration & Login

* Password hashing using bcryptjs

* JWT-based Authentication

* Role-based Access Control (Admin & Customer)

### 👤 Users Table

* Admin: Get all users, Update any user (role & profile), Delete user

* Customer: Get own profile, Update own profile

### 🚗 Vehicles Table

* Admin: Add vehicle, Update vehicle, Delete vehicle, Get all vehicles

* Customer: Get all vehicles, Get single vehicle

### 📒 Bookings Table

* Admin & Customer: Create booking,  Update booking, Get own bookings

Admin only: Get all bookings,

* Booking: Auto calculates total days, Calculates total price, Returns vehicle data, Updates vehicle status after booking


## 🛠️ Technology Stack

**Server:** Node, Express,TypeScript, JWT, bcryptjs
, PostgreSQL, pg driver
## Setup & Usage Instructions


### 📥 1. Clone the Repository
```sh
git clone https://github.com/abubakar308/Vehicle-Rental-System-Backend.git
cd Vehicle-Rental-System-Backend 
```

### 🖥 2. Install Dependencies
```sh
npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

#### Create .env file
CONNECTION_STR=postgresql://connection_url
PORT=5000
JWT_SECRET=secret-key

🏃 Run the project
Development mode
npm run dev

#### Run the Backend:
```sh
npm run dev
```

---