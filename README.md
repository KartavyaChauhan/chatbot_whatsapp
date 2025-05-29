Travel Studio Internship Assignment - Guest Request Logging Workflow
This project implements a Guest Request Logging Workflow for Travel Studio, allowing guests to send requests via WhatsApp, processing them through an n8n workflow, storing them in a PostgreSQL database using a NestJS backend, and displaying them on a Next.js dashboard. The app works fine on localhost, but the Vercel deployment has an issue due to backend accessibility constraints.

Project Structure
backend/: NestJS app with /api/requests endpoints to save and fetch guest requests.
frontend/: Next.js app displaying pending requests in a dashboard.
workflow/: n8n workflow JSON (request-workflow.json) for processing WhatsApp requests.
README.md: Setup, testing, and deployment instructions.
Tech Stack
Backend: NestJS (TypeScript), PostgreSQL, Prisma
Frontend: Next.js (TypeScript), TanStack Query, Tailwind CSS
Workflow: n8n, Twilio WhatsApp Sandbox
Deployment: Vercel (frontend)
Setup Instructions
Prerequisites
Node.js 18.x
PostgreSQL (local or hosted, e.g., Neon/Supabase)
n8n (npm install -g n8n)
Twilio account (WhatsApp Sandbox)
Vercel account
ngrok (free tier)
Backend Setup
Navigate to the backend directory:
bash

Copy
cd backend
Install dependencies:
bash

Copy
npm install
Set up PostgreSQL and update the database URL in prisma/.env:
text

Copy
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
Run Prisma migrations:
bash

Copy
npx prisma migrate dev
Start the backend:
bash

Copy
npm run start:dev
The backend runs on http://localhost:3001.
Frontend Setup
Navigate to the frontend directory:
bash

Copy
cd frontend
Install dependencies:
bash

Copy
npm install
Start the frontend:
bash

Copy
npm run dev
The dashboard runs on http://localhost:3000 and fetches data from http://localhost:3001/api/requests.
n8n Workflow Setup
Start n8n:
bash

Copy
n8n start
n8n runs on http://localhost:5678.
Import the workflow:
Open http://localhost:5678 in your browser.
Import workflow/request-workflow.json.
Configure Twilio credentials in n8n (Account SID and Auth Token from Twilio Console).
WhatsApp Sandbox Setup
Sign up for the Twilio WhatsApp Sandbox at https://console.twilio.com.
Join the sandbox by sending join <sandbox-key> (e.g., join travel-studio) from your WhatsApp number (+917838803929) to +14155238886.
Set the Twilio webhook URL:
Expose n8n using ngrok:
bash

Copy
ngrok http 5678
Set the "A Message Comes In" webhook in Twilio to https://<ngrok-url>.ngrok-free.app/webhook-test/twilio-webhook (HTTP method: POST).
Testing Instructions
Local Testing
Ensure backend, frontend, and n8n are running locally.
Simulate a WhatsApp request using curl (due to ngrok limitation):
bash

Copy
curl -X POST http://localhost:5678/webhook-test/twilio-webhook \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "From=%2B917838803929&To=%2B14155238886&Body=need%20extra%20pillows"
Check backend logs to confirm the request was saved.
Open http://localhost:3000 to view the request on the dashboard.
Testing with Twilio
Expose n8n using ngrok (see WhatsApp Sandbox Setup).
Send a WhatsApp message (e.g., “need extra pillows”) to +14155238886.
Verify the n8n workflow processes the request and sends a reply.
Note: The backend must be publicly accessible for this to work end-to-end (e.g., deploy to Render).
Vercel Deployment
The frontend is deployed at https://chatbot-whatsapp-lasl.vercel.app.
Issue: It shows "Application error: a client-side exception has occurred" because the backend isn’t publicly accessible (ngrok free plan limits to one tunnel). The app works fine on localhost, as shown in the demo video.
To fix this, deploy the backend to a hosting service like Render and update NEXT_PUBLIC_API_URL in Vercel.
Challenges and Notes
Ngrok Limitation: I could only run one ngrok tunnel at a time, so I tested the backend locally while using ngrok for the Twilio webhook.
CORS: Fixed by adding app.enableCors() in NestJS.
TypeError: Resolved e.map is not a function by ensuring the frontend API always returns an array.
The demo video shows local functionality due to the Vercel deployment issue.
