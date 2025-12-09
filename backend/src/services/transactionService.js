import Transaction from '../models/Transaction.js';

export class TransactionService {
  async getTransactions(filters = {}, sort = {}, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const query = this.buildQuery(filters);
    const sortObj = this.buildSort(sort);

    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort(sortObj).skip(skip).limit(pageSize).lean(),
      Transaction.countDocuments(query)
    ]);

    return {
      data: transactions,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }

  buildQuery(filters) {
    const query = {};

    // Search
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    // Customer Region
    if (filters.customerRegion && filters.customerRegion.length > 0) {
      query.customerRegion = { $in: filters.customerRegion };
    }

    // Gender
    if (filters.gender && filters.gender.length > 0) {
      query.gender = { $in: filters.gender };
    }

    // Age Range
    if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
      query.age = {};
      if (filters.ageMin !== undefined) query.age.$gte = filters.ageMin;
      if (filters.ageMax !== undefined) query.age.$lte = filters.ageMax;
    }

    // Product Category
    if (filters.productCategory && filters.productCategory.length > 0) {
      query.productCategory = { $in: filters.productCategory };
    }

    // Tags
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    // Payment Method
    if (filters.paymentMethod && filters.paymentMethod.length > 0) {
      query.paymentMethod = { $in: filters.paymentMethod };
    }

    // Date Range
    if (filters.dateFrom || filters.dateTo) {
      query.date = {};
      if (filters.dateFrom) query.date.$gte = new Date(filters.dateFrom);
      if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    return query;
  }

  buildSort(sort) {
    const sortObj = {};

    if (sort.sortBy === 'date') {
      sortObj.date = sort.order === 'asc' ? 1 : -1;
    } else if (sort.sortBy === 'quantity') {
      sortObj.quantity = sort.order === 'asc' ? 1 : -1;
    } else if (sort.sortBy === 'customerName') {
      sortObj.customerName = sort.order === 'asc' ? 1 : -1;
    } else {
      sortObj.date = -1; // Default: newest first
    }

    return sortObj;
  }

  async getFilterOptions() {
    const [regions, categories, paymentMethods, tags] = await Promise.all([
      Transaction.distinct('customerRegion'),
      Transaction.distinct('productCategory'),
      Transaction.distinct('paymentMethod'),
      Transaction.distinct('tags')
    ]);

    return {
      regions: regions.filter(Boolean).sort(),
      categories: categories.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
      tags: tags.filter(Boolean).sort(),
      genders: ['Male', 'Female', 'Other']
    };
  }
}
