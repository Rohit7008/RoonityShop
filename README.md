# Neon Cart Frontend

A modern e-commerce frontend built with React, Vite, and TypeScript.

## Technologies Used
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion
- React Router
- Appwrite

## Prerequisites
- Node.js (v18 or higher)
- Vercel account
- Appwrite project setup

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_API_URL=your_api_url
```

## Local Development
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Deployment to Vercel
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Configure the following settings in Vercel:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add all environment variables from your `.env` file
5. Deploy!

## Build Process
The project uses Vite for building. The build process:
- Compiles TypeScript to JavaScript
- Optimizes assets
- Generates production-ready static files

## Additional Notes
- Make sure all environment variables are properly set in Vercel
- The `vercel.json` file is configured for client-side routing
- The build output is in the `dist` directory
