# ToDoListReact

A full-stack To-Do List application built with React and Express.

## Project Structure

```
ToDoListReact/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Express backend
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/malbruk/ToDoListReact.git
cd ToDoListReact
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

### Running the Application

**Terminal 1 - Start the server:**
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start the client:**
```bash
cd client
npm start
```
Client will run on `http://localhost:3000`

## Features

- ✅ Add new to-do items
- ✅ Mark items as complete/incomplete
- ✅ Delete to-do items
- ✅ Real-time sync between client and server

## Tech Stack

- **Frontend**: React 18, Axios
- **Backend**: Express.js, CORS
- **Database**: In-memory (can be replaced with MongoDB, PostgreSQL, etc.)

## Deployment

This project is ready to be deployed to Render or similar platforms.

---

**Author**: malbruk
