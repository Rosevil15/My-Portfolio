# React + Node + Supabase Portfolio

This workspace is scaffolded as a React frontend with a Node backend and Supabase integration.

## Structure

- `server/` — Node + Express API server
- `client/.env.example` — frontend environment variables
- `server/.env.example` — backend environment variables

## Setup

1. Copy examples:
   - `copy client/.env.example client/.env`
   - `copy server/.env.example server/.env`
2. Fill in your Supabase values.
3. Install dependencies:
   - `npm install`

## Run

- Start the React app:
  - `npm run dev-client`
- Start the API server:
  - `npm run dev-server`

## Notes

- The React app proxies `/api` requests to `http://localhost:4000`.
- The backend uses Supabase service keys to insert contact form data into a `contacts` table.
- The frontend can also load optional project data from a `projects` table when Supabase is configured.
