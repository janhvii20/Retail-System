import { TransactionService } from '../services/transactionService.js';

const service = new TransactionService();

export const getTransactions = async (req, res) => {
  try {
    const {
      search,
      customerRegion,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy = 'date',
      order = 'desc',
      page = 1,
      pageSize = 10
    } = req.query;

    const filters = {
      search,
      customerRegion: customerRegion ? JSON.parse(customerRegion) : [],
      gender: gender ? JSON.parse(gender) : [],
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      productCategory: productCategory ? JSON.parse(productCategory) : [],
      tags: tags ? JSON.parse(tags) : [],
      paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : [],
      dateFrom,
      dateTo
    };

    const sort = { sortBy, order };
    const result = await service.getTransactions(filters, sort, parseInt(page), parseInt(pageSize));

    res.json(result);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const options = await service.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: error.message });
  }
};
