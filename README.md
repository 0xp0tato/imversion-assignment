# Imversion Assignment

Assignment for Imversion

## Table of Contents

- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker](#docker)
  - [Prisma](#prisma)
- [Running the Application](#running-the-application)
- [Design Choices](#design-choices)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

## Installation

### Backend

1. **Navigate to the Backend Directory**:

   ```bash
   cd path/to/backend

    Install Dependencies:

    npm install

    Set Up Environment Variables:
        Create a .env file in the backend directory.
        Add necessary environment variables, such as database connection strings, API keys, etc.
   ```

Frontend

    Navigate to the Frontend Directory:

cd path/to/frontend

Install Dependencies:

    npm install

    Set Up Environment Variables:
        Create a .env file in the frontend directory.
        Add necessary environment variables, such as API endpoints.

Docker

    Set Up Docker:
        Ensure Docker is installed on your machine.

    Docker Compose Configuration:
        The docker-compose.yml file is configured to set up a PostgreSQL database.

    Start Docker Containers:

docker-compose up -d

    This command will start the PostgreSQL container in detached mode.

Prisma

    Initialize Prisma:

npx prisma init

Configure Database Connection:

    Update the .env file with your database URL:

    DATABASE_URL="postgresql://admin:password@localhost:5432/mydb?schema=public"

Run Prisma Migrations:

npx prisma migrate dev --name init

Running the Application
Backend

    Start the Backend Server:

    npm start

        The backend server will start running on the port 3000.

Frontend

    Start the Frontend Development Server:

    npm start

        The frontend development server will start, and you can access the application in your web browser at http://localhost:5173.

Design Choices

    Technology Stack:
        Backend: Node.js with Express.js for handling API requests.
        Frontend: React for building the user interface.
        Database: PostgreSQL managed with Prisma ORM.
        Containerization: Docker for consistent environment setup.

    Error Handling:
        Implemented a centralized error-handling middleware to manage and respond to errors consistently.
        Custom error classes (InvalidInput, TransactionNotFound) are used to provide meaningful error messages.

    Filtering and Query Parameters:
        Utilized query parameters to filter data on the backend, allowing for flexible and dynamic data retrieval.

    State Management:
        Used React's useState and useEffect hooks for managing component-level state and side effects.

Known Limitations

    Error Details: Currently, detailed error messages are exposed to the client, which might not be ideal for production environments due to security concerns.
    Date Filtering: The date filtering logic assumes that the from and to dates are provided in a specific format. This could be improved by adding input validation.
    Scalability: The current implementation may not scale well with a large number of users or data. Considerations for caching, load balancing, and database optimization should be made for production use.

Future Improvements

    Input Validation: Enhance input validation on both the frontend and backend to ensure data integrity and improve user experience.
    Testing: Implement unit and integration tests to ensure the reliability and correctness of the application.
    Security: Improve security measures, such as input sanitization, rate limiting, and secure storage of sensitive data.
    Documentation: Expand documentation to include API endpoints, data models, and more detailed usage instructions.
    Performance Optimization: Optimize database queries and frontend performance to handle larger datasets and more complex interactions efficiently.
