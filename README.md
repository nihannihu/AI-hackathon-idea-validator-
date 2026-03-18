# Valid8: Setup Instructions

This repository contains the foundational environment setup for the Valid8 AI Hackathon Idea Validator project. 
The workspace is structured as a monorepo containing a React frontend and an Express Node.js backend.

## Structure
- `frontend/` - React application built with Vite
- `backend/` - Node.js Express server

## Initialization Commands Used
Here are the exact terminal commands used to initialize this workspace and configure the environments:

```bash
# 1. Create the base folders
mkdir frontend
mkdir backend

# 2. Initialize Git repository
git init

# 3. Setup Backend Environment (Node.js/Express)
cd backend
npm init -y
# Install necessary backend dependencies
npm install express cors dotenv
# Install dev dependencies
npm install --save-dev nodemon
cd ..

# 4. Setup Frontend Environment (React/Vite)
# Scaffold the Vite React project into the frontend directory
npx -y create-vite@latest frontend --template react
cd frontend
# Install standard dependencies
npm install
# Install necessary frontend starter dependencies
npm install axios react-router-dom lucide-react
cd ..

```

## Running the Application
To run the respective environments for development:

**Backend:**
```bash
cd backend
npm run dev # Make sure to add "dev": "nodemon index.js" to your package.json scripts!
```

**Frontend:**
```bash
cd frontend
npm run dev
```
