# React Dashboard with Authentication

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env.local` file in the root directory with the following:
    ```env
    DATABASE_URL="postgres://user:password@hostname/dbname?sslmode=require"
    SESSION_SECRET="your-random-secret-key"
    ```
    *Get your `DATABASE_URL` from the Neon Console.*

3.  **Database Setup**:
    Run the migration script to create the necessary tables:
    ```bash
    npm run migrate
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Deployment on Vercel

1.  Push this code to GitHub.
2.  Import the project into Vercel.
3.  Add the `DATABASE_URL` and `SESSION_SECRET` environment variables in Vercel Project Settings.
4.  Deploy!

## Features

-   **Authentication**: Sign Up, Login, Logout (Secure Cookies).
-   **Role-Based Access**: Admin and User roles.
-   **Admin Dashboard**: Approve new users, view user list.
-   **User Dashboard**: Welcome screen.
-   **Security**: Password hashing (bcrypt), Session management (jose).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanky9876%2Fwebzz-dashboard)
