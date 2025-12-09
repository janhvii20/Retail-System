import { useState, useEffect } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { StatsCards } from './components/StatsCards';
import { DataTable } from './components/DataTable';
import { PaginationBar } from './components/PaginationBar';
import './styles/index.css';

function App() {
  const { transactions, pagination, loading, filterOptions, fetchTransactions } = useTransactions();
  
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');

  const buildQueryParams = () => {
    const params = {
      page,
      pageSize: 10
    };

    if (search) params.search = search;
    if (filters.customerRegion?.length) params.customerRegion = JSON.stringify(filters.customerRegion);
    if (filters.gender?.length) params.gender = JSON.stringify(filters.gender);
    if (filters.ageMin !== undefined) params.ageMin = filters.ageMin;
    if (filters.ageMax !== undefined) params.ageMax = filters.ageMax;
    if (filters.productCategory?.length) params.productCategory = JSON.stringify(filters.productCategory);
    if (filters.tags?.length) params.tags = JSON.stringify(filters.tags);
    if (filters.paymentMethod?.length) params.paymentMethod = JSON.stringify(filters.paymentMethod);
    if (filters.dateFrom) params.dateFrom = filters.dateFrom;
    if (filters.dateTo) params.dateTo = filters.dateTo;
    if (sort) params.sort = sort;

    return params;
  };

  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  useEffect(() => {
    fetchTransactions(buildQueryParams());
  }, [page, search, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = () => {
    fetchTransactions(buildQueryParams());
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header search={search} onSearchChange={setSearch} />
        <FilterBar 
          filters={filters} 
          filterOptions={filterOptions} 
          onFilterChange={handleFilterChange}
          sort={sort}
          onSortChange={setSort}
          onRefresh={handleRefresh}
        />
        <StatsCards transactions={transactions} />
        <div className="flex-1 overflow-y-auto">
          <DataTable transactions={transactions} loading={loading} />
        </div>
        <PaginationBar pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default App;
