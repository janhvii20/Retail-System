import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true, index: true },
  date: { type: Date, required: true, index: true },
  
  // Customer Fields
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, required: true, index: true },
  phoneNumber: { type: String, required: true, index: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], index: true },
  age: { type: Number, index: true },
  customerRegion: { type: String, index: true },
  customerType: { type: String, index: true },
  
  // Product Fields
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  brand: { type: String },
  productCategory: { type: String, index: true },
  tags: [String],
  
  // Sales Fields
  quantity: { type: Number, required: true, index: true },
  pricePerUnit: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  
  // Operational Fields
  paymentMethod: { type: String, index: true },
  orderStatus: { type: String, index: true },
  deliveryType: { type: String, index: true },
  storeId: { type: String },
  storeLocation: { type: String },
  salespersonId: { type: String },
  employeeName: { type: String }
}, { timestamps: true });

// Text index for search
transactionSchema.index({ customerName: 'text', phoneNumber: 'text' });

export default mongoose.model('Transaction', transactionSchema);
