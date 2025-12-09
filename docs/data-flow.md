# Data Flow Documentation

## System Data Flow Overview

This document describes how data flows through the Retail Sales Management System from user interaction to database and back.

## 1. Search Flow

### User Initiates Search
```
User types in search bar → Presses Enter/Click Search
```

### Frontend Processing
```
Header Component
  ↓
setSearch(query) → Updates App state
  ↓
useEffect triggers (search dependency)
  ↓
buildQueryParams() constructs: { search: "query", page: 1, ... }
  ↓
fetchTransactions(params) called
```

### API Request
```
Frontend (Axios)
  ↓
GET /api/transactions?search=query&page=1&pageSize=10
  ↓
Backend (Express)
```

### Backend Processing
```
transactionController.getTransactions()
  ↓
Extracts search parameter from req.query
  ↓
Calls transactionService.getTransactions(filters)
  ↓
Service builds MongoDB query:
  {
    $text: { $search: "query" }
  }
  ↓
Executes: Transaction.find(query).lean()
  ↓
Returns matching documents
```

### Response & Rendering
```
Backend returns JSON
  ↓
Frontend receives response
  ↓
Updates state: setTransactions(data)
  ↓
DataTable component re-renders with results
```

---

## 2. Filter Flow

### User Selects Filters
```
FilterBar Component
  ↓
User clicks filter option (e.g., Region: "North")
  ↓
handleFilterChange("customerRegion", ["North"])
  ↓
setFilters(prev => { ...prev, customerRegion: ["North"] })
```

### State Update & Query Building
```
App state updates
  ↓
useEffect triggers (filters dependency)
  ↓
setPage(1) resets to first page
  ↓
buildQueryParams() constructs:
  {
    customerRegion: '["North"]',
    page: 1,
    pageSize: 10
  }
  ↓
fetchTransactions(params) called
```

### API Request
```
GET /api/transactions?customerRegion=["North"]&page=1&pageSize=10
```

### Backend Processing
```
transactionController.getTransactions()
  ↓
Parses customerRegion from query
  ↓
transactionService.getTransactions(filters)
  ↓
Builds MongoDB query:
  {
    customerRegion: { $in: ["North"] }
  }
  ↓
Executes: Transaction.find(query).lean()
  ↓
Returns filtered documents
```

### Multi-Filter Combination
```
User selects: Region: ["North", "South"], Gender: ["Male"]
  ↓
buildQueryParams() creates:
  {
    customerRegion: '["North","South"]',
    gender: '["Male"]',
    page: 1
  }
  ↓
Backend builds MongoDB query:
  {
    customerRegion: { $in: ["North", "South"] },
    gender: { $in: ["Male"] }
  }
  ↓
MongoDB applies AND logic (all conditions must match)
  ↓
Returns documents matching ALL filters
```

### Range Filters (Age, Date)
```
User sets: Age Range 25-35
  ↓
buildQueryParams() creates:
  {
    ageMin: 25,
    ageMax: 35,
    page: 1
  }
  ↓
Backend builds MongoDB query:
  {
    age: { $gte: 25, $lte: 35 }
  }
  ↓
Returns documents within range
```

---

## 3. Sorting Flow

### User Selects Sort Option
```
FilterBar Component
  ↓
User selects: "Date (Newest First)"
  ↓
handleSortChange("date-desc")
  ↓
setSort("date-desc")
```

### Query Building with Sort
```
App state updates
  ↓
buildQueryParams() constructs:
  {
    search: "existing search",
    filters: { ...existing filters },
    sort: "date-desc",
    page: 1
  }
  ↓
fetchTransactions(params) called
```

### API Request
```
GET /api/transactions?sort=date-desc&page=1&...otherParams
```

### Backend Processing
```
transactionController.getTransactions()
  ↓
Extracts sort parameter
  ↓
transactionService.getTransactions(filters, sort)
  ↓
Builds MongoDB query with sort:
  {
    query: { ...filters },
    sort: { date: -1 }  // -1 for descending
  }
  ↓
Executes: Transaction.find(query).sort(sort).lean()
  ↓
Returns sorted documents
```

### Sort Preservation
```
User has:
  - Search: "John"
  - Filters: Region: "North"
  - Sort: "Date (Newest)"
  ↓
buildQueryParams() includes all three
  ↓
Backend applies all conditions together
  ↓
Results are filtered AND sorted
```

---

## 4. Pagination Flow

### User Navigates Pages
```
PaginationBar Component
  ↓
User clicks "Next" button
  ↓
handlePageChange(2)
  ↓
setPage(2)
  ↓
window.scrollTo({ top: 0 })
```

### Query Building with Pagination
```
App state updates (page: 2)
  ↓
useEffect triggers (page dependency)
  ↓
buildQueryParams() constructs:
  {
    page: 2,
    pageSize: 10,
    ...otherParams
  }
  ↓
fetchTransactions(params) called
```

### API Request
```
GET /api/transactions?page=2&pageSize=10&...otherParams
```

### Backend Processing
```
transactionController.getTransactions()
  ↓
Extracts page and pageSize
  ↓
transactionService.getTransactions(filters, page, pageSize)
  ↓
Calculates skip: (page - 1) * pageSize = (2 - 1) * 10 = 10
  ↓
Executes:
  Transaction.find(query)
    .skip(10)
    .limit(10)
    .lean()
  ↓
Also executes count query:
  Transaction.countDocuments(query)
  ↓
Returns:
  {
    data: [...10 items],
    pagination: {
      total: 1000000,
      page: 2,
      pageSize: 10,
      totalPages: 100000
    }
  }
```

