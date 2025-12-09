# Retail Sales Backend

Express.js API for the Retail Sales Management System.

## Setup

```bash
npm install
```

## Environment Variables

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/retail-sales
PORT=5000
```

## Running

```bash
npm start          # Production
npm run dev        # Development with nodemon
```

## Importing CSV Data

```bash
npm run import-csv -- /path/to/your/data.csv
```

## API Endpoints

- `GET /api/transactions` - Get transactions with filters, sorting, pagination
- `GET /api/transactions/filter-options` - Get available filter options
- `GET /api/health` - Health check
