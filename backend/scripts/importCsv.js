import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from '../src/models/Transaction.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retail-sales';

async function importCsv(csvFilePath) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const headerMap = {
      'Transaction ID': 'transactionId',
      'Date': 'date',
      'Customer ID': 'customerId',
      'Customer Name': 'customerName',
      'Phone Number': 'phoneNumber',
      'Gender': 'gender',
      'Age': 'age',
      'Customer Region': 'customerRegion',
      'Customer Type': 'customerType',
      'Product ID': 'productId',
      'Product Name': 'productName',
      'Brand': 'brand',
      'Product Category': 'productCategory',
      'Tags': 'tags',
      'Quantity': 'quantity',
      'Price per Unit': 'pricePerUnit',
      'Discount Percentage': 'discountPercentage',
      'Total Amount': 'totalAmount',
      'Final Amount': 'finalAmount',
      'Payment Method': 'paymentMethod',
      'Order Status': 'orderStatus',
      'Delivery Type': 'deliveryType',
      'Store ID': 'storeId',
      'Store Location': 'storeLocation',
      'Salesperson ID': 'salespersonId',
      'Employee Name': 'employeeName'
    };

    const BATCH_SIZE = 5000;
    let totalImported = 0;
    let batch = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(',').map(v => v.trim());
      const obj = {};

      headers.forEach((header, index) => {
        const value = values[index];
        const fieldName = headerMap[header];
        if (!fieldName) return;

        if (fieldName === 'date') {
          obj[fieldName] = new Date(value);
        } else if (fieldName === 'tags') {
          obj[fieldName] = value.split(',').map(t => t.trim()).filter(Boolean);
        } else if (['age', 'quantity', 'pricePerUnit', 'discountPercentage', 'totalAmount', 'finalAmount'].includes(fieldName)) {
          obj[fieldName] = parseFloat(value) || 0;
        } else {
          obj[fieldName] = value;
        }
      });

      if (obj.transactionId) {
        batch.push(obj);
      }

      if (batch.length === BATCH_SIZE) {
        await Transaction.insertMany(batch, { ordered: false });
        totalImported += batch.length;
        console.log(`Imported ${totalImported} transactions...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await Transaction.insertMany(batch, { ordered: false });
      totalImported += batch.length;
    }

    console.log(`Import completed successfully. Total: ${totalImported} transactions`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
}

const csvPath = process.argv[2] || './data.csv';
importCsv(csvPath);
