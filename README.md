TinyLink Frontend
Next.js dashboard for creating and managing short links.

Features:
	•	Create short links with optional custom code
	•	Real-time search and sorting
	•	Copy short URLs
	•	Delete links with confirmation popup
	•	Statistics page for each code
	•	Health status UI at /healthz
	•	Responsive interface with mobile table view

Environment Variables:
NEXT_PUBLIC_API_BASE (backend URL)

Development:
	1.	Install dependencies
	2.	Create .env.local with NEXT_PUBLIC_API_BASE
	3.	Run development server on port 3000

Pages:
Dashboard: /
Stats: /code/[code]
Health UI: /healthz

Deployment:
	•	Use Vercel
	•	Set NEXT_PUBLIC_API_BASE in project settings

Notes:
	•	Requires backend to be running and accessible
	•	Uses toast notifications for success and errors
	•	Mobile-friendly with collapsible rows