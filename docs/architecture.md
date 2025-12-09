# Architecture Documentation

## System Overview

Retail Sales Management System is a full-stack application for managing and analyzing retail sales transactions with advanced search, filtering, sorting, and pagination capabilities.

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: JavaScript (ES6+)

### Folder Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── transactionController.js    # Request handlers
│   ├── services/
│   │   └── transactionService.js       # Business logic
│   ├── models/
│   │   └── Transaction.js              # MongoDB schema
│   ├── routes/
│   │   └── transactions.js             # API routes
│   └── index.js                        # Entry point
├── scripts/
│   └── importCsv.js                    # CSV import utility
└── package.json
```

### Module Responsibilities

**transactionController.js**
- Handles HTTP requests and responses
- Parses query parameters
- Delegates to service layer

**transactionService.js**
- Implements core business logic
- Builds MongoDB queries from filters
- Handles sorting and pagination
- Manages data transformations

**Transaction.js (Model)**
- Defines MongoDB schema
- Creates text indexes for search
- Enforces data validation

**transactions.js (Routes)**
- Maps HTTP endpoints to controllers
- Defines API contract

### Data Flow

1. Frontend sends HTTP request with filters, search, sort, and pagination params
2. Controller receives request and parses parameters
3. Service builds MongoDB query based on filters
4. Database returns filtered, sorted, and paginated results
5. Controller returns JSON response to frontend

### Key Features

**Search Implementation**
- Text index on `customerName` and `phoneNumber` fields
- Case-insensitive full-text search using MongoDB `$text` operator
- Works alongside filters and sorting

**Filtering**
- Multi-select filters for: region, gender, age range, category, tags, payment method, date range
- Filters combine using MongoDB `$in` and range operators
- Independent and combinable filters

**Sorting**
- Supports: date (newest/oldest), quantity, customer name (A-Z/Z-A)
- Preserves active search and filters
- Default: date descending (newest first)

**Pagination**
- 10 items per page
- Returns total count and page metadata
- Supports next/previous navigation

## Frontend Architecture

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3

### Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx               # Search input
│   │   ├── FilterPanel.jsx             # Filter controls
│   │   ├── TransactionTable.jsx        # Data table
│   │   └── Pagination.jsx              # Pagination controls
│   ├── hooks/
│   │   └── useTransactions.js          # Data fetching hook
│   ├── services/
│   │   └── api.js                      # API client
│   ├── styles/
│   │   └── index.css                   # Global styles
│   ├── App.jsx                         # Main component
│   └── main.jsx                        # Entry point
└── package.json
```

### Component Responsibilities

**SearchBar**
- Renders search input and button
- Handles search state and submission
- Supports Enter key submission

**FilterPanel**
- Renders all filter controls
- Manages filter state changes
- Displays available filter options
- Clear filters functionality

**TransactionTable**
- Displays transaction data in table format
- Shows loading and empty states
- Formats amounts and dates
- Status badges with color coding

**Pagination**
- Renders page navigation
- Handles page changes
- Shows current page and total pages
- Disabled states for first/last pages

**useTransactions Hook**
- Manages transaction data state
- Fetches filter options on mount
- Provides fetchTransactions function
- Handles loading and error states

### State Management

**App.jsx manages:**
- `search`: Current search query
- `filters`: Active filters (region, gender, age, category, tags, payment, date)
- `sort`: Current sort configuration
- `page`: Current page number

State updates trigger automatic data refetch via useEffect.

### Data Flow

1. User interacts with search, filters, or sort controls
2. State updates in App.jsx
3. useEffect detects state change
4. buildQueryParams() constructs API parameters
5. fetchTransactions() calls API
6. Response updates component state
7. Components re-render with new data

## API Endpoints

### GET /api/transactions
Fetches transactions with filtering, sorting, and pagination.

**Query Parameters:**
- `search`: Full-text search query
- `customerRegion`: JSON array of regions
- `gender`: JSON array of genders
- `ageMin`, `ageMax`: Age range
- `productCategory`: JSON array of categories
- `tags`: JSON array of tags
- `paymentMethod`: JSON array of payment methods
- `dateFrom`, `dateTo`: Date range (ISO format)
- `sortBy`: 'date', 'quantity', or 'customerName'
- `order`: 'asc' or 'desc'
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 10)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "page": 1,
    "pageSize": 10,
    "totalPages": 100
  }
}
```

### GET /api/transactions/filter-options
Fetches available filter options.

**Response:**
```json
{
  "regions": [...],
  "categories": [...],
  "paymentMethods": [...],
  "tags": [...],
  "genders": ["Male", "Female", "Other"]
}
```

## Database Schema

**Transaction Collection**
- Indexed fields: date, customerId, gender, age, customerRegion, productCategory, paymentMethod, quantity
- Text index: customerName, phoneNumber
- Unique: transactionId

## CSV Import Process

1. Read CSV file line by line
2. Parse headers and map to schema fields
3. Convert data types (dates, numbers, arrays)
4. Validate required fields
5. Insert into MongoDB using insertMany with ordered: false
6. Skip duplicate transactionIds

## Performance Considerations

- Database indexes on frequently filtered fields
- Text index for efficient search
- Pagination limits result set size
- Lean queries return plain objects (not Mongoose documents)
- Parallel Promise.all for count and data queries
