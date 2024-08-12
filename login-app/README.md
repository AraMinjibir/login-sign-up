## User Management Application
 # Overview

This Angular-based single-page application (SPA) provides user authentication and task management functionalities, integrated with Firebase Authentication and Firebase Realtime Database.

# Key Features
User Authentication: Sign up, log in, and maintain sessions with Firebase.
Task Management: Create, view, and delete tasks on a protected dashboard.
Responsive Design: Ensures a seamless experience across devices.
Component Structure
AppComponent: Bootstraps the app and handles session management.
HeaderComponent: Displays navigation links based on user authentication status.
DashboardComponent: Protected component for task management, accessible only to logged-in users.
LoginComponent: Manages user authentication with forms and error handling.
LogoutComponent: Handles user logout and session clearing.
Services
AuthService: Manages authentication and session persistence.
TaskServiceService: Handles CRUD operations for tasks with Firebase.
Firebase Integration
Authentication: Manages user sign-up, login, and session handling.
Realtime Database: Stores and manages user tasks.

# Hosting URL: https://login-signup-36373.web.app