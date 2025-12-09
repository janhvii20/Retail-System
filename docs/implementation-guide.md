# Implementation Guide

Quick setup and deployment commands for the Retail Sales Management System.

## Backend Setup

```bash
cd retail-sales-system/backend
npm install
touch .env
npm start
```

Add to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/retail-sales
PORT=5000
NODE_ENV=development
```

## Frontend Setup

```bash
cd retail-sales-system/frontend
npm install
npm run dev
```

Open http://localhost:5173

## Database Setup

**Local MongoDB:**
```bash
brew tap mongodb/brew && brew install mongodb-community
brew services start mongodb-community
mongosh
```

**MongoDB Atlas:**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster and database user
3. Whitelist IP in Network Access
4. Copy connection string to `.env`

## Data Import

```bash
cd retail-sales-system/backend
npm start  # Keep running

# In new terminal
node --max-old-space-size=4096 scripts/importCsv.js ./truestate_assignment_dataset.csv

# Verify
mongosh
use retail-sales
db.transactions.countDocuments()
```

## Running Application

**Terminal 1:**
```bash
cd retail-sales-system/backend
npm start
```

**Terminal 2:**
```bash
cd retail-sales-system/frontend
npm run dev
```

Access at http://localhost:5173

## Deployment

**Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/retail-sales-system.git
git push -u origin main
```

**Deploy Frontend (Vercel):**
1. Go to https://vercel.com
2. Connect GitHub repo
3. Set root directory to `frontend`
4. Deploy

