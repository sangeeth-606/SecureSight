# SecureSight CCTV Dashboard

SecureSight is a professional CCTV monitoring dashboard for detecting and managing security incidents across multiple camera feeds. This is a full-stack TypeScript application using modern web technologies.

## Deployment Instructions

To deploy this application, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/securesight.git
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up the database:**
   - Make sure you have Docker installed and running.
   - Run the following command to start a PostgreSQL database:
     ```sh
     docker-compose up -d
     ```

4. **Run database migrations:**
   ```sh
   pnpm --filter server prisma migrate dev
   ```

5. **Seed the database:**
   ```sh
   pnpm --filter server prisma:seed
   ```

6. **Start the development servers:**
   ```sh
   pnpm dev
   ```

## Tech Decisions

- **Monorepo:** We use Turborepo to manage our monorepo, which allows us to share code and configurations between our frontend and backend applications.
- **Frontend:** We use Next.js with the App Router for our frontend, which provides a modern and flexible framework for building React applications. We use Tailwind CSS for styling, which allows us to create a professional and responsive design.
- **Backend:** We use Express.js with TypeScript for our backend, which provides a robust and scalable framework for building APIs. We use Prisma as our ORM, which makes it easy to interact with our database.
- **Database:** We use PostgreSQL for our database, which is a powerful and reliable open-source relational database.
- **State Management:** We use React Query for managing our API state, which provides a simple and efficient way to fetch, cache, and update data.
- **Validation:** We use Zod for request validation, which helps us ensure that our API receives the correct data.

## If I Had More Time...

- **Real-time WebSocket updates:** We could use WebSockets to provide real-time updates to the dashboard, so that users can see new incidents as they happen.
- **Advanced filtering and search:** We could add more advanced filtering and search options to the dashboard, so that users can easily find the incidents they are looking for.
- **Incident analytics dashboard:** We could create an analytics dashboard to provide insights into the types of incidents that are occurring, the locations where they are most common, and other useful metrics.
- **Mobile app companion:** We could create a mobile app companion to allow users to monitor their cameras and receive notifications on the go.
- **Multi-user authentication:** We could add multi-user authentication to allow multiple users to access the dashboard with different levels of permissions.
- **Advanced AI model integration:** We could integrate an advanced AI model to automatically detect and classify incidents, which would reduce the need for manual intervention.