TinyLink Frontend

Next.js dashboard for creating and managing short links.

Live URLs

Frontend:
https://tinylink-frontend-obsi.onrender.com/

Backend API:
https://tinylink-backend-3npn.onrender.com/

Project Walkthrough Video:
https://drive.google.com/file/d/11ozxmhKRHIhFNqhPb8ZfNkIUrDFs7EYb/view?usp=sharing

Overview

This frontend provides a simple dashboard similar to Bitly, allowing users to generate short URLs, view click statistics, filter and sort links, and manage them through a clean, responsive interface. It connects to the TinyLink backend (Node.js + Express + Postgres).

Features
	•	Create short links with optional custom short codes
	•	Real-time search and filtering
	•	Sorting by code, short URL, target URL, clicks, and timestamps
	•	Copy short URLs to clipboard
	•	Delete links with confirmation modal
	•	Dedicated statistics page for each short code
	•	Lightweight health page at /healthz
	•	Responsive UI with mobile-friendly collapsible view
	•	Toast notifications for success and errors

Environment Variables

The frontend requires:

NEXT_PUBLIC_API_BASE = <backend URL>

For local development, add this in .env.local.

Development
1.	Install dependencies:

npm install
2.	Create a .env.local file:
NEXT_PUBLIC_API_BASE=http://localhost:4000

3.	Start the development server:
npm run dev
The app runs at http://localhost:3000.

Pages
	•	Dashboard: /
	•	Statistics: /code/[code]
	•	Health UI: /healthz

Deployment

Deploy to Vercel/Render/Netlify.

Set:
NEXT_PUBLIC_API_BASE=<deployed backend URL>

Notes
	•	Backend must be running for the dashboard to load data.
	•	Includes form validation, toast notifications, and smooth UI states.
	•	Mobile layout includes collapsible rows for small screens.