### Frontend Rendering
```
Response received
  ↓
Updates state:
  setTransactions(data)
  setPagination(pagination)
  ↓
DataTable renders items 11-20
  ↓
PaginationBar shows:
  - Current page: 2
  - Total pages: 100000
  - Next/Previous buttons enabled/disabled
```

---

## 5. Combined Flow (Search + Filter + Sort + Pagination)

### User Interaction Sequence
```
1. User types "John" in search
2. User selects Region: "North"
3. User selects Sort: "Date (Newest)"
4. User clicks "Next" page
```

### State Updates
```
App.jsx state:
  {
    search: "John",
    filters: { customerRegion: ["North"] },
    sort: "date-desc",
    page: 2
  }
```

### Query Parameters Built
```
buildQueryParams() returns:
  {
    search: "John",
    customerRegion: '["North"]',
    sort: "date-desc",
    page: 2,
    pageSize: 10
  }
```

### API Request
```
GET /api/transactions?search=John&customerRegion=["North"]&sort=date-desc&page=2&pageSize=10
```

### Backend Processing
```
transactionController.getTransactions()
  ↓
transactionService.getTransactions(filters)
  ↓
Builds MongoDB query:
  {
    $text: { $search: "John" },
    customerRegion: { $in: ["North"] }
  }
  ↓
Executes:
  Transaction.find(query)
    .sort({ date: -1 })
    .skip(10)
    .limit(10)
    .lean()
  ↓
Also counts total matching documents
  ↓
Returns filtered, sorted, paginated results
```

### Response
```
{
  data: [
    { transactionId: "...", customerName: "John...", date: "...", ... },
    { transactionId: "...", customerName: "John...", date: "...", ... },
    ...10 items total
  ],
  pagination: {
    total: 245,
    page: 2,
    pageSize: 10,
    totalPages: 25
  }
}
```

### Frontend Rendering
```
DataTable displays 10 results matching all criteria
PaginationBar shows page 2 of 25
User sees filtered, sorted, paginated data
```

---

## 6. Filter Options Flow

### Initial Load
```
Frontend mounts (App.jsx useEffect)
  ↓
useTransactions hook initializes
  ↓
Calls fetchFilterOptions()
  ↓
GET /api/transactions/filter-options
```

### Backend Processing
```
transactionController.getFilterOptions()
  ↓
transactionService.getFilterOptions()
  ↓
Executes distinct queries:
  - Transaction.distinct("customerRegion")
  - Transaction.distinct("gender")
  - Transaction.distinct("productCategory")
  - Transaction.distinct("tags")
  - Transaction.distinct("paymentMethod")
  ↓
Returns:
  {
    regions: ["North", "South", "East", "West"],
    genders: ["Male", "Female", "Other"],
    categories: ["Electronics", "Clothing", ...],
    tags: ["Sale", "New", ...],
    paymentMethods: ["Credit Card", "Cash", ...]
  }
```

### Frontend Usage
```
FilterBar component receives filterOptions
  ↓
Renders dropdown/checkbox options from data
  ↓
User can select from available options
```

---

## 7. Error Handling Flow

### No Results
```
User searches for non-existent data
  ↓
Backend query returns empty array
  ↓
Frontend receives: { data: [], pagination: { total: 0, ... } }
  ↓
DataTable displays "No results found" message
```

### Invalid Filter Range
```
User sets Age: Min=50, Max=30 (invalid)
  ↓
Frontend validation (if implemented) prevents submission
  ↓
Or backend handles gracefully, returns empty results
```

### Database Error
```
MongoDB connection fails
  ↓
Backend catches error
  ↓
Returns error response
  ↓
Frontend displays error message to user
```

---

## 8. CSV Import Flow

### User Runs Import Script
```
node scripts/importCsv.js ./data.csv
```

### Script Processing
```
importCsv() function
  ↓
Connects to MongoDB
  ↓
Reads CSV file line by line
  ↓
Parses headers and maps to schema fields
  ↓
Converts data types (dates, numbers, arrays)
  ↓
Batches records (5000 per batch)
  ↓
For each batch:
    Transaction.insertMany(batch)
    ↓
    Logs progress
  ↓
Closes connection
```

### Database State
```
MongoDB collection populated with 1,000,000 transactions
  ↓
Indexes created on frequently queried fields
  ↓
Text index created on customerName, phoneNumber
  ↓
System ready for queries
```

---

## State Management Summary

### App.jsx State
```javascript
{
  search: string,           // Current search query
  filters: {
    customerRegion: [],     // Selected regions
    gender: [],             // Selected genders
    ageMin: number,         // Age range minimum
    ageMax: number,         // Age range maximum
    productCategory: [],    // Selected categories
    tags: [],               // Selected tags
    paymentMethod: [],      // Selected payment methods
    dateFrom: string,       // Date range start
    dateTo: string          // Date range end
  },
  sort: string,             // Current sort option
  page: number              // Current page number
}
```

### useTransactions Hook State
```javascript
{
  transactions: [],         // Current page transactions
  pagination: {
    total: number,          // Total matching records
    page: number,           // Current page
    pageSize: number,       // Items per page
    totalPages: number      // Total pages
  },
  loading: boolean,         // Loading state
  filterOptions: {
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: []
  }
}
```

---

## Performance Considerations

### Query Optimization
- Database indexes on frequently filtered fields
- Text index for efficient search
- Lean queries return plain objects (not Mongoose documents)
- Parallel Promise.all for count and data queries

### Frontend Optimization
- Pagination limits result set to 10 items
- State updates trigger minimal re-renders
- useEffect dependencies prevent unnecessary API calls
- Scroll to top on page change for UX

### Batching
- CSV import processes 5000 records per batch
- Prevents memory overflow with large datasets
- Maintains database performance during import
