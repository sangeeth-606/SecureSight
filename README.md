# SecureSight CCTV Dashboard

**SecureSight** is a web-based dashboard for viewing and managing security incidents captured by CCTV cameras. It features a real-time incident list, a video player for reviewing footage, and a timeline for navigating through past events.

## Features

-   **Incident List**: View a list of unresolved and resolved security incidents, including details like incident type, camera location, and time of occurrence.
-   **Incident Player**: Watch video footage of selected incidents directly in the dashboard.
-   **Incident Timeline**: Visualize the chronological order of all incidents and easily jump to specific events.
-   **Resolve Incidents**: Mark incidents as resolved to keep track of ongoing and past threats.

## Tech Stack

-   **Frontend**: Next.js, React, TypeScript, Tailwind CSS, TanStack Query
-   **Backend**: Node.js, Express, Prisma, Zod
-   **Database**: PostgreSQL (or any other database supported by Prisma)

## Deployment Instructions

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm
-   PostgreSQL

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/securesight.git
    cd securesight
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up PostgreSQL:**
    - Install PostgreSQL on your machine.
    - Create a database for SecureSight.

4.  **Set up environment variables:**

    Create a `.env` file in the `apps/server` directory and update the `DATABASE_URL` with your PostgreSQL connection string:

    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

5.  **Run database migrations:**

    ```bash
    pnpm --filter server prisma migrate dev
    ```

6.  **Seed the database with sample data:**

    ```bash
    pnpm --filter server prisma:seed
    ```

7.  **Start the development servers:**

    ```bash
    pnpm dev
    ```

    The web app will be available at `http://localhost:3000` and the server at `http://localhost:3002`.

## If I Had More Time...

-   **Real-time WebSocket updates**: Implement WebSockets to provide real-time updates for new incidents and status changes.
-   **Advanced filtering and search**: Add more advanced filtering and search capabilities to the incident list.
-   **Incident analytics dashboard**: Create a dashboard with charts and graphs to visualize incident data.
-   **Mobile app companion**: Develop a mobile app for viewing and managing incidents on the go.
-   **Multi-user authentication**: Add user authentication and authorization to control access to the dashboard.
-   **Advanced AI model integration**: Integrate more advanced AI models for improved incident detection and classification.
