# Deployment Instructions

## Railway Deployment (Backend + Database)

1. Sign up for a Railway account at https://railway.app/

2. Create a new project:
   - Click "New Project"
   - Choose "Deploy from GitHub" or "Deploy from Template"
   - If using GitHub, connect your repository
   - If starting fresh, you can deploy the code directly

3. Add a MySQL database:
   - In your Railway project, click "+ New"
   - Select "Database"
   - Choose "MySQL"
   - Railway will automatically provision a MySQL database

4. Configure environment variables:
   - Go to your project settings
   - Add the following environment variables:
     ```
     SECRET_KEY=your_random_secret_key_here
     OPENCAGE_API_KEY=your_opencage_api_key_here
     RAZORPAY_KEY_ID=your_razorpay_key_id_here
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
     FRONTEND_URL=https://your-netlify-app.netlify.app
     ```

5. Get your database connection string:
   - Click on your MySQL database in the Railway dashboard
   - Go to the "Connect" tab
   - Copy the "ConnectionString" value
   - Add it as an environment variable in your backend service:
     ```
     DATABASE_URL=your_mysql_connection_string_here
     ```

6. Deploy:
   - Railway will automatically deploy your application
   - The database tables will be created automatically on first run

## Netlify Deployment (Frontend)

1. Sign up for a Netlify account at https://netlify.com/

2. Deploy your frontend:
   - Go to your Netlify dashboard
   - Click "New site from Git"
   - Connect to your GitHub repository
   - Select your repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. Configure environment variables:
   - Go to your site settings
   - Navigate to "Environment variables"
   - Add the following variables:
     ```
     VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app
     VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
     ```

4. Deploy:
   - Netlify will automatically deploy your frontend
   - Your site will be available at a .netlify.app URL

## Post-Deployment Steps

1. Update CORS settings:
   - Make sure your Railway backend has the Netlify frontend URL in its CORS origins

2. Test the deployment:
   - Visit your frontend URL
   - Try registering a new user
   - Test creating a waste listing or compost listing
   - Verify that the maps and location features work correctly

3. Set up custom domains (optional):
   - You can set up custom domains for both your backend (Railway) and frontend (Netlify)