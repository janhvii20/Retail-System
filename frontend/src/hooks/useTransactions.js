import { useState, useEffect, useCallback } from 'react';
import { transactionAPI } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});

  const fetchFilterOptions = useCallback(async () => {
    try {
      const response = await transactionAPI.getFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  }, []);

  const fetchTransactions = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionAPI.getTransactions(params);
      setTransactions(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    filterOptions,
    fetchTransactions
  };
};
