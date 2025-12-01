# ToDoListReact

A full-stack To-Do List application built with React, Node.js/Express, PostgreSQL, and Docker. The application allows users to create, manage, and track their to-do items with a responsive design.

## Project Structure

```
ToDoListReact/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── index.css
│   ├── src/
│   │   ├── App.js
│   │   ├── service.js
│   │   └── index.js
│   ├── Dockerfile          # Docker configuration for client
│   ├── nginx.conf          # Nginx configuration for React
│   ├── .dockerignore
│   └── package.json
├── server/                 # Express.js backend API
│   ├── server.js
│   ├── Dockerfile          # Docker configuration for server
│   ├── .dockerignore
│   └── package.json
├── docker-compose.yml      # Docker Compose for local development
└── README.md
```

## Getting Started

### Prerequisites
- **For local development**: Node.js (v14+), npm
- **For Docker**: Docker and Docker Compose

### Installation & Running Locally

#### Option 1: Without Docker (Development)

1. Clone the repository
```bash
git clone https://github.com/talya21597/ToDoListReact.git
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

4. Set up environment variables

   **For Server** - Create `server/.env`:
   ```
   DATABASE_URL_=postgresql://user:password@localhost:5432/todolist
   PORT=5000
   ```

   **For Client** - Create `client/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

5. Start the server (Terminal 1)
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

6. Start the client (Terminal 2)
```bash
cd client
npm start
```
Client runs on `http://localhost:3000`

#### Option 2: With Docker (Recommended)

1. Clone the repository
```bash
git clone https://github.com/talya21597/ToDoListReact.git
cd ToDoListReact
```

2. Create `.env` file in root directory (for local Docker Compose):
```bash
DATABASE_URL_=postgresql://postgres:postgres@postgres:5432/todolist
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=todolist
REACT_APP_API_URL=http://localhost:5000
```

3. Build and run with Docker Compose
```bash
docker-compose up --build
```

This will start:
- **Server**: `http://localhost:5000`
- **Client**: `http://localhost:80`
- **PostgreSQL**: `localhost:5432`

4. To stop all containers:
```bash
docker-compose down
```

## Features

- ✅ Create, read, update, and delete to-do items
- ✅ Mark items as complete/incomplete
- ✅ Persistent data storage with PostgreSQL
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Real-time sync between client and server
- ✅ RESTful API endpoints
- ✅ Docker containerization for easy deployment

## Tech Stack

- **Frontend**: React 18.2.0, Axios, CSS3 (responsive design)
- **Backend**: Node.js, Express.js 4.18.2, CORS
- **Database**: PostgreSQL (Render Cloud)
- **Containerization**: Docker & Docker Compose
- **Deployment**: Render (client + server + database)
- **Version Control**: GitHub

## API Endpoints

The server provides the following REST API endpoints:

- `GET /items` - Retrieve all to-do items
- `POST /items` - Create a new to-do item
  - Body: `{ name: string, iscomplete: boolean }`
- `PUT /items/:id` - Update a to-do item's completion status
  - Body: `{ iscomplete: boolean }`
- `DELETE /items/:id` - Delete a to-do item

## Environment Variables

### Server

**For local development** (`server/.env`):
```
DATABASE_URL_=postgresql://user:password@localhost:5432/todolist
PORT=5000
```

**For Render deployment** (set in Render Dashboard):
```
DATABASE_URL_=<your-render-postgres-connection-string>
PORT=5000
```

### Client

**For local development** (`client/.env`):
```
REACT_APP_API_URL=http://localhost:5000
```

**For Render deployment** (set in Render Dashboard):
```
REACT_APP_API_URL=https://your-server-url.onrender.com
```

**Important**: Environment variables starting with `REACT_APP_` are embedded in the build. Any changes require a rebuild/redeploy.

## Deployment on Render

### 1. Deploy Server (Web Service)
- Connect GitHub repository
- Runtime: Node.js
- Build command: `npm install` (in server folder)
- Start command: `node server.js`
- Environment variables: `DATABASE_URL_`

### 2. Deploy Client (Static Site)
- Connect GitHub repository
- Build command: `npm install && npm run build` (in client folder)
- Publish directory: `client/build`
- Environment variables: `REACT_APP_API_URL=<server-url>`

### 3. Database (PostgreSQL on Render)
- Create PostgreSQL instance
- Get connection string
- Add to server's environment variables

## Live Deployment

- **Client**: https://todolistreactclient-edde.onrender.com
- **Server API**: https://todolistreactserver3.onrender.com

## Database Schema

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  iscomplete BOOLEAN DEFAULT FALSE
);
```

## Development Notes

- The application uses **PostgreSQL** for persistent data storage instead of in-memory storage
- Field naming convention: `iscomplete` (lowercase) throughout the stack
- Docker multi-stage build reduces client image size significantly
- Environment variables are required for deployment; they are baked into the build during deployment

## Testing the Application

1. Add a new to-do by typing and clicking "Add"
2. Check the item off by clicking the checkbox
3. Delete items by clicking the delete button
4. Verify data persists by refreshing the page
5. Check Network tab in DevTools to see API calls

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL_` environment variable is set correctly
- Ensure the database server is running and accessible

### API Not Responding
- Check that server is running on port 5000
- Verify `REACT_APP_API_URL` points to the correct server address
- Check browser console for CORS errors

### Docker Issues
- Run `docker-compose down` then `docker-compose up --build` to rebuild
- Check logs: `docker-compose logs -f`

## Author

**Talya** - GitHub: [@talya21597](https://github.com/talya21597)

## License

This project is open source and available for educational purposes.
