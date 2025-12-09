# Retail Sales Management System

A full-stack application for managing and analyzing retail sales transactions with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React 18, Vite, Axios
- **Database**: MongoDB

## Search Implementation

Full-text search across customer names and phone numbers using MongoDB text indexes. Search is case-insensitive and works seamlessly with active filters and sorting. Implemented via `$text` operator with indexed fields.

## Filter Implementation

Multi-select filtering with independent and combinable filters:
- Customer Region, Gender, Age Range
- Product Category, Tags
- Payment Method, Date Range

Filters use MongoDB `$in` operators for multi-select and range operators for numeric/date ranges. All filters work together without conflicts.

## Sorting Implementation

Three sorting options with ascending/descending order:
- Date (Newest/Oldest First)
- Quantity (High/Low to Low/High)
- Customer Name (A–Z / Z–A)

Sorting preserves active search and filters through query parameter passing.

## Pagination Implementation

10 items per page with next/previous navigation. Pagination state is maintained across search, filter, and sort changes. Returns total count and page metadata for UI rendering.

## Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/retail-sales" > .env
echo "PORT=5000" >> .env

# Start server
npm start
```

### Frontend Setup

```bash
cd frontend
npm install

# Start dev server (runs on http://localhost:3000)
npm run dev
```

### Import CSV Data

```bash
cd backend

# Place your CSV file in the project root or specify path
npm run import-csv -- /path/to/your/data.csv
```

CSV should have headers matching the schema fields. The import script handles data type conversion and validation.

## Project Structure

```
retail-sales-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── scripts/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── docs/
│   └── architecture.md
└── README.md
```

## API Endpoints

- `GET /api/transactions` - Get transactions with filters, sorting, pagination
- `GET /api/transactions/filter-options` - Get available filter options
- `GET /api/health` - Health check

## Features

✓ Full-text search (case-insensitive)
✓ Multi-select filtering
✓ Sorting with state preservation
✓ Pagination (10 items/page)
✓ Responsive UI matching Figma design
✓ CSV data import
✓ Clean, modular architecture
✓ Professional error handling
