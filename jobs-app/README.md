# Jobs App by Asylbek

## Tech Stack

- **Frontend:** ReactJS, MUI v5, Formik, Yup, Redux Toolkit, Axios
- **Backend:** Node.js, Express, MongoDB, JWT
- **Validation:** Yup
- **Data Grid:** MUI DataGrid
- **API:** REST API

## Running the App

1. Clone the repository:

   ```bash
   git clone <repo_url>
   ```

2. Install backend dependencies

```
npm install
```

3. Install frontend dependencies:

```cd ../client
npm install
```

4. Configure Environment Variables: Create a .env file in the backend (root) directory with the following:

```
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start MongoDB: Ensure MongoDB is running locally. If not, start it with:

```mongod

```

6. Run the Backend: In the backend directory (root):

```
npm start
```

7. Run the Frontend: In the client directory:

```
npm run dev
```

8. Testing
   8.1 Unit and Integration Tests (Jest and React Testing Library)
   Navigate to the Frontend Directory and Run Tests:

```
cd client
npm test
```

8.2.1 End-to-End (E2E) Tests with Cypress
Ensure Backend and Frontend are Running. Open Cypress Test Runner: In the client directory:

```
npx cypress open
```

This will launch the Cypress interface where you can run your E2E tests interactively.

8.2.2 Run Cypress Tests in Headless Mode: For automated testing:

```
npx cypress run
```

8.3 Running Tests with Docker:

Build and Start Services: From the root directory:

```
docker-compose up --build
```

Run Cypress Tests: You can run Cypress tests separately or integrate them into your Docker setup as described in the Docker section above.

9. Docker:
   9.1 Building and Running with Docker Compose
   Ensure Docker is Installed and Running. Build and Start Services: From the root directory:

```
docker-compose up --build
```

This will start MongoDB, the backend server on port 5000, and the frontend on port 3000.

9.2 Accessing the Application
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api

9.3 Stopping the Services
Press Ctrl+C in the terminal where Docker Compose is running, then remove the containers if desired:

```
docker-compose down
```
