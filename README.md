TinyLink — Frontend (Next.js)

A clean, modern URL shortener frontend built with Next.js, TailwindCSS, and a fully functional backend API.

This app allows users to:
	•	Create short URLs (with optional custom codes)
	•	View all links in a dashboard
	•	Sort, filter/search
	•	Copy short URLs
	•	View statistics for each code
	•	Delete links
	•	Responsive layout with mobile-friendly cards

Getting Started 

Local Development:

Install dependencies:

npm install

Create .env.local:

NEXT_PUBLIC_API_BASE=http://localhost:4000
NEXT_PRIVATE_DEVTOOLS=0

Run the development server:

npm run dev

Open:

http://localhost:3000

Project Structure

pages/
  index.js        -> Dashboard
  code/[code].js  -> Stats page
  _app.js         -> Global wrapper
  _document.js    -> Document shell

components/
  Header.js
  Footer.js
  LinkForm.js
  LinksTable.js
  Spinner.js
  Toast.js

lib/api.js        -> API client
utils/validators.js
styles/globals.css

Required Backend (Already Implemented)

This frontend expects the backend to expose:

POST /api/links
GET  /api/links
GET  /api/links/:code
DELETE /api/links/:code
GET  /:code (302 redirect)
GET  /healthz

Backend base must match:

NEXT_PUBLIC_API_BASE

Features Implemented
	•	Responsive UI (desktop table + mobile cards)
	•	Sorting and filtering
	•	Inline validation
	•	Toast notifications
	•	Copy-to-clipboard
	•	minimal design
	•	Footer + global layout

Production:

npm run build
npm start

Deployment

Recommended: Vercel
	1.	Push to GitHub
	2.	Import repo in Vercel
	3.	Add environment variable:

NEXT_PUBLIC_API_BASE=https://your-backend-url.com

	4.	Deploy



