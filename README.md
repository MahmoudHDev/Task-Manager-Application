# Task-Manager-Application

## Description:
A task manager application where users can register, log in, create tasks, update tasks, delete tasks, and mark tasks as completed. The application will have a RESTful API for handling CRUD operations on tasks, and the front end will interact with this API to provide a user-friendly interface.

## Technologies Used:

    Front End:
        React.js
        React Router for client-side routing
        Axios for making HTTP requests to the API
        Material-UI for UI components and styling

    Back End:
        Node.js
        Express.js for building the RESTful API
        MongoDB as the database using Mongoose ORM for interacting with MongoDB
        JSON Web Tokens (JWT) for user authentication and authorization
        bcrypt.js for hashing passwords

## Features:

    User Authentication:
        User registration with email and password
        User login with email and password
        JSON Web Token-based authentication
        Password hashing for security

    Task Management:
        Create a new task
        Update an existing task
        Delete a task
        Mark a task as completed
        Fetch all tasks for a specific user
        Pagination and sorting of tasks

    User Interface:
        Responsive UI using Material-UI components
        User-friendly forms for task creation and updating
        Error handling for API requests
        Loading spinners for asynchronous actions

    RESTful API:
        Endpoints for user registration, login, and authentication
        Endpoints for CRUD operations on tasks
        JWT-based authentication middleware for protected routes