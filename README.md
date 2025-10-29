# Todo App

A simple todo application built with Next.js, tRPC, Drizzle ORM, and PostgreSQL.

## Tech Stack

- **Next.js 16** - React framework
- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL** - Database
- **React Query** - Server state management
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up your database:

Create a `.env` file in the root directory with your database connection string:

```bash
# For local development
DATABASE_URL=postgresql://username:password@localhost:5432/todoapp

# For AWS RDS
DATABASE_URL=postgresql://username:password@nextjs-db.cz2q0q860axg.eu-west-1.rds.amazonaws.com:5432/todoapp
```

**Note:** Replace `username` and `password` with your actual RDS credentials.

3. Create the database:

```bash
pnpm db:create
```

This will automatically create the `todoapp` database on your RDS instance.

4. Generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

This creates the todos table in your database.

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
/src
  /api
    /access-patterns
      /todo         # Todo entity access patterns
        schema.ts   # Database schema and Zod validation
        types.ts    # TypeScript types
        gets.ts     # Read operations
        mutations.ts# Write operations
    /routers        # tRPC routers
      todo.ts       # Todo router
      _app.ts       # Root app router
  /db              # Database connection and schema
  /server          # tRPC initialization
  /utils           # Utility functions
/app
  /api/trpc        # tRPC API route handler
  page.tsx         # Main UI
  layout.tsx       # Root layout
  providers.tsx    # React Query and tRPC providers
```

## Features

- Add new todos
- Toggle todo completion status
- Delete todos
- Clean, responsive UI with dark mode support

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
